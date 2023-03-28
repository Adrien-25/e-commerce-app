import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);

    //Get All Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/category/get-category`);
            console.log(data);

            if (data.succes) {
                console.log(data.category);
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Getting Categories");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='container-fluid p-3'>

                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary'>Edit</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default CreateCategory