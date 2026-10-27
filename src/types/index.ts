export interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion?: string;
  oferta?: boolean;
}

export interface User {
  id?: number;
  nombre: string;
  email: string;
  rol: 'cliente' | 'admin' | 'recepcionista';
}

export interface CartItem {
  product: Product;
  cantidad: number;
}