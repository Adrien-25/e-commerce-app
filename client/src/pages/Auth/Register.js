import React from 'react'
import Layout from '../../components/Layout'

const Register = () => {
    return (
        <Layout title="Register - Ecommerce App">
            <div className='register'>
                <h1>Register Page</h1>
                <form>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Enter Your Name'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Enter Your Email'
                        />
                    </div>
                    <div className="mb-3">

                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exempleInputName" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exempleInputName" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exempleInputName" className="form-label">role</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" />
                    </div>


                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register