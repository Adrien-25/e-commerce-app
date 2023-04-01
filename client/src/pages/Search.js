import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/search';
import Layout from './../components/Layout/Layout';


const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    return (
        <Layout title={'Search results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6>

                    <div className='row'>
                        {values?.results.map((p, index) => (


                            <div className="col-md-6 col-lg-4 mb-4 mb-md-0 py-2">
                                <div className="card" key={index}>
                                    <div className="d-flex justify-content-between p-3">
                                        <div>
                                            <img className="card-img-top" src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="small"><a href="#!" className="text-muted text-decoration-none">{p.name}</a></p>
                                                    <p className="small text-danger">$ {p.price} {p.slug}</p>
                                                </div>
                                                <div className='text-center'>
                                                    <button
                                                        className='btn btn-primary ms-1'
                                                        onClick={() => navigate(`/product/${p.slug}`)}
                                                    >👁️</button>
                                                    <button
                                                        className='btn btn-secondary ms-1'
                                                    >🛒</button>
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
            </div>
        </Layout >
    )
}

export default Search