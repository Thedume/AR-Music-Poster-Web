import { Link, useNavigate } from "react-router-dom";
import { dummyPosters } from "../data/dummyPosters";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <h1>Posterify</h1>

        <div className="admin-profile">
          <div className="profile-icon">P</div>
          <div>
            <strong>관리자 페이지</strong>
            <p>posterify@test.com</p>
          </div>
        </div>

        <nav>
          <Link className="active" to="/admin">
            포스터 관리
          </Link>
          <Link to="/">사용자 페이지</Link>
        </nav>
      </aside>

      <section className="admin-content">
        <header className="admin-content-header">
          <div>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
            >
              ← 뒤로가기
            </button>

            <h2>포스터 관리</h2>
            <p>등록된 포스터와 Spotify 플레이리스트를 관리합니다.</p>
          </div>

          <div className="admin-actions">
            <input type="text" placeholder="포스터 검색" />

            <Link to="/admin/posters/new">
              <button className="primary-button">포스터 등록하기</button>
            </Link>
          </div>
        </header>

        <section className="poster-table">
          <div className="poster-table-header">
            <span>포스터</span>
            <span>이름</span>
            <span>Spotify 링크</span>
            <span>상태</span>
            <span>관리</span>
          </div>

          {dummyPosters.map((poster) => (
            <article className="poster-row" key={poster.id}>
              <img src={poster.imageUrl} alt={poster.title} />

              <div>
                <strong>{poster.title}</strong>
                <p>{poster.artist}</p>
              </div>

              <p className="url-text">{poster.spotifyUrl}</p>

              <span className={poster.isPublic ? "status public" : "status private"}>
                {poster.isPublic ? "공개" : "비공개"}
              </span>

              <div className="row-actions">
                <Link to={`/admin/posters/${poster.id}/edit`}>
                  <button className="secondary-button small">수정</button>
                </Link>
                <button className="danger-button small">삭제</button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;