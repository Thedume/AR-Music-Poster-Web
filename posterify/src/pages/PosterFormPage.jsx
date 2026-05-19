import { Link, useNavigate } from "react-router-dom";
    
function PosterFormPage() {
  const navigate = useNavigate();

  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <h1>Posterify</h1>

        <nav>
          <Link to="/admin">포스터 관리</Link>
          <Link to="/">사용자 페이지</Link>
        </nav>
      </aside>

      <section className="admin-content form-content">
        <header className="admin-content-header">
            <div>
                <button
                type="button"
                className="back-button"
                onClick={() => navigate(-1)}
                >
                ← 뒤로가기
                </button>

                <p className="breadcrumb">포스터 관리 / 등록 및 수정</p>
                <h2>포스터 등록하기</h2>
                <p>포스터 이미지와 Spotify 플레이리스트 링크를 연결합니다.</p>
            </div>
        </header>

        <section className="poster-form-layout">
          <form className="poster-form">
            <label>
              포스터 이름
              <input type="text" placeholder="예: 새벽 감성 포스터" />
            </label>

            <label>
              Spotify 플레이리스트 링크
              <input type="url" placeholder="Spotify 링크를 입력해 주세요" />
            </label>

            <label>
              포스터 이미지
              <div className="upload-box">
                <strong>이미지를 업로드해 주세요</strong>
                <p>포스터 또는 앨범 커버 이미지를 선택합니다.</p>
                <input type="file" accept="image/*" />
              </div>
            </label>

            <label className="switch-label">
              <input type="checkbox" defaultChecked />
              공개 상태로 설정하기
            </label>

            <div className="form-buttons">
              <button type="submit" className="primary-button">
                저장하기
              </button>

              <Link to="/admin">
                <button type="button" className="secondary-button">
                  취소하기
                </button>
              </Link>
            </div>
          </form>

          <aside className="preview-card">
            <h3>스캔 미리보기</h3>
            <p>
              저장 후 공개 상태로 설정된 포스터는 사용자가 스캔할 수 있습니다.
            </p>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default PosterFormPage;