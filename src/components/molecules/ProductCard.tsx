import React from 'react';
import type { Product } from '../../types';
import { Button } from '../atoms/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { nombre, precio, imagen, oferta, categoria } = product;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative text-center p-3 bg-light rounded-top">
        {oferta && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1">
            ¡Oferta!
          </span>
        )}
        <img
          src={`/img/${imagen}`}
          alt={nombre}
          className="img-fluid"
          style={{ maxHeight: '160px', objectFit: 'contain' }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <span className="text-muted small text-uppercase fw-semibold">{categoria}</span>
        <h5 className="card-title mt-1 fs-6 text-truncate" title={nombre}>{nombre}</h5>
        <p className="card-text fw-bold fs-5 text-primary my-2">
          ${precio.toLocaleString('es-CL')}
        </p>
        <Button variant="success" className="mt-auto w-100" onClick={() => onAddToCart(product)}>
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};