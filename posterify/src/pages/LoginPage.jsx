import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { loginWithEmail } from "../firebase/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setErrorMessage("이메일 또는 비밀번호를 다시 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <BackButton />

        <h1>Posterify</h1>
        <p>포스터를 등록하고 플레이리스트를 연결하려면 로그인해 주세요.</p>

        <form className="form" onSubmit={handleLogin}>
          <label>
            이메일
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인하기"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;