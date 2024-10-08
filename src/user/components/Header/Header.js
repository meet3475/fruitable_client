import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../Context/ThemeContext';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { getData } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subcategory.slice';
import { getProduct } from '../../../redux/action/product.action';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../../redux/slice/auth.slice';

function Header(props) {
 

  const dispatch = useDispatch();
  const [subcat, setSubcat] = useState([]);

  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector((state) => state.subcategories.subcategories);
  const product = useSelector((state) => state.product.product);

  const cart = useSelector(state => state.cart || []);
  console.log('Cart State:', cart);

  const items = cart?.cart?.data?.items || [];
  console.log(items);

  const totalQty = items.reduce((sum, item) => sum + (item.qty || 0), 0);
  console.log('Total Quantity:', totalQty);


  const { isAuthentication, user } = useSelector((state) => state.auth);


  const themeContext = useContext(ThemeContext);
  // console.log(themeContext);

  const handleTheme = () => {
    themeContext.toggleTheme(themeContext.theme);
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getData());
    dispatch(getSubData());
  }, [dispatch]);

  const handleCategory = (category_id) => {
    console.log(category_id);

    const subdata = subcategories.filter((v) => v.category_id === category_id);
    setSubcat(subdata);

    document.getElementById("subright").style.display = "block";
  };

  const handleDisplay = (subcategory_id) => {
    console.log(subcategory_id);

    const produtdata = product.filter((v) => v.subcategory_id === subcategory_id);
    console.log(produtdata);

    navigate('/Shop', { state: { subcategory_id } });
  };

  const handleLogout = () => {
    dispatch(logout(user._id));
  }

  return (
    <div>
      {/* Navbar start */}
      <div className={`container-fluid fixed-top ${themeContext.theme}`}>
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
              <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
              <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
              <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-expand-xl">
            <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></a>
            <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="fa fa-bars text-primary" />
            </button>
            <div className={`collapse navbar-collapse ${themeContext.theme}`} id="navbarCollapse">
              <div className={`navbar-nav mx-auto ${themeContext.theme}`}>
                <NavLink to='/' className="nav-item nav-link active">Home</NavLink>
                <NavLink to='/Shop' className="nav-item nav-link">Shop</NavLink>
                <NavLink to='/Shop_Detail' className="nav-item nav-link">Shop Detail</NavLink>
                <NavLink to='/chat' className="nav-item nav-link">Chat</NavLink>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <NavLink to='/Cart' className="dropdown-item">Cart</NavLink>
                    <NavLink to='/Review' className="dropdown-item">Review</NavLink>
                    <NavLink to='/Chackout' className="dropdown-item">Chackout</NavLink>
                    <NavLink to='/Testimonial' className="dropdown-item">Testimonial</NavLink>
                    <NavLink to='/Page' className="dropdown-item">404 Page</NavLink>
                  </div>
                </div>
                <div className="nav-item dropdown main">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Products</a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {categories.map((v) => (
                      <a href="" onMouseMove={() => handleCategory(v._id)} onClick={() => handleCategory(v._id)} className="dropdown-item">{v.name}</a>
                    ))}
                  </div>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0" id='subright'>
                    {subcat.map((v) => (
                      <a href="" onClick={() => handleDisplay(v._id)} className="dropdown-item">{v.name}</a>
                    ))}
                  </div>
                </div>
                <NavLink to='/Contact' className="nav-item nav-link">Contact</NavLink>
                {/* <NavLink to='/Register' className="nav-item nav-link">Register</NavLink>
                <NavLink to='/Login' className="nav-item nav-link">Login</NavLink> */}
              </div>
              <div className="d-flex m-3 me-0 align-items-center">
                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button>
                <NavLink to={`/Cart`} className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x" />
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}
                  >
                    {totalQty}
                  </span>
                </NavLink>

                {
                  isAuthentication ? <LogoutIcon fontSize='large' className='me-3'  onClick={handleLogout}/> : 
                  <NavLink to={`/authForm`} href="#" className="my-auto">
                    <i className="fas fa-user fa-2x" />
                  </NavLink>
                }
                {themeContext.theme === 'light' ? <LightModeIcon fontSize='large' onClick={handleTheme} /> : <DarkModeIcon fontSize='large' onClick={handleTheme} />}
              </div>
              
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
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
    </div>
  );
}

export default Header;