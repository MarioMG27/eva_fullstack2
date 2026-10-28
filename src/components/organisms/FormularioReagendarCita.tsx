import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import type { Cita } from './TablaHorasAgendadas';

interface FormularioReagendarCitaProps {
  cita: Cita;
  onGuardar: (citaId: number, nuevaFecha: string, nuevaHora: string) => void;
  onCerrar: () => void;
}

export const FormularioReagendarCita: React.FC<FormularioReagendarCitaProps> = ({
  cita,
  onGuardar,
  onCerrar,
}) => {
  const todayDate = new Date().toISOString().split('T')[0];
  const [fecha, setFecha] = useState(cita.fecha);
  const [hora, setHora] = useState(cita.hora);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha || !hora) return;
    onGuardar(cita.id, fecha, hora);
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
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title fw-bold">
              🗓️ Reagendar Cita: {cita.paciente} ({cita.servicio})
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCerrar}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Nueva Fecha de Atención</label>
                <input
                  type="date"
                  className="form-control"
                  min={todayDate}
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Nueva Hora</label>
                <select
                  className="form-select"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                >
                  <option value="09:00">09:00 hrs</option>
                  <option value="10:00">10:00 hrs</option>
                  <option value="11:30">11:30 hrs</option>
                  <option value="15:00">15:00 hrs</option>
                  <option value="16:30">16:30 hrs</option>
                  <option value="18:00">18:00 hrs</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={onCerrar}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar Reagendamiento
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};