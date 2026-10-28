import React, { useState, useEffect } from 'react';
import { UserManagementTable } from '../organisms/UserManagementTable';
import { ProductManagementTable } from '../organisms/ProductManagementTable';
import { productService } from '../../services/productService';
import type { Product } from '../../types';

export const AdminPage: React.FC = () => {
  const [pestaña, setPestaña] = useState<'usuarios' | 'productos'>('usuarios');
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    setProductos(productService.getProducts());
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    const created = productService.saveProduct(newProduct);
    setProductos((prev) => [...prev, created]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    productService.updateProduct(updatedProduct.id, updatedProduct);
    setProductos((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este producto del catálogo?')) {
      productService.deleteProduct(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="py-3">
      {/* Encabezado Panel Admin */}
      <div className="bg-warning text-dark p-4 rounded mb-4 shadow-sm d-flex align-items-center justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">🔑 Panel General de Administración</h2>
          <p className="mb-0">Gestión global de usuarios, roles de acceso y catálogo de productos.</p>
        </div>
        <span className="badge bg-dark text-white px-3 py-2 fs-6">Rol Administrador</span>
      </div>

      {/* Pestañas de Navegación */}
      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${pestaña === 'usuarios' ? 'active text-dark' : 'text-secondary'}`}
            onClick={() => setPestaña('usuarios')}
          >
            👥 Gestión de Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${pestaña === 'productos' ? 'active text-dark' : 'text-secondary'}`}
            onClick={() => setPestaña('productos')}
          >
            🛍️ Catálogo de Productos ({productos.length})
          </button>
        </li>
      </ul>

      {/* SECCIÓN 1: GESTIÓN DE USUARIOS */}
      {pestaña === 'usuarios' && <UserManagementTable />}

      {/* SECCIÓN 2: GESTIÓN DE PRODUCTOS */}
      {pestaña === 'productos' && (
        <ProductManagementTable
          products={productos}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
};