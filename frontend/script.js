const form = document.getElementById("ticketForm");
const result = document.getElementById("result");
const ticketList = document.getElementById("ticketList");

// Load Tickets
async function loadTickets() {

    const response = await fetch("http://127.0.0.1:5000/api/tickets");

    const data = await response.json();

    ticketList.innerHTML = "";

    data.tickets.reverse().forEach(ticket => {

        let priorityColor = "#666";

        if(ticket.priority==="High")
            priorityColor="red";

        else if(ticket.priority==="Medium")
            priorityColor="orange";

        else if(ticket.priority==="Low")
            priorityColor="green";

        ticketList.innerHTML += `
        <div class="ticket-card">

            <h3>${ticket.ticket_number}</h3>

            <p><b>Subject:</b> ${ticket.subject}</p>

            <p><b>Category:</b> ${ticket.category ?? "Pending AI"}</p>

            <p>
                <b>Priority:</b>
                <span style="color:${priorityColor};font-weight:bold;">
                    ${ticket.priority ?? "Pending AI"}
                </span>
            </p>

            <p>
                <b>Confidence:</b>
                ${ticket.confidence_score ?? "--"}%
            </p>

            <p>
                <b>AI Summary:</b><br>
                ${ticket.ai_summary ?? "Waiting for AI"}
            </p>

            <span class="status">
                ${ticket.status}
            </span>

        </div>
        `;

    });

}


// Create Ticket
form.addEventListener("submit", async function(e){

    e.preventDefault();

    const ticket={

        name:document.getElementById("name").value,

        email:document.getElementById("email").value,

        subject:document.getElementById("subject").value,

        description:document.getElementById("description").value

    };

    const response=await fetch("http://127.0.0.1:5000/api/tickets",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(ticket)

    });

    const data=await response.json();

    result.innerHTML=`
        ✅ Ticket Created Successfully
        <br><br>
        <b>Ticket Number:</b> ${data.ticket_number}
    `;

    form.reset();

    loadTickets();

});

loadTickets();