import React from "react";
import "../styles/latestevents.css"; 

const LatestEvents = () => {
  // const events = [
  //   { title: "Garden BBQ", date: "Sat 16 June", location: "Tom's Garden" },
  //   { title: "City Council Vote", date: "Sat 16 June", location: "Town Hall" },
  //   { title: "Post-punk Festival", date: "Sat 16 June", location: "Tom's Garden" },
  //   { title: "Maybe Boring Stand-up", date: "Sat 16 June", location: "Town's Garden" },
  //   { title: "Beyoncé Tour 2023", date: "Sat 16 June", location: "Tom's Garden" },
  // ];

  return (
    <div className="events-container">
      <h3>Your Upcoming Events</h3>
      <ul>
        No active events
        {/* {events.map((event, index) => (
          <li key={index} className="event-item">
            <div className="event-icon">📅</div>
            <div className="event-info">
              <p className="event-title">{event.title}</p>
              <p className="event-date">{event.date}, {event.location}</p>
            </div>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default LatestEvents;
