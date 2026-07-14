import { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieRow.css";

export default function MovieRow({ title, movies, onSelectMovie }) {
  const trackRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  if (!movies?.length) return null;

  function scrollBy(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section
      className="sf-row"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <h2 className="sf-row__title">{title}</h2>

      <div className="sf-row__wrap">
        {hovering && (
          <button className="sf-row__arrow sf-row__arrow--left" onClick={() => scrollBy(-1)} aria-label="Scroll left">
            ‹
          </button>
        )}

        <div className="sf-row__track" ref={trackRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
          ))}
        </div>

        {hovering && (
          <button className="sf-row__arrow sf-row__arrow--right" onClick={() => scrollBy(1)} aria-label="Scroll right">
            ›
          </button>
        )}
      </div>
    </section>
  );
}
