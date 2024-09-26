import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addShopDetail, deleteShopDetail, editShopDetail, getShopDetail } from '../../../redux/action/shopDetail.action';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addToCart, minusToCart, plusToCart } from '../../../redux/slice/cart.slice';
import { getProduct } from '../../../redux/action/product.action';


function ShopDetail(props) {

  const { id } = useParams()
  console.log(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fruits, setFruits] = useState([])
  const [update, setUpdate] = useState(false)
  const [count, setCount] = useState(1)

  const [productDetail, setProductDetail] = useState('');


  const reviews = useSelector(state => state.reviews)
  const fruites = useSelector(state => state.fruites)

  const cart = useSelector(state => state.cart)
  console.log(cart);

  const auth = useSelector((state) => state.auth);
  console.log(auth);


  const handleAddToCart = () => {
    console.log(count);
    if (auth.isAuthentication) {
      if (productDetail._id) {
        dispatch(addToCart({
          "user_id": "Meet",
          "items": [
            {
              "product_id": productDetail._id,
              "qty": count
            }
          ]
        }))
      }
    } else {
      navigate("/authForm")
    }
    
  }

  

  const handlePlus = () => {
    setCount(count + 1)
  }

  const handleminus = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  let shopDetailSchema = object({
    name: string().required(),
    email: string().required(),
    review: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      review: '',
    },

    validationSchema: shopDetailSchema,

    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editShopDetail(values))
      } else {
        dispatch(addShopDetail(values))
      }

      resetForm();

    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;


  const getData = async () => {

    try {

      const data = fruites.fruites.find((v) => v.id === id)
      setFruits(data);

    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteShopDetail(id))
  }

  const handleEdit = (data) => {
    formik.setValues(data);
    setUpdate(true);
  }

  const ProductDetails = useSelector(state => state.product);
  console.log("product data", ProductDetails);

  const productData = ProductDetails.product.find((v) => v._id === id);
  console.log("productData", productData);

  React.useEffect(() => {
    setProductDetail(productData)
    getData()
    dispatch(getShopDetail())
    dispatch(getProduct());
  }, [dispatch])

  const columns = [
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'email', headerName: 'Email', width: 170 },
    { field: 'review', headerName: 'Review', width: 170 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" size="large" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }

  ];

  let vegetable_carousel = {
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<div class="owl-prev"><i class="bi bi-arrow-left"></i></div>',
      '<div class="owl-next"><i class="bi bi-arrow-right"></i></div>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  }


  return (
    <div>
      {/* Single Page Header start */}
      < div className="container-fluid page-header py-5" >
        <h1 className="text-center text-white display-6">Shop Detail</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Shop Detail</li>
        </ol>
      </div >
      {/* Single Page Header End */}
      {/* Single Product Start */}
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <a href="#">
                      {
                        productDetail.product_img ? (
                          <img src={productDetail.product_img.url} className="img-fluid rounded" alt="Image" />
                        ) : (
                          <p>Loading...</p>
                        )
                      }
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{productDetail.name}</h4>
                  <p className="mb-3">{productDetail.discription}</p>
                  <h4 className="fw-bold mb-3">${productDetail.price}</h4>
                  <div className="d-flex mb-4">
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star" />
                  </div>
                  <p className="mb-4">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
                  <p className="mb-4">Susp endisse ultricies nisi vel quam suscipit. Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish</p>
                  <div className="input-group quantity mb-5" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button onClick={handleminus} className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <span className="form-control form-control-sm text-center border-0" >{count}</span>
                    <div className="input-group-btn">
                      <button onClick={handlePlus} className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>

                  <a onClick={handleAddToCart} href='#' className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>

                </div>


                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button className="nav-link active border-white border-bottom-0" type="button" role="tab" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" aria-controls="nav-about" aria-selected="true">Description</button>
                      <button className="nav-link border-white border-bottom-0" type="button" role="tab" id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission" aria-controls="nav-mission" aria-selected="false">Reviews</button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                      <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                        Susp endisse ultricies nisi vel quam suscipit </p>
                      <p>Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish filefish Antarctic
                        icefish goldeye aholehole trumpetfish pilot fish airbreathing catfish, electric ray sweeper.</p>
                      <div className="px-2">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="row bg-light align-items-center text-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">1 kg</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Country of Origin</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Agro Farm</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Quality</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Organic</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Сheck</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Healthy</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Min Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">250 Kg</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                      <div className="d-flex">
                        <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: 100, height: 100 }} alt />
                        <div className>
                          <p className="mb-2" style={{ fontSize: 14 }}>April 12, 2024</p>
                          <div className="d-flex justify-content-between">
                            <h5>Jason Smith</h5>
                            <div className="d-flex mb-3">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                            </div>
                          </div>
                          <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                            words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: 100, height: 100 }} alt />
                        <div className>
                          <p className="mb-2" style={{ fontSize: 14 }}>April 12, 2024</p>
                          <div className="d-flex justify-content-between">
                            <h5>Sam Peters</h5>
                            <div className="d-flex mb-3">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                          </div>
                          <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                            words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="nav-vision" role="tabpanel">
                      <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                        amet diam et eos labore. 3</p>
                      <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                        Clita erat ipsum et lorem et sit</p>
                    </div>
                  </div>
                </div>


                <form onSubmit={handleSubmit}>

                  <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input type="text" className="form-control border-0 me-4" placeholder="Your Name *"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        {errors.name && touched.name ? <span style={{ color: "red" }}>{errors.name}</span> : null}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input type="email" className="form-control border-0" placeholder="Your Email *"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email ? <span style={{ color: "red" }}>{errors.email}</span> : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="border-bottom rounded my-4">
                        <textarea id className="form-control border-0" cols={30} rows={8} placeholder="Your Review *" spellCheck="false" defaultValue={""}
                          name="review"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.review}
                        />
                        {errors.review && touched.review ? <span style={{ color: "red" }}>{errors.review}</span> : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex justify-content-between py-3 mb-5">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-3">Please rate:</p>
                          <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                            <i className="fa fa-star text-muted" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <button type="submit" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className='row'>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={reviews.reviews}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                    />
                  </div>

                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12">
                  <div className="input-group w-100 mx-auto d-flex mb-4">
                    <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                  </div>
                  <div className="mb-4">
                    <h4>Categories</h4>
                    <ul className="list-unstyled fruite-categorie">
                      <li>
                        <div className="d-flex justify-content-between fruite-name">
                          <a href="#"><i className="fas fa-apple-alt me-2" />Apples</a>
                          <span>(3)</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between fruite-name">
                          <a href="#"><i className="fas fa-apple-alt me-2" />Oranges</a>
                          <span>(5)</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between fruite-name">
                          <a href="#"><i className="fas fa-apple-alt me-2" />Strawbery</a>
                          <span>(2)</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between fruite-name">
                          <a href="#"><i className="fas fa-apple-alt me-2" />Banana</a>
                          <span>(8)</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between fruite-name">
                          <a href="#"><i className="fas fa-apple-alt me-2" />Pumpkin</a>
                          <span>(5)</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h4 className="mb-4">Featured products</h4>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="rounded" style={{ width: 100, height: 100 }}>
                      <img src="../img/featur-1.jpg" className="img-fluid rounded" alt="Image" />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="rounded" style={{ width: 100, height: 100 }}>
                      <img src="../img/featur-2.jpg" className="img-fluid rounded" alt />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="rounded" style={{ width: 100, height: 100 }}>
                      <img src="../img/featur-3.jpg" className="img-fluid rounded" alt />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                      <img src="../img/vegetable-item-4.jpg" className="img-fluid rounded" alt />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                      <img src="../img/vegetable-item-5.jpg" className="img-fluid rounded" alt />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                      <img src="../img/vegetable-item-6.jpg" className="img-fluid rounded" alt />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center my-4">
                    <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="position-relative">
                    <img src="../img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                    <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                      <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="fw-bold mb-0">Related products</h1>
          <div className="vesitable">
            <OwlCarousel {...vegetable_carousel} className="owl-carousel vegetable-carousel justify-content-center">
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Banana</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Bell Papper</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Potatoes</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Potatoes</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img src="../img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                </div>
                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
      {/* Single Product End */}
    </div >
  );
}

export default ShopDetail;