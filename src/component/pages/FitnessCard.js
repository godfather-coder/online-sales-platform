import React, { useContext } from "react";
import "./Card.css"; // Import CSS file for styling
import addCartItem from "../../Cart/addCartItem";
import { DataContext } from "../../context/DataContext";
const FCard = ({ pool ,onRemove,satc}) => {
  const { data } = useContext(DataContext);
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
      <button onClick={onRemove}>Remove from Cart</button>
    </div>
  );
};

export default FCard;
