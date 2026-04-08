import { useEffect, useState } from "react";

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");

  const fetchVisitors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/visitors");
      const data = await res.json();
      setVisitors(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching visitors");
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const addVisitor = async () => {
    if (!name || !purpose) {
      alert("Enter name and purpose");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, purpose })
      });

      if (res.ok) {
        setName("");
        setPurpose("");
        fetchVisitors();
      } else {
        alert("Error adding visitor");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const deleteVisitor = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/visitors/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        fetchVisitors();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Visitors</h2>

      {/* Add Visitor */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Visitor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <button onClick={addVisitor}>Add Visitor</button>
      </div>

      {/* List */}
      {visitors.map((v) => (
  <div key={v.id} style={{ marginBottom: "10px" }}>
    <strong>{v.name}</strong> - {v.purpose}

    <br />

    Status: {v.status}  
    Entry: {v.entry_time}  
    Exit: {v.exit_time || "—"}

    {v.status === "IN" && (
      <button
        onClick={async () => {
          await fetch(`http://127.0.0.1:8000/visitors/exit/${v.id}`, {
            method: "PATCH"
          });
          fetchVisitors();
        }}
        style={{ marginLeft: "10px" }}
      >
        Mark Exit
      </button>
    )}

    <button
      onClick={() => deleteVisitor(v.id)}
      style={{ marginLeft: "10px" }}
    >
      Delete
    </button>
  </div>
))}
    </div>
  );
}

export default Visitors;