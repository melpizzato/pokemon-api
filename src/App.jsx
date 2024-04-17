import { useEffect, useState } from "react"

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  const data = await response.json()
  return data.results
}

function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonShown, setPokemonShown] = useState(null)

  useEffect(() => {
    fetchPokemon().then(resuls => {
      console.log("state change")
      console.log(resuls)
      setPokemon(resuls)
    })
  }, [])

  const showDetails = async (url) => {
    const data = await fetch(url).then(res => res.json())
    console.log(data)
    setPokemonShown(data)
  }

  return (
    <div className="app">
      <div>
        <h1>Pokémon:</h1>
        <ul className="pokemon">
          {pokemon.map(mon => (
            <li key={mon.name}>
              <span>{mon.name}</span>
              <button onClick={() => showDetails(mon.url)}>
                Show details
              </button>
            </li>
          ))}
        </ul>
      </div>
      {pokemonShown && (
        <div>
          <h2>{pokemonShown.name}</h2>
          <img
            src={pokemonShown.sprites.front_default}
            alt=""
          />
          <div className="stat">
            <b>Type: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>
          <div className="stat">
            <b>Height: </b>{pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Weight: </b>{pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Attributes</b>
            <ul>
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Skills</b>
            <ul>
              {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secret)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App