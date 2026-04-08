from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# 🔹 In-memory database
users = [
    {
        "id": 1,
        "username": "admin",
        "password": "admin",
        "role": "Admin"
    },
    {
        "id": 2,
        "username": "staff",
        "password": "123",
        "role": "Receptionist"
    }
]

visitors = []

user_id = 3
visitor_id = 1


# 🔐 LOGIN
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    for user in users:
        if user["username"] == data["username"] and user["password"] == data["password"]:
            return jsonify({
                "token": "fake-token",
                "role": user["role"]
            })

    return jsonify({"error": "Invalid credentials"}), 401


# 👤 USERS

# GET USERS
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)


# ADD USER
@app.route('/users', methods=['POST'])
def add_user():
    global user_id
    data = request.json

    data["id"] = user_id
    user_id += 1

    users.append(data)

    return jsonify({"message": "User added"})


# DELETE USER
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    users = [user for user in users if user["id"] != user_id]
    return jsonify({"message": "User deleted"})


# UPDATE USER
@app.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    data = request.json

    for user in users:
        if user["id"] == user_id:
            user["username"] = data.get("username", user["username"])
            user["role"] = data.get("role", user["role"])
            return jsonify({"message": "User updated"})

    return jsonify({"error": "User not found"}), 404


# 🚶 VISITORS

# GET VISITORS
@app.route('/visitors', methods=['GET'])
def get_visitors():
    return jsonify(visitors)


# ADD VISITOR (WITH IN TIME)
@app.route('/visitors', methods=['POST'])
def add_visitor():
    global visitor_id
    data = request.json

    visitor = {
        "id": visitor_id,
        "name": data["name"],
        "purpose": data["purpose"],
        "entry_time": datetime.now().strftime("%H:%M:%S"),
        "exit_time": None,
        "status": "IN"
    }

    visitor_id += 1
    visitors.append(visitor)

    return jsonify({"message": "Visitor added"})


# DELETE VISITOR
@app.route('/visitors/<int:visitor_id>', methods=['DELETE'])
def delete_visitor(visitor_id):
    global visitors
    visitors = [v for v in visitors if v["id"] != visitor_id]
    return jsonify({"message": "Visitor deleted"})


# MARK EXIT
@app.route('/visitors/exit/<int:visitor_id>', methods=['PATCH'])
def exit_visitor(visitor_id):
    for v in visitors:
        if v["id"] == visitor_id:
            v["exit_time"] = datetime.now().strftime("%H:%M:%S")
            v["status"] = "OUT"
            return jsonify({"message": "Visitor exited"})

    return jsonify({"error": "Not found"}), 404


# 📊 DASHBOARD STATS
@app.route('/stats', methods=['GET'])
def get_stats():
    return jsonify({
        "total_users": len(users),
        "total_visitors": len(visitors)
    })


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
