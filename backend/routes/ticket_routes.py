from flask import Blueprint, request, jsonify
from services.ticket_service import create_ticket

ticket_bp = Blueprint("ticket_bp", __name__)

@ticket_bp.route("/api/tickets", methods=["POST"])
def add_ticket():

    data = request.get_json()

    ticket_number = create_ticket(
        data["name"],
        data["email"],
        data["subject"],
        data["description"]
    )

    return jsonify({
        "message": "Ticket Created Successfully",
        "ticket_number": ticket_number
    })

@ticket_bp.route("/api/tickets", methods=["GET"])
def get_tickets():
    from database.db import get_connection

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM tickets")
    tickets = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"tickets": tickets}