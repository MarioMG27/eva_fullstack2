import React from 'react';
import { ElementoVacuna, type Vacuna } from '../molecules/ElementoVacuna';

export interface RegistroMascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  vacunas: Vacuna[];
}

interface FichaMascotaProps {
  mascota: RegistroMascota;
}

export const FichaMascota: React.FC<FichaMascotaProps> = ({ mascota }) => {
  return (
    <div className="card shadow-sm border-0 p-4 bg-light h-100">
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="fs-1">{mascota.especie === 'Canino' ? '🐶' : '🐱'}</span>
        <div>
          <h4 className="fw-bold mb-0 text-dark">{mascota.nombre}</h4>
          <p className="text-muted small mb-0">
            {mascota.especie} • {mascota.raza} ({mascota.edad})
          </p>
        </div>
      </div>

      <h6 className="fw-bold text-primary mt-2 mb-2">Esquema de Vacunación:</h6>
      <ul className="list-group list-group-flush rounded shadow-sm">
        {mascota.vacunas.map((vac, idx) => (
          <ElementoVacuna key={idx} vacuna={vac} />
        ))}
      </ul>
    </div>
  );
};