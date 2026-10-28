import React from 'react';
import { Button } from '../atoms/Button';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';

export interface ServicioItem {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  precio: string;
}

interface TarjetaServicioProps {
  servicio: ServicioItem;
  onSeleccionar: (servicio: ServicioItem) => void;
}

export const TarjetaServicio: React.FC<TarjetaServicioProps> = ({
  servicio,
  onSeleccionar,
}) => {
  return (
    <div className="card h-100 shadow-sm border-0 p-3 bg-light">
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-3 mb-3">
          <span className="display-5">{servicio.icono}</span>
          <div>
            <h5 className="fw-bold text-dark mb-0">{servicio.titulo}</h5>
            <EtiquetaEstado texto={servicio.precio} variante="primary" className="mt-1" />
          </div>
        </div>
        <p className="text-muted small flex-grow-1">{servicio.descripcion}</p>
        <Button
          variant="outline-primary"
          size="sm"
          className="mt-2 w-100"
          onClick={() => onSeleccionar(servicio)}
        >
          Agendar Atención
        </Button>
      </div>
    </div>
  );
};