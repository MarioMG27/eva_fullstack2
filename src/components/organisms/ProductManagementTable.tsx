import React, { useState } from 'react';
import type { Product } from '../../types';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';

interface ProductManagementTableProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: number) => void;
}

export const ProductManagementTable: React.FC<ProductManagementTableProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Fármacos');
  const [imagen, setImagen] = useState('doguivit.png');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    onAddProduct({
      nombre,
      precio: Number(precio),
      categoria,
      imagen,
      oferta: false,
    });

    setNombre('');
    setPrecio('');
    setImagen('doguivit.png');
    setShowForm(false);
  };

  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">Gestión de Catálogo de Productos</h4>
        <Button
          variant={showForm ? 'outline-secondary' : 'primary'}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Agregar Nuevo Producto'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-light p-3 rounded mb-4">
          <h5 className="fw-bold mb-3 fs-6">Nuevo Producto</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <FormField
                label="Nombre del Producto"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <FormField
                label="Precio ($)"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Categoría</label>
              <select
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Fármacos">Fármacos</option>
                <option value="Suplementos">Suplementos</option>
                <option value="Homeopatía">Homeopatía</option>
                <option value="Condroprotectores">Condroprotectores</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">Imagen</label>
              <select
                className="form-select"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              >
                <option value="doguivit.png">Doguivit</option>
                <option value="doguivit_adulto.png">Doguivit Adulto</option>
                <option value="cerenia.jpg">Cerenia</option>
                <option value="engystol.png">Engystol</option>
                <option value="stride_advanced.png">Stride</option>
                <option value="vetgastril.png">Vetgastril</option>
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-3">
              <Button type="submit" variant="success" className="w-100">
                Guardar
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th className="text-end">Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={`/img/${prod.imagen}`}
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
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDeleteProduct(prod.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};