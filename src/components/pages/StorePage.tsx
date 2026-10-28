import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product, CartItem } from '../../types';
import { productService } from '../../services/productService';
import { ProductGrid } from '../organisms/ProductGrid';
import { Button } from '../atoms/Button';

interface StorePageProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [mostrarCarritoLateral, setMostrarCarritoLateral] = useState(false);

  useEffect(() => {
    setProducts(productService.getProducts());
  }, []);

  // Al agregar un producto, ejecutamos la función de añadir y desplegamos el panel derecho
  const handleAgregarYMostrar = (product: Product) => {
    onAddToCart(product);
    setMostrarCarritoLateral(true);
  };

  const total = cart.reduce((acc, item) => acc + item.product.precio * item.cantidad, 0);
  const totalCantidad = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="py-2 position-relative">
      {/* Encabezado y resumen del carrito */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Catálogo de Productos</h2>
          <p className="text-muted mb-0">Encuentra fármacos, suplementos y alimentos para tus mascotas.</p>
        </div>
        <Button
          variant="outline-secondary"
          onClick={() => setMostrarCarritoLateral(!mostrarCarritoLateral)}
          className="position-relative"
          >       
          🛒 Carrito Lateral
          {totalCantidad > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalCantidad}
          </span>
          )}
        </Button>
      </div>

      {/* Grilla de Productos */}
      <ProductGrid products={products} onAddToCart={handleAgregarYMostrar} />

      {/* OVERLAY / FONDO OSCURO SI EL PANEL ESTÁ ABIERTO */}
      {mostrarCarritoLateral && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1040 }}
          onClick={() => setMostrarCarritoLateral(false)}
        />
      )}

      {/* APARTADO LATERAL DERECHO (DRAWER / OFFCANVAS CARRITO) */}
      <div
        className={`position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column transition-all`}
        style={{
          width: '380px',
          maxWidth: '90vw',
          zIndex: 1050,
          transform: mostrarCarritoLateral ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Cabecera del Panel */}
        <div className="p-3 bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">🛒 Mi Carrito ({totalCantidad})</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setMostrarCarritoLateral(false)}
          />
        </div>

        {/* Lista de Ítems Agregados */}
        <div className="flex-grow-1 p-3 overflow-auto">
          {cart.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div className="fs-1 mb-2">📦</div>
              <p className="mb-0 fw-semibold">Tu carrito está vacío.</p>
              <small>Agrega productos para verlos aquí.</small>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="d-flex align-items-center gap-2 p-2 border rounded bg-light"
                >
                  <img
                    src={
                      item.product.imagen.startsWith('/')
                        ? item.product.imagen
                        : `/img/${item.product.imagen}`
                    }
                    alt={item.product.nombre}
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                  <div className="flex-grow-1 min-w-0">
                    <h6 className="mb-0 text-truncate small fw-bold">{item.product.nombre}</h6>
                    <span className="text-primary fw-semibold small">
                      ${item.product.precio.toLocaleString('es-CL')}
                    </span>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        style={{ padding: '0px 6px', fontSize: '12px' }}
                        onClick={() => onUpdateQuantity(item.product.id, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                      >
                        -
                      </Button>
                      <span className="small fw-bold">{item.cantidad}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        style={{ padding: '0px 6px', fontSize: '12px' }}
                        onClick={() => onUpdateQuantity(item.product.id, item.cantidad + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-dark small">
                      ${(item.product.precio * item.cantidad).toLocaleString('es-CL')}
                    </div>
                    <button
                      className="btn btn-sm text-danger p-0 border-0 mt-1"
                      onClick={() => onRemoveItem(item.product.id)}
                      title="Quitar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pie con Total y Botón Ver Carrito Completo */}
        {cart.length > 0 && (
          <div className="p-3 border-top bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold text-secondary">Subtotal:</span>
              <span className="fs-5 fw-bold text-primary">
                ${total.toLocaleString('es-CL')}
              </span>
            </div>
            <Button
              variant="success"
              className="w-100 fw-bold mb-2"
              onClick={() => {
                setMostrarCarritoLateral(false);
                navigate('/carrito');
              }}
            >
              Ir a Pagar / Ver Carrito
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};