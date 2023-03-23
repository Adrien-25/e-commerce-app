import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../styles/AuthStyles.css";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/register`, { name, email, password, phone, address });
            if (res.data.success) {
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
        <Layout title="Register - Ecommerce App">
            <div className='register'>
                <div className='register-container'>
                    <h1 className='mb-5'>Register Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 d-flex">
                            <TextField
                                className="me-2 "
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="InputName"
                                label="Enter Your Name"
                                variant="filled"
                                required
                            />
                            <TextField
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="InputEmail"
                                label="Enter Your Email"
                                variant="filled"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <TextField
                                className="me-2 w-100"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="InputPassword"
                                label="Enter Your Password"
                                variant="filled"
                                required
                            />
                        </div>
                        <div className="mb-4 d-flex">
                            <TextField
                                className="me-2 "
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                id="InputPhone"
                                label="Enter Your Phone"
                                variant="filled"
                                required
                            />
                            <TextField
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                id="InputAddress"
                                label="Enter Your Address"
                                variant="filled"
                                required
                            />
                        </div>

                        <Button className='mt-4 w-100' type="submit" variant="contained">REGISTER</Button>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register