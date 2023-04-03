import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'


const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // Total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0
                                ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout"}`
                                : "Your Cart is Empty"
                            }
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-9  mb-4'>
                        {cart?.map((p) => (
                            <div className='row mb-2 card flex-row p-2'>
                                <div className='col-md-4'>
                                    <img
                                        className="card-img-top"
                                        src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`}
                                        alt={p.name} />
                                </div>
                                <div className='col-md-8'>
                                    <p className='fw-bold fs-4 mb-2'>{p.name}</p>
                                    <p className='mb-2'>{p.description}</p>
                                    <p className='mb-2'>Price : $ {p.price}</p>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => removeCartItem(p._id)}
                                    >🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-3'>
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage