import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc,doc } from 'firebase/firestore';
import { db } from '../component/firebase';
import Cookies from 'js-cookie';
import FCard from '../component/pages/FitnessCard';
import SportCard from '../component/pages/SportCard';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userIdString = Cookies.get('myKey');
      if (!userIdString) {
        console.error('User ID not found');
        setLoading(false);
        return;
      }

      const userId = userIdString;

      try {
        const q = query(collection(db, 'carts'), where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCartItems(items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'carts', itemId));
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          item.type_id === 1 ? (
            <FCard key={item.id} pool={item} onRemove={() => handleRemoveItem(item.id)} />
          ) : (
            <SportCard key={item.id} complex={item}  onRemove={() => handleRemoveItem(item.id)} />
          )
        ))
      )}
    </div>
  );
};

export default Cart;
