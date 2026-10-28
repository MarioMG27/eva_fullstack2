import React from 'react';
import { Navigate } from 'react-router-dom';
import type { User, UserRole } from '../../types';

interface ProtectedRouteProps {
  user: User | null;
  allowedRoles: UserRole[]; // O ('cliente' | 'admin' | 'recepcionista' | 'veterinario')[]
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  allowedRoles,
  children,
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};