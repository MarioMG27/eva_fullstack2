import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../molecules/ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="alert alert-info text-center my-4 py-4" role="alert">
        <h5 className="alert-heading fw-bold">No se encontraron productos</h5>
        <p className="mb-0">Intenta cambiar los términos de búsqueda o seleccionar otra categoría.</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
};