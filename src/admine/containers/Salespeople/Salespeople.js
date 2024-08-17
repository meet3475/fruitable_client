import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addsalespeople, deletesalespeople, editsalespeople, getsalespeople } from '../../../redux/action/salespeople.action';
import { FormControlLabel, styled, Switch } from '@mui/material';

function Salespeople(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const salespeople = useSelector((state) => state.salespeople.salespeople);

    useEffect(() => {
        dispatch(getsalespeople());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
    };

    let salespeopleSchema = object({
        sname: string().required("Please enter Salespeople name"),
        city: string().required("Please enter City"),
        comm: string().required("Please enter Commission"),
        isActive: string().required("Please enter isActive")
    });

    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: '',
            isActive: 1,
        },
        validationSchema: salespeopleSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                dispatch(editsalespeople(values));
            } else {
                dispatch(addsalespeople(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleDelete = (snum) => {
        dispatch(deletesalespeople(snum));
    }


    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }

    const columns = [
        { field: 'snum', headerName: 'Salespeople Number', width: 170 },
        { field: 'sname', headerName: 'Salespeople Name', width: 170 },
        { field: 'city', headerName: 'Salespeople City', width: 170 },
        { field: 'comm', headerName: 'Salespeople Commission', width: 170 },
        {
            field: 'isActive', headerName: 'Status', width: 80, renderCell: (params) => (
                <Android12Switch
                    checked={params.row.isActive}
                />
            )
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" size="large" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row.snum)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&::before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&::after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Salespeople
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Salespeople</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="sname"
                            name="sname"
                            label="Salespeople Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sname}
                            error={errors.sname && touched.sname ? true : false}
                            helperText={errors.sname && touched.sname ? errors.sname : ''}
                        />
                        <TextField
                            margin="dense"
                            id="city"
                            name="city"
                            label="Salespeople City"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            error={errors.city && touched.city ? true : false}
                            helperText={errors.city && touched.city ? errors.city : ''}
                        />
                        <TextField
                            margin="dense"
                            id="comm"
                            name="comm"
                            label="Salespeople Commission"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comm}
                            error={errors.comm && touched.comm ? true : false}
                            helperText={errors.comm && touched.comm ? errors.comm : ''}
                        />
                        <FormControlLabel
                            name='isActive'
                            control={
                                <Android12Switch
                                    checked={values.isActive === 1}
                                    onChange={() => formik.setFieldValue('isActive', values.isActive === 1 ? 0 : 1)}
                                />
                            }
                            label="isActive"
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
                    getRowId={(row) => row.snum}
                    rows={salespeople}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>
    );
}

export default Salespeople;
