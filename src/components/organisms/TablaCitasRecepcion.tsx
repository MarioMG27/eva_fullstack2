import React, { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';
import { FormularioReagendarCita } from './FormularioReagendarCita';
import { ModuloAgendamiento, type ServiceItem } from './ModuloAgendamiento';
import type { ClienteAdmin } from './TablaRecepcion';

export interface Cita {
  id: number;
  servicio: string;
  paciente: string;
  dueno: string;
  fecha: string;
  hora: string;
  estado: 'Pendiente' | 'Confirmado' | 'Atendido' | 'Cancelado';
}

const DEFAULT_CITAS_RECEPCION: Cita[] = [
  { id: 101, servicio: 'Consulta Médica General', paciente: 'Max', dueno: 'Carlos Pérez', fecha: '2026-10-30', hora: '10:00', estado: 'Pendiente' },
  { id: 102, servicio: 'Vacunación y Desparasitación', paciente: 'Luna', dueno: 'María González', fecha: '2026-11-05', hora: '15:30', estado: 'Pendiente' },
  { id: 103, servicio: 'Peluquería Canina', paciente: 'Rocky', dueno: 'Juan Tapia', fecha: '2026-10-28', hora: '11:30', estado: 'Confirmado' },
];

const SERVICIO_DEFAULT: ServiceItem = {
  id: 1,
  titulo: 'Consulta Médica General',
  descripcion: 'Agendamiento rápido desde la Recepción',
  icono: '🩺',
  precio: '$15.000',
};

export const TablaCitasRecepcion: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [citaAReagendar, setCitaAReagendar] = useState<Cita | null>(null);
  const [servicioAgendamiento, setServicioAgendamiento] = useState<ServiceItem | null>(null);

  const cargarCitas = () => {
    const savedClientes = localStorage.getItem('petshop_admin_clientes');
    const mapaMascotaDueno: { [nombreMascota: string]: string } = {
      Max: 'Carlos Pérez',
      Luna: 'María González',
    };

    if (savedClientes) {
      const clientes: ClienteAdmin[] = JSON.parse(savedClientes);
      clientes.forEach((cli) => {
        cli.mascotas.forEach((masc) => {
          mapaMascotaDueno[masc.nombre] = cli.nombre;
        });
      });
    }

    const savedCitas = localStorage.getItem('petshop_user_appointments');
    let citasBase: Cita[] = DEFAULT_CITAS_RECEPCION;

    if (savedCitas) {
      try {
        const parsed = JSON.parse(savedCitas);
        if (Array.isArray(parsed) && parsed.length > 0) {
          citasBase = parsed;
        }
      } catch (e) {
        citasBase = DEFAULT_CITAS_RECEPCION;
      }
    }

    const citasVinculadas: Cita[] = citasBase.map((item: any) => {
      let nombreMascota = item.paciente || 'Mascota';
      let nombreDueno = item.dueno;

      if (nombreMascota.includes('(')) {
        const partes = nombreMascota.split('(');
        nombreMascota = partes[0].trim();
        if (!nombreDueno || nombreDueno === 'Sin Tutor') {
          nombreDueno = partes[1].replace(')', '').trim();
        }
      }

      if (!nombreDueno || nombreDueno === 'Sin Tutor') {
        nombreDueno = mapaMascotaDueno[nombreMascota] || 'Carlos Pérez';
      }

      return {
        ...item,
        paciente: nombreMascota,
        dueno: nombreDueno,
      };
    });

    setCitas(citasVinculadas);
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const guardarCitas = (actualizadas: Cita[]) => {
    setCitas(actualizadas);
    localStorage.setItem('petshop_user_appointments', JSON.stringify(actualizadas));
  };

  const handleCambiarEstado = (id: number, nuevoEstado: Cita['estado']) => {
    const actualizadas = citas.map((c) =>
      c.id === id ? { ...c, estado: nuevoEstado } : c
    );
    guardarCitas(actualizadas);
  };

  const handleReagendar = (citaId: number, nuevaFecha: string, nuevaHora: string) => {
    const actualizadas = citas.map((c) =>
      c.id === citaId ? { ...c, fecha: nuevaFecha, hora: nuevaHora, estado: 'Pendiente' as const } : c
    );
    guardarCitas(actualizadas);
  };

  const obtenerVariante = (estado: Cita['estado']) => {
    switch (estado) {
      case 'Atendido':
        return 'success';
      case 'Confirmado':
        return 'primary';
      case 'Cancelado':
        return 'danger';
      case 'Pendiente':
      default:
        return 'warning';
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">🗓️ Control General de Citas y Agendamiento</h4>
        <Button variant="success" onClick={() => setServicioAgendamiento(SERVICIO_DEFAULT)}>
          📅 + Agendar Cita (Módulo Reutilizado)
        </Button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle border shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Servicio</th>
              <th>Mascota / Paciente</th>
              <th>Dueño / Tutor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th className="text-end">Acciones Recepción</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c) => (
              <tr key={c.id}>
                <td className="fw-semibold">{c.servicio}</td>
                <td>
                  <strong className="text-dark">{c.paciente}</strong>
                </td>
                <td className="fw-semibold text-secondary">{c.dueno}</td>
                <td>{c.fecha}</td>
                <td>{c.hora} hrs</td>
                <td>
                  <EtiquetaEstado texto={c.estado} variante={obtenerVariante(c.estado)} />
                </td>
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    {c.estado !== 'Confirmado' && c.estado !== 'Atendido' && c.estado !== 'Cancelado' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleCambiarEstado(c.id, 'Confirmado')}
                      >
                        Confirmar
                      </Button>
                    )}
                    {c.estado !== 'Cancelado' && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => setCitaAReagendar(c)}
                      >
                        Reagendar
                      </Button>
                    )}
                    {c.estado !== 'Cancelado' && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCambiarEstado(c.id, 'Cancelado')}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reutilización limpia del organismo ModuloAgendamiento */}
      {servicioAgendamiento && (
        <ModuloAgendamiento
          service={servicioAgendamiento}
          onClose={() => {
            setServicioAgendamiento(null);
            cargarCitas(); // Recargar citas tras cerrar el agendamiento
          }}
        />
      )}

      {citaAReagendar && (
        <FormularioReagendarCita
          cita={citaAReagendar}
          onGuardar={handleReagendar}
          onCerrar={() => setCitaAReagendar(null)}
        />
      )}
    </div>
  );
};