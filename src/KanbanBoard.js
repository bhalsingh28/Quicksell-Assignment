import React from "react";
import Ticket from "./Ticket";
import "./KanbanBoard.css";

function KanbanBoard({ tickets, groupingOption, sortingOption, users }) {
  const groupTicketsByUser = () => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const key =
        groupingOption === "user" ? ticket.userId : ticket[groupingOption];
      if (!grouped[key]) {
        grouped[key] = { items: [], group: key };
      }
      grouped[key].items.push(ticket);
    });
    return Object.values(grouped);
  };

  const sortTickets = (grouped) => {
    return grouped.map((group) => {
      return {
        ...group,
        items: group.items.sort((a, b) => {
          if (sortingOption === "title") {
            return a.title.localeCompare(b.title);
          } else {
            return a[sortingOption] - b[sortingOption];
          }
        }),
      };
    });
  };

  const groupedTickets = sortTickets(groupTicketsByUser());

  return (
    <div className="kanban-board">
      {groupedTickets.map((group) => (
        <div key={group.group} className="group-card">
          <div className="block-box">
            <div className="group-title">
              <h2>{getGroupLabel(group.group, groupingOption, users)}</h2>
            </div>
            <div className="group-tickets">
              {group.items.map((ticket) => (
                <div key={ticket.id} className="user-card">
                  <div className="card">
                    <div class="ticket">
                      <div className="img">
                        <img src="images/profile.png" alt="" />
                      </div>
                      <p>{ticket.id}</p>
                    </div>

                    <h3>{ticket.title}</h3>
                    <p className="user-info">
                      {ticket.tag && ticket.tag.length > 0
                        ? ticket.tag.join(", ")
                        : "No Tags"}
                    </p>
                  </div>
                  <div className="user-tickets">
                    <Ticket key={ticket.id} ticketData={ticket} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const getGroupLabel = (group, groupingOption, users) => {
  if (groupingOption === "user") {
    const user = users.find((user) => user.id === group);
    return user ? user.name : "Unknown User";
  } else if (groupingOption === "status") {
    return group;
  } else if (groupingOption === "priority") {
    return `Priority ${group}`;
  } else {
    return "Unknown Group";
  }
};

export default KanbanBoard;
