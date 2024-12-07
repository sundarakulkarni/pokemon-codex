import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./pokemon-details.scss";

export default function PokemonDetails() {
  const params = useParams();
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    getPokemonDetails();
  }, []);

  const getPokemonDetails = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`)
      .then((response) => response.json())
      .then((res) => setResponse(res));
  };

  return (
    <div className="modal details-container">
      {response !== null && (
        <div className="details-row">
          <div className="pokemon-card-wrapper">
            <div className="pokemon-card">
              <h2>Pokemon</h2>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`}
                alt=""
                className="pokemon-image"
              />
              <span className="pokemon-name">{response?.species?.name}</span>
            </div>
          </div>
          <div className="stats-container">
            <h2>Base Stats</h2>
            <div className="content">
              {response.stats.map((stat: any) => (
                <div className="capatalize">
                  {stat.stat.name.split("-").join(" ")} : {stat.base_stat}
                </div>
              ))}
            </div>
          </div>
          <div className="stats-container">
            <h2>Pokemon Type</h2>
            <div className="content">
              {response.types.map((stat: any) => (
                <div className="capatalize">
                  {stat.type.name.split("-").join(" ")}
                </div>
              ))}
            </div>
          </div>
          <div className="stats-container">
            <h2>Moves</h2>
            <div className="content">
              {response.moves.map((stat: any) => (
                <div className="capatalize">
                  {stat.move.name.split("-").join(" ")}
                </div>
              ))}
            </div>
          </div>
          <div className="stats-container">
            <h2>Abilities</h2>
            <div className="content">
              {response.abilities.map((stat: any) => (
                <div className="capatalize">
                  {stat.ability.name.split("-").join(" ")}
                </div>
              ))}
            </div>
          </div>
          {response.held_items.length > 0 && (
            <div className="stats-container">
              <h2>Items</h2>
              <div className="content">
                {response.held_items.map((stat: any) => (
                  <div className="capatalize">
                    {stat.item.name.split("-").join(" ")}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="contents"></div>
    </div>
  );
}
