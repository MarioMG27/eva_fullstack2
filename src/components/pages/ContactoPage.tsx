import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';

export const ContactoPage: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !mensaje) return;

    setSubmitted(true);
    setTimeout(() => {
      setNombre('');
      setEmail('');
      setAsunto('');
      setMensaje('');
      setSubmitted(false);
    }, 3500);
  };

  return (
    <div className="py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-6">Contáctanos</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '650px' }}>
          ¿Tienes dudas sobre nuestros servicios, fármacos o agendamientos? Escríbenos y nuestro equipo te responderá a la brevedad.
        </p>
      </div>

      <div className="row g-4">
        {/* Formulario de Contacto */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold text-dark mb-3">Envíanos un mensaje</h4>

            {submitted ? (
              <div className="alert alert-success text-center py-4 my-3" role="alert">
                <div className="fs-1 mb-2">📩</div>
                <h5 className="fw-bold">¡Mensaje enviado con éxito!</h5>
                <p className="mb-0 small">Gracias por contactarnos, {nombre}. Te responderemos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormField
                  label="Nombre Completo"
                  type="text"
                  placeholder="Ej: María González"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <FormField
                  label="Correo Electrónico"
                  type="email"
                  placeholder="ejemplo@correo.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FormField
                  label="Asunto"
                  type="text"
                  placeholder="Ej: Consulta por vacuna o producto"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                />
                <div className="mb-3">
                  <label className="form-label fw-bold">Mensaje</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Escribe aquí tu consulta..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  ></textarea>
                </div>
                <Button type="submit" variant="primary" className="w-100 py-2 fw-semibold">
                  Enviar Consulta
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Información de Ubicación y Horarios */}
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