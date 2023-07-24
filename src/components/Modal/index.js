import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalViews(props) {
    let { showAlert, setShowAlert, ssi,  submitHAndel,header } = props
    let [wifi, setWifi]= useState("")
    useEffect(()=>{
        setWifi(ssi)
    }, [showAlert])

    return (
        <Modal show={showAlert}
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

            </Modal.Body>
        </Modal>
    )
}