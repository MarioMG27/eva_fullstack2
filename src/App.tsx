import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { User, CartItem, Product } from './types';
import { authService, cartService } from './services/authService';

// Layout y Componentes
import { PublicLayout } from './components/templates/PublicLayout';
import { ProtectedRoute } from './components/atoms/ProtectedRoute';

// Vistas / Páginas
import { HomePage } from './components/pages/HomePage';
import { StorePage } from './components/pages/StorePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { CartPage } from './components/pages/CartPage';
import { LoginPage } from './components/pages/LoginPage';
import { AdminPage } from './components/pages/AdminPage';
import { RecepcionistaPage } from './components/pages/RecepcionistaPage';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);

      const currentCart = cartService.getCart();
      setCart(currentCart);
    } catch (e) {
      console.error("Error al cargar datos iniciales:", e);
    }
  }, []);

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      let newCart: CartItem[];

      if (existingIndex > -1) {
        newCart = [...prevCart];
        newCart[existingIndex].cantidad += 1;
      } else {
        newCart = [...prevCart, { product, cantidad: 1 }];
      }

      cartService.saveCart(newCart);
      return newCart;
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.product.id === productId ? { ...item, cantidad: newQuantity } : item
      );
      cartService.saveCart(newCart);
      return newCart;
    });
  };

  const handleRemoveItem = (productId: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.product.id !== productId);
      cartService.saveCart(newCart);
      return newCart;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    cartService.clearCart();
  };

  const totalCartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout
              cartCount={totalCartCount}
              user={user}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="tienda" element={<StorePage onAddToCart={handleAddToCart} />} />
          <Route path="servicios" element={<ServicesPage />} />
          <Route
            path="carrito"
            element={
              <CartPage
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
              />
            }
          />
          <Route path="login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

          <Route
            path="admin"
            element={
              <ProtectedRoute user={user} allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="recepcionista"
            element={
              <ProtectedRoute user={user} allowedRoles={['recepcionista', 'admin']}>
                <RecepcionistaPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;