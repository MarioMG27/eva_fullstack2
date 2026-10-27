import React from 'react';

export const NosotrosPage: React.FC = () => {
  return (
    <div className="py-4">
      {/* Encabezado Principal */}
      <div className="bg-primary text-white p-5 rounded shadow-sm text-center mb-5">
        <h1 className="fw-bold display-5 mb-2">Sobre PetShop & Veterinaria</h1>
        <p className="lead mb-0">
          Cuidando la salud y el bienestar de tus compañeros del hogar con amor, compromiso y profesionalismo.
        </p>
      </div>

      {/* Historia y Misión */}
      <div className="row g-4 mb-5 align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold text-dark mb-3">Nuestra Historia</h3>
          <p className="text-muted">
            Fundada en 2018, PetShop Veterinaria nació con el propósito de entregar una atención médica integral de primer nivel para mascotas, combinando clínica especializada con un catálogo de productos y fármacos certificados.
          </p>
          <p className="text-muted">
            A lo largo de los años hemos atendido a miles de pacientes, brindando un servicio empático y adaptado a las necesidades de cada familia.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/img/logo.jpg"
            alt="Nosotros PetShop"
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '280px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Misión, Visión y Valores */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5 text-center">
        <div className="col">
          <div className="card h-100 border-0 shadow-sm p-3 bg-light">
            <div className="card-body">
              <div className="fs-1 text-primary mb-2">🎯</div>
              <h5 className="fw-bold">Misión</h5>
              <p className="text-muted small mb-0">
                Ofrecer servicios veterinarios de excelencia y productos farmacológicos preventivos de la más alta calidad.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm p-3 bg-light">
            <div className="card-body">
              <div className="fs-1 text-primary mb-2">👁️</div>
              <h5 className="fw-bold">Visión</h5>
              <p className="text-muted small mb-0">
                Ser la clínica y tienda veterinaria referente en la región, reconocida por la calidad médica y humana de nuestro equipo.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm p-3 bg-light">
            <div className="card-body">
              <div className="fs-1 text-primary mb-2">❤️</div>
              <h5 className="fw-bold">Valores</h5>
              <p className="text-muted small mb-0">
                Empatía, ética médica, transparencia y dedicación constante por la salud animal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};