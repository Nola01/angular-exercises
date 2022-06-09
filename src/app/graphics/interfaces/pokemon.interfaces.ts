
export interface RegionPokemon {
    region: string,
    pokemon_list: string[]
}

export interface RegionData {
    count:    number;
    next:     null;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}

export interface RegionInfo {
    id:              number;
    locations:       MainGeneration[];
    main_generation: MainGeneration;
    name:            string;
    names:           Name[];
    pokedexes:       MainGeneration[];
    version_groups:  MainGeneration[];
}

export interface MainGeneration {
    name: string;
    url:  string;
}

export interface Name {
    language: MainGeneration;
    name:     string;
}

export interface PokedexInfo {
    descriptions:    Description[];
    id:              number;
    is_main_series:  boolean;
    name:            string;
    names:           Name[];
    pokemon_entries: PokemonEntry[];
    region:          Region;
    version_groups:  Region[];
}

export interface Description {
    description: string;
    language:    Region;
}

export interface Region {
    name: string;
    url:  string;
}

export interface Name {
    language: Region;
    name:     string;
}

export interface PokemonEntry {
    entry_number:    number;
    pokemon_species: Region;
}

