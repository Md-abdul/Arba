import React, { useState, useEffect } from 'react';

export const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://arba-backend-1.onrender.com/cart/cartitems');
        //https://arba-backend-1.onrender.com/
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.name} />
              <p>Name: {item.name}</p>
              <p>Price: {item.price}</p>
              {/* Add more details if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
