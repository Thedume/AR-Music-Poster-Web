import { Link } from "react-router-dom";

function ScanPage() {
  return (
    <main className="page">
      <h1>포스터 스캔</h1>
      <p>포스터를 카메라에 비춰주세요.</p>

      <div className="scan-box">
        <p>카메라 화면 영역</p>
      </div>

      <div className="button-group">
        <button>다시 스캔하기</button>
        <Link to="/">
          <button className="sub-button">나가기</button>
        </Link>
      </div>
    </main>
  );
}

export default ScanPage;