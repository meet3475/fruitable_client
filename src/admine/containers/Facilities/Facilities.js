import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string, number, date, InferType } from 'yup';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Addfacilities, Deletefacilities, Updatefacilities } from '../../../redux/action/facilities.action';

import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Spinner } from 'reactstrap';

function Facilities(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch()

    const facilities = useSelector(state => state.facilities)
    console.log(facilities);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
    };

    let facilitiesSchema = object({
        name: string().required("Please entre name"),
        description: string().required("Please entre description"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },

        validationSchema: facilitiesSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(Updatefacilities(values))
            } else {
                const rNo = Math.floor(Math.random() * 1000);
                dispatch(Addfacilities({ ...values, id: rNo }))
            }

            resetForm();
            handleClose();

        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleDelete = (id) => {
        dispatch(Deletefacilities(id))
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }

    const columns = [
        { field: 'name', headerName: 'Facilities Name', width: 170 },
        { field: 'description', headerName: 'Facilities Description', width: 170 },
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
            {
                facilities.isLoading ?
                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner> :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Facilities
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}

                        >
                            <DialogTitle>Facilities</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Facilities Name"
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
                                        id="description"
                                        name="description"
                                        label="Facilities Description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={errors.description && touched.description ? true : false}
                                        helperText={errors.description && touched.description ? errors.description : ''}
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
                                rows={facilities.facilities}
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
            }

        </>
    );
}

export default Facilities;