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
import { Modal } from "react-bootstrap";
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

        <Dialog open={showAlert} TransitionComponent={Transition} onClose={() => setShowAlert("")}>
            {/*<Modal show={showAlert}
            id="example-modal2"
            backdrop={false}
            centered
        >
            <IonHeader className="  border-0">
                <IonToolbar className="ion-toolbar-transparent" >

                    <IonButtons slot="end" onClick={() => setShowAlert("")}>
                        <IonButton onClick={() => setShowAlert("")}>
                            <IonIcon md={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <Modal.Body>
          
                <div className="pt-5 px-2">
                    <IonItem>
                        <IonLabel position="floating">{header}</IonLabel>
                        <IonInput
                            id="custom-input"
                            maxlength={20}
                            value={wifi}
                            onIonChange={(e) => setWifi(e.detail.value)}
                        />
                    </IonItem>
                    <IonButton expand="full" onClick={() => submitHAndel(wifi)}  >Cambiar</IonButton>

                </div>

    </Modal.Body0>
{ /* </Modal>*}*/}
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => submitHAndel(wifi)}>Actualizar</Button>
            </DialogActions>
        </Dialog>

    )
}