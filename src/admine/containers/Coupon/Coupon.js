import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string, number, date, InferType } from 'yup';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';


import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addcoupon, deleteCoupon, getCoupon, updateCoupon } from '../../../redux/slice/coupon.slice';


function Coupon(props) {

    const [open, setOpen] = React.useState(false);

    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch()

    const coupon = useSelector(state => state.coupon);
    console.log(coupon);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
    };

    
    useEffect(() => {
        dispatch(getCoupon())
    }, []);


    let couponSchema = object({
        coupon_name: string().required(),
        percentage: number().required(),
        expiry_Date: date().required(),
        
    });

    const formik = useFormik({
        initialValues: {
            coupon_name: '',
            percentage: '',
            expiry_Date: '',
        },

        validationSchema: couponSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateCoupon(values))
            } else {
                dispatch(addcoupon(values))
            }
            resetForm();
            handleClose();
        },


    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteCoupon(id))
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }

    const columns = [
        { field: 'coupon_name', headerName: 'Coupon Name', width: 170 },
        { field: 'percentage', headerName: 'Discount Percentage', width: 170 },
        { field: 'expiry_Date', headerName: 'Expiry Date', width: 170 },
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
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form Coupon
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Coupon</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="coupon_name"
                            name="coupon_name"
                            label="Coupon Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.coupon_name}
                            error={errors.coupon_name && touched.coupon_name ? true : false}
                            helperText={errors.coupon_name && touched.coupon_name ? errors.coupon_name : ''}
                        />
                        <TextField
                            margin="dense"
                            id="percentage"
                            name="percentage"
                            label="Discount Percentage"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.percentage}
                            error={errors.percentage && touched.percentage ? true : false}
                            helperText={errors.percentage && touched.percentage ? errors.percentage : ''}
                        />
                        <TextField
                            margin="dense"
                            id="expiry_Date"
                            name="expiry_Date"
                            label="Expiry Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.expiry_Date}
                            error={errors.expiry_Date && touched.expiry_Date ? true : false}
                            helperText={errors.expiry_Date && touched.expiry_Date ? errors.expiry_Date : ''}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>

            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={coupon.coupon}
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

        </>
    );
}

export default Coupon;