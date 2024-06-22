import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; 
import Card from './poolCard'; 
import './PoolList.css'; 
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

const Pools = () => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data } = useContext(DataContext);
  const [sortBy, setSortBy] = useState('');
  const [filterPlace, setFilterPlace] = useState('');
  const [filterSpaces, setFilterSpaces] = useState('');
  const [uniqueLocations, setUniqueLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pools'));
        const locationsSet = new Set();
        querySnapshot.forEach(doc => {
          const location = doc.data().location; 
          locationsSet.add(location);
        });
        const uniqueLocationsArray = Array.from(locationsSet);
        setUniqueLocations(uniqueLocationsArray);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    const fetchPools = async () => {
      try {
        let poolQuery = collection(db, 'pools');

        if (filterPlace) {
          poolQuery = query(poolQuery, where('location', '==', filterPlace));
        }
        if (filterSpaces) {
          poolQuery = query(poolQuery, where('spaces', '>=', parseInt(filterSpaces)));
        }

        if (sortBy === 'price-asc') {
          poolQuery = query(poolQuery, orderBy('price', 'asc'));
        } else if (sortBy === 'price-desc') {
          poolQuery = query(poolQuery, orderBy('price', 'desc'));
        }

        const querySnapshot = await getDocs(poolQuery);
        const poolsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPools(poolsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pools:', error);
        setLoading(false);
      }
    };

    fetchLocations();
    fetchPools();
  }, [sortBy, filterPlace, filterSpaces]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePlaceFilterChange = (e) => {
    setFilterPlace(e.target.value);
  };

  const handleSpacesFilterChange = (e) => {
    setFilterSpaces(e.target.value);
  };

  return (
    <div className="pools-list">
      {data ? (
        <Link to="/uploadPool">Upload Pools</Link>
      ) : (
        <></>
      )}
      <h2>Pool Listings</h2>

      <div className="filters">
        <label>
          Sort by:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>

        <label>
          Filter by Place:
          <select value={filterPlace} onChange={handlePlaceFilterChange}>
            <option value="">All</option>
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </label>

        <label>
          Filter by Available Spaces:
          <input type="number" value={filterSpaces} onChange={handleSpacesFilterChange} />
        </label>
      </div>

      <div className="pool-cards">
        {pools.map(pool => (
          <Card key={pool.id} pool={pool} satc={true} />
        ))}
      </div>
    </div>
  );
};

export default Pools;
