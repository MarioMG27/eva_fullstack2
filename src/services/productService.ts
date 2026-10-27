import type { Product } from '../types';
import { INITIAL_PRODUCTS } from './initialData';

const PRODUCTS_KEY = 'petshop_products';

export const productService = {
  // Obtener todos los productos (o inicializarlos si no existen)
  getProducts: (): Product[] => {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  },

  // Obtener un producto por ID
  getProductById: (id: number): Product | undefined => {
    const products = productService.getProducts();
    return products.find((p) => p.id === id);
  },

  // Agregar un nuevo producto (para Panel Admin)
  saveProduct: (product: Omit<Product, 'id'>): Product => {
    const products = productService.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now()
    };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  },

  // Actualizar un producto existente
  updateProduct: (id: number, updatedData: Partial<Product>): void => {
    const products = productService.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedData };
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }
  },

  // Eliminar un producto
  deleteProduct: (id: number): void => {
    const products = productService.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  }
};