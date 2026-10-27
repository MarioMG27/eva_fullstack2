import type { CartItem, User } from '../types';
import { INITIAL_USERS } from './initialData';

const USER_SESSION_KEY = 'petshop_session_user';
const CART_KEY = 'petshop_cart';

export const authService = {
  // Simular inicio de sesión buscando email
  login: (email: string): User | null => {
    const user = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  // Obtener usuario en sesión
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(USER_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Cerrar sesión
  logout: (): void => {
    localStorage.removeItem(USER_SESSION_KEY);
  }
};

export const cartService = {
  // Obtener items del carrito
  getCart: (): CartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Guardar carrito entero
  saveCart: (cart: CartItem[]): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  // Limpiar carrito
  clearCart: (): void => {
    localStorage.removeItem(CART_KEY);
  }
};