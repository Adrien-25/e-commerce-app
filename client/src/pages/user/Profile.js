import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}api/v1/auth/profile`, {
                name,
                email,
                password,
                phone,
                address,

            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringif(ls));
                toast.success("Proile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>

                        </h1>
                        <div className='register'>
                            <div className='register-container'>
                                <h1 className='mb-5'>USER PROFILE</h1>
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
                                            disabled
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

                                    <Button className='mt-4 w-100' type="submit" variant="contained">UPDATE</Button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile