import { Link } from "react-router-dom";
import { dummyPosters } from "../data/dummyPosters";
import AdminSidebar from "../components/AdminSidebar";
import BackButton from "../components/BackButton";
import PosterRow from "../components/PosterRow";

function AdminDashboard() {
  return (
    <main className="admin-layout">
      <AdminSidebar />

      <section className="admin-content">
        <header className="admin-content-header">
          <div>
            <BackButton />

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
            <PosterRow key={poster.id} poster={poster} />
          ))}
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;