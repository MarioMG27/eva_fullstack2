import React, { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import type { Product } from '../../types';

interface FormularioProductoProps {
  productoAEditar?: Product | null;
  onGuardar: (producto: Product) => void;
  onCerrar: () => void;
}

export const FormularioProducto: React.FC<FormularioProductoProps> = ({
  productoAEditar,
  onGuardar,
  onCerrar,
}) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Alimentos');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre);
      setPrecio(String(productoAEditar.precio));
      setCategoria(productoAEditar.categoria);
      setImagen(productoAEditar.imagen);
      setDescripcion(productoAEditar.descripcion || '');
    }
  }, [productoAEditar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    const producto: Product = {
      id: productoAEditar ? productoAEditar.id : Date.now(),
      nombre,
      precio: Number(precio),
      categoria,
      imagen: imagen || '/img/doguivit.png',
      descripcion,
    };

    onGuardar(producto);
    onCerrar();
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">
              {productoAEditar ? '✏️ Editar Producto' : '🛍️ Agregar Nuevo Producto'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onCerrar}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <FormField
                label="Nombre del Producto"
                type="text"
                placeholder="Ej: Alimento Premium Perro 15kg"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <FormField
                label="Precio ($)"
                type="number"
                placeholder="25000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
              <div className="mb-3">
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
                  <option value="Alimentos">Alimentos</option>
                </select>
              </div>
              <FormField
                label="Nombre o Ruta de Imagen"
                type="text"
                placeholder="doguivit.png"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
              <div className="mb-3">
                <label className="form-label fw-bold">Descripción</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={onCerrar}>
                Cancelar
              </Button>
              <Button type="submit" variant="success">
                Guardar Producto
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};