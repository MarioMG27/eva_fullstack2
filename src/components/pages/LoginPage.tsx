import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';
import { authService } from '../../services/authService';
import { LoginForm } from '../organisms/LoginForm';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLoginSubmit = (email: string): boolean => {
    const user = authService.login(email);
    if (user) {
      onLoginSuccess(user);

      // Redirección inteligente según el rol obtenido
      if (user.rol === 'admin') {
        navigate('/admin');
      } else if (user.rol === 'recepcionista') {
        navigate('/recepcionista');
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
        <LoginForm onLoginSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
};