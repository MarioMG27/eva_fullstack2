import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import { productService } from '../../services/productService';
import { ProductManagementTable } from '../organisms/ProductManagementTable';

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productService.getProducts());
  }, []);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const created = productService.saveProduct(newProduct);
    setProducts((prev) => [...prev, created]);
  };

  const handleDeleteProduct = (id: number) => {
    productService.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="py-2">
      <div className="bg-dark text-white p-4 rounded mb-4 shadow-sm">
        <h2 className="fw-bold mb-1">🔑 Panel de Administración Global</h2>
        <p className="mb-0 text-muted">
          Gestión centralizada del inventario y estado general de la veterinaria.
        </p>
      </div>

      <ProductManagementTable
        products={products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};