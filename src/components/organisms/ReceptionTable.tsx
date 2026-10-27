import React, { useState } from 'react';
import { Button } from '../atoms/Button';

interface Appointment {
  id: number;
  paciente: string;
  dueno: string;
  fecha: string;
  hora: string;
  estado: 'Pendiente' | 'Atendido' | 'Cancelado';
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, paciente: 'Max (Doguillo)', dueno: 'Carlos Pérez', fecha: '2026-10-27', hora: '10:00', estado: 'Pendiente' },
  { id: 2, paciente: 'Luna (Siames)', dueno: 'María González', fecha: '2026-10-27', hora: '11:30', estado: 'Atendido' },
  { id: 3, paciente: 'Rocky (Pastor)', dueno: 'Juan Tapia', fecha: '2026-10-27', hora: '15:00', estado: 'Pendiente' },
];

export const ReceptionTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const handleStatusChange = (id: number, newStatus: 'Atendido' | 'Cancelado') => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, estado: newStatus } : app))
    );
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="fw-bold mb-3">Agenda de Atención Médica Veterinaria</h4>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-info">
            <tr>
              <th>Hora</th>
              <th>Mascota / Paciente</th>
              <th>Dueño / Tutor</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td className="fw-bold">{app.hora}</td>
                <td>{app.paciente}</td>
                <td>{app.dueno}</td>
                <td>{app.fecha}</td>
                <td>
                  <span
                    className={`badge ${
                      app.estado === 'Atendido'
                        ? 'bg-success'
                        : app.estado === 'Cancelado'
                        ? 'bg-danger'
                        : 'bg-warning text-dark'
                    }`}
                  >
                    {app.estado}
                  </span>
                </td>
                <td className="text-end">
                  {app.estado === 'Pendiente' && (
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleStatusChange(app.id, 'Atendido')}
                      >
                        Marcar Atendido
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleStatusChange(app.id, 'Cancelado')}
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};