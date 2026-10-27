import React, { useState, useEffect, useMemo } from 'react';
import type { Product } from '../../types';
import { productService } from '../../services/productService';
import { SearchFilter } from '../molecules/SearchFilter';
import { ProductGrid } from '../organisms/ProductGrid';

interface StorePageProps {
  onAddToCart: (product: Product) => void;
}

export const StorePage: React.FC<StorePageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [notification, setNotification] = useState<string | null>(null);

  // Cargar productos del servicio al montar el componente
  useEffect(() => {
    const loadedProducts = productService.getProducts();
    setProducts(loadedProducts);
  }, []);

  // Extraer categorías únicas de los productos disponibles
  const categories = useMemo(() => {
    const cats = products.map((p) => p.categoria);
    return Array.from(new Set(cats));
  }, [products]);

  // Filtrar productos según la búsqueda y categoría
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'Todas' || product.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCartWithNotification = (product: Product) => {
    onAddToCart(product);
    setNotification(`¡"${product.nombre}" fue agregado al carrito!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Catálogo de Productos</h2>
          <p className="text-muted small mb-0">Encuentra fármacos, suplementos y alimentos para tus mascotas.</p>
        </div>
        <span className="badge bg-secondary px-3 py-2">
          {filteredProducts.length} producto(s)
        </span>
      </div>

      {/* Alerta flotante de confirmación */}
      {notification && (
        <div className="alert alert-success alert-dismissible fade show shadow-sm mb-4" role="alert">
          {notification}
        </div>
      )}

      {/* Filtros de búsqueda */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Grilla iterativa de productos */}
      <ProductGrid products={filteredProducts} onAddToCart={handleAddToCartWithNotification} />
    </div>
  );
};