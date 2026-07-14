import { useEffect, useState } from "react";
import BrowseNavbar from "../components/browse/BrowseNavbar";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import MovieModal from "../components/MovieModal";
import { fetchBrowseRows, fetchHeroMovie } from "../services/tmdb";
import "./BrowsePage.css";

export default function BrowsePage() {
  const [rows, setRows] = useState([]);
  const [hero, setHero] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [myList, setMyList] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | missing-key | error

  useEffect(() => {
    let active = true;

    Promise.all([fetchHeroMovie(), fetchBrowseRows()])
      .then(([heroMovie, browseRows]) => {
        if (!active) return;
        setHero(heroMovie);

        const withList = [
          { title: "Continue Watching", movies: browseRows[0]?.movies?.slice(0, 8) || [] },
          ...browseRows,
        ];
        setRows(withList);
        setStatus("ready");
      })
      .catch((err) => {
        if (!active) return;
        setStatus(err.message === "TMDB_KEY_MISSING" ? "missing-key" : "error");
      });

    return () => {
      active = false;
    };
  }, []);

  function toggleMyList(movie) {
    setMyList((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [movie, ...prev]
    );
  }

  const rowsToRender = [
    ...rows,
    ...(myList.length ? [{ title: "My List", movies: myList }] : []),
  ];

  return (
    <div className="sf-browse">
      <BrowseNavbar />

      {status === "missing-key" && (
        <div className="sf-browse__notice">
          <h2>Almost there — connect a movie data source</h2>
          <p>
            Add a free TMDB API key to <code>VITE_TMDB_API_KEY</code> in your <code>.env</code> file
            so real posters and titles can load here. Get one at{" "}
            <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer">
              themoviedb.org
            </a>.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="sf-browse__notice">
          <h2>Couldn't load the catalog</h2>
          <p>Check your internet connection and TMDB API key, then refresh.</p>
        </div>
      )}

      {status === "loading" && (
        <div className="sf-browse__loading">
          <div className="sf-browse__loading-bar" />
        </div>
      )}

      {status === "ready" && (
        <>
          <HeroBanner
            movie={hero}
            onPlay={setSelectedMovie}
            onMoreInfo={setSelectedMovie}
          />
          <div className="sf-browse__rows">
            {rowsToRender.map(
              (row) =>
                row.movies?.length > 0 && (
                  <MovieRow
                    key={row.title}
                    title={row.title}
                    movies={row.movies}
                    onSelectMovie={setSelectedMovie}
                  />
                )
            )}
          </div>
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          myList={myList}
          onToggleMyList={toggleMyList}
        />
      )}
    </div>
  );
}
