import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row gy-3">
          {/* Información de la Veterinaria */}
          <div className="col-md-4">
            <h5 className="fw-bold text-white mb-2">PetShop & Veterinaria</h5>
            <p className="small text-muted mb-0">
              Atención veterinaria integral y venta de fármacos, alimentos y accesorios especializados para la salud de tu mascota.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="col-md-4">
            <h6 className="fw-bold text-white mb-2">Enlaces de Interés</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/tienda" className="text-decoration-none text-muted">Catálogo de Productos</Link></li>
              <li><Link to="/servicios" className="text-decoration-none text-muted">Servicios Médicos</Link></li>
              <li><Link to="/nosotros" className="text-decoration-none text-muted">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="text-decoration-none text-muted">Ubicación y Contacto</Link></li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="col-md-4">
            <h6 className="fw-bold text-white mb-2">Atención al Cliente</h6>
            <p className="small text-muted mb-1">📍 Av. Principal #1234, Santiago</p>
            <p className="small text-muted mb-1">📞 +56 9 1234 5678</p>
            <p className="small text-muted mb-0">✉️ contacto@veterinaria.cl</p>
          </div>
        </div>

        <hr className="my-3 border-secondary" />

        <div className="text-center small text-muted">
          &copy; {new Date().getFullYear()} PetShop Veterinaria. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};