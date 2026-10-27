import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="row g-3 mb-4 bg-light p-3 rounded shadow-sm align-items-center">
      <div className="col-md-7">
        <label className="form-label fw-semibold small mb-1">Buscar Producto</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ej: Doguivit, Cerenia..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label fw-semibold small mb-1">Categoría</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};