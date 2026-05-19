function LoginPage() {
  return (
    <main className="page">
      <h1>관리자 로그인</h1>

      <form className="form">
        <input type="email" placeholder="이메일" />
        <input type="password" placeholder="비밀번호" />
        <button type="submit">로그인하기</button>
      </form>
    </main>
  );
}

export default LoginPage;