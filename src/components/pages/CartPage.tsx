import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '../../types';
import { CartRowItem } from '../molecules/CartRowItem';
import { Button } from '../atoms/Button';
import { authService } from '../../services/authService';

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
  const user = authService.getCurrentUser();

  const total = cart.reduce(
    (acc, item) => acc + item.product.precio * item.cantidad,
    0
  );

  const handleCheckout = () => {
    // Si NO hay usuario con sesión iniciada, redirigir a Login guardando la intención de compra
    if (!user) {
      navigate('/login', { state: { fromCart: true } });
      return;
    }

    // Registrar la compra asociada al usuario autenticado en localStorage
    const nuevaOrden = {
      id: Date.now(),
      usuarioEmail: user.email,
      usuarioNombre: user.nombre,
      items: cart,
      total,
      fecha: new Date().toLocaleDateString('es-CL'),
    };

    const ordenesAnteriores = JSON.parse(
      localStorage.getItem('petshop_user_orders') || '[]'
    );
    localStorage.setItem(
      'petshop_user_orders',
      JSON.stringify([nuevaOrden, ...ordenesAnteriores])
    );

    setCheckoutSuccess(true);
    onClearCart();
  };

  if (checkoutSuccess) {
    return (
      <div className="text-center py-5 my-4">
        <div className="display-1 text-success mb-3">🎉</div>
        <h2 className="fw-bold text-success mb-2">¡Compra Realizada con Éxito!</h2>
        <p className="text-muted mb-4">
          Gracias por tu pedido, <strong>{user?.nombre}</strong>. Hemos vinculado tu compra a tu cuenta ({user?.email}).
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary" onClick={() => navigate('/tienda')}>
            Volver a la Tienda
          </Button>
          <Button variant="success" onClick={() => navigate('/perfil', { state: { tab: 'compras' } })}>
            Ver Mi Historial
          </Button>
        </div>
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

      {!user && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between mb-4 shadow-sm" role="alert">
          <div>
            <strong>🔒 Inicio de sesión requerido para comprar:</strong> Debes estar identificado con tu cuenta para procesar tu pedido.
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/login', { state: { fromCart: true } })}>
            🔑 Iniciar Sesión
          </Button>
        </div>
      )}

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
              {user ? 'Finalizar Compra' : 'Iniciar Sesión para Pagar'}
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