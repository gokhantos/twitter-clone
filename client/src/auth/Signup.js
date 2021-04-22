import React, {useState} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { username , email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'});
        axios({
           method: 'POST',
           url: `${process.env.REACT_APP_API}/signup`,
           data: { username, email, password} 
        })
        .then(response => {
            console.log('Signup Successful', response);
            setValues({ ...values, username: '', email: '', password: '', buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('Signup Error', error);
        });
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange= {handleChange('username')} value={username} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange= {handleChange('email')} value={email} type="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange= {handleChange('password')} value={password} type="password" className="form-control"/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1>Signup</h1>
                {signupForm()}
            </div>
        </Layout>
    )
}

export default Signup;