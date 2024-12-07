import { useState } from "react";
import { useNavigate } from "react-router";
import "./welcome.scss";

enum pages {
  name = "name",
  pokemonList = "pokemon-list",
  congratulations = "congrats",
}

enum screenTypes {
  welcome = "welcome",
  getStarted = "get-started",
}

export default function Welocme() {
  const [pageToDIsplay, setPageToDisplay] = useState<pages>(pages.name);
  const [name, setName] = useState<string>("");
  const [screen, setSecreen] = useState<screenTypes>();

  const navigate = useNavigate();

  const onNameEntered = () => {
    if (name) {
      setPageToDisplay(pages.pokemonList);
      setSecreen(screenTypes.welcome);
      localStorage.setItem("name", name);

      const timeid = setTimeout(() => {
        setSecreen(screenTypes.getStarted);
      }, 3000);

      return () => clearTimeout(timeid);
    }
  };

  return (
    <>
      {pageToDIsplay === pages.name ? (
        <div className="name-modal modal">
          <label className="name-text">Whats your name ?</label>
          <input
            type="text"
            className="name-input"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <button
            className="enter-button primary-button"
            disabled={!name}
            onClick={onNameEntered}
          >
            Enter
          </button>
        </div>
      ) : (
        <div className="welcome-modal modal">
          {screen === screenTypes.welcome && (
            <>
              Welocme {name}!!! I see you are ready to start your Journey
              towards becoming a pokemon master.
            </>
          )}
          {screen === screenTypes.getStarted && (
            <>
              Let me show you the Pokédex
              <button
                className="primary-button"
                onClick={() => navigate("/list")}
              >
                Let's Go!!!!
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
