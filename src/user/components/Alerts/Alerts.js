import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { resetAlert } from '../../../redux/slice/alerts.slice';

function Alerts(props) {

    const { color, messsage } = useSelector(state => state.alert);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    useEffect(() => {
        if (messsage != '') {
            enqueueSnackbar(messsage, {
                variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }

        // const timeRef = setTimeout(() => {
        //     dispatch(resetAlert())
        // }, 2000)

        // return () => {
        //     clearTimeout(timeRef)
        // }

    }, [messsage])

    return (
        <div>

        </div>
    );
}

export default Alerts;