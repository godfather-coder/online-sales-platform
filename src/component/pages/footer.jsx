import {React, useEffect} from 'react';
import './Footer.css'; 
import { Link } from 'react-router-dom';


const Footer = () => {

    useEffect(()=>{
    })
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>Your company description or footer content goes here.</p>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: contact@example.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Street, City, Country</li>
              <li><Link to='/contact'>Contac Us</Link></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
