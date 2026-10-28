import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { Button } from '../atoms/Button';
import { FichaMascota, type RegistroMascota } from '../organisms/FichaMascota';
import { TablaHorasAgendadas, type Cita } from '../organisms/TablaHorasAgendadas';
import { HistorialComprasTabla, type CompraHistorial } from '../organisms/HistorialComprasTabla';
import { FormularioAgregarMascota } from '../organisms/FormularioAgregarMascota';

const DEFAULT_CITAS: Cita[] = [
  { id: 101, servicio: 'Consulta Médica General', paciente: 'Max', fecha: '2026-10-30', hora: '10:00', estado: 'Pendiente' },
  { id: 102, servicio: 'Vacunación y Desparasitación', paciente: 'Luna', fecha: '2026-11-05', hora: '15:30', estado: 'Pendiente' },
];

const DEFAULT_MASCOTAS: RegistroMascota[] = [
  {
    id: 1,
    nombre: 'Max',
    especie: 'Canino',
    raza: 'Beagle',
    edad: '3 años',
    vacunas: [
      { nombre: 'Óctuple Canina', fecha: '2026-03-10', estado: 'Al día' },
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

const DEFAULT_COMPRAS: CompraHistorial[] = [
  {
    id: 'ORD-8921',
    fecha: '2026-10-20',
    total: 28480,
    items: ['Doguivit Adulto 60 Comprimidos x1', 'Engystol Gotas 30ml x1'],
    estado: 'Entregado',
  },
];

export const ClientePerfilPage: React.FC = () => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [citas, setCitas] = useState<Cita[]>([]);
  const [mascotas, setMascotas] = useState<RegistroMascota[]>([]);
  const [compras, setCompras] = useState<CompraHistorial[]>([]);
  const [pestanaActiva, setPestanaActiva] = useState<'citas' | 'mascotas' | 'compras'>('citas');
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());

    const savedCitas = localStorage.getItem('petshop_user_appointments');
    if (savedCitas) {
      setCitas(JSON.parse(savedCitas));
    } else {
      localStorage.setItem('petshop_user_appointments', JSON.stringify(DEFAULT_CITAS));
      setCitas(DEFAULT_CITAS);
    }

    const savedMascotas = localStorage.getItem('petshop_user_pets');
    if (savedMascotas) {
      setMascotas(JSON.parse(savedMascotas));
    } else {
      localStorage.setItem('petshop_user_pets', JSON.stringify(DEFAULT_MASCOTAS));
      setMascotas(DEFAULT_MASCOTAS);
    }

    const savedCompras = localStorage.getItem('petshop_user_purchases');
    if (savedCompras) {
      setCompras(JSON.parse(savedCompras));
    } else {
      localStorage.setItem('petshop_user_purchases', JSON.stringify(DEFAULT_COMPRAS));
      setCompras(DEFAULT_COMPRAS);
    }
  }, []);

  const handleCancelarCita = (id: number) => {
    const actualizadas = citas.map((c) =>
      c.id === id ? { ...c, estado: 'Cancelado' as const } : c
    );
    setCitas(actualizadas);
    localStorage.setItem('petshop_user_appointments', JSON.stringify(actualizadas));
  };

  const handleConfirmarCita = (id: number) => {
    const actualizadas = citas.map((c) =>
      c.id === id ? { ...c, estado: 'Confirmado' as const } : c
    );
    setCitas(actualizadas);
    localStorage.setItem('petshop_user_appointments', JSON.stringify(actualizadas));
  };

  const handleAgregarMascota = (nuevaMascota: RegistroMascota) => {
    const actualizadas = [...mascotas, nuevaMascota];
    setMascotas(actualizadas);
    localStorage.setItem('petshop_user_pets', JSON.stringify(actualizadas));
  };

  return (
    <div className="py-3">
      <div className="bg-dark text-white p-4 rounded mb-4 shadow-sm d-flex align-items-center justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">👤 Mi Perfil de Cliente</h2>
          <p className="mb-0 text-muted">
            Bienvenido, <strong>{user?.nombre || 'Cliente Registrado'}</strong> ({user?.email || 'cliente@gmail.com'})
          </p>
        </div>
        <span className="badge bg-success px-3 py-2 fs-6">Cliente Activo</span>
      </div>

      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${pestanaActiva === 'citas' ? 'active text-primary' : 'text-secondary'}`}
            onClick={() => setPestanaActiva('citas')}
          >
            📅 Mis Horas Agendadas ({citas.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${pestanaActiva === 'mascotas' ? 'active text-primary' : 'text-secondary'}`}
            onClick={() => setPestanaActiva('mascotas')}
          >
            🐾 Ficha de Mascotas y Vacunas ({mascotas.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${pestanaActiva === 'compras' ? 'active text-primary' : 'text-secondary'}`}
            onClick={() => setPestanaActiva('compras')}
          >
            🛍️ Historial de Compras ({compras.length})
          </button>
        </li>
      </ul>

      {pestanaActiva === 'citas' && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold mb-3">Mis Citas Médicas</h4>
          <TablaHorasAgendadas
            citas={citas}
            onCancelarCita={handleCancelarCita}
            onConfirmarCita={handleConfirmarCita}
          />
        </div>
      )}

      {pestanaActiva === 'mascotas' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Mis Mascotas Registradas</h4>
            <Button
              variant="primary"
              onClick={() => setMostrarModalAgregar(true)}
            >
              ➕ Registrar Nueva Mascota
            </Button>
          </div>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            {mascotas.map((mascota) => (
              <div key={mascota.id} className="col">
                <FichaMascota mascota={mascota} />
              </div>
            ))}
          </div>

          {mostrarModalAgregar && (
            <FormularioAgregarMascota
              onAgregar={handleAgregarMascota}
              onCerrar={() => setMostrarModalAgregar(false)}
            />
          )}
        </div>
      )}

      {pestanaActiva === 'compras' && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold mb-3">Historial de Compras de Productos</h4>
          <HistorialComprasTabla compras={compras} />
        </div>
      )}
    </div>
  );
};