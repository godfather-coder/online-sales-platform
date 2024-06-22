import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import Pool from '../../assets/ipool_india_cover.jpeg'
import Fitness from '../../assets/images.jpeg'
import Sport from '../../assets/not-ready-jianshang-sports-complex-ccdi_8.jpg'


function Home() {
  return (
    <div className="container">
      <h1>Welcome to Our Services</h1>
      <div className="services">
        <div className="service">
          <Link to="/pools">
            <img src={Pool} alt="Pools" />
            <div className="service-info">
              <h2>Pools</h2>
              <p>Explore our beautiful pools and swimming facilities.</p>
            </div>
          </Link>
        </div>
        <div className="service">
          <Link to="/fitness">
            <img src={Fitness} alt="Fitness" />
            <div className="service-info">
              <h2>Fitness</h2>
              <p>Get fit with state-of-the-art fitness equipment and programs.</p>
            </div>
          </Link>
        </div>
        <div className="service">
          <Link to="/sport-complexes">
            <img src={Sport} alt="Sport Complexes" />
            <div className="service-info">
              <h2>Sport Complexes</h2>
              <p>Discover our comprehensive sports complexes and facilities.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
