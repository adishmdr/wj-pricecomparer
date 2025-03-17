// src/types/index.ts
export interface Movie {
  id?: string;
  title?: string;
  year?: string;
  rated?: string;
  released?: string;
  runtime?: string;
  genre?: string;
  director?: string;
  writer?: string;
  actors?: string;
  plot?: string;
  language?: string;
  country?: string;
  awards?: string;
  poster?: string;
  metascore?: string;
  rating?: string;
  votes?: string;
  type?: string;
  price?: string;
  provider?: string;
}

export interface MovieComparison {
  title?: string;
  cinemaWorldMovie?: Movie;
  filmWorldMovie?: Movie;
  cheapestPrice?: number;
}