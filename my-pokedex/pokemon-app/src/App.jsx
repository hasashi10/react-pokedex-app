import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokedexId, setPokedexId] = useState(1);

  useEffect(() => {
     async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexId}`);
        if (!response.ok) throw new Error("Failed to fetch Pokémon data");
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [pokedexId]);

  const handleNext = () => setPokedexId((prev) => prev + 1);
  const handlePrev = () => setPokedexId((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p>Loading Pokémon...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pokedex-container">
      <div className="pokedex-left">
        <div className="led-light" />
        <div className="screen">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <h2>{pokemon.name.toUpperCase()}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </>
          )}
        </div>
      </div>

      <div className="pokedex-right">
        <div className="data-section">
          {!loading && !error && (
            <>
              <h3>Abilities</h3>
              <ul>
                {pokemon.abilities.map((a) => (
                  <li key={a.ability.name}>{a.ability.name}</li>
                ))}
              </ul>
              <div className="nav-buttons">
                <button onClick={handlePrev}> Prev </button>
                <button onClick={handleNext}> Next </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default App