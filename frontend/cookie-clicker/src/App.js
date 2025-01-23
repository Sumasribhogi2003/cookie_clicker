import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Fetch initial data from the backend
    fetch("http://localhost:5000/getUserData")
      .then((response) => response.json())
      .then((data) => {
        setCounter(data.counter);
        setPrizes(data.prizes);
      })
      .catch((err) => setError("Failed to fetch initial data.")); // Error handling
  }, []);

  const handleClick = async () => {
    setLoading(true); // Set loading to true when button is clicked
    try {
      const response = await fetch("http://localhost:5000/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: 1 }), // For simplicity, using a static userId
      });

      if (!response.ok) {
        throw new Error("Failed to update data.");
      }

      const data = await response.json();
      setCounter(data.counter);
      setPrizes(data.prizes);
    } catch (err) {
      setError("Failed to update data.");
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div className="App">
      <h1>Cookie Clicker</h1>
      <p>Counter: {counter}</p>
      <p>Prizes Won: {prizes}</p>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Click Me!"}
      </button>
    </div>
  );
}

export default App;
