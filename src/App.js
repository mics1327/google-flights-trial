import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchAndFilter from "./components/SearchAndFilter";
import FlightResults from "./components/FlightResults";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

function App() {
  const [filteredFlights, setFilteredFlights] = useState([]);

  const handleSearch = (filters) => {
    // Simulate API call with the provided filters
    console.log("Filters applied:", filters);

    // Mock logic to filter flights (replace with real API call if needed)
    setFilteredFlights([]); // Implement filtering logic
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchAndFilter onSearch={handleSearch} />
                <FlightResults flights={filteredFlights} />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
