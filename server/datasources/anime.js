const { RESTDataSource } = require('apollo-datasource-rest');

class AnimeAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://graphql.anilist.co';
    }

    animeReducer(anime) {
      return {
        id: anime.id || 0,
        name: anime.name,
        description: this.getDescription(pokemonSpecies.flavor_text_entries),
        pic: pokemon.sprites.front_default,
        types: this.getTypes(pokemon.types)
      };
    }

    getDescription(entries) {
      return entries.find(item => item.language.name === 'en').flavor_text;
    }

    getTypes(types) {
      return types.map(({ slot, type }) => {
        return {
          "id": slot, // the type's index
          "name": type.name // the type's name (e.g. electric, leaf)
        }
      });
    }

    async getPokemonById({ id }) {
      const pokemonResponse = await this.get(`pokemon/${id}`);
      const pokemonSpeciesResponse = await this.get(`pokemon-species/${id}`);
      return this.pokemonReducer(pokemonResponse, pokemonSpeciesResponse);
    }
  }

  module.exports = PokeAPI;