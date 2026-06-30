from flask import Blueprint, request, jsonify
from services.ticket_service import create_ticket
from database.db import get_connection

ticket_bp = Blueprint("ticket_bp", __name__)


# -----------------------------
# Create Ticket
# -----------------------------
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


# -----------------------------
# Get All Tickets
# -----------------------------
@ticket_bp.route("/api/tickets", methods=["GET"])
def get_tickets():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM tickets ORDER BY id DESC")

    tickets = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "tickets": tickets
    })


# -----------------------------
# Update Ticket
# -----------------------------
@ticket_bp.route("/api/tickets/<int:ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):

    data = request.get_json()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE tickets
        SET status=%s,
            resolution=%s
        WHERE id=%s
        """,
        (
            data["status"],
            data["resolution"],
            ticket_id
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Ticket Updated Successfully"
    })