import React, { useState } from 'react';
import { TablaRecepcion } from '../organisms/TablaRecepcion';
import { BuscadorPacientes } from '../organisms/BuscadorPacientes';
import { TablaCitasRecepcion } from '../organisms/TablaCitasRecepcion';

export const RecepcionistaPage: React.FC = () => {
  const [pestaña, setPestaña] = useState<'clientes' | 'pacientes' | 'citas'>('clientes');

  return (
    <div className="py-3">
      <div className="bg-info text-dark p-4 rounded mb-4 shadow-sm d-flex align-items-center justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">📋 Panel de Control Recepción</h2>
          <p className="mb-0">
            Administración de clientes, fichas veterinarias y agendamiento de citas.
          </p>
        </div>
        <span className="badge bg-dark text-white px-3 py-2 fs-6">Rol Recepcionista</span>
      </div>

      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${
              pestaña === 'clientes' ? 'active text-primary' : 'text-secondary'
            }`}
            onClick={() => setPestaña('clientes')}
          >
            👥 Gestión de Clientes y Cuentas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${
              pestaña === 'citas' ? 'active text-primary' : 'text-secondary'
            }`}
            onClick={() => setPestaña('citas')}
          >
            🗓️ Control de Citas y Agendamiento
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${
              pestaña === 'pacientes' ? 'active text-primary' : 'text-secondary'
            }`}
            onClick={() => setPestaña('pacientes')}
          >
            🔍 Buscar Pacientes / Fichas Médicas
          </button>
        </li>
      </ul>

      {pestaña === 'clientes' && (
        <div className="card shadow-sm border-0 p-4">
          <TablaRecepcion />
        </div>
      )}

      {pestaña === 'citas' && (
        <div className="card shadow-sm border-0 p-4">
          <TablaCitasRecepcion />
        </div>
      )}

      {pestaña === 'pacientes' && (
        <div className="card shadow-sm border-0 p-4">
          <BuscadorPacientes />
        </div>
      )}
    </div>
  );
};