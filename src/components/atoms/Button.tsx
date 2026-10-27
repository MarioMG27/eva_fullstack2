import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline-light' | 'outline-primary' | 'outline-secondary' | 'outline-danger';
  size?: 'sm' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size,
  className = '',
  ...props
}) => {
  const sizeClass = size ? `btn-${size}` : '';

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};