import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import BackButton from "../components/BackButton";
import {
  createPoster,
  getPosterById,
  updatePoster,
} from "../firebase/posterService";

function PosterFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(isEditMode);
  const [errorMessage, setErrorMessage] = useState("");

  const [targetIndex, setTargetIndex] = useState("");

  useEffect(() => {
    async function loadPoster() {
      if (!isEditMode) return;

      try {
        setIsPageLoading(true);
        setErrorMessage("");

        const poster = await getPosterById(id);

        if (!poster) {
          setErrorMessage("해당 포스터를 찾을 수 없습니다.");
          return;
        }

        setTitle(poster.title || "");
        setArtist(poster.artist || "");
        setSpotifyUrl(poster.spotifyUrl || "");
        setImageUrl(poster.imageUrl || "");
        setPreviewUrl(poster.imageUrl || "");
        setIsPublic(Boolean(poster.isPublic));
        setTargetIndex(
          poster.targetIndex !== undefined && poster.targetIndex !== null
            ? String(poster.targetIndex)
            : ""
        );
      } catch (error) {
        console.error(error);
        setErrorMessage("포스터 정보를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setIsPageLoading(false);
      }
    }

    loadPoster();
  }, [id, isEditMode]);

  function handleImageUrlChange(event) {
    const url = event.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
  }

  function validateForm() {
    if (!title.trim()) {
      return "포스터 이름을 입력해 주세요.";
    }

    if (!spotifyUrl.trim()) {
      return "Spotify 플레이리스트 링크를 입력해 주세요.";
    }

    if (!spotifyUrl.startsWith("https://open.spotify.com/")) {
      return "Spotify 링크는 https://open.spotify.com/ 로 시작해야 합니다.";
    }

    if (!imageUrl.trim()) {
      return "포스터 이미지 주소를 입력해 주세요.";
    }

    if (targetIndex === "") {
      return "MindAR target index를 입력해 주세요.";
    }

    if (Number.isNaN(Number(targetIndex))) {
      return "MindAR target index는 숫자로 입력해 주세요.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const posterData = {
        title: title.trim(),
        artist: artist.trim(),
        spotifyUrl: spotifyUrl.trim(),
        imageUrl: imageUrl.trim(),
        isPublic,
        targetIndex: Number(targetIndex),
      };

      if (isEditMode) {
        await updatePoster(id, posterData);
      } else {
        await createPoster(posterData);
      }

      navigate("/admin");
    } catch (error) {
      console.error(error);
      setErrorMessage("저장 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isPageLoading) {
    return (
      <main className="admin-layout">
        <AdminSidebar />

        <section className="admin-content">
          <p className="admin-message">포스터 정보를 불러오고 있어요...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-layout">
      <AdminSidebar />

      <section className="admin-content form-content">
        <header className="admin-content-header">
          <div>
            <BackButton />

            <p className="breadcrumb">
              포스터 관리 / {isEditMode ? "수정" : "등록"}
            </p>
            <h2>{isEditMode ? "포스터 수정하기" : "포스터 등록하기"}</h2>
            <p>포스터 이미지 주소와 Spotify 플레이리스트 링크를 연결합니다.</p>
          </div>
        </header>

        <section className="poster-form-layout">
          <form className="poster-form" onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <label>
              포스터 이름
              <input
                type="text"
                placeholder="예: 새벽 감성 포스터"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label>
              설명 또는 아티스트
              <input
                type="text"
                placeholder="예: 잔잔한 새벽 플레이리스트"
                value={artist}
                onChange={(event) => setArtist(event.target.value)}
              />
            </label>

            <label>
              Spotify 플레이리스트 링크
              <input
                type="url"
                placeholder="Spotify 링크를 입력해 주세요"
                value={spotifyUrl}
                onChange={(event) => setSpotifyUrl(event.target.value)}
              />
            </label>

            <label>
              MindAR target index
              <input
                type="number"
                placeholder="예: 0"
                value={targetIndex}
                onChange={(event) => setTargetIndex(event.target.value)}
              />
            </label>
            
            <label>
              포스터 이미지 주소
              <input
                type="url"
                placeholder="이미지 주소를 입력해 주세요"
                value={imageUrl}
                onChange={handleImageUrlChange}
              />
            </label>

            <label className="switch-label">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(event) => setIsPublic(event.target.checked)}
              />
              공개 상태로 설정하기
            </label>

            <div className="form-buttons">
              <button
                type="submit"
                className="primary-button"
                disabled={isLoading}
              >
                {isLoading ? "저장 중..." : "저장하기"}
              </button>

              <Link to="/admin">
                <button type="button" className="secondary-button">
                  취소하기
                </button>
              </Link>
            </div>
          </form>

          <aside className="preview-card natural-preview-card">
            <h3>스캔 미리보기</h3>

            {previewUrl ? (
              <img
                className="preview-image-natural"
                src={previewUrl}
                alt="포스터 미리보기"
              />
            ) : (
              <div className="preview-empty">
                이미지 주소를 입력하면 미리보기가 표시됩니다.
              </div>
            )}

            <p>등록된 이미지는 원본 비율을 유지해서 표시됩니다.</p>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default PosterFormPage;