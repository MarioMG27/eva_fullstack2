import React, { useState, useEffect } from 'react';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';
import { Button } from '../atoms/Button';
import { FichaMascota } from './FichaMascota';
import type { ClienteAdmin } from './TablaRecepcion';

interface PacienteConDueno {
  mascota: any;
  duenoNombre: string;
  duenoEmail: string;
  duenoTelefono: string;
}

interface BuscadorPacientesProps {
  esModoVeterinario?: boolean;
}

export const BuscadorPacientes: React.FC<BuscadorPacientesProps> = ({
  esModoVeterinario = false,
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [pacientes, setPacientes] = useState<PacienteConDueno[]>([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<PacienteConDueno | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('petshop_admin_clientes');
    if (saved) {
      const clientes: ClienteAdmin[] = JSON.parse(saved);
      const listaPacientes: PacienteConDueno[] = [];

      clientes.forEach((cli) => {
        cli.mascotas.forEach((masc) => {
          listaPacientes.push({
            mascota: masc,
            duenoNombre: cli.nombre,
            duenoEmail: cli.email,
            duenoTelefono: cli.telefono,
          });
        });
      });

      setPacientes(listaPacientes);
    }
  }, []);

  const pacientesFiltrados = pacientes.filter((item) => {
    const termino = busqueda.toLowerCase();
    const nombreMascota = item.mascota.nombre.toLowerCase();
    const especie = item.mascota.especie.toLowerCase();
    const raza = item.mascota.raza.toLowerCase();
    const nombreDueno = item.duenoNombre.toLowerCase();

    return (
      nombreMascota.includes(termino) ||
      especie.includes(termino) ||
      raza.includes(termino) ||
      nombreDueno.includes(termino)
    );
  });

  return (
    <div>
      <div className="row align-items-center mb-4 g-3">
        <div className="col-md-6">
          <h4 className="fw-bold mb-0">🐾 Registro General de Pacientes y Mascotas</h4>
          <p className="text-muted small mb-0">
            Búsqueda global de fichas clínicas e historial veterinario.
          </p>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Buscar por nombre de mascota, dueño, especie o raza..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setBusqueda('')}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-hover align-middle border shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Mascota / Paciente</th>
              <th>Especie / Raza</th>
              <th>Edad</th>
              <th>Dueño / Tutor</th>
              <th>Contacto Dueño</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  No se encontraron mascotas o pacientes que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              pacientesFiltrados.map((item) => (
                <tr key={item.mascota.id}>
                  <td>
                    <strong className="fs-6">{item.mascota.nombre}</strong>
                  </td>
                  <td>
                    <EtiquetaEstado
                      texto={item.mascota.especie}
                      variante={item.mascota.especie === 'Canino' ? 'primary' : 'info'}
                      className="me-2"
                    />
                    <span className="small text-secondary">{item.mascota.raza}</span>
                  </td>
                  <td>{item.mascota.edad}</td>
                  <td>
                    <strong className="text-dark">{item.duenoNombre}</strong>
                  </td>
                  <td className="small text-muted">
                    <div>{item.duenoEmail}</div>
                    <div>{item.duenoTelefono}</div>
                  </td>
                  <td className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setPacienteSeleccionado(item)}
                    >
                      📋 Ver Ficha Clínica
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Ficha Médica */}
      {pacienteSeleccionado && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">
                  📋 Ficha Clínica: {pacienteSeleccionado.mascota.nombre} (Tutor: {pacienteSeleccionado.duenoNombre})
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setPacienteSeleccionado(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <FichaMascota
                  mascota={pacienteSeleccionado.mascota}
                  esModoVeterinario={esModoVeterinario}
                />
              </div>
              <div className="modal-footer">
                <Button variant="secondary" onClick={() => setPacienteSeleccionado(null)}>
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};