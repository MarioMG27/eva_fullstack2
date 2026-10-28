export interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion?: string;
  oferta?: boolean;
}

export type UserRole = 'cliente' | 'admin' | 'recepcionista' | 'veterinario';

export interface User {
  id?: number;
  nombre: string;
  email: string;
  rol: UserRole;
}

export interface CartItem {
  product: Product;
  cantidad: number;
}