import React, { useState } from "react";
import { Range } from "react-range";

const Filters = ({ onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [toddlerCount, setToddlerCount] = useState(0);

  const MIN_PRICE = 0;
  const MAX_PRICE = 1000;

  // Handle passenger count updates
  const handlePassengerChange = (type, value) => {
    if (value < 0) return; // Prevent negative values
    if (type === "adult") setAdultCount(value > 0 ? value : 1); // Minimum 1 adult
    if (type === "child") setChildCount(value);
    if (type === "toddler") setToddlerCount(value);
  };

  // Apply filters
  const applyFilters = () => {
    onApplyFilters({
      priceRange,
      passengers: { adult: adultCount, child: childCount, toddler: toddlerCount },
    });
  };

  return (
    <div className="filters">
      <h2>Filters</h2>

      {/* Price Range */}
      <div className="filter-section">
        <h3>Price Range</h3>
        <div style={{ margin: "20px 0" }}>
          <Range
            step={10}
            min={MIN_PRICE}
            max={MAX_PRICE}
            values={priceRange}
            onChange={(values) => setPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#ddd",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                }}
              />
            )}
          />
        </div>
        <div>
          <span>Min: ${priceRange[0]}</span> | <span>Max: ${priceRange[1]}</span>
        </div>
      </div>

      {/* Passenger Selection */}
      <div className="filter-section">
        <h3>Passengers</h3>
        {/* Adults */}
        <div className="passenger-group">
          <label>Adults (13+):</label>
          <button onClick={() => handlePassengerChange("adult", adultCount - 1)} disabled={adultCount <= 1}>
            -
          </button>
          <span>{adultCount}</span>
          <button onClick={() => handlePassengerChange("adult", adultCount + 1)}>+</button>
        </div>

        {/* Children */}
        <div className="passenger-group">
          <label>Children (2-12):</label>
          <button onClick={() => handlePassengerChange("child", childCount - 1)} disabled={childCount <= 0}>
            -
          </button>
          <span>{childCount}</span>
          <button onClick={() => handlePassengerChange("child", childCount + 1)}>+</button>
        </div>

        {/* Toddlers */}
        <div className="passenger-group">
          <label>Toddlers (&lt;2):</label>
          <button onClick={() => handlePassengerChange("toddler", toddlerCount - 1)} disabled={toddlerCount <= 0}>
            -
          </button>
          <span>{toddlerCount}</span>
          <button onClick={() => handlePassengerChange("toddler", toddlerCount + 1)}>+</button>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
