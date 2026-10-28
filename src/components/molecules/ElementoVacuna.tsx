import React from 'react';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';

export interface Vacuna {
  nombre: string;
  fecha: string;
  estado: 'Al día' | 'Pendiente';
}

interface ElementoVacunaProps {
  vacuna: Vacuna;
}

export const ElementoVacuna: React.FC<ElementoVacunaProps> = ({ vacuna }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{vacuna.nombre}</strong>
        <div className="text-muted small">Última dosis: {vacuna.fecha}</div>
      </div>
      <EtiquetaEstado
        texto={vacuna.estado}
        variante={vacuna.estado === 'Al día' ? 'success' : 'warning'}
      />
    </li>
  );
};