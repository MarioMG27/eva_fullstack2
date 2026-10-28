import React, { useState } from 'react';
import { TarjetaServicio, type ServicioItem } from '../molecules/TarjetaServicio';
import { ModuloAgendamiento } from '../organisms/ModuloAgendamiento';

const SERVICIOS: ServicioItem[] = [
  {
    id: 1,
    titulo: 'Consulta Médica General',
    descripcion: 'Evaluación física completa, diagnóstico temprano y formulación de tratamiento para perros y gatos.',
    icono: '🩺',
    precio: 'Desde $15.000',
  },
  {
    id: 2,
    titulo: 'Vacunación y Desparasitación',
    descripcion: 'Esquemas completos de inmunización para cachorros y adultos, además de control parasitario interno y externo.',
    icono: '💉',
    precio: 'Desde $12.000',
  },
  {
    id: 3,
    titulo: 'Pabellón y Cirugía General',
    descripcion: 'Procedimientos quirúrgicos con monitoreo de signos vitales y anestesia inhalatoria segura.',
    icono: '🏥',
    precio: 'Según evaluación',
  },
  {
    id: 4,
    titulo: 'Peluquería y Estética Canina',
    descripcion: 'Bañado sanitario, corte de pelo especializado, limpieza de oídos y corte de uñas.',
    icono: '✂️',
    precio: 'Desde $18.000',
  },
];

export const ServicesPage: React.FC = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState<ServicioItem | null>(null);

  return (
    <div className="py-3">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-6">Servicios Médicos y Atención Veterinaria</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
          Contamos con profesionales capacitados y equipamiento especializado para brindar la mejor atención a tu mascota.
        </p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
        {SERVICIOS.map((servicio) => (
          <div key={servicio.id} className="col">
            <TarjetaServicio
              servicio={servicio}
              onSeleccionar={(s) => setServicioSeleccionado(s)}
            />
          </div>
        ))}
      </div>

      <ModuloAgendamiento
        service={servicioSeleccionado}
        onClose={() => setServicioSeleccionado(null)}
      />
    </div>
  );
};