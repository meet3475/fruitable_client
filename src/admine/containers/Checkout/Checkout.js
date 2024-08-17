import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string, number, date, InferType } from 'yup';

import { useFormik } from 'formik';

import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CheckoutContext } from '../../../Context/CheckoutContext';



function Chechout(props) {

    const [open, setOpen] = React.useState(false);

    const [update, setUpdate] = useState(false);

    const checkout = useContext(CheckoutContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
    };



    let checkoutSchema = object({
        name: string().required(),
        adress: string().required(),
        moblie: number().required(),


    });

    const formik = useFormik({
        initialValues: {
            name: '',
            adress: '',
            moblie: '',
        },

        validationSchema: checkoutSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                checkout.editcheckout(values)
            } else {
                checkout.addcheckout(values)
            }
            resetForm();
            handleClose();
        },


    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleDelete = (id) => {
        console.log(id);
        checkout.deletecheckout(id)
      
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'adress', headerName: 'Adress', width: 170 },
        { field: 'moblie', headerName: 'Moblie', width: 170 },
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
                Open form Checkout
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Checkout</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                        <TextField
                            margin="dense"
                            id="adress"
                            name="adress"
                            label="Adress"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.adress}
                            error={errors.adress && touched.adress ? true : false}
                            helperText={errors.adress && touched.adress ? errors.adress : ''}
                        />
                        <TextField
                            margin="dense"
                            id="moblie"
                            name="moblie"
                            label="Moblie"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.moblie}
                            error={errors.moblie && touched.moblie ? true : false}
                            helperText={errors.moblie && touched.moblie ? errors.moblie : ''}
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
                    rows={checkout.checkout}
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

export default Chechout;