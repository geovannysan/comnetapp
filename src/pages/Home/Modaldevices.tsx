import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { exit, reorderFour, close, chevronForward } from "ionicons/icons";

export default function DeviceView(props: any) {
    let { showModal, setModal, devices, nickname } = props
    return (

        <IonModal isOpen={showModal}
            onDidDismiss={() => setModal(false)}
            backdropDismiss={false}

        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {nickname}
                    </IonTitle>
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

                    {devices.length>0? devices.map((e: any, i: number) => {

                        {
                            if (e.HostName != undefined) {
                                return (<IonItem lines="none" key={i}>
                                    <IonLabel>
                                        <h3>{e.HostName._value==""?"Desconocido":e.HostName._value}</h3>
                                        <p>{e.MACAddress._value}</p>
                                        <h3> </h3>

                                    </IonLabel>
                                    <IonLabel slot="none">
                                        <h3></h3>
                                        <a className="btn btn-sm  btn-default"><i className="bi bi-phone-landscape-fill"></i> Bloquear </a>
                                    </IonLabel>
                                    <IonIcon mode="ios" slot="end" icon={chevronForward} />
                                </IonItem>)
                            }
                         
                        }

                    }):
                    
                    <div className="h-100 ">
                            <div className="w-100 text-center">
                                <p>Cero Dispositivos Conectados</p>
                            </div>
                        </div>}



                </IonList>


            </IonContent>

        </IonModal>

    )
}