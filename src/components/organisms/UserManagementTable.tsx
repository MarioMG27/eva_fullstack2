import React, { useState, useEffect } from 'react';
import type { User, UserRole } from '../../types';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { EtiquetaEstado } from '../atoms/EtiquetaEstado';
import { INITIAL_USERS } from '../../services/initialData';

const USERS_KEY = 'petshop_all_users';

export const UserManagementTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState<UserRole>('cliente');

  useEffect(() => {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
      setUsers(INITIAL_USERS);
    }
  }, []);

  const guardarUsuarios = (actualizados: User[]) => {
    setUsers(actualizados);
    localStorage.setItem(USERS_KEY, JSON.stringify(actualizados));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email) return;

    const nuevoUsuario: User = {
      id: Date.now(),
      nombre,
      email,
      rol,
    };

    const actualizados = [...users, nuevoUsuario];
    guardarUsuarios(actualizados);

    setNombre('');
    setEmail('');
    setRol('cliente');
    setShowForm(false);
  };

  const handleDeleteUser = (id: number) => {
    if (users.length <= 1) {
      alert('Debe existir al menos un usuario en el sistema.');
      return;
    }
    const actualizados = users.filter((u) => u.id !== id);
    guardarUsuarios(actualizados);
  };

  const obtenerVarianteRol = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'warning';
      case 'veterinario':
        return 'primary';
      case 'recepcionista':
        return 'info';
      case 'cliente':
      default:
        return 'success';
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">👥 Gestión Global de Usuarios y Cuentas</h4>
        <Button
          variant={showForm ? 'outline-secondary' : 'success'}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '➕ Registrar Nuevo Usuario'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="bg-light p-3 rounded mb-4">
          <h5 className="fw-bold mb-3 fs-6">Crear Usuario del Sistema</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <FormField
                label="Nombre Completo"
                type="text"
                placeholder="Ej: Ana María Silva"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <FormField
                label="Correo Electrónico"
                type="email"
                placeholder="usuario@veterinaria.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">Rol / Categoría</label>
              <select
                className="form-select"
                value={rol}
                onChange={(e) => setRol(e.target.value as UserRole)}
              >
                <option value="cliente">Cliente</option>
                <option value="recepcionista">Recepcionista</option>
                <option value="veterinario">Veterinario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-3">
              <Button type="submit" variant="success" className="w-100">
                Guardar Usuario
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Rol Asignado</th>
              <th className="text-end">Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td className="fw-semibold">{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <EtiquetaEstado
                    texto={u.rol.toUpperCase()}
                    variante={obtenerVarianteRol(u.rol)}
                  />
                </td>
                <td className="text-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => u.id && handleDeleteUser(u.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};