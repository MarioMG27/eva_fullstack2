import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Button } from '../components/atoms/Button';

describe('Pruebas unitarias en <Button />', () => {
  test('Debe renderizar el texto correctamente', () => {
    render(<Button variant="primary">Guardar Cambios</Button>);
    expect(screen.getByText('Guardar Cambios')).toBeInTheDocument();
  });

  test('Debe aplicar la clase de Bootstrap correspondiente al variant', () => {
    render(<Button variant="success">Confirmar</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn-success');
  });

  test('Debe ejecutar la función onClick al presionar el botón', () => {
    const handleClick = vi.fn();
    render(<Button variant="primary" onClick={handleClick}>Hacer Clic</Button>);

    fireEvent.click(screen.getByText('Hacer Clic'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});