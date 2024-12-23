/* eslint-disable react/jsx-key */
import axios from "axios"; // Importing Axios for making HTTP requests
import { useEffect, useState } from "react"; // React hooks for component state and lifecycle management
import { Link } from "react-router-dom"; // For navigation between routes
import { BsArrowRightShort } from "react-icons/bs"; // Icon for navigation arrow
import { BiLike } from "react-icons/bi"; // Icon for the "like" button

// Main Component
export default function IndexPage() {
  // State to store events fetched from the server
  const [events, setEvents] = useState([]);

  //! Fetch events from the server ---------------------------------------------------------------
  useEffect(() => {
    // Fetching events when the component mounts
    axios
      .get("/createEvent") // API endpoint to fetch events
      .then((response) => {
        setEvents(response.data); // Setting the fetched events to state
      })
      .catch((error) => {
        console.error("Error fetching events:", error); // Logging errors, if any
      });
  }, []);

  //! Like Functionality --------------------------------------------------------------
  const handleLike = (eventId) => {
    // Function to handle the like button functionality
    axios
      .post(`/event/${eventId}`) // API endpoint to like an event
      .then((response) => {
        setEvents((prevEvents) =>
          // Updating the likes count locally
          prevEvents.map((event) =>
            event._id === eventId
              ? { ...event, likes: event.likes + 1 }
              : event
          )
        );
        console.log("Like successful", response);
      })
      .catch((error) => {
        console.error("Error liking event:", error);
      });
  };

  return (
    <>
      {/* Page container */}
      <div className="mt-1 flex flex-col">
        {/* Hero image section, visible only on larger screens */}
        <div className="hidden sm:block">
          <div href="#" className="flex item-center inset-0">
            <img src="../src/assets/hero.jpeg" alt="" className="w-full" /> 
          </div>
        </div>

        {/* Events grid container */}
        <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5">
          {/* Check if events exist */}
          {events.length > 0 &&
            events.map((event) => {
              const eventDate = new Date(event.eventDate); // Parsing event date
              const currentDate = new Date(); // Current date

              //! Check if the event date is in the future or today ------------------------------
              if (
                eventDate > currentDate ||
                eventDate.toDateString() === currentDate.toDateString()
              ) {
                return (
                  // Event card
                  <div className="bg-white rounded-xl relative" key={event._id}>
                    {/* Event image section */}
                    <div className="rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] object-fill aspect-16:9">
                      {event.image && (
                        <img
                          src={`http://localhost:4000/api/${event.image}`} // Event image URL
                          alt={event.title}
                          width="300"
                          height="200"
                          className="w-full h-full"
                        />
                      )}

                      {/* Like button */}
                      <div className="absolute flex gap-4 bottom-[240px] right-8 md:bottom-[20px] md:right-3 lg:bottom-[250px] lg:right-4 sm:bottom-[260px] sm:right-3">
                        <button onClick={() => handleLike(event._id)}>
                          <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-primary" />
                        </button>
                      </div>
                    </div>

                    {/* Placeholder demo image (FIXME: Remove later) */}
                    <img
                      src="../src/assets/paduru.jpg"
                      alt=""
                      className="rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] object-fill aspect-16:9"
                    />

                    {/* Event details */}
                    <div className="m-2 grid gap-2">
                      {/* Event title and likes */}
                      <div className="flex justify-between items-center">
                        <h1 className="font-bold text-lg mt-2">
                          {event.title.toUpperCase()}
                        </h1>
                        <div className="flex gap-2 items-center mr-4 text-red-600">
                          {" "}
                          <BiLike /> {event.likes}
                        </div>
                      </div>

                      {/* Event date, time, and ticket price */}
                      <div className="flex text-sm flex-nowrap justify-between text-primarydark font-bold mr-4">
                        <div>
                          {event.eventDate.split("T")[0]}, {event.eventTime}
                        </div>
                        <div>
                          {event.ticketPrice === 0
                            ? "Free"
                            : "Rs. " + event.ticketPrice}
                        </div>
                      </div>

                      {/* Event description */}
                      <div className="text-xs flex flex-col flex-wrap truncate-text">
                        {event.description}
                      </div>

                      {/* Organizer and owner details */}
                      <div className="flex justify-between items-center my-2 mr-4">
                        <div className="text-sm text-primarydark">
                          Organized By: <br />
                          <span className="font-bold">{event.organizedBy}</span>
                        </div>
                        <div className="text-sm text-primarydark">
                          Created By: <br />
                          <span className="font-semibold">
                            {event.owner.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Button to navigate to the event details page */}
                      <Link
                        to={"/event/" + event._id}
                        className="flex justify-center"
                      >
                        <button className="primary flex items-center gap-2">
                          Book Ticket <BsArrowRightShort className="w-6 h-6" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              }
              return null; // Skip past events
            })}
        </div>
      </div>
    </>
  );
}
