import React from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

function Login(props) {

    let loginSchema = object({
        email: string().required("Please Enter Email"),
        password: string().required("Please Enter Password"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/users/login', values);
                console.log('Refresh Token:', response.data.tokens.refreshToken);
                // You can also save the tokens to localStorage or state if needed
                resetForm();
            } catch (error) {
                console.error('Error logging in:', error.response.data.message);
            }
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;

    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <form onSubmit={handleSubmit}>
                            <h4 className="mb-5 fw-bold">LOGIN PAGE</h4>
                            <div className="row g-4">
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
                                <div className="col-lg-6">
                                    <div className="border-bottom rounded">
                                        <input type="password" className="form-control border-0 me-4" placeholder="Your Password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                        {errors.password && touched.password ? <span style={{ color: "red" }}>{errors.password}</span> : null}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="d-flex justify-content-between py-3 mb-5">
                                        <button type="submit" className="btn border border-secondary text-primary rounded-pill px-4 py-3">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
