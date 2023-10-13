import { IonButton, IonToolbar, IonContent, IonButtons, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonPage, IonHeader, IonModal } from "@ionic/react"
import { documentText, chevronBack, documentAttach} from "ionicons/icons"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FacturasAtorizada, MostrarFacturas } from "../../utils/Queryuser"
import { useHistory } from "react-router"
import Facturapdf from "./FacturaView"

export default function FacturaslisView() {
    let user = useSelector(state => state.usuario.user)
    const [facturacion, setFacturaci] = useState([])
    let history = useHistory()
    let fechahoy = new Date().toLocaleString()
    var partesFecha = fechahoy.split(',')[0].split('/');
    var dia = partesFecha[0];
    var mes = partesFecha[1];
    var anio = partesFecha[2];
    var fechaFormateada = anio + '-' + mes.padStart(2, '0') + '-' + dia.padStart(2, '0');
    async function ListaFacturasinpagas() {
        try {
            let salida = await FacturasAtorizada(user.cedula)
            if (!salida.estado) return
            console.log(salida)
            setFacturaci(salida.facturas)
        } catch (error) {

        }
    }
    const [link, setLink] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    function AbrirFactura(e) {
        console.log(e)
        setLink(e)
        setIsOpen(true)

    }
    function downloadViewImage(url) {
        window.open(encodeURI(url), "_system", "location=yes");
    }
    useEffect(() => {
        ListaFacturasinpagas()
    }, [])
   // console.log(fechaFormateada)
    return (
        <IonPage>
            <IonModal isOpen={isOpen}>
                <IonHeader >
                    <IonToolbar >
                        <IonTitle >Factura</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Cerra</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="p-0">
                    {link == "" ? "" : <Facturapdf
                        link={link}
                    />}
                </IonContent>
            </IonModal>
            <div className="container-fluid px-0 vh-100">{/*<!--Contenedor General-->*/}

                <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">{/*<!--header welcome-->*/}
                    <IonToolbar className="ion-no-border">
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
                                    }}></p>
                                    <h5 className="mt-n4 text-uppercase titulo" style={{
                                        fontSize: "2.7vh"
                                    }} >Facturas</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!--fin header welcome-->*/}



                <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                    <IonContent className=" text-center">
                        <IonTitle className=" fw-bold py-2">Facturas Pagadas</IonTitle>
                        <IonList>
                            {facturacion.length > 0 ?

                                facturacion.map((e, i) => {
                                    let fechas = e.fecha.split("T")[0]
                                    return (
                                        <IonItem key={i}>
                                            <IonLabel slot="">
                                                <h3>FAC: {e.numfactura}</h3>

                                                <h3>{fechas} </h3>

                                            </IonLabel>
                                            <IonLabel slot="end">
                                                <IonButton disabled={(e.mensajes["autorizacion"]==null)} color={"danger"} onClick={() => downloadViewImage(e.mensajes.url_ride)} >
                                                    <IonIcon icon={documentAttach} />
                                                </IonButton>
                                            </IonLabel>
                                        </IonItem>)
                                }) : <div style={{
                                    minHeight:"400px"
                                }} className=" d-flex align-items-center  justify-content-center">
                                    <h3 className=" fw-bold" style={{
                                        transform:"rotate(0.8turn)"
                                    }}>No se encontro ninguna Factura</h3>
                                </div>
                            }
                        </IonList>
                    </IonContent>
                </div>{/*<!--fin card info-->*/}

                <div className="container-fluid h-7 bg-blue-gradient d-none ">
                    <div className="container h-100 btn-group-vertical">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-auto mx-3 text-center "><a className="none-style fs-22" href="home.html"><span className="icon-home-3  text-white"></span></a></div>
                                <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href=""><span className="icon-plus-squared text-white"></span></a></div>
                                <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href="datos.html"><span className="icon-user-4 text-white"></span></a></div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </IonPage>
    )
}