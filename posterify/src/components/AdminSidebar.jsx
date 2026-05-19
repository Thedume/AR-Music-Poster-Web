import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h1>Posterify</h1>

      <div className="admin-profile">
        <div className="profile-icon">P</div>
        <div>
          <strong>관리자 페이지</strong>
          <p>posterify@test.com</p>
        </div>
      </div>

      <nav>
        <Link className="active" to="/admin">
          포스터 관리
        </Link>
        <Link to="/">사용자 페이지</Link>
      </nav>
    </aside>
  );
}

export default AdminSidebar;