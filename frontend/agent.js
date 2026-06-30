const tbody = document.querySelector("tbody");

async function loadTickets(){

    const response = await fetch("http://127.0.0.1:5000/api/tickets");

    const data = await response.json();

    tbody.innerHTML="";

    data.tickets.forEach(ticket=>{

        tbody.innerHTML+=`

        <tr>

            <td>${ticket.ticket_number}</td>

            <td>${ticket.subject}</td>

            <td>${ticket.category}</td>

            <td>${ticket.priority}</td>

            <td>${ticket.status}</td>

            <td>

                <button>Edit</button>

            </td>

        </tr>

        `;

    });

}

loadTickets();