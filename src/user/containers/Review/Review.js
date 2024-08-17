import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { baseURL } from '../../../utils/baseURL';

import { object, string, number, date, InferType } from 'yup';

import { useFormik } from 'formik';

import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addReview, deleteReview, editReview, getReview } from '../../../redux/action/review.action';

function Review(props) {
    const { id } = useParams()
    console.log(id);

    const dispatch = useDispatch();

    // const [fruits, setFruits] = useState([])

    const [update, setUpdate] = useState(false)


    const reviews = useSelector(state => state.reviews)

  
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
                dispatch(editReview(values))
            } else {
                dispatch(addReview(values))
            }

            resetForm();

        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;


    const handleDelete = (id) => {
        dispatch(deleteReview(id))
    }

    const handleEdit = (data) => {
        setValues(data);
        setUpdate(true);
    }

    React.useEffect(() => {
        dispatch(getReview())
    }, [])

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
    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
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
            </div>
        </div>
    );
}

export default Review;