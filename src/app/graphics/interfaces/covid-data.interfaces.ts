


export interface CountryData {
    dates:      Dates;
    metadata:   Metadata;
    total:      Total;
    updated_at: string;
}

export interface Dates {
    date: DateInfo;
}

export interface DateInfo {
    countries: Countries;
    info:      Info;
}

export interface Countries {
    Canada: Total;
}

export interface Total {
    date:                          Date;
    id?:                           string;
    links?:                        Link[];
    name:                          string;
    name_es:                       string;
    name_it:                       string;
    regions?:                      Total[];
    source:                        Source;
    today_confirmed:               number;
    today_deaths:                  number;
    today_new_confirmed:           number;
    today_new_deaths:              number;
    today_new_open_cases:          number;
    today_new_recovered:           number;
    today_open_cases:              number;
    today_recovered:               number;
    today_vs_yesterday_confirmed:  number;
    today_vs_yesterday_deaths:     number | null;
    today_vs_yesterday_open_cases: number | null;
    today_vs_yesterday_recovered:  number;
    yesterday_confirmed:           number;
    yesterday_deaths:              number;
    yesterday_open_cases:          number;
    yesterday_recovered:           number;
    sub_regions?:                  any[];
    rid?:                          string;
}

export interface Link {
    href: string;
    rel:  Rel;
    type: Type;
}

export enum Rel {
    Self = "self",
}

export enum Type {
    Get = "GET",
}

export enum Source {
    JohnHopkinsUniversity = "John Hopkins University",
    Narrativa = "Narrativa",
}

export interface Info {
    date:            string;
    date_generation: string;
    yesterday:       string;
}

export interface Metadata {
    by:  string;
    url: string[];
}

