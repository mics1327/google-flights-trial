import React, { useState, useEffect, useRef } from "react";

const FlightResults = ({ flights }) => {
  const [visibleFlights, setVisibleFlights] = useState([]); // Flights to display
  const [loadedCount, setLoadedCount] = useState(5); // Number of flights loaded
  const observerRef = useRef();

  // Load initial flights
  useEffect(() => {
    setVisibleFlights(flights.slice(0, loadedCount));
  }, [flights, loadedCount]);

  // Intersection Observer to detect when the user scrolls to the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && loadedCount < flights.length) {
          setLoadedCount((prev) => prev + 5); // Load 5 more flights
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [flights, loadedCount]);

  return (
    <div className="flight-results">
      <h2>Flight Results</h2>
      {visibleFlights.length === 0 ? (
        <p>No flights found. Try searching with different criteria.</p>
      ) : (
        <>
          <ul>
            {visibleFlights.map((flight, index) => (
              <li key={index} className="flight-card">
                <h3>{flight.airline}</h3>
                <p>
                  From: {flight.origin} - To: {flight.destination}
                </p>
                <p>Departure: {flight.departureTime}</p>
                <p>Price: ${flight.price}</p>
              </li>
            ))}
          </ul>

          {/* Scroll Observer */}
          {loadedCount < flights.length && (
            <div ref={observerRef} className="loading-indicator">
              Loading more flights...
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlightResults;
