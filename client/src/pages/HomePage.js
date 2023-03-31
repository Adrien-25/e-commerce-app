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
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



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
        getTotal();
    }, []);

    // //get Products
    // const getAllProducts = async () => {
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-product`);
    //         setProducts(data.products)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //get Products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-list/{page}`);
            setLoading(false)
            setProducts(data.products)
        } catch (error) {
            console.log(error);
        }
    }

    //get Total Count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-count`);
            setTotal(data?.total)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
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
                <div className='col-md-3 bg-white rounded-2'>
                    <h6 className='text-center mt-4 mb-2' >Filter By Category</h6>
                    <div className='d-flex flex-column'>
                        {categories?.map((c, index) => (
                            <Checkbox
                                className="m-0 py-1"
                                // key={c._id} 
                                key={index}

                                onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h6 className='text-center mt-4 mb-2' >Filter By Price</h6>
                    <div className='d-flex flex-column mb-4'>
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map((p, index) => (
                                <div key={index}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className='d-flex flex-column mb-4'>
                        <button
                            className='btn btn-danger'
                            onClick={() => window.location.reload()}
                        >🔄</button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>

                    <div className='row'>
                        {products?.map((p, index) => (
                            <div className="col-md-6 col-lg-4 mb-4 mb-md-0 py-2">
                                <div className="card" key={index}>
                                    <div className="d-flex justify-content-between p-3">
                                        <div>
                                            <img className="card-img-top" src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="small"><a href="#!" className="text-muted">{p.name}</a></p>
                                                    <p className="small text-danger">$ {p.price}</p>
                                                </div>
                                                <div className='text-center'>
                                                    <button className='btn btn-primary ms-1'>👁️</button>
                                                    <button className='btn btn-secondary ms-1'>🛒</button>
                                                </div>
                                                <p className="text-muted mb-0 mt-2">Available: <span className="fw-bold">7</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button
                                className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default HomePage