import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { MostrarFacturas } from "../../utils/Queryuser";
import { useDispatch, useSelector } from "react-redux";
import { cardOutline, chevronBack, documentText } from "ionicons/icons";
import { setFactura } from "../../StoreRedux/Slice/UserSlice";
import { useHistory } from "react-router";

export default function Pagoslist() {
    const datos = useSelector((state: any) => state.usuario.user)
    let dispatch = useDispatch()
    let history = useHistory()
    const [facturacion, setFacturaci] = useState([])
    function enviarFactura(e:any){
        dispatch(setFactura({...e}))
        history.push("/Comprobante")
    }
    useEffect(() => {
        MostrarFacturas(datos.id).then(salida => {
            console.log(salida)
            if (salida.estado == "error") return
            setFacturaci(salida.facturas)
            /* const sumaTotal = salida.facturas.reduce((acumulador, objeto) => {
                 return acumulador + parseFloat(objeto.total);
             }, 0);*/
            //console.log(sumaTotal)
            /* setFactu({
                 total: salida.facturas.length,
                 valor: sumaTotal
             })*/

        }).catch(err => {
            console.log(err)
        })

    }, [])
    return (<>
    <IonPage>
            <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">{/*<!--header welcome-->*/}
                <IonToolbar className=" ion-no-border">
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon icon={chevronBack} />
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                            <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{ height: "50px" }} alt="" />
                        </div>
                    </IonButtons>
                </IonToolbar>
                <div className="container mx-autopt-2 h-50 text-end btn-group-vertical d-none">
                    <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{
                        height: "50px"
                    }} alt="" />
                </div>
                <div className="container-fluid h-50 bg-welcome-radius px-0">
                    <div className="container  h-100 ">
                        <div className="row h-100 pt-2 justify-content-center">
                            <div className="col-5 w-50 text-end p-0">
                                <img src="img/opcion pagos/pagos-icon.png" style={{
                                    height: "8vh"
                                }} className="img-fluid " alt="" />
                            </div>
                            <div className="col-auto w-50 btn-group-vertical text-white">
                                <p className="text-uppercase subtitulo" style={{
                                    fontSize: "1.8vh"
                                }}>Facturas</p>
                                <h5 className="mt-n4 text-uppercase titulo" style={{
                                    fontSize: "2.7vh"
                                }} >Pendientes</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <IonContent className=" text-center">
            <IonTitle className=" fw-bold py-2">Facturas por pagar </IonTitle>
            <IonList>
                {facturacion.length > 0 ?

                    facturacion.map((e:any, i) => {
                      //  let fechas = e.fecha.split("T")[0]
                        return (
                            <IonItem key={i}>
                                <IonLabel slot="">
                                    <h3>FAC: {e.id}</h3>
                                    <h3>${e.total}</h3>
                                    <h3>{e.estado} </h3>

                                </IonLabel>
                                <IonLabel slot="end">
                                    <IonButton color={"danger"} onClick={() => enviarFactura(e)} >
                                        <IonIcon icon={cardOutline} />
                                    </IonButton>
                                </IonLabel>
                            </IonItem>)
                    }) : ""
                }
            </IonList>
        </IonContent>
        </IonPage>
    </>)
}