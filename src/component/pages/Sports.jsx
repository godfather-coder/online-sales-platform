// src/components/Sports.js
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import SportCard from './SportCard';
import './Sport.css';

const Sports = () => {
  const [complexes, setComplexes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const { data } = useContext(DataContext);

  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'complexs'));
        const complexesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComplexes(complexesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sport complexes:', error);
        setLoading(false);
      }
    };

    fetchComplexes();
  }, []);

  const handleSort = (order) => {
    const sorted = [...complexes].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setSortOrder(order);
    setComplexes(sorted);
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sports-list">
      {data ? (
        <Link to="/uploadSport" className="upload-link">Upload Complex</Link>
      ) : (
        <></>
      )}
      <h2>Sport Complex Listings</h2>
      <div className="sort-buttons">
        <button onClick={() => handleSort('asc')}>Sort by Price: Low to High</button>
        <button onClick={() => handleSort('desc')}>Sort by Price: High to Low</button>
      </div>
      {complexes.map(complex => (
        <SportCard key={complex.id} complex={complex} satc={true} />
      ))}
    </div>
  );
};

export default Sports;
