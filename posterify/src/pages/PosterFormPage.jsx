function PosterFormPage() {
  return (
    <main className="page">
      <h1>포스터 등록 / 수정</h1>

      <form className="form">
        <label>
          포스터 이름
          <input type="text" placeholder="예: 여름밤 플레이리스트 포스터" />
        </label>

        <label>
          Spotify 플레이리스트 링크
          <input type="url" placeholder="Spotify 링크를 입력해주세요" />
        </label>

        <label>
          포스터 이미지
          <input type="file" accept="image/*" />
        </label>

        <label className="checkbox-label">
          <input type="checkbox" />
          공개 상태로 설정하기
        </label>

        <button type="submit">저장하기</button>
      </form>
    </main>
  );
}

export default PosterFormPage;