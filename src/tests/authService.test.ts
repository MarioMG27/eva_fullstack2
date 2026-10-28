import { describe, test, expect, beforeEach } from 'vitest';
import { authService } from '../services/authService';

describe('Pruebas unitarias en authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Debe retornar null si no hay sesión iniciada en localStorage', () => {
    const user = authService.getCurrentUser();
    expect(user).toBeNull();
  });

  test('Debe iniciar sesión correctamente con un correo registrado', () => {
    const user = authService.login('admin@veterinaria.cl');
    expect(user).not.toBeNull();
    expect(user?.rol).toBe('admin');
  });

  test('Debe retornar null al intentar iniciar sesión con un correo no existente', () => {
    const user = authService.login('usuario@falso.com');
    expect(user).toBeNull();
  });

  test('Debe cerrar la sesión correctamente y limpiar localStorage', () => {
    authService.login('admin@veterinaria.cl');
    authService.logout();
    const user = authService.getCurrentUser();
    expect(user).toBeNull();
  });
});