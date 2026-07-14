import "./HeroBanner.css";

export default function HeroBanner({ movie, onPlay, onMoreInfo }) {
  if (!movie) return <div className="sf-hero sf-hero--empty" />;

  return (
    <section
      className="sf-hero"
      style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
    >
      <div className="sf-hero__shade-bottom" />
      <div className="sf-hero__shade-left" />

      <div className="sf-hero__content">
        <h1 className="sf-hero__title">{movie.title}</h1>
        <p className="sf-hero__meta">
          <span className="sf-hero__match">{movie.rating}★</span>
          {movie.year && <span>{movie.year}</span>}
        </p>
        <p className="sf-hero__desc">{movie.overview}</p>

        <div className="sf-hero__actions">
          <button className="sf-btn sf-btn--play" onClick={() => onPlay?.(movie)}>
            <PlayIcon /> Play
          </button>
          <button className="sf-btn sf-btn--info" onClick={() => onMoreInfo?.(movie)}>
            <InfoIcon /> More Info
          </button>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}
