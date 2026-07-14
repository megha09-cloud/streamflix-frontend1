import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/tmdb";
import "./MovieModal.css";

export default function MovieModal({ movie, onClose, myList, onToggleMyList }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchMovieDetails(movie.id)
      .then((d) => active && setDetails(d))
      .catch(() => active && setDetails(movie))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [movie.id]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const data = details || movie;
  const inList = myList?.some((m) => m.id === movie.id);

  return (
    <div className="sf-modal-backdrop" onClick={onClose}>
      <div className="sf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="sf-modal__close" onClick={onClose} aria-label="Close">✕</button>

        <div
          className="sf-modal__hero"
          style={{ backgroundImage: `url(${data.backdrop || data.poster})` }}
        >
          <div className="sf-modal__hero-shade" />
          <div className="sf-modal__hero-content">
            <h2>{data.title}</h2>
            <div className="sf-modal__actions">
              <button className="sf-btn sf-btn--play sf-btn--sm">▶ Play</button>
              {data.trailerKey && (
                <a
                  className="sf-btn sf-btn--info sf-btn--sm"
                  href={`https://www.youtube.com/watch?v=${data.trailerKey}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Trailer
                </a>
              )}
              <button
                className={`sf-modal__list-btn ${inList ? "sf-modal__list-btn--active" : ""}`}
                onClick={() => onToggleMyList?.(movie)}
                aria-label="Add to My List"
                title="Add to My List"
              >
                {inList ? "✓" : "+"}
              </button>
            </div>
          </div>
        </div>

        <div className="sf-modal__body">
          {loading ? (
            <p className="sf-modal__loading">Loading details…</p>
          ) : (
            <>
              <div className="sf-modal__meta">
                <span className="sf-modal__match">{data.rating}★</span>
                {data.year && <span>{data.year}</span>}
                {data.runtime && <span>{data.runtime} min</span>}
              </div>
              <p className="sf-modal__desc">{data.overview}</p>
              {data.genres?.length > 0 && (
                <p className="sf-modal__genres">
                  <strong>Genres:</strong> {data.genres.join(", ")}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
