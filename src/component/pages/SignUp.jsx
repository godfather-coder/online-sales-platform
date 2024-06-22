import React, { useState } from 'react';
import './Register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fname: '',
        lname: ''
    });

    const [errors, setErrors] = useState({});

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
        if (!formData.fname) tempErrors.fname = 'First name is required';
        if (!formData.lname) tempErrors.lname = 'Last name is required';
        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempErrors = validate();
        setErrors(tempErrors);
        if (Object.keys(tempErrors).length === 0) {
            console.log(formData);
            try {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                const user = auth.currentUser;
                console.log(user)
                toast.success('Registration successful!');
                if(user){
                    await setDoc(doc(db,"users",user.uid),{
                        email:user.email,
                        firstname: formData.fname,
                        lastname: formData.lname,
                        password: formData.password
                    })
                }
                Cookies.set('authToken', user.accessToken, { expires: 7 });
                navigate('/me');
            } catch (error) {
                console.log(error)
                toast.error(error.message, {
                    position: "bottom-center",
                });
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                    />
                    {errors.fname && <span className="error">{errors.fname}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                    />
                    {errors.lname && <span className="error">{errors.lname}</span>}
                </div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SignUp;