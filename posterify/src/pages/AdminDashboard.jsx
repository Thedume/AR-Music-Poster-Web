import { Link } from "react-router-dom";
import { dummyPosters } from "../data/dummyPosters";

function AdminDashboard() {
  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>포스터 관리</h1>

        <Link to="/admin/posters/new">
          <button>포스터 등록하기</button>
        </Link>
      </header>

      <section className="poster-list">
        {dummyPosters.map((poster) => (
          <article className="poster-card" key={poster.id}>
            <img src={poster.imageUrl} alt={poster.title} />

            <div>
              <h2>{poster.title}</h2>
              <p>{poster.spotifyUrl}</p>
              <span>{poster.isPublic ? "공개" : "비공개"}</span>
            </div>

            <Link to={`/admin/posters/${poster.id}/edit`}>
              <button className="sub-button">수정하기</button>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default AdminDashboard;