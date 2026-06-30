const tbody = document.querySelector("tbody");

async function loadTickets() {

    const response = await fetch("http://127.0.0.1:5000/api/tickets");

    const data = await response.json();

    tbody.innerHTML = "";

    data.tickets.forEach(ticket => {

        tbody.innerHTML += `

        <tr>

            <td>${ticket.ticket_number}</td>

            <td>${ticket.subject}</td>

            <td>${ticket.category ?? "-"}</td>

            <td>${ticket.priority ?? "-"}</td>

            <td>${ticket.status}</td>

            <td>

                <button onclick="editTicket(${ticket.id})">
                    Edit
                </button>

            </td>

        </tr>

        `;

    });

}


async function editTicket(id){

    let status = prompt(
        "Enter Status:\nOpen\nIn Progress\nResolved"
    );

    if(status==null) return;

    let resolution = prompt(
        "Enter Resolution"
    );

    if(resolution==null) return;

    await fetch(`http://127.0.0.1:5000/api/tickets/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            status:status,

            resolution:resolution

        })

    });

    alert("Ticket Updated Successfully");

    loadTickets();

}

loadTickets();