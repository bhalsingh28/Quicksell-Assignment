import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import "./app.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState("status");
  const [sortingOption, setSortingOption] = useState("priority");
  const [users, setUsers] = useState([]);
  const [selectionOption, setSelectionOption] = useState("group-by"); // Initial selectionOption value

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="app">
      <div className="navbar">
        <div className="options">
          <label>
            Grouping:
            <select
              value={groupingOption}
              onChange={(e) => setGroupingOption(e.target.value)}
              name="group"
              id="group"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <label>
            Ordering:
            <select
              value={sortingOption}
              onChange={(e) => setSortingOption(e.target.value)}
              name="order"
              id="order"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      </div>
      {selectionOption === "group-by" && (
        <KanbanBoard
          tickets={tickets}
          groupingOption={groupingOption}
          sortingOption={sortingOption}
          setGroupingOption={setGroupingOption}
          setSortingOption={setSortingOption}
          users={users}
        />
      )}
    </div>
  );
}

export default App;
