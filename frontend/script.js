const form = document.getElementById("ticketForm");
const result = document.getElementById("result");
const ticketList = document.getElementById("ticketList");

// Load all tickets
async function loadTickets() {

    const response = await fetch("http://127.0.0.1:5000/api/tickets");

    const data = await response.json();

    ticketList.innerHTML = "";

    data.tickets.reverse().forEach(ticket => {

        ticketList.innerHTML += `
            <div class="ticket-card">

                <h3>${ticket.ticket_number}</h3>

                <p><b>Subject:</b> ${ticket.subject}</p>

                <p><b>Category:</b> ${ticket.category ?? "Pending AI"}</p>

                <p><b>Priority:</b> ${ticket.priority ?? "Pending AI"}</p>

                <span class="status">${ticket.status}</span>

            </div>
        `;

    });

}

// Create Ticket
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const ticket = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        description: document.getElementById("description").value

    };

    const response = await fetch("http://127.0.0.1:5000/api/tickets", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(ticket)

    });

    const data = await response.json();

    result.innerHTML = `
        ✅ ${data.message}<br><br>
        Ticket Number : <b>${data.ticket_number}</b>
    `;

    form.reset();

    loadTickets();

});

// Load tickets when page opens
loadTickets();