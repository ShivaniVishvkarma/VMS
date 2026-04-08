import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "⊞", path: "/reception" },
  { label: "Visitors", icon: "◎", path: "/visitors" },
];

function Reception() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleNav = (item) => {
    setActiveNav(item.label);
    navigate(item.path);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f0f4fa" }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 230 : 64,
        background: "#0d2b5e", display: "flex", flexDirection: "column",
        transition: "width 0.25s", overflow: "hidden", flexShrink: 0,
      }}>
        <div style={{ padding: "24px 16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1a56c4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff", flexShrink: 0 }}>V</div>
          {sidebarOpen && (
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>VMS</div>
              <div style={{ color: "#8aaad4", fontSize: 11 }}>Visitor Management</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: "16px 8px" }}>
          {navItems.map(item => (
            <button key={item.label} onClick={() => handleNav(item)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 12px", borderRadius: 8, marginBottom: 4,
              width: "100%", border: "none", cursor: "pointer", whiteSpace: "nowrap",
              background: activeNav === item.label ? "rgba(26,86,196,0.85)" : "transparent",
              color: activeNav === item.label ? "#fff" : "#8aaad4",
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: activeNav === item.label ? 600 : 400 }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1a56c4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>R</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Reception</div>
              <div style={{ color: "#8aaad4", fontSize: 11 }}>reception@vms.com</div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>

        {/* Topbar */}
        <header style={{
          background: "#fff", borderBottom: "1px solid #dde3f0",
          padding: "0 28px", height: 60, display: "flex",
          alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setSidebarOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#555", padding: 4 }}>☰</button>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0d2b5e" }}>Reception Dashboard</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#666" }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
            <button onClick={logout} style={{
              background: "#fce8e6", border: "1px solid #f4b8b5", borderRadius: 8,
              padding: "6px 14px", fontSize: 12, color: "#c5221f", cursor: "pointer", fontWeight: 600,
            }}>Logout</button>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: "28px 32px", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px", gap: 20 }}>
            
            {/* Quick Actions Card mapped to original component logic */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dde3f0", padding: "18px 20px" }}>
              <div style={{ fontWeight: 700, color: "#0d2b5e", fontSize: 15, marginBottom: 14 }}>Quick Actions</div>
              
              <button onClick={() => navigate("/visitors")} style={{
                width: "100%", padding: "10px 14px", marginBottom: 10,
                background: "#1a56c4", color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 600, fontSize: 13,
                cursor: "pointer", textAlign: "left",
              }}>
                Manage Visitors
              </button>

              <button onClick={logout} style={{
                width: "100%", padding: "10px 14px", marginBottom: 10,
                background: "#c5221f", color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 600, fontSize: 13,
                cursor: "pointer", textAlign: "left",
              }}>
                Logout
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Reception;