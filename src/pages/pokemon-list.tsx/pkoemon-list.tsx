import { useEffect, useState } from "react";
import "./pkoemon-list.scss";
import { useNavigate } from "react-router";
import { useIsElementVisible } from "../../hooks/isElementVisible";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
  );
  const [containerRef, isVisible] = useIsElementVisible({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });
  const name = localStorage.getItem("name");

  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) fetchPokemons();
  }, [isVisible]);

  const fetchPokemons = () => {
    fetch(nextPageUrl)
      .then((response) => response.json())
      .then((res: any) => {
        setPokemonList((prevState) => [...prevState, ...res.results]);
        setNextPageUrl(res.next);
      });
  };

  return (
    <div className="pokemon-listing-container modal">
      <span>Select the Pokemon {name}</span>
      <div className="pokemon-list">
        {pokemonList.map((pokemon: { name: string; url: string }) => {
          const pokemonId = pokemon.url.split("pokemon/")[1].slice(0, -1);
          return (
            <div className="pokemon-card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <span className="pokemon-name">{pokemon.name}</span>
              <button
                className="primary-button"
                onClick={() => navigate(`details/${pokemonId}`)}
              >
                View Details
              </button>
            </div>
          );
        })}
        <div
          style={{ height: "1px" }}
          ref={
            containerRef as unknown as React.MutableRefObject<HTMLDivElement>
          }
        />
      </div>
    </div>
  );
}
