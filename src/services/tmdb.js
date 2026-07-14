/**
 * ================================================================
 * MOVIE DATA — powered by The Movie Database (TMDB) public API
 * ================================================================
 * This is what real posters, titles, ratings, and descriptions on
 * the Browse page come from (never colored boxes).
 *
 * Setup (free, ~2 minutes):
 *   1. Create an account at https://www.themoviedb.org
 *   2. Settings -> API -> request a free "API Read Access Token" (v4 auth)
 *   3. Add it to your .env file:
 *        VITE_TMDB_API_KEY=your_v4_read_access_token
 *
 * This has nothing to do with your own StreamFlix backend/MongoDB —
 * it's only the source of catalog artwork, exactly like a real
 * streaming service licenses artwork from a studio catalog.
 * ================================================================
 */

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const posterUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const backdropUrl = (path, size = "original") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export async function tmdbFetch(endpoint) {
  if (!API_KEY) {
    throw new Error("TMDB_KEY_MISSING");
  }
  const res = await fetch(`${TMDB_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
  return res.json();
}

export function normalize(movie) {
  return {
    id: movie.id,
    title: movie.title || movie.name,
    overview: movie.overview,
    poster: posterUrl(movie.poster_path),
    backdrop: backdropUrl(movie.backdrop_path),
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
    year: (movie.release_date || movie.first_air_date || "").slice(0, 4),
    genreIds: movie.genre_ids || [],
  };
}

const ROWS = [
  { title: "Trending Now", endpoint: "/trending/movie/week" },
  { title: "Popular on StreamFlix", endpoint: "/movie/popular" },
  { title: "Top Rated", endpoint: "/movie/top_rated" },
  { title: "New Releases", endpoint: "/movie/now_playing" },
  { title: "Action", endpoint: "/discover/movie?with_genres=28" },
  { title: "Comedy", endpoint: "/discover/movie?with_genres=35" },
  { title: "Sci-Fi", endpoint: "/discover/movie?with_genres=878" },
  { title: "Horror", endpoint: "/discover/movie?with_genres=27" },
  { title: "Romance", endpoint: "/discover/movie?with_genres=10749" },
  { title: "Animation", endpoint: "/discover/movie?with_genres=16" },
];

export async function fetchBrowseRows() {
  const results = await Promise.all(
    ROWS.map(async (row) => {
      const data = await tmdbFetch(row.endpoint);
      return { title: row.title, movies: (data.results || []).map(normalize) };
    })
  );
  return results;
}

export async function fetchHeroMovie() {
  const data = await tmdbFetch("/movie/popular");
  const pick = data.results?.[Math.floor(Math.random() * Math.min(5, data.results.length))];
  return pick ? normalize(pick) : null;
}

export async function fetchMovieDetails(id) {
  const data = await tmdbFetch(`/movie/${id}?append_to_response=videos`);
  const trailer = data.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  return {
    ...normalize(data),
    runtime: data.runtime,
    genres: (data.genres || []).map((g) => g.name),
    trailerKey: trailer?.key || null,
  };
}
