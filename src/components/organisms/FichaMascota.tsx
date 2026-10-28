import React, { useState } from 'react';
import { ElementoVacuna, type Vacuna } from '../molecules/ElementoVacuna';
import { ConsultaMedicaItem, type ConsultaMedica } from '../molecules/ConsultaMedicaItem';
import { FormularioDiagnosticoReceta } from './FormularioDiagnosticoReceta';
import { Button } from '../atoms/Button';

export interface RegistroMascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  duenoId?: number;
  duenoNombre?: string;
  vacunas: Vacuna[];
  consultas?: ConsultaMedica[];
}

interface FichaMascotaProps {
  mascota: RegistroMascota;
  esModoVeterinario?: boolean; // Prop para controlar si se muestra el botón de agregar diagnóstico
  onActualizarConsultas?: (mascotaId: number, nuevasConsultas: ConsultaMedica[]) => void;
}

export const FichaMascota: React.FC<FichaMascotaProps> = ({
  mascota,
  esModoVeterinario = false,
  onActualizarConsultas,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [consultas, setConsultas] = useState<ConsultaMedica[]>(
    mascota.consultas || [
      {
        id: 1,
        fecha: '2026-09-10',
        veterinario: 'Dr. Roberto Mella',
        diagnostico: 'Gastroenteritis leve por cambio repentino de alimento.',
        receta: [
          { medicamento: 'Vetgastril Gel 50ml', dosis: '2.5ml', frecuencia: 'Cada 12 hrs por 5 días' },
          { medicamento: 'Cerenia 16mg', dosis: '1 comprimido', frecuencia: 'Cada 24 hrs por 3 días' },
        ],
      },
    ]
  );

  const handleGuardarConsulta = (nuevaConsulta: ConsultaMedica) => {
    const actualizadas = [nuevaConsulta, ...consultas];
    setConsultas(actualizadas);
    if (onActualizarConsultas) {
      onActualizarConsultas(mascota.id, actualizadas);
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 bg-light h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <span className="fs-1">{mascota.especie === 'Canino' ? '🐶' : '🐱'}</span>
          <div>
            <h4 className="fw-bold mb-0 text-dark">{mascota.nombre}</h4>
            <p className="text-muted small mb-0">
              {mascota.especie} • {mascota.raza} ({mascota.edad})
            </p>
          </div>
        </div>
        
        {/* Solo si esModoVeterinario es true se muestra el botón de agregar diagnóstico/receta */}
        {esModoVeterinario && (
          <Button variant="outline-primary" size="sm" onClick={() => setMostrarModal(true)}>
            🩺 + Diagnóstico / Receta
          </Button>
        )}
      </div>

      <h6 className="fw-bold text-primary mt-2 mb-2">Esquema de Vacunación:</h6>
      <ul className="list-group list-group-flush rounded shadow-sm mb-4">
        {mascota.vacunas.map((vac, idx) => (
          <ElementoVacuna key={idx} vacuna={vac} />
        ))}
      </ul>

      <h6 className="fw-bold text-dark mb-2">Historial de Diagnósticos y Recetas Médicas:</h6>
      {consultas.length === 0 ? (
        <p className="text-muted small">No registra atenciones médicas previas.</p>
      ) : (
        consultas.map((cons) => <ConsultaMedicaItem key={cons.id} consulta={cons} />)
      )}

      {mostrarModal && (
        <FormularioDiagnosticoReceta
          nombreMascota={mascota.nombre}
          onGuardar={handleGuardarConsulta}
          onCerrar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
};