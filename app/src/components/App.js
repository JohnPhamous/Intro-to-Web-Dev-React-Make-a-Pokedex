import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  LIST_API = "https://pokeapi.co/api/v2/pokemon/";

  state = {
    allPokemon: [],
    selectedPokemon: {}
  };

  async componentDidMount() {
    const data = await fetch(this.LIST_API);
    const json = await data.json();
    console.log(json["results"]);

    this.setState({ allPokemon: json["results"] });
  }

  getPokemonId(url) {
    return url.split("/")[6];
  }

  getNormalSprite(url) {
    const SPRITE_URL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

    const id = this.getPokemonId(url);

    return `${SPRITE_URL}/${id}.png`;
  }

  getShinySprite(url) {
    const SHINY_SPRITE_URL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny";

    const id = this.getPokemonId(url);

    return `${SHINY_SPRITE_URL}/${id}.png`;
  }

  render() {
    return (
      <main id="pokedex-container">
        <h1>PokeDex</h1>

        <section id="pokemon-list">
          {this.state.allPokemon.map(pokemon => (
            <div key={pokemon.name} className="pokemon-entry">
              <img
                src={`${this.getNormalSprite(pokemon.url)}`}
                alt={pokemon.name}
                onMouseOver={e => {
                  e.currentTarget.src = this.getShinySprite(pokemon.url);
                }}
                onMouseOut={e =>
                  (e.currentTarget.src = this.getNormalSprite(pokemon.url))
                }
              />
              <h3 className="pokemon-name">{pokemon.name}</h3>
            </div>
          ))}
        </section>
      </main>
    );
  }
}
