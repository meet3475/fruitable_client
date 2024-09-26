import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/action/product.action';
import { deleteCartItem, deleteToCart, minusToCart, plusToCart, updateCartQuantity } from '../../../redux/slice/cart.slice';

import { useFormik } from 'formik';

import { object, string } from 'yup';
import { getCoupon } from '../../../redux/slice/coupon.slice';
import { ThemeContext } from '../../../Context/ThemeContext';
import Button from '../../components/UI/Button/Button';


function Cart(props) {

    const [couponDisCount, setCouponDisCount] = useState(0);

    const cart = useSelector(state => state.cart || []);
    console.log('Cart State:', cart);

    const product = useSelector(state => state.product);
    console.log(product);
    
    const coupon = useSelector(state => state.coupon);
    console.log(coupon);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getCoupon())
    }, [])

    const items = cart?.cart?.data?.items || [];
    console.log(items);

    const cartData = items.map((v) => {
        console.log(v.product_id);

        const productData = product.product.find((v1) => v1._id === v.product_id);
        console.log(productData);

        return { ...productData, qty: v.qty, cart_id: cart.cart.data._id }

    });

    console.log(cartData);

    const handlePlus = (_id) => {
        console.log(_id);
        const item = cartData.find(v => v._id === _id);
        if (item) {
            dispatch(updateCartQuantity({ cart_id: item.cart_id, product_id: _id, qty: item.qty + 1 }));
        }
    }

    const handleminus = (_id) => {
        console.log(_id);
        const item = cartData.find(v => v._id === _id);
        if (item && item.qty > 1) {
            dispatch(updateCartQuantity({ cart_id: item.cart_id, product_id: _id, qty: item.qty - 1 }));
        }
    }

    const handleDelete = ( cart_id, _id) => {
        console.log("Handling delete for ID:", _id);
        console.log(cart_id);
        dispatch(deleteCartItem({ cart_id, _id }))
    }

    const totalAmt = cartData.reduce((acc, v) => acc + v.qty * v.price, 0);
    console.log(totalAmt);



    const handleCoupon = (data) => {

        console.log(data);
        let flag = 0;
        let per = 0;

        coupon.coupon.map((v) => {

            if (v.coupon_name === data.coupon) {

                const CreatedDate = new Date()

                const ExpiryDate = new Date(v.expiry_Date)

                console.log(CreatedDate, ExpiryDate);

                if (CreatedDate <= ExpiryDate) {
                    flag = 1;
                    per = (v.percentage)
                    setCouponDisCount(per)
                } else {
                    flag = 2;
                }
            }
        })

        if (flag === 0) {
            formik.setFieldError("coupon", "Invalid coupon")
        } else if (flag === 1) {
            formik.setFieldError("coupon", `Coupon Aplied Succesfully & You got ${per} Discount`)
        } else if (flag === 2) {
            formik.setFieldError("coupon", "Coupon Expiry")
        }
    }



    const DiscountAmt = totalAmt * (couponDisCount / 100)

    console.log(DiscountAmt);

    const TotalBill = totalAmt - DiscountAmt



    let couonSchema = object({
        coupon: string().required("Please entre Coupon"),
    });


    const formik = useFormik({
        initialValues: {
            coupon: '',
        },
        validationSchema: couonSchema,
        onSubmit: values => {
            handleCoupon(values)
        },
    });


    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const theme = useContext(ThemeContext)

    return (
        <div>
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((v) => (
                                        <tr>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={v.product_img.url} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price} $</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handleminus(v._id)} disabled={v.qty > 1 ? false : true} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span className="form-control form-control-sm text-center border-0">{v.qty}</span>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handlePlus(v._id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{(v.price * v.qty).toFixed(2)}$</p>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(v.cart_id, v._id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <input
                                name='coupon'
                                type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.coupon}
                            />
                            {errors.coupon && touched.coupon ? <span style={{ color: "red", margin: "20px" }} >{errors.coupon}</span> : null}
                            <Button
                                // btnDisable={true}
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                type="submit">
                                Apply Coupon
                            </Button>
                        </form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="rounded">
                                <div className="p-4">
                                    <h2 className={`display-6 mb-4 ${theme.theme}`}>Cart <span className="fw-normal">Total</span></h2>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h4 className="mb-0 me-4">Subtotal:</h4>
                                        <p className="mb-0">${totalAmt.toFixed(2)}</p>
                                    </div>
                                    {
                                        DiscountAmt > 0 ?
                                            <div className="d-flex justify-content-between mb-4">
                                                <h4 className="mb-0 me-4">Discount:</h4>
                                                <p className="mb-0">${DiscountAmt.toFixed(2)}</p>
                                            </div> : ''
                                    }
                                    {
                                        TotalBill < 500 ?
                                            <>
                                                <div className="d-flex justify-content-between">
                                                    <h4 className="mb-0 me-4">Shipping</h4>
                                                    <div className>
                                                        <p className="mb-0">Flat rate: ${100}</p>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                            </>
                                            : null
                                    }

                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h4 className="mb-0 ps-4 me-4">Total</h4>
                                    <p className="mb-0 pe-4">${TotalBill < 500 ? TotalBill + 100 : TotalBill}</p>
                                </div>

                                <Button btnType="Primary">
                                    Proceed Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;