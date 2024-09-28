import type { number } from "astro:schema";

export type resApiAnimes = {
    currentPage: number;
    hasNextPage: boolean;
    results:     Result[];
}

export type Result = {
    id:          string;
    title:       string;
    url:         string;
    image:       string;
    releaseDate: string;
    estado:      string;
    subOrDub:    SubOrDub;
}

export enum SubOrDub {
    Dub = "dub",
    Sub = "sub",
}
export type ResApiInfoAnimes = {
    id:            string;
    title:         string;
    url:           string;
    genres:        string[];
    totalEpisodes: number;
    image:         string;
    releaseDate:   string;
    description:   string;
    subOrDub:      string;
    type:          string;
    status:        string;
    otherName:     string;
    episodes:      Episode[];
}

export type Episode = {
    id:            string;
    number:        number;
    url:           string;
}


