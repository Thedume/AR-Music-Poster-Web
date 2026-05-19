import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

function HomePage() {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const adminLinkText = user ? "관리자 페이지" : "관리자 로그인";
  const adminLinkPath = user ? "/admin" : "/login";

  return (
    <main className="home-page">
      <header className="top-header">
        <Link to="/" className="logo">
          Posterify
        </Link>

        {!isChecking && (
          <Link to={adminLinkPath} className="text-link">
            {adminLinkText}
          </Link>
        )}
      </header>

      <section className="hero-section">
        <p className="eyebrow">포스터와 음악을 연결하는 작은 경험</p>

        <h2>
          포스터를 스캔하고
          <br />
          플레이리스트를 열어보세요.
        </h2>

        <p className="hero-description">
          액자나 포스터에 담긴 분위기를 Spotify 플레이리스트로 자연스럽게 이어주는
          WebAR 기반 서비스입니다.
        </p>

        <Link to="/scan">
          <button className="primary-button large-button">스캔 시작하기</button>
        </Link>
      </section>

      <section className="guide-section">
        <article className="guide-card">
          <span>1</span>
          <h3>QR 접속</h3>
          <p>QR 코드를 통해 Posterify 웹사이트에 접속합니다.</p>
        </article>

        <article className="guide-card">
          <span>2</span>
          <h3>포스터 스캔</h3>
          <p>카메라로 등록된 포스터나 앨범 커버를 비춥니다.</p>
        </article>

        <article className="guide-card">
          <span>3</span>
          <h3>음악 연결</h3>
          <p>인식된 포스터와 연결된 Spotify 플레이리스트를 열어봅니다.</p>
        </article>
      </section>

      <nav className="bottom-nav">
        <Link to="/">홈</Link>
        <Link to="/scan">스캔</Link>
        {!isChecking && <Link to={adminLinkPath}>관리</Link>}
      </nav>
    </main>
  );
}

export default HomePage;