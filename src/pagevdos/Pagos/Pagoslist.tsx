import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonTitle } from "@ionic/react";
import { useEffect, useState } from "react";
import { MostrarFacturas } from "../../utils/Queryuser";
import { useDispatch, useSelector } from "react-redux";
import { cardOutline, documentText } from "ionicons/icons";
import { setFactura } from "../../StoreRedux/Slice/UserSlice";
import { useHistory } from "react-router";

export default function Pagoslist() {
    const datos = useSelector((state: any) => state.usuario.user)
    let dispatch = useDispatch()
    let history = useHistory()
    const [facturacion, setFacturaci] = useState([])
    function enviarFactura(e:any){
        dispatch(setFactura({...e}))
        history.push("/Deposito")
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
    </>)
}