import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string } from 'yup';
import { useFormik } from 'formik';

import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSubData, handleAdd, handleUpdateData, handledelete } from '../../../redux/slice/subcategory.slice';
import { getData } from '../../../redux/action/category.action';


export default function Subcatagory() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [update, setUpdate] = React.useState(null);
    const [category, setCategory] = React.useState([]);

    const dispatch = useDispatch();
    const subcategories = useSelector(state => state.subcategories);
    // console.log(subcategories.subcategories);

   const categories = useSelector(state => state.categories);
    // console.log(categories.categories);
    // console.log(data);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let subcatagorySchema = object({
        name: string().required("Please entre name"),
        description: string().required("Please entre discription").min(5, "Please entre minimum 5 charactrer in message"),
        category_id: string().required("Please select category")
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            name: '',
            description: '',

        },

        validationSchema: subcatagorySchema,

        onSubmit: (values, { resetForm }) => {

            if (update) {
                dispatch(handleUpdateData(values))
            } else {
                dispatch(handleAdd(values))
            }

            resetForm();
            handleClose();
        },
    });


    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;

    // const getCategoryData = async () => {
    //     try {
    //         const response2 = await fetch("http://localhost:8000/api/v1/categories/list-categories");
    //         const catagories = await response2.json();
    //         console.log(catagories);
    //         setCategory(catagories.data);
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    // const getData = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategories");
    //         const data = await response.json();
    //         console.log(data);
    //         setData(data.data);

    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    React.useEffect(() => {
        dispatch(getData());
        dispatch(getSubData());
    }, [])


    // const handleAdd = async (data) => {

    //     try {
    //         await fetch("http://localhost:8000/api/v1/subcategories/add-subcategories", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     getData();
    // }


    // const handleDelete = async (data) => {

    //     try {
    //         await fetch("http://localhost:8000/api/v1/subcategories/delete-subcategory/" + data._id, {
    //             method: "DELETE",
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     getData();
    // }

    const handleDelete = (data) => {
        console.log("gh");
        dispatch(handledelete(data))
    }

    const handlEdit = (data) => {
        // console.log(data);
        setOpen(true);
        setValues(data);
        setUpdate(data._id);
    }

    // const handleUpdateData = async (data) => {

    //     try {
    //         await fetch("http://localhost:8000/api/v1/subcategories/update-subcategory/" + data._id, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     getData();
    // }

    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 150,
            renderCell: (params) => {
                const category = categories.categories?.find((v) => v._id === params.row.category_id);
                // console.log(category);
                return category ? category.name : ''
            }
        },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="large" onClick={() => handlEdit(params.row)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )


        }

    ];



    return (

        <>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Subcategory
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Subcategory</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <InputLabel style={{ color: "black" }}>Select Category</InputLabel>
                            <Select
                                name="category_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category_id}
                                label="Select Category"
                            >
                                {
                                    categories.categories.map((v) => (
                                        // console.log(v._id),
                                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                    ))
                                }
                            </Select>
                            {errors.category_id && touched.category_id ? <span style={{ color: "red" }}>{errors.category_id}</span> : null}

                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Subcategory Name"
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
                                id="name"
                                name="description"
                                label="Subcategory Description"
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
                                <Button
                                    type="submit"
                                >{update ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>


                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={subcategories.subcategories}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={rows => rows._id}
                />
            </div>
        </>
    );
}