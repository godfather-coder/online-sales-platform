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
    spaces: [''],
    description:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPool({
      ...pool,
      [name]: value,
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
  const handlespaceChange = (index, e) => {
    const newLinks = [...pool.spaces];
    newLinks[index] = e.target.value;
    setPool({
      ...pool,
      spaces: newLinks,
    });
  };
  const handleAddLink = () => {
    setPool({
      ...pool,
      links: [...pool.links, ''],
    });
  };
  const handleAdd = () => {
    setPool({
      ...pool,
      spaces: [...pool.spaces, ''],
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
  const handleRemoveSp = (index) => {
    const newLinks = [...pool.spaces];
    newLinks.splice(index, 1);
    setPool({
      ...pool,
      spaces: newLinks,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(pool);

    try {
      const docRef = await addDoc(collection(db, 'complexs'), pool);
      console.log('Document written with ID: ', docRef.id);
      toast.success('complex added!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setPool({
        price: 0,
        location: '',
        links: [''],
        spaces: [''],
        description:"",
    });

  };

  return (
    <div className="form-container">
      <Link to="/sports">Sports</Link>
      <h2>Upload Sport Complex Listing</h2>
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
          Photos:
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
            Add Photo
          </button>
        </label>
        <br />


        <label>
          Spaces:
          {pool.spaces.map((link, index) => (
            <div key={index} className="link-input-container">
              <input
                type="text"
                value={link}
                onChange={(e) => handlespaceChange(index, e)}
                placeholder={`Space ${index + 1}`}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSp(index)}
                  className="remove-link-button"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAdd} className="add-link-button">
            Add Sport Space
          </button>
        </label>
        <br />


        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default PoolForm;
