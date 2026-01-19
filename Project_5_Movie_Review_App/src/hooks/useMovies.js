// src/hooks/useMovies.js
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "../lib/tmdb";

const categoryEndpoints = {
  trending: "/trending/movie/day",
  now_playing: "/movie/now_playing",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
};

export function useMovieCategory(category, queryKeyExtra = []) {
  return useQuery({
    queryKey: ["movies", category, ...queryKeyExtra],
    queryFn: async () => {
      const endpoint = categoryEndpoints[category] ?? categoryEndpoints.popular;
      const { data } = await tmdb.get(endpoint);
      return data.results;
    },
  });
}

export function useHeroMovies() {
  return useMovieCategory("trending", ["hero"]);
}

export function useSearchMovies(query) {
  return useQuery({
    queryKey: ["search", query],
    enabled: !!query,
    queryFn: async () => {
      const { data } = await tmdb.get("/search/movie", {
        params: { query },
      });
      return data.results;
    },
  });
}
