import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MerchandiseScreen.css"; // You can add CSS for styling

const MerchandiseScreen = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch merchandise data from Django API
    axios
      .get("http://207.154.253.97:8000api/merchandise/merchandise/") // Replace with the actual API URL
      .then((response) => {
        console.log("Merchandise data:", response.data); // Log the data from the API
        setMerchandise(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching merchandise:", error);
        setLoading(false);
      });
  }, []);

  // Handle the link to merchandise page
  const handleMerchandiseLink = () => {
    window.open("https://agrieldo.com/merchandise", "_blank");
  };

  return (
    <div className="merchandise-container">
      {loading ? (
        <p>Loading...</p> // Display "Loading..." text when the data is being fetched
      ) : (
        <div className="merchandise-list">
          {merchandise.map((item) => (
            <div key={item.id} className="merchandise-item">
              {/* Display image if available */}
              {item.image && <img src={item.image} alt={item.name} />}
              <h2 className="merchandise-name">{item.name}</h2>
              <p className="merchandise-description">{item.description}</p>
              <p className="merchandise-price">Ksh{item.price}</p>
              {/* Handle the "Buy Now" button click */}
              <button className="buy-button" onClick={handleMerchandiseLink}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MerchandiseScreen;
