import React from 'react';
import { Button } from '../atoms/Button';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';

export interface Cita {
  id: number;
  servicio: string;
  paciente: string;
  fecha: string;
  hora: string;
  estado: 'Pendiente' | 'Confirmado' | 'Atendido' | 'Cancelado';
}

interface TablaHorasAgendadasProps {
  citas: Cita[];
  onCancelarCita: (id: number) => void;
  onConfirmarCita: (id: number) => void;
}

export const TablaHorasAgendadas: React.FC<TablaHorasAgendadasProps> = ({
  citas,
  onCancelarCita,
  onConfirmarCita,
}) => {
  if (citas.length === 0) {
    return (
      <div className="alert alert-info text-center py-4 mb-0">
        No tienes citas registradas por el momento.
      </div>
    );
  }

  const obtenerVarianteEstado = (estado: Cita['estado']) => {
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
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Servicio</th>
            <th>Mascota</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td className="fw-semibold">{cita.servicio}</td>
              <td>{cita.paciente}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora} hrs</td>
              <td>
                <EtiquetaEstado
                  texto={cita.estado}
                  variante={obtenerVarianteEstado(cita.estado)}
                />
              </td>
              <td className="text-end">
                {cita.estado === 'Pendiente' ? (
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => onConfirmarCita(cita.id)}
                    >
                      Confirmar Cita
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onCancelarCita(cita.id)}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <span className="text-muted small">Sin acciones</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};