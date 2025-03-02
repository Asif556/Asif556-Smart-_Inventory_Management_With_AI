import React, { useState, useEffect } from 'react';
import './Predict_price.css';
import { getAuth, signOut } from "firebase/auth";
import app from './Firebase';
import { useNavigate } from 'react-router-dom';
import { database } from './Firebase';
import { ref, onValue } from 'firebase/database';
import Nav from './Nav';

const Predict_Price = () => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [item, setItem] = useState('');
  const [inventory, setInventory] = useState([]);
  const [predictedValue, setPredict] = useState(null);

  const navigate = useNavigate();
  const backendUrl = "https://035d-2402-e280-3d17-392-b020-964c-e9d3-9eaa.ngrok-free.app";

  useEffect(() => {
    const itemsRef = ref(database, 'inventory');
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setInventory(formattedList);
      } else {
        setInventory([]);
      }
    });

    return () => unsubscribe();
  }, []);
 



  const handlePrediction = async () => {
    if (!item || !quantity) {
      alert('Please select an item and enter quantity!');
      return;
    }
  
    setLoading(true);
    setPredict(72);
  
    try {
      const response = await fetch(`${backendUrl}/predict/${quantity}/${item}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
  
    } catch (error) {
      console.error('Error fetching prediction:', error);
    
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        alert("Signed out successfully");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        alert("Error signing out. Try again.");
      });
  };

  return (
    <div className="predict-main">
      <Nav />
      <div className="predict-container">
        <div className="predict-heading">
          <h2>Predict Price</h2>
        </div>
        <div className="predict-form">
          <div className="predict-input">
            <label>Select item:</label>
            <select 
              name="option-select" 
              value={item} 
              onChange={(e) => setItem(e.target.value)}
            >
              <option value="">Choose an item</option>
              {inventory.length > 0 ? (
                inventory.map((invItem) => (
                  <option key={invItem.id} value={invItem.itemsname}>
                    {invItem.itemsname}
                  </option>
                ))
              ) : (
                <option disabled>No items available</option>
              )}
            </select>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter the Quantity"
              min="1"
            />
          </div>
          <div className="display_prediction">
            {predictedValue !== null && (
              <h3>Predicted Price: ${predictedValue.toFixed(2)}</h3>
            )}
          </div>
          <div className="predict-buttons">
            <button className='Cancel-predict' onClick={() => { setItem(''); setQuantity(''); setPredict(null); }}>Cancel</button>
            <button className='price-predict' onClick={handlePrediction} disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Predict Price'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict_Price;
