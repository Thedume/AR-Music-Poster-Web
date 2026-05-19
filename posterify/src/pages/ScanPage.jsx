import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicPosters } from "../firebase/posterService";
import MindARScanner from "../components/MindARScanner";

function ScanPage() {
  const navigate = useNavigate();

  const scanLockedRef = useRef(false);

  const [showModal, setShowModal] = useState(false);
  const [publicPosters, setPublicPosters] = useState([]);
  const [isLoadingPosters, setIsLoadingPosters] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [detectedPoster, setDetectedPoster] = useState(null);
  const [isScannerVisible, setIsScannerVisible] = useState(true);
  const [scanMessage, setScanMessage] = useState("포스터를 찾고 있어요...");
  const [isOpeningSpotify, setIsOpeningSpotify] = useState(false);

  async function loadPublicPosters() {
    try {
      setIsLoadingPosters(true);
      setErrorMessage("");

      const posters = await getPublicPosters();
      setPublicPosters(posters);
    } catch (error) {
      console.error(error);
      setErrorMessage("공개 포스터 정보를 불러오지 못했습니다.");
    } finally {
      setIsLoadingPosters(false);
    }
  }

  function vibrateOnDetected() {
    if ("vibrate" in navigator) {
      navigator.vibrate([120, 60, 120]);
    }
  }

  const handleTargetFound = useCallback((poster) => {
    if (scanLockedRef.current) {
      return;
    }

    scanLockedRef.current = true;

    vibrateOnDetected();
    setDetectedPoster(poster);
    setScanMessage("포스터를 인식했어요.");
    setShowModal(true);
  }, []);

  const handleMindARError = useCallback((message) => {
    setErrorMessage(message);
  }, []);

  function handleBack() {
    setIsScannerVisible(false);

    setTimeout(() => {
      navigate("/");
    }, 100);
  }

  function handleRetryScan() {
    setShowModal(false);
    setDetectedPoster(null);
    setIsOpeningSpotify(false);
    setScanMessage("포스터를 찾고 있어요...");

    setTimeout(() => {
      scanLockedRef.current = false;
    }, 500);
  }

  function openSpotify() {
    if (!detectedPoster?.spotifyUrl || isOpeningSpotify) return;

    setIsOpeningSpotify(true);
    scanLockedRef.current = true;

    window.location.href = detectedPoster.spotifyUrl;
  }

  useEffect(() => {
    loadPublicPosters();
  }, []);

  return (
    <main className="scan-page">
      {isScannerVisible && !isLoadingPosters && publicPosters.length > 0 && (
        <MindARScanner
          posters={publicPosters}
          onTargetFound={handleTargetFound}
          onError={handleMindARError}
        />
      )}

      <div className="camera-dim" />

      <header className="scan-header">
        <button type="button" className="circle-button" onClick={handleBack}>
          ←
        </button>

        <h1>스캔</h1>

        <div className="circle-spacer" />
      </header>

      <section className="scan-instruction">
        <p>포스터가 화면 중앙에 들어오도록 비춰주세요</p>
      </section>

      <div className={detectedPoster ? "scan-status detected" : "scan-status"}>
        <span>{detectedPoster ? "♪" : "▣"}</span>
        <p>
          {isLoadingPosters
            ? "포스터 정보를 불러오고 있어요..."
            : scanMessage}
        </p>
      </div>

      {errorMessage && (
        <section className="camera-error-box">
          <p>{errorMessage}</p>
        </section>
      )}

      {!isLoadingPosters && publicPosters.length === 0 && (
        <section className="camera-error-box">
          <p>공개된 포스터가 아직 없습니다.</p>
        </section>
      )}

      {showModal && detectedPoster && (
        <div className="modal-backdrop">
          <section className="playlist-modal">
            <div className="playlist-cover-wrap">
              <img
                className="playlist-cover"
                src={detectedPoster.imageUrl}
                alt={detectedPoster.title}
              />
            </div>

            <p className="success-label">포스터 인식 완료</p>

            <h2>{detectedPoster.title}</h2>

            <p className="playlist-description">
              {detectedPoster.artist || "이 포스터와 연결된 플레이리스트입니다."}
            </p>

            <button
              className="primary-button"
              onClick={openSpotify}
              disabled={isOpeningSpotify}
            >
              {isOpeningSpotify ? "이동 중..." : "플레이리스트 열기"}
            </button>

            <button className="secondary-button" onClick={handleRetryScan}>
              다시 스캔하기
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default ScanPage;