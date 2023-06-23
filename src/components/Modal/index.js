import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { Modal } from "react-bootstrap";

export default function ModalViews(){
    return(
        <IonModal isOpen={showAlert}
            id="example-modal2"
            backdropDismiss={false}
        >
            <IonHeader className="  border-0">
                <IonToolbar className="ion-toolbar-transparent" >

                    <IonButtons slot="end" onClick={() => setShowAlert(false)}>
                        <IonButton onClick={() => setShowAlert(false)}>
                            <IonIcon md={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="pt-5 px-2">
                    <IonItem>
                        <IonLabel position="floating">Nombre WIFI</IonLabel>
                        <IonInput
                            id="custom-input"



                            maxlength={20}
                            value={ssi}
                            onIonChange={(e) => console.log(e)}
                        />
                    </IonItem>
                    <IonButton expand="full">Cambiar</IonButton>

                </div>


            </IonContent>
        </IonModal>
    )
}