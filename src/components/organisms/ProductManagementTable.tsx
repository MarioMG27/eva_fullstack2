import React, { useState } from 'react';
import type { Product } from '../../types';
import { Button } from '../atoms/Button';
import { FormularioProducto } from './FormularioProducto';

interface ProductManagementTableProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
}

export const ProductManagementTable: React.FC<ProductManagementTableProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState<Product | null>(null);

  const handleAbrirCrear = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (prod: Product) => {
    setProductoAEditar(prod);
    setModalAbierto(true);
  };

  const handleGuardar = (prod: Product) => {
    if (productoAEditar) {
      onUpdateProduct(prod);
    } else {
      onAddProduct(prod);
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">📦 Gestión de Catálogo de Productos</h4>
        <Button variant="success" onClick={handleAbrirCrear}>
          🛍️ + Agregar Nuevo Producto
        </Button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>#{prod.id}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={prod.imagen.startsWith('/') ? prod.imagen : `/img/${prod.imagen}`}
                      alt={prod.nombre}
                      style={{ width: '35px', height: '35px', objectFit: 'contain' }}
                    />
                    <span className="fw-semibold">{prod.nombre}</span>
                  </div>
                </td>
                <td>
                  <span className="badge bg-secondary">{prod.categoria}</span>
                </td>
                <td className="fw-bold text-primary">
                  ${prod.precio.toLocaleString('es-CL')}
                </td>
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => handleAbrirEditar(prod)}>
                      ✏️ Editar
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => onDeleteProduct(prod.id)}>
                      🗑️ Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <FormularioProducto
          productoAEditar={productoAEditar}
          onGuardar={handleGuardar}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </div>
  );
};