import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useEffect, useState } from "react";
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function ModalViews(props) {
    let { showAlert, setShowAlert, ssi, submitHAndel, header } = props
    let [wifi, setWifi] = useState("")
    useEffect(() => {
        setWifi(ssi)
    }, [showAlert])

    function handleClose() {
        setShowAlert("")
    }
    return (

        <Dialog open={showAlert} maxWidth="xs" TransitionComponent={Transition} onClose={() => setShowAlert("")}>
            <DialogTitle>{header}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="custom-input"
                    maxlength={20}
                    value={wifi}
                    onChange={(e) => setWifi(e.target.value)}
                    
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button className='btn btn-sm   text-white rounded-pill btn-size-1 py-25 shadow-2' color='error' variant={"contained"} onClick={handleClose}>Cancel</Button>
                <Button className='btn btn-sm  bg-blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2' color={"success"} variant={"contained"} onClick={() => submitHAndel(wifi)}>Actualizar</Button>
            </DialogActions>
        </Dialog>

    )
}