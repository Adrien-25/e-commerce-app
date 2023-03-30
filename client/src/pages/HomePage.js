import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Prices } from '../components/Prices';


const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);


    //Get All Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    //get Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-product`);
            setProducts(data.products)
        } catch (error) {
            console.log(error);
        }
    }

    //filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all);
    }

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
        //eslint-disable-next-line
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filtered products
    const filterProduct = async () => {
        try {
            console.log("checked : " + checked + "|| radio : " + radio);
            const { data } = await axios.post(`${process.env.REACT_APP_API}api/v1/product/product-filters`, {
                checked,
                radio
            });

            setProducts(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={"All Products - Best offers"}>
            <div className='row p-3'>
                <div className='col-md-2 bg-white rounded-2'>
                    <h6 className='text-center mt-4 mb-2' >Filter By Category</h6>
                    <div className='d-flex flex-column'>
                        {categories?.map(c => (
                            <Checkbox className="m-0 py-1" key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h6 className='text-center mt-4 mb-2' >Filter By Price</h6>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>

                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
                <div className='col-md-9'>
                    {JSON.stringify(checked, null, 4)}
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-nowrap'>
                        {products?.map(p => (
                            <div className="card m-2 col-md-3" key={p._id}>
                                <img className="card-img-top" src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                <div className="card-body">
                                    <h3 className="text-danger fs-5">{p.price} $</h3>
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <div className='text-center'>
                                        <button className='btn btn-primary ms-1'>👁️</button>
                                        <button className='btn btn-secondary ms-1'>🛒</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </Layout >
    )
}

export default HomePage