import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="page">
      <h1>Posterify</h1>
      <p>포스터를 스캔하고 연결된 Spotify 플레이리스트를 열어보세요.</p>

      <Link to="/scan">
        <button>스캔 시작하기</button>
      </Link>

      <Link to="/login">
        <button className="sub-button">관리자 로그인</button>
      </Link>
    </main>
  );
}

export default HomePage;