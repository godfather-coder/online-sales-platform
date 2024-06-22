import { React, useState } from 'react';
import { toast } from 'react-toastify';
import './Login.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import SignInWithGoogle from './signInWithGoogle';

const Login = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("User logged in Successfully");
        window.location.href = "/me";
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    } else {
      toast.error('Please fill in all fields.');
    }
  };




  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
        <SignInWithGoogle/>
      </form>
    </div>
  );
};

export default Login;
