import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  LIST_API = "https://pokeapi.co/api/v2/pokemon/";

  state = {
    allPokemon: [],
    selectedPokemon: undefined,
    selectedPokemonGif: undefined
  };

  async componentDidMount() {
    const data = await fetch(this.LIST_API);
    const json = await data.json();

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

  async getPokemonDetail(url) {
    const data = await fetch(url);
    const json = await data.json();

    const GIPHY_API_KEY = "A3CQtr8DQVI2kM215yBVSwvdwvJgyMcU";
    const GIPHY_API = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=`;

    const name = json["name"];

    const giphyData = await fetch(`${GIPHY_API}${name}`);
    const giphyJson = await giphyData.json();
    const selectedPokemonGif =
      giphyJson["data"][0]["images"]["original"]["url"];

    this.setState({ selectedPokemon: json, selectedPokemonGif });
  }

  render() {
    const { allPokemon, selectedPokemon, selectedPokemonGif } = this.state;

    return (
      <main id="pokedex-container">
        <h1>PokeDex</h1>

        <section id="pokemon-detail-container">
          {selectedPokemon && (
            <div id="pokemon-detail">
              <hr />

              <h2 className="pokemon-name">{selectedPokemon.name}</h2>
              <img
                src={selectedPokemonGif}
                alt={`${selectedPokemon.name} gif`}
              />

              <table className="stats-table">
                <tbody>
                  <tr>
                    <td>Height</td>
                    <td>{selectedPokemon.height}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{selectedPokemon.weight}</td>
                  </tr>
                  <tr>
                    <td>Types</td>
                    <td>
                      {selectedPokemon.types.map(type => (
                        <span key={type.type.name} className="type">
                          {" "}
                          {type.type.name}
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr />
            </div>
          )}
        </section>

        <section id="pokemon-list">
          {allPokemon.map(pokemon => (
            <div
              key={pokemon.name}
              className="pokemon-entry"
              onClick={() => this.getPokemonDetail(pokemon.url)}
            >
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
