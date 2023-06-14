import { useEffect, useState } from "react";
import "./Spedd.css"
import { IonContent, IonHeader, IonIcon, IonItem, IonButton, IonButtons, IonToolbar, IonList, IonModal, IonCardContent, IonCardTitle, IonCardSubtitle, IonTitle } from "@ionic/react";
import { close } from "ionicons/icons";
export default function SpeddView() {

    const [downlink, setDownlink] = useState(null);
    const [showModal, setShowModal] = useState(true);
    useEffect(() => {
        const updateNetworkSpeed = () => {
            if (navigator.connection && navigator.connection.downlink) {
                console.log(navigator.connection)
                setDownlink(navigator.connection.downlink);
            }
        };

        updateNetworkSpeed();

        window.addEventListener('online', updateNetworkSpeed);
        window.addEventListener('offline', () => setDownlink(null));

        return () => {
            window.removeEventListener('online', updateNetworkSpeed);
            window.removeEventListener('offline', () => setDownlink(null));
        };
    }, []);
    return (
        <div className="container">
            <div className="d-none" style={{ textAlign: "right;" }}>
                <div style={{ minHeight: "300px" }}>
                    <div className="tes">
                        <iframe className="speed" src="https://fast.com"></iframe>
                    </div>
                </div>
            </div>
            {!showModal ? <div className="card p-5 mb-3">
                <div style={{ minHeight: "300px" }}>
                    <div className="tes">
                        <iframe className="speed" src="https://fast.com"></iframe>
                    </div>
                </div>

            </div> :
                <div className="card h-75 w-100"
                    style={{
                        height: 500
                    }}
                >

                </div>
            }
            <div className="row">

                <div className="container">

                    <div className="panel panel-inverse card p-2 d-none" >
                        <div className="panel-heading ui-sortable-handle">
                            <h4 className="panel-title"><b>¿Como realizar el Test de Velocidad?</b></h4>
                        </div>
                        <div className="panel-body border-panel">


                            <ol>
                                <li>Cerrar todas los programas y aplicaciones que se conectan a internet:<br />
                                    <br />
                                </li>
                                <ul>
                                    <li>Mensajería instantánea (YahooMessenger, Google Talk, Skype, etc.)</li>
                                    <li>E-mail (Outlook, Windows Live Mail, etc.)</li>
                                    <li>Gestor P2P (BitTorrent, Kazaa, Ares, Emule, Edonkey, etc.) </li>
                                </ul>
                                <br />
                                <li>Es importante asegurarte de tener un solo computador conectado a internet, si se tiene más de un PC o dispositivo (Consolas de Juegos, Ipod, etc) conectado por la red LAN o WI-FI, se deben apagar o desconectar del router.<br />
                                    <br />
                                </li>
                                <li>Cerrar todas las ventanas del navegador de Internet (Explorer, Chrome, Safari, Firefox), solo mantener abierta la ventana donde se está haciendo la medición.
                                </li>
                                <br />
                                <li>Siempre se debe efectuar la prueba con el computador conectado al router directo y no a través de la red Wi-Fi. Cuando se realiza pruebas de velocidad sobre la red Wi-Fi, hay que tener en cuenta la interferencia que puede tener dicha red: hornos microondas, teléfonos inalámbricos, otras redes Wi-Fi.</li>
                            </ol>

                        </div>
                    </div>

                </div>

                <div className="col-md-12 ui-sortable">

                </div>

            </div>
            <IonModal
                isOpen={showModal}
                id="example-modal"
            >
                <IonHeader className="ion-no-border border-0">
                    <IonToolbar className=" ion-toolbar-transparent">
                        
                        <IonTitle >
                            ¿Como realizar el Test de Velocidad?
                        </IonTitle>
                       
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowModal(false)}>
                                Aceptar
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ts ">
                   
                        <IonList>
                            <IonItem>
                                <IonCardContent>
                                    <IonCardTitle>  
                                        <h4> Cerrar todas los programas y aplicaciones que se conectan a internet:
                                    </h4>
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                        Mensajería instantánea (YahooMessenger, Google Talk, Skype, etc.)
                                    </IonCardSubtitle>
                                    <IonCardSubtitle>
                                        E-mail (Outlook, Windows Live Mail, etc.)</IonCardSubtitle>
                                    <IonCardSubtitle>
                                        Gestor P2P (BitTorrent, Kazaa, Ares, Emule, Edonkey, etc.)</IonCardSubtitle>
                                </IonCardContent>
                            </IonItem>
                            <IonItem>
                                <IonCardContent>
                                    <IonCardSubtitle>
                                        Es importante asegurarte de tener un solo computador conectado a internet, si se tiene más de un PC o dispositivo (Consolas de Juegos, Ipod, etc) conectado por la red LAN o WI-FI, se deben apagar o desconectar del router.<br />

                                    </IonCardSubtitle>
                                </IonCardContent>
                            </IonItem>
                            <IonItem>
                                <IonCardContent>
                                    <IonCardSubtitle>
                                        Cerrar todas las ventanas del navegador de Internet (Explorer, Chrome, Safari, Firefox), solo mantener abierta la ventana donde se está haciendo la medición.

                                    </IonCardSubtitle>
                                </IonCardContent>
                            </IonItem>
                            <IonItem>
                                <IonCardContent>
                                    <IonCardSubtitle>
                                        Siempre se debe efectuar la prueba con el computador conectado al router directo y no a través de la red Wi-Fi. Cuando se realiza pruebas de velocidad sobre la red Wi-Fi, hay que tener en cuenta la interferencia que puede tener dicha red: hornos microondas, teléfonos inalámbricos, otras redes Wi-Fi.
                                    </IonCardSubtitle>
                                </IonCardContent>
                            </IonItem>
                        </IonList>

                   
                </IonContent>
            </IonModal>
        </div>
    )
}