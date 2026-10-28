import type { Product, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    nombre: 'Doguivit Adulto 60 Comprimidos',
    precio: 12990,
    imagen: 'doguivit_adulto.png',
    categoria: 'Suplementos',
    descripcion: 'Suplemento vitamínico y mineral para perros adultos de todas las razas.',
    oferta: true
  },
  {
    id: 2,
    nombre: 'Doguivit Cachorro 60 Comprimidos',
    precio: 11990,
    imagen: 'doguivit.png',
    categoria: 'Suplementos',
    descripcion: 'Suplemento vitamínico especializado para etapas de crecimiento.',
    oferta: false
  },
  {
    id: 3,
    nombre: 'Cerenia 16mg Antihemético',
    precio: 18500,
    imagen: 'cerenia.jpg',
    categoria: 'Fármacos',
    descripcion: 'Prevención y tratamiento del vómito en perros y gatos.',
    oferta: false
  },
  {
    id: 4,
    nombre: 'Engystol Gotas 30ml',
    precio: 15490,
    imagen: 'engystol.png',
    categoria: 'Homeopatía',
    descripcion: 'Inmunomodulador para reforzar las defensas inmunológicas.',
    oferta: true
  },
  {
    id: 5,
    nombre: 'Stride Advanced 500ml',
    precio: 32900,
    imagen: 'stride_advanced.png',
    categoria: 'Condroprotectores',
    descripcion: 'Protector articular líquido concentrado para perros.',
    oferta: false
  },
  {
    id: 6,
    nombre: 'Vetgastril Gel 50ml',
    precio: 14200,
    imagen: 'vetgastril.png',
    categoria: 'Fármacos',
    descripcion: 'Protector de la mucosa gástrica para perros y gatos.',
    oferta: false
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    nombre: 'Administrador Principal',
    email: 'admin@veterinaria.cl',
    rol: 'admin'
  },
  {
    id: 2,
    nombre: 'Recepcionista Turno',
    email: 'recepcion@veterinaria.cl',
    rol: 'recepcionista'
  },
  {
    id: 3,
    nombre: 'Dr. Roberto Mella (Veterinario)',
    email: 'veterinario@veterinaria.cl',
    rol: 'veterinario'
  },
  {
    id: 4,
    nombre: 'Cliente Prueba',
    email: 'cliente@gmail.com',
    rol: 'cliente'
  }
];