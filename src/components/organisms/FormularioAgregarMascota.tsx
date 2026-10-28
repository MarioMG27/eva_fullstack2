import React, { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import type { RegistroMascota } from './FichaMascota';
import type { ClienteAdmin } from './TablaRecepcion';

interface FormularioAgregarMascotaProps {
  clientePreseleccionadoId?: number; // Si viene desde la vista de un cliente en particular
  onAgregar: (nuevaMascota: RegistroMascota, clienteId: number) => void;
  onCerrar: () => void;
}

export const FormularioAgregarMascota: React.FC<FormularioAgregarMascotaProps> = ({
  clientePreseleccionadoId,
  onAgregar,
  onCerrar,
}) => {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('Canino');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [clientes, setClientes] = useState<ClienteAdmin[]>([]);
  const [clienteIdSeleccionado, setClienteIdSeleccionado] = useState<number>(
    clientePreseleccionadoId || 0
  );

  useEffect(() => {
    const saved = localStorage.getItem('petshop_admin_clientes');
    if (saved) {
      const parsed: ClienteAdmin[] = JSON.parse(saved);
      setClientes(parsed);
      if (!clientePreseleccionadoId && parsed.length > 0) {
        setClienteIdSeleccionado(parsed[0].id);
      }
    }
  }, [clientePreseleccionadoId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !raza || !edad || !clienteIdSeleccionado) return;

    const clienteVinculado = clientes.find((c) => c.id === Number(clienteIdSeleccionado));

    const nuevaMascota: RegistroMascota = {
      id: Date.now(),
      nombre,
      especie,
      raza,
      edad,
      duenoId: Number(clienteIdSeleccionado),
      duenoNombre: clienteVinculado?.nombre || 'Cliente Registrado',
      vacunas: [
        {
          nombre: 'Vacuna Control Inicial',
          fecha: new Date().toISOString().split('T')[0],
          estado: 'Pendiente',
        },
      ],
    };

    onAgregar(nuevaMascota, Number(clienteIdSeleccionado));
    onCerrar();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">🐾 Registrar Nueva Mascota</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCerrar}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {/* Selección del Cliente Propietario si no está fijado */}
              {!clientePreseleccionadoId ? (
                <div className="mb-3">
                  <label className="form-label fw-bold">Dueño / Tutor Responsable (Cliente)</label>
                  <select
                    className="form-select"
                    value={clienteIdSeleccionado}
                    onChange={(e) => setClienteIdSeleccionado(Number(e.target.value))}
                    required
                  >
                    {clientes.map((cli) => (
                      <option key={cli.id} value={cli.id}>
                        {cli.nombre} ({cli.email})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="alert alert-info py-2 small mb-3">
                  Vinculando mascota al tutor ID #{clientePreseleccionadoId}
                </div>
              )}

              <FormField
                label="Nombre de la Mascota"
                type="text"
                placeholder="Ej: Rocky, Misu..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <div className="mb-3">
                <label className="form-label fw-bold">Especie</label>
                <select
                  className="form-select"
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                >
                  <option value="Canino">🐶 Canino (Perro)</option>
                  <option value="Felino">🐱 Felino (Gato)</option>
                </select>
              </div>

              <FormField
                label="Raza"
                type="text"
                placeholder="Ej: Poodle, Mestizo, Siamés..."
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                required
              />

              <FormField
                label="Edad / Tiempo de vida"
                type="text"
                placeholder="Ej: 2 años, 5 meses..."
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={onCerrar}>
                Cancelar
              </Button>
              <Button type="submit" variant="success">
                Guardar y Asociar Mascota
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};