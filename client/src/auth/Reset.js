import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({match}) => {
    const [values, setValues] = useState({
        username: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset Password'
    });

    const {username, token, newPassword, buttonText} = values;

    useEffect(() => {
        let token = match.params.token;
        let {username} = jwt.decode(token);
        if(token){
            setValues({...values, username, token})
        }
    }, []);


    const handleChange = event =>{
        setValues({ ...values, newPassword: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'});
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword, resetPasswordLink: token}
        })
        .then(response => {
            console.log('Reset password Success', response);
            toast.success(response.data.message);
            setValues({...values, buttonText: 'Done'});
        })
        .catch(error => {
            console.log('Reset password error', error);
            toast.error(error.response.data.error);
            setValues({...values, buttonText: 'Reset Password'});
        });
    };

    const passwordResetForm = () => (
        <form>
        <div className="form-group">
            <input
                onChange={handleChange}
                value={newPassword}
                type="password"
                className="form-control"
                placeholder="Type new password"
                required
            />
        </div>

        <div>
            <button className="btn btn-primary" onClick={clickSubmit}>
                {buttonText}
            </button>
        </div>
    </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hey {username}, Type your new password</h1>
                {passwordResetForm()}
            </div>
        </Layout>
    );
}

export default Reset;