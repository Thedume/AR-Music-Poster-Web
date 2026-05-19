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
      <Link to="/" className="sidebar-logo">
        Posterify
      </Link>

      <div className="admin-profile">
        <div className="profile-icon">P</div>
        <div>
          <strong>관리자 페이지</strong>
          <p>로그인 상태 유지 중</p>
        </div>
      </div>

      <nav>
        <Link className="active" to="/admin">
          포스터 관리
        </Link>

        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          로그아웃
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;