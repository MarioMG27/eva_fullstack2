import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '../../types';
import { CartRowItem } from '../molecules/CartRowItem';
import { Button } from '../atoms/Button';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const navigate = useNavigate();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.product.precio * item.cantidad,
    0
  );

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    onClearCart();
  };

  if (checkoutSuccess) {
    return (
      <div className="text-center py-5 my-4">
        <div className="display-1 text-success mb-3">🎉</div>
        <h2 className="fw-bold text-success mb-2">¡Compra Realizada con Éxito!</h2>
        <p className="text-muted mb-4">
          Gracias por tu pedido. Hemos procesado tu solicitud correctamente.
        </p>
        <Button variant="primary" onClick={() => navigate('/tienda')}>
          Volver a la Tienda
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-5 my-4">
        <div className="display-3 text-muted mb-3">🛒</div>
        <h3 className="fw-bold text-secondary mb-2">Tu carrito está vacío</h3>
        <p className="text-muted mb-4">
          Parece que aún no has agregado ningún producto a tu carrito de compras.
        </p>
        <Link to="/tienda" className="btn btn-primary">
          Ir a Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-0">Mi Carrito de Compras</h2>
        <Button variant="outline-danger" size="sm" onClick={onClearCart}>
          Vaciar Carrito
        </Button>
      </div>

      <div className="row g-4">
        {/* Tabla de Productos */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th className="text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <CartRowItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemoveItem={onRemoveItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Resumen de Compra */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 bg-light p-3">
            <h5 className="fw-bold mb-3">Resumen del Pedido</h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">${total.toLocaleString('es-CL')}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Envío</span>
              <span className="text-success fw-semibold">Gratis</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <strong className="fs-5">Total</strong>
              <strong className="fs-5 text-primary">
                ${total.toLocaleString('es-CL')}
              </strong>
            </div>

            <Button
              variant="success"
              className="w-100 py-2 fs-6 fw-bold"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </Button>

            <Link
              to="/tienda"
              className="btn btn-link text-decoration-none text-center mt-2 text-muted small"
            >
              ← Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};