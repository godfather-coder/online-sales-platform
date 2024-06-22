import React, { useContext } from "react";
import "./Card.css"; // Import CSS file for styling
import addCartItem from "../../Cart/addCartItem";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
const FCard = ({ pool ,onRemove,satc}) => {
  const { data } = useContext(DataContext);
  const handleAddToCart = async () => {
    await addCartItem(pool,1);
  };
  const navigate  = useNavigate();
  const handelClick=()=>{
    navigate(`/fitnesses/${pool.id}`);  }
  return (
    <div className="card" onClick={handelClick}>
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
      { !satc ? (
            <button onClick={onRemove}>Remove from Cart</button>
        ) : null}
    </div>
  );
};

export default FCard;
