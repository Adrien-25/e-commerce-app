import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout'


const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug])

    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-category/${params.slug}`);
            setCategory(data?.category);
            setProducts(data?.products);
            console.log(category);
            console.log(products);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='container pt-3'>
                <h4 className='text-center'>Category - {category?.name}</h4>
                <h6 className='text-center'>{products?.length} results found</h6>
                <div className='row'>
                    {products?.map((p, index) => (
                        <div className="col-md-6 col-lg-4 mb-4 mb-md-0 py-2">
                            <div className="card" key={index}>
                                <div className="d-flex justify-content-between p-3">
                                    <div>
                                        <img className="card-img-top" src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <p className="small"><a href="#!" className="text-muted text-decoration-none">{p.name}</a></p>
                                                <p className="small text-danger">$ {p.price}</p>
                                            </div>
                                            <div className='text-center'>
                                                <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>👁️</button>
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
            </div>
        </Layout>
    )
}

export default CategoryProduct