// src/components/SearchBar.jsx
import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm, typeFilter, setTypeFilter }) {
  const types = ['All', 'Fire', 'Water', 'Grass', 'Electric', 'Bug', 'Normal', 'Poison', 'Ground', 'Fairy', 'Fighting', 'Psychic', 'Rock', 'Ghost', 'Ice', 'Dragon', 'Dark', 'Steel', 'Flying'];

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="type-select"
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;
