import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { User } from '../../types';
import { authService } from '../../services/authService';
import { LoginForm } from '../organisms/LoginForm';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar desde dónde vino la petición de autenticación
  const fromCart = (location.state as any)?.fromCart;
  const pendingService = (location.state as any)?.pendingService;

  const handleLoginSubmit = (email: string): boolean => {
    const user = authService.login(email);
    if (user) {
      onLoginSuccess(user);

      // 1. Si provenía de la compra en el carrito, retorna al carrito
      if (fromCart) {
        navigate('/carrito');
        return true;
      }

      // 2. Si provenía de agendar un servicio, retorna a servicios
      if (pendingService) {
        navigate('/servicios', { state: { continueService: pendingService } });
        return true;
      }

      // 3. De lo contrario, redirige según su rol
      if (user.rol === 'admin') {
        navigate('/admin');
      } else if (user.rol === 'recepcionista') {
        navigate('/recepcionista');
      } else if (user.rol === 'veterinario') {
        navigate('/veterinario');
      } else {
        navigate('/tienda');
      }
      return true;
    }
    return false;
  };

  return (
    <div className="row justify-content-center py-4">
      <div className="col-md-6 col-lg-5">
        {fromCart && (
          <div className="alert alert-info text-center mb-4 shadow-sm" role="alert">
            🛒 Inicia sesión con tu cuenta para completar tu compra.
          </div>
        )}
        {pendingService && (
          <div className="alert alert-info text-center mb-4 shadow-sm" role="alert">
            ℹ️ Inicia sesión con tu cuenta para continuar con la reserva de: <strong>{pendingService.titulo}</strong>
          </div>
        )}
        <LoginForm onLoginSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
};