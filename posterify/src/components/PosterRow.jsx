import { Link } from "react-router-dom";

function PosterRow({ poster, onDelete }) {
  return (
    <article className="poster-row">
      <img src={poster.imageUrl} alt={poster.title} />

      <div>
        <strong>{poster.title}</strong>
        <p>{poster.artist || "설명 없음"}</p>
      </div>

      <p className="url-text">{poster.spotifyUrl}</p>

      <span className={poster.isPublic ? "status public" : "status private"}>
        {poster.isPublic ? "공개" : "비공개"}
      </span>

      <div className="row-actions">
        <Link to={`/admin/posters/${poster.id}/edit`}>
          <button className="secondary-button small">수정</button>
        </Link>

        <button
          type="button"
          className="danger-button small"
          onClick={() => onDelete(poster.id)}
        >
          삭제
        </button>
      </div>
    </article>
  );
}

export default PosterRow;