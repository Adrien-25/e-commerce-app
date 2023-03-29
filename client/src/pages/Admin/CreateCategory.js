import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal, Button } from 'antd';
// import { Modal } from '@mui/material';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [selected, setSelected] = useState(null);

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    }

    //Get All Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/category/get-category`);
            if (data?.success) {
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

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Updating Categories");
        }
    }

    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}api/v1/category/delete-category/${pId}`);
            if (data.success) {
                toast.success(`Category is Deleted`);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Deleting Categories");
        }
    }

    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='container-fluid p-3'>

                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className='w-100'>
                            <table className="table table-striped text-light table-dark">
                                <thead >
                                    <tr>
                                        <th className='p-3' scope="col" >Name</th>
                                        <th scope="col" className='p-3 text-end'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td className='text-end'>
                                                    <button
                                                        className='btn btn-primary'
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name)
                                                            setSelected(c);
                                                        }}>
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className='btn btn-danger ms-2'
                                                        onClick={() => { handleDelete(c._id) }}>
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            centered
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                            className="mh-100"
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default CreateCategory