import React, { useState } from 'react';
import { TablaRecepcion } from '../organisms/TablaRecepcion';
import { BuscadorPacientes } from '../organisms/BuscadorPacientes';
import { TablaCitasRecepcion } from '../organisms/TablaCitasRecepcion';

export const VeterinarioPage: React.FC = () => {
  const [pestaña, setPestaña] = useState<'pacientes' | 'citas' | 'clientes'>('pacientes');

  return (
    <div className="py-3">
      <div className="bg-primary text-white p-4 rounded mb-4 shadow-sm d-flex align-items-center justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">🩺 Panel Médico Veterinario</h2>
          <p className="mb-0">
            Atención clínica, diagnóstico, prescripción de recetas y gestión de pacientes.
          </p>
        </div>
        <span className="badge bg-light text-primary px-3 py-2 fs-6">Rol Veterinario</span>
      </div>

      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${
              pestaña === 'pacientes' ? 'active text-primary' : 'text-secondary'
            }`}
            onClick={() => setPestaña('pacientes')}
          >
            🔍 Fichas Médicas y Pacientes (Diagnóstico/Receta)
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${
              pestaña === 'citas' ? 'active text-primary' : 'text-secondary'
            }`}
            onClick={() => setPestaña('citas')}
          >
            🗓️ Agenda Médica y Citas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${
              pestaña === 'clientes' ? 'active text-primary' : 'text-secondary'
            }`}
            onClick={() => setPestaña('clientes')}
          >
            👥 Tutores y Clientes
          </button>
        </li>
      </ul>

      {pestaña === 'pacientes' && (
        <div className="card shadow-sm border-0 p-4">
          <BuscadorPacientes esModoVeterinario={true} />
        </div>
      )}

      {pestaña === 'citas' && (
        <div className="card shadow-sm border-0 p-4">
          <TablaCitasRecepcion />
        </div>
      )}

      {pestaña === 'clientes' && (
        <div className="card shadow-sm border-0 p-4">
          <TablaRecepcion permitirCrearCliente={false} />
        </div>
      )}
    </div>
  );
};