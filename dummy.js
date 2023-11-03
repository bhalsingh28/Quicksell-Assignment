// // KanbanBoard.js
// import React from "react";
// import Ticket from "./Ticket";

// function KanbanBoard({
//   tickets,
//   groupingOption,
//   sortingOption,
//   setGroupingOption,
//   setSortingOption,
//   users,
// }) {
//   // Helper function to group tickets by user
//   const groupTicketsByUser = (tickets) => {
//     const grouped = {};
//     tickets.forEach((ticket) => {
//       const userId = ticket.userId;
//       if (!grouped[userId]) {
//         grouped[userId] = { user: null, tickets: [] };
//       }
//       if (!grouped[userId].user) {
//         grouped[userId].user = users.find((user) => user.id === userId);
//       }
//       grouped[userId].tickets.push(ticket);
//     });
//     return grouped;
//   };

//   // Group the tickets by user
//   const groupedTickets = groupTicketsByUser(tickets);

//   return (
//     <div className="kanban-board">
//       {/* Grouping and Sorting Options */}
//       <div className="options">
//         <label>
//           Group by:
//           <select
//             value={groupingOption}
//             onChange={(e) => setGroupingOption(e.target.value)}
//           >
//             <option value="status">Status</option>
//             <option value="user">User</option>
//             <option value="priority">Priority</option>
//           </select>
//         </label>
//         <label>
//           Sort by:
//           <select
//             value={sortingOption}
//             onChange={(e) => setSortingOption(e.target.value)}
//           >
//             <option value="priority">Priority</option>
//             <option value="title">Title</option>
//           </select>
//         </label>
//       </div>

//       {/* Render separate cards for each user with their information and tickets */}
//       {Object.keys(groupedTickets).map((userId) => (
//         <div key={userId} className="user-card">
//           <h2>
//             {groupedTickets[userId].user
//               ? groupedTickets[userId].user.name
//               : "Unknown User"}
//           </h2>

//           <div className="user-info">
//             <div>
//               <strong>ID:</strong>{" "}
//               {groupedTickets[userId].user
//                 ? groupedTickets[userId].user.id
//                 : "Unknown ID"}
//             </div>
//             <div>
//               <strong>Title:</strong>{" "}
//               {groupedTickets[userId].tickets[0]
//                 ? groupedTickets[userId].tickets[0].title
//                 : "Unknown Title"}
//             </div>
//             <div>
//               <strong>Tags:</strong>{" "}
//               {groupedTickets[userId].tickets[0] &&
//               groupedTickets[userId].tickets[0].tag
//                 ? groupedTickets[userId].tickets[0].tag[0]
//                 : "No Tags"}
//             </div>
//           </div>
//           <div className="user-tickets">
//             {groupedTickets[userId].tickets.map((ticket) => (
//               <Ticket key={ticket.id} ticket={ticket} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default KanbanBoard;

import React from "react";
import Ticket from "./Ticket";

function KanbanBoard({
  tickets,
  groupingOption,
  sortingOption,
  setGroupingOption,
  setSortingOption,
  users,
}) {
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
      <div className="options">
        <label>
          Group by:
          <select
            value={groupingOption}
            onChange={(e) => setGroupingOption(e.target.value)}
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort by:
          <select
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      {groupedTickets.map((group) => (
        <div key={group.group} className="group-card">
          <h2>{getGroupLabel(group.group, groupingOption, users)}</h2>
          <div className="group-tickets">
            {group.items.map((ticket) => (
              <div key={ticket.id} className="user-card">
                <h2>{getUserInfo(ticket.userId, users).name}</h2>
                <div className="user-info">
                  <div>
                    <strong>ID:</strong> {getUserInfo(ticket.userId, users).id}
                  </div>
                  <div>
                    <strong>Title:</strong> {ticket.title}
                  </div>
                  <div>
                    <strong>Tags:</strong>{" "}
                    {ticket.tag && ticket.tag.length > 0
                      ? ticket.tag[0]
                      : "No Tags"}
                  </div>
                </div>
                <div className="user-tickets">
                  <Ticket key={ticket.id} ticket={ticket} />
                </div>
              </div>
            ))}
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

const getUserInfo = (userId, users) => {
  return users.find((user) => user.id === userId) || {};
};

export default KanbanBoard;
