import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonSkeletonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { close, chevronForward, umbrella } from "ionicons/icons";
import { Deviceslist, Refresssi } from "../../utils/Querystados";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export function EstadoView(props: any) {
    let { estado } = props
    return (
        <div>
            {estado ? <p>Conectado</p> : <p>Desconectado</p>}
        </div>
    )
}
export default function DeviceView(props: any,recargar:void) {
    let { showModal, setModal,  nickname } = props
        const datos = useSelector((state: any) => state.usuario.user);
    const [devices, setDevices] = useState([]);
    //let nuevo = () => showModal(false)
   function Recargarlista(){
       setDevices([])
         Refresssi({
                "info": datos.ID_EXTERNO_ONU,
                "booleas": ""
            }).then((salida:any) => {
                //cargarssi()
               // setShowAlert("")
                 Deviceslist({ "info": datos.ID_EXTERNO_ONU }).then((ouput:any) => {
                //console.log(ouput)
                if (ouput.length > 0) {
                    console.log("error list", ouput)
                    let dtso = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["Hosts"]["Host"]
                    setDevices(Object.values(dtso))
                    console.log(Object.values(dtso))
                }
            }).catch((err:any) => {
                console.log(err)
            })
                //dismiss()
                console.log(salida)
            }).catch((err:any) => {
                //   dismiss()
                console.log(err)
            })
       
    }
    useEffect(()=>{
        Deviceslist({ "info": datos.ID_EXTERNO_ONU }).then((ouput: any) => {
            //console.log(ouput)
            if (ouput.length > 0) {
                console.log("error list", ouput)
                let dtso = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["Hosts"]["Host"]
                setDevices(Object.values(dtso))
                console.log(Object.values(dtso))
            }
        }).catch((err: any) => {
            console.log(err)
        })
    },[])
    return (

        <IonModal isOpen={showModal}
            onDidDismiss={() => setModal(false)}
            backdropDismiss={false}

        >
            <IonHeader >
                <IonToolbar className=""
                    style={{
                        color: "#ffffs"
                    }}
                >
                    <IonTitle className="text-dark">
                        {nickname}
                    </IonTitle>
                    <IonButtons slot="end"  >
                        <IonButton color={"dark"}

                            onClick={() => setModal(false)}>
                            <IonIcon className="text-dark" icon={close}></IonIcon>
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

                    {devices.length > 0 ? devices.map((e: any, i: number) => {

                        {
                            if (e.HostName != undefined) {
                                return (<IonItem lines="none" key={i}>
                                    <IonLabel slot="">
                                        <h3>{e.HostName._value == "" ? "Desconocido" : e.HostName._value}</h3>
                                        <p>{e.MACAddress._value}</p>
                                        <h3> </h3>

                                    </IonLabel>
                                    <IonLabel slot="end" className="text-end">
                                        <h3>{e.IPAddress._value == "" ? "" : e.IPAddress._value}</h3>

                                        <p>{e.Active._value != undefined ? <EstadoView estado={e.Active._value} /> : "Desconectado"}</p>
                                        <a className="btn btn-sm  btn-default d-none"><i className="bi bi-phone-landscape-fill d-none"></i> Bloquear </a>
                                    </IonLabel>
                                    <IonIcon className="d-none" mode="ios" slot="end" icon={chevronForward} />
                                </IonItem>)
                            }
                        }
                    }) :

                        <IonItem>
                           
                            <IonLabel>
                                <h3>
                                    <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                                </h3>
                                <p>
                                    <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                                </p>
                                <p>
                                    <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
                                </p>
                            </IonLabel>
                        </IonItem>}



                </IonList>

            </IonContent>
            <IonFooter>
                <IonToolbar className="text-center py-2">
                    <IonTitle>Actualizar lista de Dispositivo</IonTitle>
                   
                        <button onClick={Recargarlista} className="btn btn-sm bg-success   text-white rounded-pill btn-size-1 py-20 shadow-2">
                            Recargar
                        </button>
                    
                </IonToolbar>
            </IonFooter>
        </IonModal>

    )
}