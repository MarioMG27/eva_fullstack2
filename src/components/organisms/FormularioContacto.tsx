import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';

export const FormularioContacto: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !mensaje) return;

    setEnviado(true);
    setTimeout(() => {
      setNombre('');
      setEmail('');
      setAsunto('');
      setMensaje('');
      setEnviado(false);
    }, 3500);
  };

  if (enviado) {
    return (
      <div className="alert alert-success text-center py-4 my-3" role="alert">
        <div className="fs-1 mb-2">📩</div>
        <h5 className="fw-bold">¡Mensaje enviado con éxito!</h5>
        <p className="mb-0 small">
          Gracias por contactarnos, {nombre}. Te responderemos pronto.
        </p>
      </div>
    );
  }

  return (
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
  );
};