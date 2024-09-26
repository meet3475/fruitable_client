import React, { useContext, useEffect } from 'react';
import Header from '../../user/components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../../user/containers/Home/Home';
import Shop from '../../user/containers/Shop/Shop';
import Cart from '../../user/containers/Cart/Cart';
import Chackout from '../../user/containers/Chackout/Chackout';
import Testimonial from '../../user/containers/Testimonial/Testimonial';
import Page from '../../user/containers/Page/Page';
import Contact from '../../user/containers/Contact/Contact';
import Footer from '../../user/components/Footer/Footer';
import ShopDetail from '../../user/containers/ShopDetail/ShopDetail';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Review from '../../user/containers/Review/Review';
import { ThemeContext } from '../../Context/ThemeContext';
import Login from '../../user/containers/Login/Login';
import Register from '../../user/containers/Register/Register';
import Chat from '../../user/containers/Chat/Chat';
import AuthForm from '../../user/containers/AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/slice/auth.slice';


function UserRoute(props) {

    const theme = useContext(ThemeContext);
    console.log(theme);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    return (
        <div className={theme.theme}>
            <>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/Shop" element={<Shop />} />
                    <Route exact path="/ShopDetail/:id" element={<ShopDetail />} />
                    <Route element={<PrivateRoute />}>
                    <Route exact path="/Cart" element={<Cart />} />
                    </Route>


                    {/* <Route exact path="/Shop_Detail" element={<Shop_Detail />} /> */}

                   
                    <Route exact path="/authForm" element={<AuthForm />} />
                    <Route exact path="/chat" element={<Chat />} />
                    <Route exact path="/Chackout" element={<Chackout />} />
                    <Route exact path="/Testimonial" element={<Testimonial />} />
                    <Route exact path="/Page" element={<Page />} />
                    <Route exact path="/Contact" element={<Contact />} />
                    <Route exact path="/Review" element={<Review />} />
                    <Route exact path="/Login" element={<Login />} />
                    <Route exact path="/Register" element={<Register />} />
                </Routes>
                <Footer />
            </>
        </div>
    );
}

export default UserRoute;