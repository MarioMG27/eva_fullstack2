import React, { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';
import { FormField } from '../molecules/FormField';
import { FichaMascota, type RegistroMascota } from './FichaMascota';
import { FormularioAgregarMascota } from './FormularioAgregarMascota';

export interface ClienteAdmin {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  mascotas: RegistroMascota[];
}

interface TablaRecepcionProps {
  permitirCrearCliente?: boolean; // Controla si se muestra el botón + Crear Cuenta de Cliente
}

const DEFAULT_CLIENTES: ClienteAdmin[] = [
  {
    id: 1,
    nombre: 'Carlos Pérez',
    email: 'carlos.perez@gmail.com',
    telefono: '+56 9 8765 4321',
    mascotas: [
      {
        id: 101,
        nombre: 'Max',
        especie: 'Canino',
        raza: 'Beagle',
        edad: '3 años',
        vacunas: [{ nombre: 'Óctuple', fecha: '2026-03-10', estado: 'Al día' }],
      },
    ],
  },
  {
    id: 2,
    nombre: 'María González',
    email: 'maria.gonzalez@gmail.com',
    telefono: '+56 9 1234 5678',
    mascotas: [
      {
        id: 102,
        nombre: 'Luna',
        especie: 'Felino',
        raza: 'Siamés',
        edad: '2 años',
        vacunas: [{ nombre: 'Triple Felina', fecha: '2026-01-20', estado: 'Al día' }],
      },
    ],
  },
];

export const TablaRecepcion: React.FC<TablaRecepcionProps> = ({
  permitirCrearCliente = true,
}) => {
  const [clientes, setClientes] = useState<ClienteAdmin[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteAdmin | null>(null);
  
  // Modales
  const [mostrarModalMascota, setMostrarModalMascota] = useState(false);
  const [mostrarModalCrearCliente, setMostrarModalCrearCliente] = useState(false);
  const [clienteAEditar, setClienteAEditar] = useState<ClienteAdmin | null>(null);

  // Formulario Crear Cliente
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoTelefono, setNuevoTelefono] = useState('');

  // Formulario Editar Contacto
  const [editEmail, setEditEmail] = useState('');
  const [editTelefono, setEditTelefono] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('petshop_admin_clientes');
    if (saved) {
      setClientes(JSON.parse(saved));
    } else {
      localStorage.setItem('petshop_admin_clientes', JSON.stringify(DEFAULT_CLIENTES));
      setClientes(DEFAULT_CLIENTES);
    }
  }, []);

  const guardarClientes = (actualizados: ClienteAdmin[]) => {
    setClientes(actualizados);
    localStorage.setItem('petshop_admin_clientes', JSON.stringify(actualizados));
  };

  // 1. Crear nuevo cliente
  const handleCrearCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoEmail) return;

    const nuevoCliente: ClienteAdmin = {
      id: Date.now(),
      nombre: nuevoNombre,
      email: nuevoEmail,
      telefono: nuevoTelefono || '+56 9 0000 0000',
      mascotas: [],
    };

    const actualizados = [...clientes, nuevoCliente];
    guardarClientes(actualizados);

    setNuevoNombre('');
    setNuevoEmail('');
    setNuevoTelefono('');
    setMostrarModalCrearCliente(false);
  };

  // 2. Abrir modal edición
  const handleAbrirEditar = (cli: ClienteAdmin) => {
    setClienteAEditar(cli);
    setEditEmail(cli.email);
    setEditTelefono(cli.telefono);
  };

  // 3. Guardar cambios de contacto
  const handleGuardarContacto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteAEditar) return;

    const actualizados = clientes.map((cli) => {
      if (cli.id === clienteAEditar.id) {
        return {
          ...cli,
          email: editEmail,
          telefono: editTelefono,
        };
      }
      return cli;
    });

    guardarClientes(actualizados);

    if (clienteSeleccionado && clienteSeleccionado.id === clienteAEditar.id) {
      setClienteSeleccionado({
        ...clienteSeleccionado,
        email: editEmail,
        telefono: editTelefono,
      });
    }

    setClienteAEditar(null);
  };

  // 4. Agregar mascota a cliente
  const handleAgregarMascotaCliente = (nuevaMascota: RegistroMascota) => {
    if (!clienteSeleccionado) return;

    const actualizados = clientes.map((cli) => {
      if (cli.id === clienteSeleccionado.id) {
        return {
          ...cli,
          mascotas: [...cli.mascotas, nuevaMascota],
        };
      }
      return cli;
    });

    guardarClientes(actualizados);

    setClienteSeleccionado((prev) =>
      prev ? { ...prev, mascotas: [...prev.mascotas, nuevaMascota] } : null
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">👥 Gestión de Clientes y Fichas Médicas</h4>
        {permitirCrearCliente && (
          <Button
            variant="success"
            onClick={() => setMostrarModalCrearCliente(true)}
          >
            👤 + Crear Cuenta de Cliente
          </Button>
        )}
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-hover align-middle border">
          <thead className="table-light">
            <tr>
              <th>Cliente / Tutor</th>
              <th>Contacto</th>
              <th>Mascotas</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.id}>
                <td>
                  <strong className="d-block text-dark">{cli.nombre}</strong>
                  <span className="text-muted small">{cli.email}</span>
                </td>
                <td>{cli.telefono}</td>
                <td>
                  <EtiquetaEstado
                    texto={`${cli.mascotas.length} registrada(s)`}
                    variante="info"
                  />
                </td>
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleAbrirEditar(cli)}
                    >
                      ✏️ Editar Contacto
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setClienteSeleccionado(cli)}
                    >
                      🐾 Ver Mascotas
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle de Mascotas del Cliente */}
      {clienteSeleccionado && (
        <div className="card shadow-sm border-0 p-4 bg-white mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-primary mb-0">
              Mascotas de: {clienteSeleccionado.nombre} ({clienteSeleccionado.email})
            </h5>
            <div className="d-flex gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={() => setMostrarModalMascota(true)}
              >
                ➕ Registrar Mascota a este Cliente
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setClienteSeleccionado(null)}
              >
                Cerrar Detalle
              </Button>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            {clienteSeleccionado.mascotas.map((mascota) => (
              <div key={mascota.id} className="col">
                <FichaMascota mascota={mascota} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal 1: Registrar Nueva Mascota */}
      {mostrarModalMascota && clienteSeleccionado && (
        <FormularioAgregarMascota
          clientePreseleccionadoId={clienteSeleccionado.id}
          onAgregar={handleAgregarMascotaCliente}
          onCerrar={() => setMostrarModalMascota(false)}
        />
      )}

      {/* Modal 2: Crear Cuenta de Cliente */}
      {mostrarModalCrearCliente && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">👤 Crear Cuenta de Cliente</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setMostrarModalCrearCliente(false)}
                ></button>
              </div>
              <form onSubmit={handleCrearCliente}>
                <div className="modal-body p-4">
                  <FormField
                    label="Nombre Completo del Cliente"
                    type="text"
                    placeholder="Ej: Roberto Gómez"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    required
                  />
                  <FormField
                    label="Correo Electrónico"
                    type="email"
                    placeholder="cliente@correo.cl"
                    value={nuevoEmail}
                    onChange={(e) => setNuevoEmail(e.target.value)}
                    required
                  />
                  <FormField
                    label="Teléfono de Contacto"
                    type="text"
                    placeholder="+56 9 1234 5678"
                    value={nuevoTelefono}
                    onChange={(e) => setNuevoTelefono(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <Button
                    variant="secondary"
                    onClick={() => setMostrarModalCrearCliente(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="success">
                    Crear Cuenta
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Editar Contacto del Cliente */}
      {clienteAEditar && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">
                  ✏️ Modificar Contacto: {clienteAEditar.nombre}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setClienteAEditar(null)}
                ></button>
              </div>
              <form onSubmit={handleGuardarContacto}>
                <div className="modal-body p-4">
                  <FormField
                    label="Correo Electrónico"
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                  <FormField
                    label="Teléfono de Contacto"
                    type="text"
                    value={editTelefono}
                    onChange={(e) => setEditTelefono(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <Button
                    variant="secondary"
                    onClick={() => setClienteAEditar(null)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary">
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};