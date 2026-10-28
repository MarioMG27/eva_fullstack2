import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import { TablaHorasAgendadas, type Cita } from '../organisms/TablaHorasAgendadas';
import { FichaMascota, type RegistroMascota } from '../organisms/FichaMascota';
import { HistorialComprasTabla, type CompraHistorial } from '../organisms/HistorialComprasTabla';

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
  const location = useLocation();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [citas, setCitas] = useState<Cita[]>([]);
  const [mascotas, setMascotas] = useState<RegistroMascota[]>([]);
  const [compras, setCompras] = useState<CompraHistorial[]>([]);
  const [tabActiva, setTabActiva] = useState<'horas' | 'mascotas' | 'compras'>('horas');

  useEffect(() => {
    setUser(authService.getCurrentUser());

    // Cargar Citas
    const savedCitas = localStorage.getItem('petshop_user_appointments');
    if (savedCitas) {
      try {
        setCitas(JSON.parse(savedCitas));
      } catch (e) {
        setCitas(DEFAULT_CITAS);
      }
    } else {
      localStorage.setItem('petshop_user_appointments', JSON.stringify(DEFAULT_CITAS));
      setCitas(DEFAULT_CITAS);
    }

    // Cargar Mascotas
    const savedMascotas = localStorage.getItem('petshop_user_pets');
    if (savedMascotas) {
      try {
        setMascotas(JSON.parse(savedMascotas));
      } catch (e) {
        setMascotas(DEFAULT_MASCOTAS);
      }
    } else {
      localStorage.setItem('petshop_user_pets', JSON.stringify(DEFAULT_MASCOTAS));
      setMascotas(DEFAULT_MASCOTAS);
    }

    // Cargar Compras / Órdenes
    const savedOrders = localStorage.getItem('petshop_user_orders');
    if (savedOrders) {
      try {
        const ordenesParsed = JSON.parse(savedOrders);
        const comprasDeOrdenes: CompraHistorial[] = ordenesParsed.map((ord: any) => ({
          id: `ORD-${ord.id.toString().slice(-4)}`,
          fecha: ord.fecha,
          total: ord.total,
          items: ord.items.map((i: any) => `${i.product.nombre} x${i.cantidad}`),
          estado: 'Procesado',
        }));
        setCompras([...comprasDeOrdenes, ...DEFAULT_COMPRAS]);
      } catch (e) {
        setCompras(DEFAULT_COMPRAS);
      }
    } else {
      setCompras(DEFAULT_COMPRAS);
    }

    // Pestaña inicial según la navegación
    const targetTab = (location.state as any)?.tab;
    if (targetTab === 'compras' || targetTab === 'mascotas' || targetTab === 'horas') {
      setTabActiva(targetTab);
    }
  }, [location]);

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

  return (
    <div className="py-3">
      {/* Encabezado del Perfil */}
      <div className="bg-dark text-white p-4 rounded mb-4 shadow-sm d-flex align-items-center justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">👤 Mi Perfil de Tutor</h2>
          <p className="mb-0 text-muted">
            Bienvenido, <strong>{user?.nombre || 'Cliente Registrado'}</strong> ({user?.email || 'cliente@gmail.com'})
          </p>
        </div>
        <span className="badge bg-success px-3 py-2 fs-6">Cliente Activo</span>
      </div>

      {/* Navegación por Pestañas */}
      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${tabActiva === 'horas' ? 'active text-success' : 'text-secondary'}`}
            onClick={() => setTabActiva('horas')}
          >
            📅 Mis Horas Agendadas ({citas.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${tabActiva === 'mascotas' ? 'active text-success' : 'text-secondary'}`}
            onClick={() => setTabActiva('mascotas')}
          >
            🐾 Ficha de Mascotas y Vacunas ({mascotas.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${tabActiva === 'compras' ? 'active text-success' : 'text-secondary'}`}
            onClick={() => setTabActiva('compras')}
          >
            🛍️ Historial de Compras ({compras.length})
          </button>
        </li>
      </ul>

      {/* Contenido según la Pestaña Activa */}
      {tabActiva === 'horas' && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold mb-3">Mis Citas Médicas</h4>
          <TablaHorasAgendadas
            citas={citas}
            onCancelarCita={handleCancelarCita}
            onConfirmarCita={handleConfirmarCita}
          />
        </div>
      )}

      {tabActiva === 'mascotas' && (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="col">
              <FichaMascota mascota={mascota} />
            </div>
          ))}
        </div>
      )}

      {tabActiva === 'compras' && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold mb-3">Historial de Compras de Productos</h4>
          <HistorialComprasTabla compras={compras} />
        </div>
      )}
    </div>
  );
};