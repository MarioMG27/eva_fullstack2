import React from 'react';
import { Input } from '../atoms/Input';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, ...inputProps }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      <Input {...inputProps} />
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
};