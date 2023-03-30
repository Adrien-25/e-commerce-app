import { Select } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/single-product/${params.slug}`);

            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id);
            setShipping(data.product.shipping);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, [])

    //Get All Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Getting Categories");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            // photo && productData.append("photo", photo);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);


            const { data } = axios.put(`${process.env.REACT_APP_API}api/v1/product/update-product/${id}`, productData);

            // navigate('/dashboard/admin/products')

            if (data?.success) {
                toast.success("Product Created Successfully");
                //navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Creating Product");
        }
    }

    // delete product
    const handleDelete = async () => {
        try {
            let answer = window.prompt('Are you sure you want to delete this product ?')
            const { data } = await axios.delete(`${process.env.REACT_APP_API}api/v1/product/delete-product/${id}`);
            toast.success("Product Deleted Successfully");
            navigate('/dashboard/admin/products')

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Deleting Product");
        }
    }

    return (
        <Layout title={"Dashboard - Update Product"}>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Update Product</h1>
                        <div className='m-1 w-75 mx-auto'>
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className='form-select mb-3 p-2'
                                onChange={(value) => { setCategory(value) }}
                                defaultValue={category}
                                value={category}
                            >
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id} >
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label htmlFor="photoInput" className="p-3 btn btn-dark col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                </label>
                                <input
                                    type="file"
                                    name="photoInput"
                                    id="photoInput"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />

                            </div>
                            <div className='mb-3' >
                                {photo ? (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className='img img-responsive'
                                        />

                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img
                                            src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className='img img-responsive'
                                        />

                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder='Write a name'
                                    className='form-control p-3'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    value={description}
                                    placeholder='Write a description'
                                    className='form-control p-3'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder='Write a price'
                                    className='form-control p-3'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder='Write a quantity'
                                    className='form-control p-3'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>


                                <Select
                                    bordered={false}
                                    placeholder="Select shipping"
                                    size="large"
                                    showSearch
                                    className='form-select mb-3 p-2'
                                    onChange={(value) => { setShipping(value) }}

                                    defaultValue={shipping}
                                    value={shipping === false ? "0" : "1"}
                                // defaultValue={shipping ? "0" : "1"}
                                >
                                    <Option key="0" value="0" >No</Option>
                                    <Option key="1" value="1" >Yes</Option>
                                </Select>

                            </div>
                            <div className='mb-3 text-center'>
                                <button
                                    className='btn btn-success p-3 Larger shadow mx-2'
                                    onClick={handleUpdate}>
                                    Update Product
                                </button>

                                <button
                                    className='btn btn-danger p-3 Larger shadow mx-2'
                                    onClick={handleDelete}>
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default UpdateProduct