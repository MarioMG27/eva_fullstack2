import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { authService } from '../../services/authService';

export interface ServiceItem {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  precio: string;
}

interface ModuloAgendamientoProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ModuloAgendamiento: React.FC<ModuloAgendamientoProps> = ({ service, onClose }) => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [nombreMascota, setNombreMascota] = useState('');
  const [dueno, setDueno] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('08:00');
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setNombreMascota('');
      setDueno(user ? user.nombre : '');
      setFecha('');
      setHora('08:00');
      setConfirmationMessage(null);
    }
  }, [service, user]);

  if (!service) return null;

  const todayDate = new Date().toISOString().split('T')[0];

  const handleOpenPicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      if ('showPicker' in e.currentTarget) {
        e.currentTarget.showPicker();
      }
    } catch (err) {
      console.log('El selector de fecha nativo se abre normalmente', err);
    }
  };

  const handleCloseModal = () => {
    setConfirmationMessage(null);
    setNombreMascota('');
    setDueno('');
    setFecha('');
    onClose();
  };

  const handleIrALogin = () => {
    onClose();
    // Redirigir enviando en el state el servicio que se deseaba agendar
    navigate('/login', { state: { pendingService: service } });
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!nombreMascota || !fecha) return;

    const nombreDuenoFinal = dueno || user.nombre;

    const nuevaCita = {
      id: Date.now(),
      servicio: service.titulo,
      paciente: nombreMascota,
      dueno: nombreDuenoFinal,
      fecha,
      hora,
      estado: 'Pendiente',
    };

    const savedCitas = localStorage.getItem('petshop_user_appointments');
    let citasActuales = [];
    if (savedCitas) {
      try {
        citasActuales = JSON.parse(savedCitas);
      } catch (e) {
        citasActuales = [];
      }
    }

    const actualizadas = [nuevaCita, ...citasActuales];
    localStorage.setItem('petshop_user_appointments', JSON.stringify(actualizadas));

    setConfirmationMessage(
      `¡Cita agendada con éxito para ${nombreMascota} (${service.titulo}) el ${fecha} a las ${hora} hrs!`
    );

    setTimeout(() => {
      handleCloseModal();
    }, 2500);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">
              {service.icono} Agendar: {service.titulo}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body p-4">
            {!user ? (
              <div className="text-center py-3">
                <div className="fs-1 mb-2">🔒</div>
                <h5 className="fw-bold text-dark mb-2">Inicio de Sesión Requerido</h5>
                <p className="text-muted small mb-4">
                  Para agendar una cita y vincularla a la historia médica de tu mascota, debes iniciar sesión con tu cuenta de cliente.
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleIrALogin}>
                    🔑 Iniciar Sesión
                  </Button>
                </div>
              </div>
            ) : confirmationMessage ? (
              <div className="alert alert-success text-center my-3" role="alert">
                <div className="fs-1 mb-2">✅</div>
                <h6 className="fw-bold">{confirmationMessage}</h6>
                <p className="small mb-0 text-muted">Podrás revisarla en tu sección "Mi Perfil"</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking}>
                <FormField
                  label="Nombre de la Mascota / Paciente"
                  type="text"
                  placeholder="Ej: Max, Luna..."
                  value={nombreMascota}
                  onChange={(e) => setNombreMascota(e.target.value)}
                  required
                />
                <FormField
                  label="Nombre del Dueño / Tutor (Vinculado)"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={dueno}
                  onChange={(e) => setDueno(e.target.value)}
                  required
                />
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-bold">Fecha de la Cita</label>
                    <input
                      type="date"
                      className="form-control"
                      min={todayDate}
                      value={fecha}
                      onClick={handleOpenPicker}
                      onChange={(e) => setFecha(e.target.value)}
                      style={{ cursor: 'pointer' }}
                      required
                    />
                    <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      * Fechas desde hoy en adelante
                    </span>
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold">Hora</label>
                    <select
                      className="form-select"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                    >
                      <option value="08:00">08:00 hrs</option>
                      <option value="08:30">08:30 hrs</option>
                      <option value="09:00">09:00 hrs</option>
                      <option value="09:30">09:30 hrs</option>
                      <option value="10:00">10:00 hrs</option>
                      <option value="10:30">10:30 hrs</option>
                      <option value="11:00">11:00 hrs</option>
                      <option value="11:30">11:30 hrs</option>
                      <option value="12:00">12:00 hrs</option>
                      <option value="12:30">12:30 hrs</option>
                      <option value="13:00">13:00 hrs</option>
                      <option value="13:30">13:30 hrs</option>
                      <option value="14:00">14:00 hrs</option>
                      <option value="14:30">14:30 hrs</option>
                      <option value="15:00">15:00 hrs</option>
                      <option value="15:30">15:30 hrs</option>
                      <option value="16:00">16:00 hrs</option>
                      <option value="16:30">16:30 hrs</option>
                      <option value="17:00">17:00 hrs</option>
                      <option value="17:30">17:30 hrs</option>
                      <option value="18:00">18:00 hrs</option>
                      <option value="18:30">18:30 hrs</option>
                      <option value="19:00">19:00 hrs</option>
                      <option value="19:30">19:30 hrs</option>
                      <option value="20:00">20:00 hrs</option>
                      <option value="20:30">20:30 hrs</option>
                      <option value="21:00">21:00 hrs</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="success">
                    Confirmar Reserva
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};