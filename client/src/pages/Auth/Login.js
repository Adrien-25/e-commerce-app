import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../styles/AuthStyles.css";
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => { event.preventDefault(); };

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //${process.env.REACT_APP_API}
            //http://localhost:8080/api/v1/auth/login
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                console.log(location.state);
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title="Login - Ecommerce App">
            <div className='register'>
                <div className='register-container'>
                    <h1 className='mb-5'>Login Form</h1>
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
                        <div className="mb-4 p-0">
                            <TextField
                                className="me-2 w-100 "
                                //type="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="InputPassword"
                                label="Enter Your Password"
                                variant="filled"
                                required
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment className="position-absolute " position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </div>

                        <Button
                            className='mt-4 w-100'
                            type="submit"
                            variant="contained"
                        >LOGIN</Button>
                        <Button
                            className='mt-4 w-100'
                            type="button"
                            variant="text"
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                        >FORGOT PASSWORD ?</Button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login