import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc,updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import './PollDetail.css';


const PoolDetail = () => {
  const { id } = useParams();
  const [pool, setPool] = useState(null);
  const [loading, setLoading] = useState(true);
  const docRef = doc(db, 'pools', id);
  useEffect(() => {
    const fetchPool = async () => {
      try {
        
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPool({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such document!');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pool:', error);
        setLoading(false);
      }
    };

    fetchPool();
  }, [id,docRef]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pool) {
    return <div>No pool found</div>;
  }
  const handeClick =async () => {
    console.log(docRef)
    await updateDoc(docRef, {
      spaces: pool.spaces-1
    });
  }

  return (
    <div className="pool-detail">
      <Link to="/pools">Pools</Link>
      <h2>Pool Details</h2>
      <h3>Price: {pool.price}</h3>
      <p>Description: {pool.description}</p>
      <p>Place: {pool.location}</p>
      <p>Available Places: {pool.spaces}</p>
      <div className="pool-images">
        {pool.links && pool.links.map((image, index) => (
          <img key={index} src={image} alt={`Pool ${index}`} />
        ))}
      </div>
      <button onClick={handeClick}
        style={{
          backgroundColor: '#4CAF50', 
          border: 'none', 
          color: 'white', 
          padding: '15px 32px', 
          textAlign: 'center', 
          textDecoration: 'none', 
          display: 'inline-block', 
          fontSize: '16px', 
          margin: '10px', 
          cursor: 'pointer', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
        }}
      >
        Reserv
      </button>
    </div>
  );
};

export default PoolDetail;
