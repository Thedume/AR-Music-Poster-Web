import { useState } from "react";
import { Link } from "react-router-dom";

function ScanPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="scan-page">
      <div className="camera-background">
        <div className="camera-overlay" />
      </div>

      <header className="scan-header">
        <Link to="/" className="circle-button">
          ←
        </Link>
        <h1>스캔</h1>
        <div className="circle-spacer" />
      </header>

      <section className="scan-instruction">
        <p>포스터를 카메라에 비춰주세요</p>
      </section>

      <section className="scan-viewfinder">
        <div className="viewfinder-box">
          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />
          <div className="scan-line" />
          <span className="focus-icon">◎</span>
        </div>
      </section>

      <section className="scan-controls">
        <button className="circle-control">번개</button>

        <button className="capture-button" onClick={() => setShowModal(true)}>
          <span />
        </button>

        <button className="circle-control">사진</button>
      </section>

      <div className="scan-status">
        <span>▣</span>
        <p>포스터를 찾고 있어요...</p>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <section className="unregistered-modal">
            <div className="warning-icon">!</div>

            <h2>등록되지 않은 포스터예요</h2>

            <p>
              아직 등록되지 않은 포스터입니다. 다른 포스터를 다시 스캔해 주세요.
            </p>

            <button className="primary-button" onClick={() => setShowModal(false)}>
              다시 스캔하기
            </button>

            <Link to="/">
              <button className="secondary-button">종료하기</button>
            </Link>
          </section>
        </div>
      )}
    </main>
  );
}

export default ScanPage;