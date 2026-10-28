import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../../types';
import { Button } from '../atoms/Button';

interface NavbarProps {
  cartCount: number;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        {/* Logo de la Veterinaria / Tienda */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img 
            src="/img/logo.jpg" 
            alt="Logo Veterinaria" 
            height="40" 
            className="rounded" 
          />
          <span className="fw-bold">PetShop Veterinaria</span>
        </Link>

        {/* Botón responsive para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de Navegación */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tienda">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>

            {/* Accesos especiales según rol del usuario */}
            {(user?.rol === 'cliente' || user?.rol === 'admin') && (
              <li className="nav-item">
                <Link className="nav-link text-success fw-bold" to="/perfil">Mi Perfil</Link>
              </li>
            )}
            {user?.rol === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin">Panel Admin</Link>
              </li>
            )}
            {user?.rol === 'recepcionista' && (
              <li className="nav-item">
                <Link className="nav-link text-info fw-bold" to="/recepcionista">Panel Recepción</Link>
              </li>
            )}
            {(user?.rol === 'veterinario' || user?.rol === 'admin') && (
              <li className="nav-item">
                <Link className="nav-link text-primary fw-bold" to="/veterinario">Panel Veterinario</Link>
              </li>
            )}
          </ul>

          {/* Área de usuario y Carrito */}
          <div className="d-flex align-items-center gap-3">
            {/* Carrito de Compras */}
            <Link to="/carrito" className="btn btn-outline-light position-relative">
              🛒 Carrito
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Iniciar / Cerrar Sesión */}
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-light small d-none d-md-inline">
                  Hola, <strong>{user.nombre}</strong>
                </span>
                <Button variant="danger" size="sm" onClick={onLogout}>
                  Salir
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};