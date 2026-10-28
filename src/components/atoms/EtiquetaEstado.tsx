import React from 'react';

interface EtiquetaEstadoProps {
  texto: string;
  variante?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'dark';
  className?: string;
}

export const EtiquetaEstado: React.FC<EtiquetaEstadoProps> = ({
  texto,
  variante = 'primary',
  className = '',
}) => {
  return <span className={`badge bg-${variante} ${className}`}>{texto}</span>;
};