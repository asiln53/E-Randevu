import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import axios from "axios"; // axios kütüphanesini ekleyin
import { toast } from "react-hot-toast";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Ana Sayfa",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Randevular",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Doktor Başvurusu",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Destek",
      path: "/support",
      icon: "ri-questionnaire-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Ana Sayfa",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Randevular",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Bilgiler",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Kullanıcılar",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doktorlar",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin
    ? "Admin"
    : user?.isDoctor
    ? "Doktor"
    : "Kullanıcı";

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Çıkış yapılamadı");
      }
      // Kullanıcının local token'ını temizle
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Logo</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div className={`d-flex menu-item `} onClick={handleLogout}>
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Çıkış Yap</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2" to="/">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
