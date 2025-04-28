// src/App.jsx
import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading
      setError(''); // Reset error message
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        const promises = data.results.map(async (pokemon) => {
          const pokemonRes = await fetch(pokemon.url);
          return await pokemonRes.json();
        });
        const results = await Promise.all(promises);
        setPokemons(results);
      } catch (error) {
        setError('Failed to fetch Pokémon. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    }
    fetchData();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || pokemon.types.some(t => t.type.name === typeFilter.toLowerCase());
    return matchesName && matchesType;
  });

  return (
    <div className="App">
      <header className="header">
        <h1>Pokémon Explorer</h1>
      </header>

      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {loading && <p className="loading">Loading Pokémon...</p>}
      {error && <p className="error">{error}</p>}

      <div className="pokemon-list">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="no-results">No Pokémon found!</p>
        )}
      </div>
    </div>
  );
}

export default App;
