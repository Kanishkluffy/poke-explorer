import React from 'react';
import './PokemonCard.css'; // Optional if you want separate CSS

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <p className="pokemon-id">ID: {pokemon.id}</p>
      <div className="pokemon-types">
        {pokemon.types.map((typeObj) => (
          <span key={typeObj.slot} className={`type ${typeObj.type.name}`}>
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
