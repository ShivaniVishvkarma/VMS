import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "⊞", path: "/admin" },
  { label: "Visitors", icon: "◎", path: "/visitors" },
  { label: "Reception", icon: "⊡", path: "/reception" },
  { label: "Users", icon: "⊙", path: "/users" },
];

function Users() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Users");

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!username || !role) {
      alert("Enter username and role");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role, password: "123" })
      });
      if (res.ok) {
        setUsername("");
        setRole("");
        fetchUsers();
      } else {
        alert("Error adding user");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
      } else {
        alert("Error deleting user");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

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
        width: sidebarOpen ? 230 : 64, background: "#0d2b5e", display: "flex", flexDirection: "column",
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
              display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 8, marginBottom: 4,
              width: "100%", border: "none", cursor: "pointer", whiteSpace: "nowrap",
              background: activeNav === item.label ? "rgba(26,86,196,0.85)" : "transparent",
              color: activeNav === item.label ? "#fff" : "#8aaad4",
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: activeNav === item.label ? 600 : 400 }}>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        
        {/* Topbar */}
        <header style={{
          background: "#fff", borderBottom: "1px solid #dde3f0", padding: "0 28px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#555", padding: 4 }}>☰</button>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0d2b5e" }}>Manage Users</div>
          </div>
          <button onClick={logout} style={{
            background: "#fce8e6", border: "1px solid #f4b8b5", borderRadius: 8,
            padding: "6px 14px", fontSize: 12, color: "#c5221f", cursor: "pointer", fontWeight: 600,
          }}>Logout</button>
        </header>

        {/* Content */}
        <div style={{ padding: "28px 32px", flex: 1 }}>
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dde3f0", overflow: "hidden", maxWidth: 800 }}>
            
            {/* Add User Controls */}
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #edf0f7", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ fontWeight: 700, color: "#0d2b5e", fontSize: 15, marginRight: "auto" }}>System Users</div>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid #dde3f0", borderRadius: 6, fontSize: 13, outline: "none" }} />
              <input type="text" placeholder="Role (Admin/Receptionist)" value={role} onChange={(e) => setRole(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid #dde3f0", borderRadius: 6, fontSize: 13, outline: "none" }} />
              <button onClick={addUser} style={{
                background: "#1a56c4", color: "#fff", border: "none", padding: "8px 16px",
                borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer"
              }}>+ Add User</button>
            </div>

            {/* Users Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f7f9fd" }}>
                  <th style={{ padding: "10px 22px", textAlign: "left", color: "#6b7a99", fontWeight: 600, fontSize: 12 }}>ID</th>
                  <th style={{ padding: "10px 22px", textAlign: "left", color: "#6b7a99", fontWeight: 600, fontSize: 12 }}>Username</th>
                  <th style={{ padding: "10px 22px", textAlign: "left", color: "#6b7a99", fontWeight: 600, fontSize: 12 }}>Role</th>
                  <th style={{ padding: "10px 22px", textAlign: "right", color: "#6b7a99", fontWeight: 600, fontSize: 12 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="4" style={{ padding: "20px", textAlign: "center", color: "#666" }}>No users found.</td></tr>
                ) : (
                  users.map((user, i) => (
                    <tr key={user.id} style={{ borderTop: "1px solid #edf0f7", background: i % 2 === 0 ? "#fff" : "#fafbfd" }}>
                      <td style={{ padding: "12px 22px", color: "#555" }}>#{user.id}</td>
                      <td style={{ padding: "12px 22px", fontWeight: 600, color: "#1a1a2e" }}>{user.username}</td>
                      <td style={{ padding: "12px 22px", color: "#555" }}>
                        <span style={{ 
                          background: user.role.toLowerCase() === 'admin' ? '#e8eaf6' : '#fff3e0',
                          color: user.role.toLowerCase() === 'admin' ? '#283593' : '#e65100',
                          padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 
                        }}>{user.role}</span>
                      </td>
                      <td style={{ padding: "12px 22px", textAlign: "right" }}>
                        <button onClick={() => deleteUser(user.id)} style={{
                          background: "#fce8e6", color: "#c5221f", border: "1px solid #f4b8b5",
                          padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer"
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default Users;