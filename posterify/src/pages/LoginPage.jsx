import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <section className="login-card">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← 뒤로가기
        </button>

        <h1>Posterify</h1>
        <p>포스터를 등록하고 플레이리스트를 연결하려면 로그인해 주세요.</p>

        <form className="form">
          <label>
            이메일
            <input type="email" placeholder="이메일을 입력해 주세요" />
          </label>

          <label>
            비밀번호
            <input type="password" placeholder="비밀번호를 입력해 주세요" />
          </label>

          <button type="submit" className="primary-button">
            로그인하기
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;