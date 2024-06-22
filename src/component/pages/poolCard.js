import React, { useContext } from "react";
import "./Card.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";
import addCartItem from "../../Cart/addCartItem";
import { DataContext } from "../../context/DataContext";
const FCard = ({ pool ,satc}) => {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();
  const handleAddToCart = async () => {
    await addCartItem(pool,1);
  };

  return (
    <div className="card">
      <div className="cardivhor">
        <h3>Price: {pool.price}</h3>
        <p>Description: {pool.description}</p>
        <p>Place: {pool.location}</p>
        <p>Available Places: {pool.spaces}</p>
        {data && satc ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : null}
      </div>
      <div>
        <img className="images" alt="pool" src={pool.links[0]} />
      </div>
    </div>
  );
};

export default FCard;
