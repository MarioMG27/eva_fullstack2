import React from 'react';
import type { CartItem } from '../../types';
import { Button } from '../atoms/Button';

interface CartRowItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export const CartRowItem: React.FC<CartRowItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const { product, cantidad } = item;
  const subtotal = product.precio * cantidad;

  return (
    <tr>
      <td className="align-middle">
        <div className="d-flex align-items-center gap-3">
          <img
            src={`/img/${product.imagen}`}
            alt={product.nombre}
            className="rounded"
            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
          />
          <div>
            <h6 className="mb-0 text-truncate" style={{ maxWidth: '200px' }}>
              {product.nombre}
            </h6>
            <span className="text-muted small">{product.categoria}</span>
          </div>
        </div>
      </td>
      <td className="align-middle fw-semibold">
        ${product.precio.toLocaleString('es-CL')}
      </td>
      <td className="align-middle">
        <div className="d-flex align-items-center gap-2" style={{ width: '120px' }}>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onUpdateQuantity(product.id, cantidad - 1)}
            disabled={cantidad <= 1}
          >
            -
          </Button>
          <span className="fw-bold px-2">{cantidad}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onUpdateQuantity(product.id, cantidad + 1)}
          >
            +
          </Button>
        </div>
      </td>
      <td className="align-middle fw-bold text-primary">
        ${subtotal.toLocaleString('es-CL')}
      </td>
      <td className="align-middle text-end">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onRemoveItem(product.id)}
          title="Eliminar producto"
        >
          🗑️
        </Button>
      </td>
    </tr>
  );
};