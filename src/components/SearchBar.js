import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ setFlights }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get("https://api.example.com/flights", {
        params: {
          origin,
          destination,
          date,
        },
      });
      setFlights(response.data); // Pass flights data to the parent component
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="search-bar">
      <h2>Search Flights</h2>
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
