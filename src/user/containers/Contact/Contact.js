import React from 'react';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import Input from '../../components/UI/Input/Input';


function Contact(props) {
    let contactSchema = object({
        name: string().required("Please entre name"),
        email: string().required("Please entre Email").email("Please entre valid Email"),
        message: string().required().min(5, "Please entre minimum 5 charactrer in message"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },

        validationSchema: contactSchema,

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;

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
                <h1 className="text-center text-white display-6">Contact</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Contact</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Contact Start */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                    <h1 className="text-primary">Get in touch</h1>
                                    <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="h-100 rounded bg-white">
                                    <iframe className="rounded w-100" style={{ height: 400 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        type="text"
                                        placeholder="Your Name"
                                        name='name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        errorText= {errors.name && touched.name ? errors.name : ''}
                                    />
                                    <input
                                        type="email"
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        placeholder="Enter Your Email"
                                        name='email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <span className='error'>
                                        {errors.email && touched.email ? errors.email : ''}
                                    </span>
                                    <textarea
                                        className="w-100 form-control border-0 mb-4"
                                        rows={5} cols={10}
                                        placeholder="Your Message"
                                        name='message'
                                        defaultValue={""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.message}
                                    />
                                    <span className='error'>
                                        {errors.message && touched.message ? errors.message : ''}
                                    </span>
                                    <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Submit</button>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h5>Address</h5>
                                        <h6 className="mb-2">123 Street New York.USA</h6>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4" />
                                    <div>
                                        <h5>Mail Us</h5>
                                        <h6 className="mb-2">info@example.com</h6>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h5>Telephone</h5>
                                        <h6 className="mb-2">(+012) 3456 7890</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </div>

    );
}

export default Contact;