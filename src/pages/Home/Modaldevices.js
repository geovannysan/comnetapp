import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonToolbar } from "@ionic/react";
import { exit, reorderFour,close, chevronForward } from "ionicons/icons";

export default function DeviceView(props) {
    let { showModal, setModal }= props
    return (

        <IonModal isOpen={showModal}
            onDidDismiss={() => setModal(false)}
            backdropDismiss={false}
           
        >
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="end"  >
                        <IonButton 
                        
                        onClick={() => setModal(false)}>
                            <IonIcon icon={close}></IonIcon>
                        </IonButton>
                      
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
        
            <IonContent>
                
                    <IonItem>
                        
                      <IonLabel>
                            
                            <h3><i className=" bi bi-router px-1"></i> Route</h3>
                            <p>HS8545M</p>
                      </IonLabel>     
                      <IonLabel slot="end">
                            <h3>Route</h3>
                            <p>HS8545M</p>
                      </IonLabel>
                    </IonItem>
                    <IonList >
                        <IonItem lines="none">
                            <IonLabel>
                                <h3>Ipone</h3>
                                <p>60:35:d5:35:15 </p>
                                <h3> </h3>

                            </IonLabel>
                            <IonLabel slot="none">
                                <h3></h3>
                                <a className="btn btn-sm  btn-default"><i className="bi bi-phone-landscape-fill"></i> Bloquear </a>
                            </IonLabel>
                        <IonIcon mode="ios" slot="end" icon={chevronForward} />
                        </IonItem>
                    <IonItem lines="none">
                        <IonLabel>
                            <h3>Ipone</h3>
                            <p>60:35:d5:35:15 </p>
                            <h3> </h3>

                        </IonLabel>
                        <IonLabel slot="end" className="d-none">
                            <h3></h3>
                            <a className="btn btn-sm  btn-default none"><i className="bi bi-phone-landscape-fill"></i> Bloquear </a>
                        </IonLabel>
                        <IonIcon mode="ios" slot="end" icon={chevronForward} />
                    </IonItem>

                    </IonList>

             
            </IonContent>

        </IonModal>

    )
}