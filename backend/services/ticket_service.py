from database.db import get_connection

def create_ticket(name, email, subject, description):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    if user:
        user_id = user[0]
    else:
        cursor.execute(
            """
            INSERT INTO users(full_name,email,role)
            VALUES(%s,%s,'Customer')
            """,
            (name, email)
        )

        conn.commit()
        user_id = cursor.lastrowid

    cursor.execute("SELECT COUNT(*) FROM tickets")
    count = cursor.fetchone()[0] + 1

    ticket_number = f"TKT-2026-{count:04d}"

    cursor.execute(
        """
        INSERT INTO tickets
        (ticket_number,user_id,subject,description,status)

        VALUES(%s,%s,%s,%s,'Open')
        """,
        (
            ticket_number,
            user_id,
            subject,
            description
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return ticket_number