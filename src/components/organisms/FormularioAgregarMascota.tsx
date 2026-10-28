import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import type { RegistroMascota } from './FichaMascota';

interface FormularioAgregarMascotaProps {
  onAgregar: (nuevaMascota: RegistroMascota) => void;
  onCerrar: () => void;
}

export const FormularioAgregarMascota: React.FC<FormularioAgregarMascotaProps> = ({
  onAgregar,
  onCerrar,
}) => {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('Canino');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !raza || !edad) return;

    const nuevaMascota: RegistroMascota = {
      id: Date.now(),
      nombre,
      especie,
      raza,
      edad,
      vacunas: [
        { nombre: 'Vacuna Control Inicial', fecha: new Date().toISOString().split('T')[0], estado: 'Pendiente' },
      ],
    };

    onAgregar(nuevaMascota);
    onCerrar();
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
            <h5 className="modal-title fw-bold">🐾 Registrar Nueva Mascota</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCerrar}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <FormField
                label="Nombre de la Mascota"
                type="text"
                placeholder="Ej: Rocky, Misu..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <div className="mb-3">
                <label className="form-label fw-bold">Especie</label>
                <select
                  className="form-select"
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                >
                  <option value="Canino">🐶 Canino (Perro)</option>
                  <option value="Felino">🐱 Felino (Gato)</option>
                </select>
              </div>

              <FormField
                label="Raza"
                type="text"
                placeholder="Ej: Poodle, Mestizo, Siamés..."
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                required
              />

              <FormField
                label="Edad / Tiempo de vida"
                type="text"
                placeholder="Ej: 2 años, 5 meses..."
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={onCerrar}>
                Cancelar
              </Button>
              <Button type="submit" variant="success">
                Guardar Mascota
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};