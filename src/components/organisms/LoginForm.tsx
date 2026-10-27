import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';

interface LoginFormProps {
  onLoginSubmit: (email: string) => boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Por favor ingresa un correo electrónico.');
      return;
    }

    const success = onLoginSubmit(email);
    if (!success) {
      setError('Correo no encontrado. Prueba con un correo de prueba.');
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setError('');
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h3 className="fw-bold text-center mb-1">Iniciar Sesión</h3>
      <p className="text-muted text-center small mb-4">
        Ingresa tus credenciales para acceder a tu cuenta
      </p>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Correo Electrónico"
          type="email"
          placeholder="ejemplo@veterinaria.cl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />

        <Button type="submit" variant="primary" className="w-100 mt-2 py-2 fw-semibold">
          Ingresar
        </Button>
      </form>

      <hr className="my-4" />

      {/* Accesos rápidos para evaluación de roles */}
      <div>
        <p className="small text-muted fw-bold mb-2">Prueba rápida por perfil:</p>
        <div className="d-flex flex-column gap-2">
          <button
            type="button"
            className="btn btn-outline-warning btn-sm text-start text-dark"
            onClick={() => handleQuickFill('admin@veterinaria.cl')}
          >
            🔑 <strong>Admin:</strong> admin@veterinaria.cl
          </button>
          <button
            type="button"
            className="btn btn-outline-info btn-sm text-start text-dark"
            onClick={() => handleQuickFill('recepcion@veterinaria.cl')}
          >
            📋 <strong>Recepcionista:</strong> recepcion@veterinaria.cl
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm text-start"
            onClick={() => handleQuickFill('cliente@gmail.com')}
          >
            👤 <strong>Cliente:</strong> cliente@gmail.com
          </button>
        </div>
      </div>
    </div>
  );
};