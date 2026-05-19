import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase/authService";

function AdminSidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  }

  return (
    <aside className="admin-sidebar">
      <h1>Posterify</h1>

      <div className="admin-profile">
        <div className="profile-icon">P</div>
        <div>
          <strong>관리자 페이지</strong>
          <p>로그인 사용자</p>
        </div>
      </div>

      <nav>
        <Link className="active" to="/admin">
          포스터 관리
        </Link>
        <Link to="/">사용자 페이지</Link>
        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          로그아웃
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;