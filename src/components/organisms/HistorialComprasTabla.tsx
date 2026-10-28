import React from 'react';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';

export interface CompraHistorial {
  id: string;
  fecha: string;
  total: number;
  items: string[];
  estado: 'Entregado' | 'En proceso';
}

interface HistorialComprasTablaProps {
  compras: CompraHistorial[];
}

export const HistorialComprasTabla: React.FC<HistorialComprasTablaProps> = ({ compras }) => {
  if (compras.length === 0) {
    return (
      <div className="alert alert-info text-center py-4 mb-0">
        Aún no has realizado compras en nuestra tienda.
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {compras.map((compra) => (
        <div
          key={compra.id}
          className="border p-3 rounded bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center shadow-sm"
        >
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="fw-bold text-primary">{compra.id}</span>
              <span className="text-muted small">• {compra.fecha}</span>
              <EtiquetaEstado texto={compra.estado} variante="success" />
            </div>
            <div className="small text-secondary">{compra.items.join(', ')}</div>
          </div>
          <div className="fw-bold fs-5 text-dark mt-2 mt-md-0">
            ${compra.total.toLocaleString('es-CL')}
          </div>
        </div>
      ))}
    </div>
  );
};