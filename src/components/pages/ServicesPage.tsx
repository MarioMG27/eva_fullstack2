import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { ModuloAgendamiento } from '../organisms/ModuloAgendamiento';
import type { ServiceItem } from '../organisms/ModuloAgendamiento';

const SERVICES: ServiceItem[] = [
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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="py-3">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-6">Servicios Médicos y Atención Veterinaria</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
          Contamos con profesionales capacitados y equipamiento especializado para brindar la mejor atención a tu mascota.
        </p>
      </div>

      {/* Tarjetas de Servicios */}
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
        {SERVICES.map((servicio) => (
          <div key={servicio.id} className="col">
            <div className="card h-100 shadow-sm border-0 p-3 bg-light">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="display-5">{servicio.icono}</span>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">{servicio.titulo}</h5>
                    <span className="badge bg-primary mt-1">{servicio.precio}</span>
                  </div>
                </div>
                <p className="text-muted small flex-grow-1">{servicio.descripcion}</p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mt-2 w-100"
                  onClick={() => setSelectedService(servicio)}
                >
                  Agendar Atención
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Organismo ModuloAgendamiento */}
      <ModuloAgendamiento
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};