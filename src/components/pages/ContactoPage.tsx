import React from 'react';
import { FormularioContacto } from '../organisms/FormularioContacto';

export const ContactoPage: React.FC = () => {
  return (
    <div className="py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-6">Contáctanos</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '650px' }}>
          ¿Tienes dudas sobre nuestros servicios, fármacos o agendamientos? Escríbenos y nuestro equipo te responderá a la brevedad.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold text-dark mb-3">Envíanos un mensaje</h4>
            <FormularioContacto />
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4 bg-dark text-white h-100 d-flex flex-column justify-content-between">
            <div>
              <h4 className="fw-bold mb-4 text-warning">Información de Atención</h4>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                <li className="d-flex align-items-start gap-3">
                  <span className="fs-4">📍</span>
                  <div>
                    <strong className="d-block text-light">Dirección Principal:</strong>
                    <span className="text-muted small">Av. Principal #1234, Santiago, Chile</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <span className="fs-4">📞</span>
                  <div>
                    <strong className="d-block text-light">Teléfonos de Contacto:</strong>
                    <span className="text-muted small">+56 9 1234 5678 / +56 2 2987 6543</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <span className="fs-4">✉️</span>
                  <div>
                    <strong className="d-block text-light">Correo Electrónico:</strong>
                    <span className="text-muted small">contacto@veterinaria.cl</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <span className="fs-4">⏰</span>
                  <div>
                    <strong className="d-block text-light">Horario de Atención:</strong>
                    <span className="text-muted small">Lunes a Sábado: 08:00 - 21:00 hrs</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-3 rounded text-center small text-light">
              🚨 <strong>Urgencias Médicas:</strong> Atención disponible con turno clínico según agenda telefónica.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};