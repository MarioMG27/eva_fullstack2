import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ProductCard } from '../components/molecules/ProductCard';
import type { Product } from '../types';

const productoEjemplo: Product = {
  id: 1,
  nombre: 'Cerenia 16mg Antiemético 4 Comprimidos',
  precio: 21990,
  imagen: 'cerenia.jpg',
  categoria: 'Fármacos',
  oferta: true,
};

describe('Pruebas unitarias en <ProductCard />', () => {
  test('Debe mostrar el nombre del producto', () => {
    render(<ProductCard product={productoEjemplo} onAddToCart={() => {}} />);
    expect(screen.getByText(productoEjemplo.nombre)).toBeInTheDocument();
  });

  test('Debe mostrar la insignia de oferta cuando corresponde', () => {
    render(<ProductCard product={productoEjemplo} onAddToCart={() => {}} />);
    expect(screen.getByText('¡Oferta!')).toBeInTheDocument();
  });

  test('Debe llamar a onAddToCart con el producto al hacer clic', () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={productoEjemplo} onAddToCart={handleAddToCart} />);

    const botonAgregar = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(botonAgregar);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(productoEjemplo);
  });
});