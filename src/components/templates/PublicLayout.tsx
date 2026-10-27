import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import type { User } from '../../types';

interface PublicLayoutProps {
  cartCount: number;
  user: User | null;
  onLogout: () => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ cartCount, user, onLogout }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartCount={cartCount} user={user} onLogout={onLogout} />
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};