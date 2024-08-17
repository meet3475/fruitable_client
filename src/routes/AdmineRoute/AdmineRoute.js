import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../../admine/containers/Product/Product';
import Layout from '../../admine/components/Layout/Layout';
import Review from '../../admine/containers/Review/Review'
import Catagory from '../../admine/containers/Catagory/Catagory';
import Facilities from '../../admine/containers/Facilities/Facilities';
import Counter from '../../admine/containers/Counter/Counter';
import Coupon from '../../admine/containers/Coupon/Coupon';
import Checkout from '../../admine/containers/Checkout/Checkout';
import Contact from '../../admine/containers/Contact/Contact';
import Subcatagory from '../../admine/containers/Subcatagory/Subcatagory';
import Variant from '../../admine/containers/Variant/Variant';
import Salespeople from '../../admine/containers/Salespeople/Salespeople';


function AdmineRoute(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/subcatagory" element={<Subcatagory />} />
                    <Route exact path="/review" element={<Review />} />
                    <Route exact path="/variant" element={<Variant />} />
                    <Route exact path="/salespeople" element={<Salespeople />} />
                    <Route exact path="/catagory" element={<Catagory />}/>
                    <Route exact path="/facilities" element={<Facilities />} />
                    <Route exact path="/counter" element={<Counter />} />
                    <Route exact path="/coupon" element={<Coupon />} />
                    <Route exact path="/checkout" element={<Checkout />} />
                    <Route exact path="/contact" element={<Contact/>} />
                </Routes>
            </Layout>
        </div>
    );
}

export default AdmineRoute;