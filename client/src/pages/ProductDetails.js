import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initial details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    //get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/single-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    }

    //get related products
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/related-product/${pid}/${cid}`);
            console.log(data);
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <h1>Products Details</h1>
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <img
                                    style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                                    alt={product.name}
                                />
                            </div>
                        </aside>
                        <main className="col-lg-6 bg-light bg-gradient p-3 rounded-4">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark text-capitalize">
                                    {product.name} <br />
                                    <span className='fs-6 fst-italic'></span>
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fas fa-star-half-alt" />
                                        <span className="ms-1">
                                            4.5
                                        </span>
                                    </div>
                                    <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1" />154 orders</span>
                                    <span className="text-success ms-2">In stock</span>
                                </div>
                                <div className="mb-3">
                                    <span className="h5">$ {product.price}</span>
                                </div>
                                <p>
                                    {product.description}
                                </p>
                                <div className="row">
                                    <dt className="col-3">Type:</dt>
                                    <dd className="col-9">Regular</dd>
                                    <dt className="col-3">Color</dt>
                                    <dd className="col-9">Brown</dd>
                                    <dt className="col-3">Material</dt>
                                    <dd className="col-9">Cotton, Jeans</dd>
                                    <dt className="col-3">Brand</dt>
                                    <dd className="col-9">Reebook</dd>
                                </div>
                                <hr />
                                <div className='d-flex gap-4 justify-content-center'>

                                    <a href="/" className="btn btn-warning shadow-0"> Buy now </a>
                                    <a href="/" className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket" /> Add to cart </a>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            <div className='row'>
                <h1>Similar produts</h1>
                {relatedProducts.length < 1 && <p>Nos similmar products found</p>}
                <div className='row p-3'>
                    {relatedProducts?.map((p) => (
                        <div className="col-sm-3">
                            <div className="bg-white text-center rounded-3 py-3">
                                <span className="wish-icon"><i className="fa fa-heart-o" /></span>
                                <div className="img-box p-3">
                                    <img
                                        src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                                        className="img-fluid"
                                        alt={p.name} />
                                </div>
                                <div className="thumb-content">
                                    <h4>{p.name}</h4>
                                    <p className="item-price"><b>$ {p.price}</b></p>
                                    <div className='d-flex gap-3 justify-content-center'>
                                        <a href="/" className="btn btn-primary">👁️</a>
                                        <a href="/" className="btn btn-secondary">🛒</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout >
    )
}

export default ProductDetails