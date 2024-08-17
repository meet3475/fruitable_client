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
import { getData, handleAdd, handleUpdateData, handledelete } from '../../../redux/action/category.action';
import { useDispatch, useSelector } from 'react-redux';





export default function Catagory() {
    const [open, setOpen] = React.useState(false);
    // const [data, setData] = React.useState([]);
    const [update, setUpdate] = React.useState(null);

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    console.log(categories.categories);
    // console.log(data);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let catagorySchema = object({
        name: string().required("Please entre name"),
        discription: string().required("Please entre discription").min(5, "Please entre minimum 5 charactrer in message"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            discription: '',
        },

        validationSchema: catagorySchema,

        onSubmit: (values, { resetForm }) => {

            if (update) {
                dispatch(handleUpdateData({...values, _id:update}));
            } else {
                dispatch(handleAdd(values));
            }

            resetForm();
            handleClose();
        },
    });


    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;

    React.useEffect(() => {
        dispatch(getData());
    }, [dispatch])


    // const getData = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8000/api/v1/categories/list-categories");
    //         const data = await response.json();
    //         console.log(data);
    //         setData(data.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // const localData = JSON.parse(localStorage.getItem("category"));

    //     // if (localData) {
    //     //     setData(localData)
    //     // }
    // }



    // const handleAdd = async (data) => {
    //      console.log(data);

    //     try {
    //         await fetch("http://localhost:8000/api/v1/categories/add-categories", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     // let localData = JSON.parse(localStorage.getItem("category"));
    //     // let rNo = Math.floor(Math.random() * 1000);

    //     // if (localData) {
    //     //     localData.push({ ...data, id: rNo });
    //     //     localStorage.setItem("category", JSON.stringify(localData));
    //     // } else {
    //     //     localStorage.setItem("category", JSON.stringify([{ ...data, id: rNo }]));
    //     // }
    //     getData();
    // }


    // const handleDelete = async (data) => {

    //     try {
    //         await fetch("http://localhost:8000/api/v1/categories/delete-category/" + data._id, {
    //             method: "DELETE",
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     // let localData = JSON.parse(localStorage.getItem("category"));

    //     // let fData = localData.filter((v) => v.id !== data.id);

    //     // localStorage.setItem("category", JSON.stringify(fData));

    //     getData();
    // }





    // const handleUpdateData = async (data) => {

    //     try {
    //         await fetch("http://localhost:8000/api/v1/categories/update-category/" + data._id, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }


    //     // let localData = JSON.parse(localStorage.getItem("category"));

    //     // let index = localData.findIndex((v) => v.id === data.id);

    //     // localData[index] = data;

    //     // localStorage.setItem("category", JSON.stringify(localData));

    //     getData();
    // }

    const handleDelete = (id) => {
        dispatch(handledelete(id))
    }

    const handlEdit = (data) => {
        // console.log(data);
        setOpen(true);
        setValues(data);
        setUpdate(data._id);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'discription', headerName: 'Description', width: 130 },
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
                    Add Category
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Category</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Category Name"
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
                                name="discription"
                                label="Category Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discription}
                                error={errors.discription && touched.discription ? true : false}
                                helperText={errors.discription && touched.discription ? errors.discription : ''}
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
                    rows={categories.categories}
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