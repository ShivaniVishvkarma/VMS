import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/reception");
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      background: "#f0f4fa",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #dde3f0",
        padding: "48px 40px",
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 8px 32px rgba(13, 43, 94, 0.08)",
        backdropFilter: "blur(10px)"
      }}>
        {/* Logo/Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #1a56c4 0%, #0d2b5e 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 28,
            fontWeight: 700,
            color: "#fff",
            boxShadow: "0 8px 24px rgba(26, 86, 196, 0.3)"
          }}>
            V
          </div>
          <div style={{ 
            fontSize: 28, 
            fontWeight: 800, 
            color: "#0d2b5e", 
            marginBottom: 4 
          }}>
            VMS
          </div>
          <div style={{ 
            color: "#6b7a99", 
            fontSize: 15, 
            fontWeight: 500 
          }}>
            Visitor Management System
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#0d2b5e",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "2px solid #e8ecf4",
                borderRadius: 12,
                fontSize: 15,
                background: "#fafbfd",
                transition: "all 0.2s",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#1a56c4"}
              onBlur={(e) => e.target.style.borderColor = "#e8ecf4"}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#0d2b5e",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "2px solid #e8ecf4",
                borderRadius: 12,
                fontSize: 15,
                background: "#fafbfd",
                transition: "all 0.2s",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#1a56c4"}
              onBlur={(e) => e.target.style.borderColor = "#e8ecf4"}
            />
          </div>

          <button 
            onClick={handleLogin} 
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #1a56c4 0%, #0d2b5e 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(26, 86, 196, 0.3)"
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 8px 24px rgba(26, 86, 196, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 16px rgba(26, 86, 196, 0.3)";
              }
            }}
          >
            {loading ? (
              <>
                <span style={{ marginRight: 8 }}>⏳</span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid #e8ecf4",
          fontSize: 13,
          color: "#6b7a99"
        }}>
          © 2026 VMS. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Login;
