import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "⊞", path: "/admin" },
  { label: "Visitors", icon: "◎", path: "/visitors" },
  { label: "Reception", icon: "⊡", path: "/reception" },
  { label: "Users", icon: "⊙", path: "/users" },
];

const recentVisitors = [
  { id: 1, name: "Rajesh Kumar", host: "Amit Sharma", purpose: "Meeting", checkIn: "09:15 AM", status: "Inside" },
  { id: 2, name: "Priya Mehta", host: "Neha Verma", purpose: "Interview", checkIn: "10:00 AM", status: "Inside" },
  { id: 3, name: "Suresh Nair", host: "Rohit Singh", purpose: "Delivery", checkIn: "10:30 AM", status: "Checked Out" },
  { id: 4, name: "Anita Joshi", host: "Kavita Rao", purpose: "Client Visit", checkIn: "11:00 AM", status: "Inside" },
  { id: 5, name: "Vikram Bose", host: "Deepak Gupta", purpose: "Maintenance", checkIn: "11:45 AM", status: "Checked Out" },
];

const statusStyle = (status) =>
  status === "Inside"
    ? { background: "#e6f4ea", color: "#1a6e31", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 }
    : { background: "#f1f3f4", color: "#5f6368", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 };

function Admin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://127.0.0.1:8000/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load stats. Check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleNav = (item) => {
    setActiveNav(item.label);
    navigate(item.path);
  };

  const statCards = [
    { label: "Total Users", value: stats.total_users ?? "—", up: null, change: "+0%" },
    { label: "Total Visitors", value: stats.total_visitors ?? "—", up: true, change: "+8%" },
    { label: "Currently Inside", value: stats.currently_inside ?? "—", up: true, change: "+2" },
    { label: "Pending Approvals", value: stats.pending_approvals ?? "—", up: false, change: "-1" },
  ];

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
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1a56c4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Admin</div>
              <div style={{ color: "#8aaad4", fontSize: 11 }}>admin@vms.com</div>
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
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0d2b5e" }}>Admin Dashboard</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#666" }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
            <button onClick={fetchStats} style={{
              background: "#f0f4fa", border: "1px solid #dde3f0", borderRadius: 8,
              padding: "6px 12px", fontSize: 12, color: "#1a56c4", cursor: "pointer", fontWeight: 600,
            }}>↺ Refresh</button>
            <button onClick={logout} style={{
              background: "#fce8e6", border: "1px solid #f4b8b5", borderRadius: 8,
              padding: "6px 14px", fontSize: 12, color: "#c5221f", cursor: "pointer", fontWeight: 600,
            }}>Logout</button>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: "28px 32px", flex: 1 }}>

          {/* Error banner */}
          {error && (
            <div style={{
              background: "#fce8e6", border: "1px solid #f4b8b5", color: "#c5221f",
              borderRadius: 8, padding: "12px 18px", marginBottom: 20, fontSize: 13, fontWeight: 500,
            }}>⚠ {error}</div>
          )}

          {/* Stat cards — live from Flask /stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
            {statCards.map(s => (
              <div key={s.label} style={{
                background: "#fff", borderRadius: 12,
                border: "1px solid #dde3f0", padding: "20px 22px",
              }}>
                <div style={{ fontSize: 12, color: "#6b7a99", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: loading ? "#ccc" : "#0d2b5e" }}>
                    {loading ? "..." : s.value}
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                    background: s.up === true ? "#e6f4ea" : s.up === false ? "#fce8e6" : "#f1f3f4",
                    color: s.up === true ? "#1a6e31" : s.up === false ? "#c5221f" : "#5f6368",
                  }}>{s.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

            {/* Recent visitors table */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dde3f0", overflow: "hidden" }}>
              <div style={{ padding: "18px 22px", borderBottom: "1px solid #edf0f7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700, color: "#0d2b5e", fontSize: 15 }}>Recent Visitors</div>
                <button onClick={() => navigate("/visitors")} style={{
                  fontSize: 13, color: "#1a56c4", background: "none", border: "none", cursor: "pointer", fontWeight: 500,
                }}>View All →</button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f7f9fd" }}>
                    {["Name", "Host", "Purpose", "Check-In", "Status"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#6b7a99", fontWeight: 600, fontSize: 12, letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentVisitors.map((v, i) => (
                    <tr key={v.id} style={{ borderTop: "1px solid #edf0f7", background: i % 2 === 0 ? "#fff" : "#fafbfd" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 500, color: "#1a1a2e" }}>{v.name}</td>
                      <td style={{ padding: "12px 16px", color: "#555" }}>{v.host}</td>
                      <td style={{ padding: "12px 16px", color: "#555" }}>{v.purpose}</td>
                      <td style={{ padding: "12px 16px", color: "#555" }}>{v.checkIn}</td>
                      <td style={{ padding: "12px 16px" }}><span style={statusStyle(v.status)}>{v.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick actions + live stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dde3f0", padding: "18px 20px" }}>
                <div style={{ fontWeight: 700, color: "#0d2b5e", fontSize: 15, marginBottom: 14 }}>Quick Actions</div>
                {[
                  { label: "Manage Users", action: () => navigate("/users"), color: "#1a56c4" },
                  { label: "View Visitors", action: () => navigate("/visitors"), color: "#0d2b5e" },
                  { label: "Reception Desk", action: () => navigate("/reception"), color: "#1a56c4" },
                  { label: "Logout", action: logout, color: "#c5221f" },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} style={{
                    width: "100%", padding: "10px 14px", marginBottom: 10,
                    background: btn.color, color: "#fff", border: "none",
                    borderRadius: 8, fontWeight: 600, fontSize: 13,
                    cursor: "pointer", textAlign: "left",
                  }}>{btn.label}</button>
                ))}
              </div>

              {/* Live stats from backend */}
              <div style={{ background: "#0d2b5e", borderRadius: 12, padding: "18px 20px", color: "#fff" }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Live Stats</div>
                {[
                  { label: "Total Users", value: stats.total_users },
                  { label: "Total Visitors", value: stats.total_visitors },
                  { label: "Currently Inside", value: stats.currently_inside },
                  { label: "Pending Approvals", value: stats.pending_approvals },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: "#8aaad4" }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{loading ? "..." : (row.value ?? "—")}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;