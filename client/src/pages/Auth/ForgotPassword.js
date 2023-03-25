import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../styles/AuthStyles.css";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //${process.env.REACT_APP_API}
            //http://localhost:8080/api/v1/auth/login
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/forgot-password`, {
                email,
                newPassword,
                answer
            });
            if (res && res.data.success) {
                toast.success(res.data.message);


                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title={'Forgot Password - Ecommerce App'}>
            <div className='register'>
                <div className='register-container'>
                    <h1 className='mb-5'>Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 d-flex">
                            <TextField
                                className="w-100"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="InputEmail"
                                label="Enter Your Email"
                                variant="filled"
                                required
                            />
                        </div>
                        <div className="mb-4 d-flex">
                            <TextField
                                className="w-100"
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                id="InputSport"
                                label="Enter Your Favorite Sport"
                                variant="filled"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                className="me-2 w-100"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                id="InputPassword"
                                label="Enter Your Password"
                                variant="filled"
                                required
                            />
                        </div>

                        <Button
                            className='mt-4 w-100'
                            type="submit"
                            variant="contained"
                        >RESET</Button>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword