import React, { useState } from 'react';
import './PoolForm.css'; // Import CSS file for styling
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



const PoolForm = () => {
  const [pool, setPool] = useState({
    price: 0,
    location: '',
    links: [''],
    description:"",
    spaces:0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPool({
      ...pool,
      [name]: name === 'price' || name === 'spaces' ? parseInt(value) : value,
    });
  };

  const handleLinkChange = (index, e) => {
    const newLinks = [...pool.links];
    newLinks[index] = e.target.value;
    setPool({
      ...pool,
      links: newLinks,
    });
  };

  const handleAddLink = () => {
    setPool({
      ...pool,
      links: [...pool.links, ''],
    });
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...pool.links];
    newLinks.splice(index, 1);
    setPool({
      ...pool,
      links: newLinks,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(pool);
    try {
      const docRef = await addDoc(collection(db, 'pools'), pool);
      console.log('Document written with ID: ', docRef.id);
      toast.success('pool added!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setPool({
      price: 0,
      location: '',
      links: [''],
      description:"",
      spaces:0
    });

  };

  return (
    <div className="form-container">
      <Link to="/pools">Pools</Link>
      <h2>Upload Pool Listing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={pool.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        Spaces:
          <input
            type="number"
            name="spaces"
            value={pool.spaces}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={pool.location}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        description:
          <input
            type="text"
            name="description"
            value={pool.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Links:
          {pool.links.map((link, index) => (
            <div key={index} className="link-input-container">
              <input
                type="text"
                value={link}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder={`Link ${index + 1}`}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="remove-link-button"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddLink} className="add-link-button">
            Add Link
          </button>
        </label>
        <br />
        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default PoolForm;
