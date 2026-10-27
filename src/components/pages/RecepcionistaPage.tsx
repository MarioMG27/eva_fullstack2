import React from 'react';
import { ReceptionTable } from '../organisms/ReceptionTable';

export const RecepcionistaPage: React.FC = () => {
  return (
    <div className="py-2">
      <div className="bg-info text-dark p-4 rounded mb-4 shadow-sm">
        <h2 className="fw-bold mb-1">📋 Panel de Recepción y Citas</h2>
        <p className="mb-0">
          Control de agendamiento de horas médicas y atención de pacientes en clínica.
        </p>
      </div>

      <ReceptionTable />
    </div>
  );
};