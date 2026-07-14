import "./MovieCard.css";

export default function MovieCard({ movie, onClick }) {
  return (
    <button className="sf-card" onClick={() => onClick?.(movie)} type="button">
      <div className="sf-card__poster-wrap">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} loading="lazy" className="sf-card__poster" />
        ) : (
          <div className="sf-card__fallback">{movie.title}</div>
        )}
        <div className="sf-card__overlay">
          <p className="sf-card__title">{movie.title}</p>
          <p className="sf-card__rating">★ {movie.rating}</p>
        </div>
      </div>
    </button>
  );
}
