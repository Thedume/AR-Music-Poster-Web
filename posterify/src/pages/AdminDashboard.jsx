import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import BackButton from "../components/BackButton";
import PosterRow from "../components/PosterRow";
import { deletePoster, getPosters } from "../firebase/posterService";

function AdminDashboard() {
  const [posters, setPosters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPosters() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const posterList = await getPosters();
      setPosters(posterList);
    } catch (error) {
      console.error(error);
      setErrorMessage("포스터 목록을 불러오는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletePoster(posterId) {
    const isConfirmed = window.confirm("이 포스터를 삭제할까요?");

    if (!isConfirmed) {
      return;
    }

    try {
      await deletePoster(posterId);
      await loadPosters();
    } catch (error) {
      console.error(error);
      alert("포스터를 삭제하는 중 문제가 발생했습니다.");
    }
  }

  const filteredPosters = posters.filter((poster) => {
    const title = poster.title || "";
    const artist = poster.artist || "";

    return (
      title.toLowerCase().includes(searchText.toLowerCase()) ||
      artist.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  useEffect(() => {
    loadPosters();
  }, []);

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
            <input
              type="text"
              placeholder="포스터 검색"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <Link to="/admin/posters/new">
              <button className="primary-button">포스터 등록하기</button>
            </Link>
          </div>
        </header>

        {isLoading && (
          <p className="admin-message">포스터 목록을 불러오고 있어요...</p>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {!isLoading && !errorMessage && posters.length === 0 && (
          <p className="admin-message">아직 등록된 포스터가 없습니다.</p>
        )}

        {!isLoading && posters.length > 0 && filteredPosters.length === 0 && (
          <p className="admin-message">검색 결과가 없습니다.</p>
        )}

        {!isLoading && filteredPosters.length > 0 && (
          <section className="poster-table">
            <div className="poster-table-header">
              <span>포스터</span>
              <span>이름</span>
              <span>Spotify 링크</span>
              <span>상태</span>
              <span>관리</span>
            </div>

            {filteredPosters.map((poster) => (
              <PosterRow
                key={poster.id}
                poster={poster}
                onDelete={handleDeletePoster}
              />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;