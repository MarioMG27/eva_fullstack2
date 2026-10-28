import React from 'react';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';

export interface ConsultaMedica {
  id: number;
  fecha: string;
  veterinario: string;
  diagnostico: string;
  receta: {
    medicamento: string;
    dosis: string;
    frecuencia: string;
  }[];
}

interface ConsultaMedicaItemProps {
  consulta: ConsultaMedica;
}

export const ConsultaMedicaItem: React.FC<ConsultaMedicaItemProps> = ({ consulta }) => {
  return (
    <div className="border rounded p-3 mb-3 bg-white shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
        <span className="fw-bold text-dark">📋 Consulta del {consulta.fecha}</span>
        <EtiquetaEstado texto={`Atendido por: ${consulta.veterinario}`} variante="info" />
      </div>

      <div className="mb-3">
        <strong className="text-primary small d-block">🩺 Diagnóstico Médico:</strong>
        <p className="mb-0 text-secondary small">{consulta.diagnostico}</p>
      </div>

      <div>
        <strong className="text-success small d-block mb-1">💊 Receta Médica / Tratamiento:</strong>
        <ul className="list-group list-group-flush border-top">
          {consulta.receta.map((med, idx) => (
            <li key={idx} className="list-group-item px-0 py-1 d-flex justify-content-between small">
              <span className="fw-semibold text-dark">{med.medicamento}</span>
              <span className="text-muted">{med.dosis} — {med.frecuencia}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};