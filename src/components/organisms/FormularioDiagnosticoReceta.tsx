import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import type { ConsultaMedica } from '../molecules/ConsultaMedicaItem';

interface FormularioDiagnosticoRecetaProps {
  nombreMascota: string;
  onGuardar: (nuevaConsulta: ConsultaMedica) => void;
  onCerrar: () => void;
}

export const FormularioDiagnosticoReceta: React.FC<FormularioDiagnosticoRecetaProps> = ({
  nombreMascota,
  onGuardar,
  onCerrar,
}) => {
  const [veterinario, setVeterinario] = useState('Dr. Carlos Silva');
  const [diagnostico, setDiagnostico] = useState('');
  const [medicamento, setMedicamento] = useState('');
  const [dosis, setDosis] = useState('');
  const [frecuencia, setFrecuencia] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnostico || !medicamento) return;

    const nuevaConsulta: ConsultaMedica = {
      id: Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      veterinario,
      diagnostico,
      receta: [
        {
          medicamento,
          dosis: dosis || '1 comprimido',
          frecuencia: frecuencia || 'Cada 12 hrs por 5 días',
        },
      ],
    };

    onGuardar(nuevaConsulta);
    onCerrar();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">
              🩺 Emitir Diagnóstico y Receta Médica: {nombreMascota}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCerrar}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <FormField
                label="Veterinario Tratante"
                type="text"
                value={veterinario}
                onChange={(e) => setVeterinario(e.target.value)}
                required
              />

              <div className="mb-3">
                <label className="form-label fw-bold">Diagnóstico Clínico / Observaciones</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Ej: Cuadro infeccioso respiratorio leve. Buen estado general."
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  required
                ></textarea>
              </div>

              <h6 className="fw-bold text-success border-top pt-3 mb-3">💊 Prescripción de Medicamentos (Receta)</h6>
              
              <div className="row g-2 mb-3">
                <div className="col-md-5">
                  <FormField
                    label="Fármaco / Medicamento"
                    type="text"
                    placeholder="Ej: Cerenia, Engystol, Amoxicilina"
                    value={medicamento}
                    onChange={(e) => setMedicamento(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <FormField
                    label="Dosis"
                    type="text"
                    placeholder="Ej: 16mg / 1 comprimido"
                    value={dosis}
                    onChange={(e) => setDosis(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <FormField
                    label="Frecuencia y Duración"
                    type="text"
                    placeholder="Ej: Cada 12 hrs x 7 días"
                    value={frecuencia}
                    onChange={(e) => setFrecuencia(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={onCerrar}>
                Cancelar
              </Button>
              <Button type="submit" variant="success">
                Guardar Diagnóstico y Receta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};