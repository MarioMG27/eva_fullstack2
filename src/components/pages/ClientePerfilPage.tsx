import React, { useState } from 'react';
import { Button } from '../atoms/Button';

interface Appointment {
  id: number;
  servicio: string;
  paciente: string;
  fecha: string;
  hora: string;
  estado: 'Pendiente' | 'Atendido' | 'Cancelado';
}

interface PetRecord {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  vacunas: { nombre: string; fecha: string; estado: 'Al día' | 'Pendiente' }[];
}

interface PurchaseHistory {
  id: string;
  fecha: string;
  total: number;
  items: string[];
  estado: 'Entregado' | 'En proceso';
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 101, servicio: 'Consulta Médica General', paciente: 'Max', fecha: '2026-10-30', hora: '10:00', estado: 'Pendiente' },
  { id: 102, servicio: 'Vacunación y Desparasitación', paciente: 'Luna', fecha: '2026-11-05', hora: '15:30', estado: 'Pendiente' },
  { id: 103, servicio: 'Peluquería y Estética', paciente: 'Max', fecha: '2026-09-15', hora: '11:00', estado: 'Atendido' },
];

const PETS: PetRecord[] = [
  {
    id: 1,
    nombre: 'Max',
    especie: 'Canino',
    raza: 'Beagle',
    edad: '3 años',
    vacunas: [
      { nombre: 'Octuple', fecha: '2026-03-10', estado: 'Al día' },
      { nombre: 'Antirrábica', fecha: '2026-03-10', estado: 'Al día' },
      { nombre: 'KC (Tos de las perreras)', fecha: '2025-11-01', estado: 'Pendiente' },
    ],
  },
  {
    id: 2,
    nombre: 'Luna',
    especie: 'Felino',
    raza: 'Siamés',
    edad: '2 años',
    vacunas: [
      { nombre: 'Triple Felina', fecha: '2026-01-20', estado: 'Al día' },
      { nombre: 'Leucemia Felina', fecha: '2026-01-20', estado: 'Al día' },
    ],
  },
];

const PURCHASES: PurchaseHistory[] = [
  {
    id: 'ORD-8921',
    fecha: '2026-10-20',
    total: 28480,
    items: ['Doguivit Adulto 60 Comprimidos x1', 'Engystol Gotas 30ml x1'],
    estado: 'Entregado',
  },
  {
    id: 'ORD-7412',
    fecha: '2026-09-02',
    total: 18500,
    items: ['Cerenia 16mg Antihemético x1'],
    estado: 'Entregado',
  },
];

export const ClientePerfilPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [activeTab, setActiveTab] = useState<'citas' | 'mascotas' | 'compras'>('citas');

  const handleCancelAppointment = (id: number) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, estado: 'Cancelado' } : app))
    );
  };

  return (
    <div className="py-3">
      {/* Encabezado del Perfil */}
      <div className="bg-dark text-white p-4 rounded mb-4 shadow-sm d-flex align-items-center justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">👤 Mi Perfil de Cliente</h2>
          <p className="mb-0 text-muted">Gestión de citas médicas, fichas de mascotas e historial de compras.</p>
        </div>
        <span className="badge bg-primary px-3 py-2">Cliente Registrado</span>
      </div>

      {/* Pestañas de Navegación del Perfil */}
      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'citas' ? 'active text-primary' : 'text-secondary'}`}
            onClick={() => setActiveTab('citas')}
          >
            📅 Mis Horas Agendadas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'mascotas' ? 'active text-primary' : 'text-secondary'}`}
            onClick={() => setActiveTab('mascotas')}
          >
            🐾 Ficha de Mascotas y Vacunas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'compras' ? 'active text-primary' : 'text-secondary'}`}
            onClick={() => setActiveTab('compras')}
          >
            🛍️ Historial de Compras
          </button>
        </li>
      </ul>

      {/* Seccion 1: Citas y Horas Agendadas */}
      {activeTab === 'citas' && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold mb-3">Mis Citas Médicas</h4>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Servicio</th>
                  <th>Mascota</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th className="text-end">Acción</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id}>
                    <td className="fw-semibold">{app.servicio}</td>
                    <td>{app.paciente}</td>
                    <td>{app.fecha}</td>
                    <td>{app.hora} hrs</td>
                    <td>
                      <span
                        className={`badge ${
                          app.estado === 'Atendido'
                            ? 'bg-success'
                            : app.estado === 'Cancelado'
                            ? 'bg-danger'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {app.estado}
                      </span>
                    </td>
                    <td className="text-end">
                      {app.estado === 'Pendiente' ? (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleCancelAppointment(app.id)}
                        >
                          Cancelar Hora
                        </Button>
                      ) : (
                        <span className="text-muted small">Sin acciones</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Seccion 2: Fichas de Mascotas y Estado de Vacunas */}
      {activeTab === 'mascotas' && (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {PETS.map((pet) => (
            <div key={pet.id} className="col">
              <div className="card shadow-sm border-0 p-4 bg-light h-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="fs-1">🐶</span>
                  <div>
                    <h4 className="fw-bold mb-0 text-dark">{pet.nombre}</h4>
                    <p className="text-muted small mb-0">{pet.especie} • {pet.raza} ({pet.edad})</p>
                  </div>
                </div>

                <h6 className="fw-bold text-primary mt-2 mb-2">Esquema de Vacunación:</h6>
                <ul className="list-group list-group-flush rounded shadow-sm">
                  {pet.vacunas.map((vac, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{vac.nombre}</strong>
                        <div className="text-muted small">Última dosis: {vac.fecha}</div>
                      </div>
                      <span className={`badge ${vac.estado === 'Al día' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {vac.estado}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Seccion 3: Historial de Compras */}
      {activeTab === 'compras' && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold mb-3">Historial de Compras de Productos</h4>
          <div className="d-flex flex-column gap-3">
            {PURCHASES.map((ord) => (
              <div key={ord.id} className="border p-3 rounded bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="fw-bold text-primary">{ord.id}</span>
                    <span className="text-muted small">• {ord.fecha}</span>
                    <span className="badge bg-success">{ord.estado}</span>
                  </div>
                  <div className="small text-secondary">
                    {ord.items.join(', ')}
                  </div>
                </div>
                <div className="fw-bold fs-5 text-dark mt-2 mt-md-0">
                  ${ord.total.toLocaleString('es-CL')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};