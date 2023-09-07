import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, createAnimation } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { obtenervaariables } from "../../pages/Home/parsesmart";
import { setModal, setSeñal, setSoport } from "../../StoreRedux/Slice/UserSlice";
import { Equipos, ListarTicket, Newtickte } from "../../utils/Queryuser";
import { DetalleOlt, Detalleoltport, Get_onu_signal, Gt_onu_status } from "../../utils/Querystados";
import moment from "moment";
import { useEffect } from "react";
import { userlog } from "../../utils/User";

export default function PlanView() {
    let history = useHistory()
    const infouser = useSelector((state) => state.usuario.user)
    const dispat = useDispatch()
    const soportes = useSelector((state) => state.usuario.soporte)
    const señal = useSelector((state) => state.usuario.señal)

    function Soporte(so) {
        let datos = localStorage.getItem("INFOUSER")
        let infos = localStorage.getItem("USERLOGIN")
        let users = JSON.parse(infos)
        let infouser = obtenervaariables(users.servicios[0].smartolt)
        dispat(setModal({ nombre: "Alerta", payloa: "Comprobando estado de equipo" }))
        Equipos(users.servicios[0].nodo).then(ou => {
          
            if (ou.estado == "exito") {
                if (ou.routers.length > 0) {
                    console.log(ou)
                    console.log(ou.routers[0].estado)
                    console.log(infouser)
                    if (ou.routers[0].estado != "CONECTADO") {
                        dispat(setSoport({ soporte: true }))
                        //agregar mensaje
                        /*
                        Daño masivo
                        */
                        //dispat(setModal({ nombre: "Alerta", payloa: "Comprobando estado de equipo" }))
                        return
                    }
                    DetalleOlt(users.servicios[0].id).then(ouput => {
                        console.log(users.servicios[0].id, ouput)
                        if (ouput.status) {
                            dispat(setModal({ nombre: "Alerta", payloa: "Comprobando puertos olt" }))
                            if (ouput.onu_details.administrative_status != "Enabled") {
                                dispat(setSoport({ soporte: true }))
                                /*
                                //agregar mensaje
                                */
                                return
                            }
                            console.log(ouput.onu_details.administrative_status)
                            Detalleoltport(infouser.olt_id).then(ou => {
                                let board = ouput.onu_details["board"]
                                let poart = ouput.onu_details["port"]
                                console.log(ouput.onu_details, ou)
                                let oltstatus = ou.response.find((e) => e.board == board && e.pon_port == poart)
                                console.log("Detalleoltport->", oltstatus)
                                if (!oltstatus.operational_status.includes("Up")) {
                                    dispat(setSoport({ soporte: true }))
                                    //agregar mensaje
                                    /**crear pantalla con mensaje daño masivo y no se genera tickte */
                                   
                                }
                                else {
                                    dispat(setModal({ nombre: "Alerta", payloa: "Comprobando estado onu" }))
                                    Gt_onu_status(users.servicios[0].id).then(ouputv => {
                                        console.log("Gt_onu_status->" + ouputv)
                                        if (ouputv.status) {
                                            if (ouputv.onu_status == "Los") {
                                                let info = {
                                                    "idcliente": users.id,
                                                    "asunto": "Visita tecnica de señal",
                                                    "solicitante": users.nombre,
                                                    "fechavisita": moment().format('YYYY-MM-D'),
                                                    "turno": "MAÑANA",
                                                    "agendado": "PAGINA WEB",
                                                    "contenido": "Hola,<br> Necesito ayuda para mi conexión de internet  onu status " + ouputv.onu_status + "."
                                                }
                                                if (so == 0) {
                                                    dispat(setModal({ nombre: "Alerta", payloa: "Creando ticket de soporte" }))
                                                    
                                                    Newtickte(info).then(oput => {
                                                        // dismiss()
                                                        dispat(setSoport({ soporte: true }))
                                                        console.log(oput)
                                                    }).catch(err => {
                                                        console.log(err)
                                                    })
                                                    dispat(setSoport({ soporte: true }))
                                                    return
                                                }
                                                /* crear tickte */
                                                
                                                setTimeout(function () {
                                                    dispat(setModal({ nombre: "", payloa: "" }))
                                                }, 1000)
                                                return
                                            }
                                            if (ouputv.onu_status == "Power fail") {
                                                dispat(setSoport({ soporte: true }))
                                                //agregar mensaje
                                              
                                                /* Revisar conexio gif intructivo */
                                                return
                                            }
                                            if (ouputv.onu_status == "Online") {
                                                //agregar mensaje
                                                dispat(setSoport({ soporte: true }))
                                                //dismiss()
                                             
                                                Get_onu_signal(users.servicios[0].id).then(ouput => {
                                                    if (ouput.status) {
                                                        //dismiss()
                                                        console.log(ouput)
                                                        dispat(setSeñal({
                                                            onu_signal_value: ouput.onu_signal_value,
                                                            onu_status: ouputv.onu_status,
                                                            onu_signal: ouput.onu_signal
                                                        }))
                                                        let se = ouput.onu_signal_1490.replace("-", "").replace("dBm", "")
                                                        console.log(se)
                                                        dispat(setSoport({ soporte: true }))
                                                        if (se < 29) {
                                                            //agregar mensaje
                                                            /** mostrar servicio ok */                                                          
                                                        }
                                                        if (se > 26.50 && se < 29) {
                                                            //agregar mensaje
                                                            /** tickte de revision */
                                                        }
                                                        if (se > 29) {
                                                            //agregar mensaje
                                                            /**visita tecnica */
                                                            let info = {
                                                                "idcliente": users.id,
                                                                "asunto": "Revision de señal",
                                                                "solicitante": users.nombre,
                                                                "fechavisita": moment().format('YYYY-MM-D'),
                                                                "turno": "MAÑANA",
                                                                "agendado": "PAGINA WEB",
                                                                "contenido": "Hola,<br> Necesito ayuda para mi conexión de internet " + ouput.onu_signal_1490 + "."
                                                            }
                                                            if (so == 0) {

                                                                dispat(setModal({ nombre: "Alerta", payloa: "Creando ticket de soporte" }))
                                                                //agregar mensaje

                                                                Newtickte(info).then(oput => {
                                                                    // dismiss()
                                                                    console.log(oput)

                                                                }).catch(err => {
                                                                    console.log(err)
                                                                })

                                                                return
                                                            } else {

                                                                /*present({
                                                                    message: 'Tienes un ticke abierto ',
                                                                    cssClass: 'custom-loading',
                                                                    duration: 4500,
                                                                })*/
                                                            }
                                                        }
                                                    } else {
                                                        //agregar mensaje
                                                        dispat(setSoport({ soporte: true }))
                                                        /*present({
                                                             message: 'Hubo un error intente mas tarde',
                                                             cssClass: 'custom-loading',
                                                             duration: 4500,
                                                             buttons: [
                                                                 {
                                                                     text: "cerrar",
                                                                     role: "cancel",
 
                                                                 }
                                                             ]
                                                         })*/
                                                    }
                                                })
                                                return
                                            }

                                        } else {
                                            dispat(setSoport({ soporte: true }))
                                            //agregar mensaje
                                        }
                                    })
                                    dispat(setModal({ nombre: "", payloa: "" }))

                                }

                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    })
                    /* OLTcardDETA(infouser.olt_id).then(oltouput => {
                         console.log(oltouput)
                     }).catch(err => {
                         console.log(err)
                     })*/
                } else {
                    dispat(setSoport({ soporte: true }))
                    //agregar mensaje
                }

            }
            else {
                dispat(setSoport({ soporte: true }))
                //agregar mensaje
                /*  dismiss()
                  presentlo({
                      message: ou.mensaje,
                      cssClass: 'custom-loading',
                      spinner: "bubbles",
                      duration: 4500,
                  })*/
            }
        }).catch(err => {
            dispat(setModal({ nombre: "", payloa: "" }))
            dispat(setSoport({ soporte: true }))
            console.log(err)
        })
    }
    useEffect(()=>{
        let tick = userlog()
        ListarTicket(tick.id).then(response => {
            if (response.estado == "exito") {
                let soport = response.data.tickets.filter(e => e.estado == "abierto")
                if (!soportes) {
                    Soporte(soport.length)
                }
            }
        }).catch(err => {

        })
        //Soporte(1)
    }, [infouser])
   
        const customEnterAnimation = (baseEl) => {
            const animation = createAnimation()
                .addElement(baseEl)
                .duration(500)
                .fromTo('opacity', '0', '1');
            return animation;
        };

        const customLeaveAnimation = (baseEl) => {
            const animation = createAnimation()
                .addElement(baseEl)
                .duration(500)
                .fromTo('opacity', '1', '0');
            return animation;
        };
    
    return (
        <IonPage
            className="fade-in-enter fade-in-leave"
        >
        <div  className="container-fluid px-0 vh-100">
            {/*<!--Contenedor General-->*/}

            <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
                {/*<!--header welcome-->*/}
                <IonToolbar className=" ion-no-border">
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                            <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{ height: "50px" }} alt="" />
                        </div>
                    </IonButtons>
                </IonToolbar>
                
                <div className="container-fluid h-50 bg-welcome-radius px-0">
                    <div className="container  h-100 ">
                        <div className="row h-100 pt-2 justify-content-center">
                            <div className="col-5 w-20 text-end p-0">
                                <img src="img/opcion mi plan/icon-mi-plan.png"
                                    style={{
                                        height: "8vh"
                                        /*"height:8vh"*/
                                    }} className="img-fluid " alt="" />
                            </div>
                            <div className="col-auto  text-white pt-2">
                                <p className="text-uppercase subtitulo "
                                    style={{
                                        fontSize: "1.8vh"
                                        /*"font-size: 1.8vh;"*/
                                    }}>OPCIÓN</p>
                                <h5 className="mt-n4 text-uppercase titulo"
                                    style={{
                                        fontSize: "2.5vh"
                                        /*"font-size: 2.5vh;"*/
                                    }} >MI PLAN</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*<!--fin header welcome-->*/}



            <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                {/*<!--card info-->*/}
                <div className="container-fluid h-100 btn-group-vertical " >
                    <div className="container-fluid btn-group-vertical h-100">
                        <div className="row flex-row-reverse col-12 shadow-3  rounded-4 mx-auto my-2 h-30 bg-white py-0">{/*<!--card opcion-->*/}
                            <div className="col-7 h-100 border rounded-end-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1"
                                            style={{
                                                width: "100%",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis"
                                                /*"width: 100%;;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;"*/
                                            }}>
                                            <span className="" ><img src="img/opcion pagos/icon-plan.png" className="img-fluid"
                                                style={{
                                                    height: "2vh"
                                                    /*"height: 2vh;"*/
                                                }} alt="" /></span>
                                            <span className="text-muted text-uppercase"
                                                style={{
                                                    fontSize: "1.4vh"
                                                    /*"font-size: 1.4vh;"*/
                                                }}>plan advance-antig</span>
                                        </li>
                                        <li className="list-unstyled my-md-1"
                                            style={{
                                                width: "100%",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis"
                                                /*"width: 100%;;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;"*/
                                            }} >
                                            <span className="" >
                                                <img src="img/opcion soporte/signal-wifi.png" className="img-fluid"
                                                    style={{
                                                        height: "2vh"
                                                        /*"height: 2vh;"*/
                                                    }} alt="" /></span>
                                            <span className="text-muted"
                                                style={{
                                                    fontSize: "1.4vh"
                                                    /*"font-size: 1.4vh;"*/
                                                }}>{señal.onu_signal_value}</span>
                                        </li>
                                        <li className="list-unstyled my-md-1"
                                            style={{
                                                width: "100%",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis"
                                                /*"width: 100%;;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;"*/
                                            }} >
                                            <span className="" ><img src="img/opcion soporte/estado-check.png" className="img-fluid"
                                                style={{
                                                    height: "2vh"
                                                    /*"height: 2vh;"*/
                                                }} alt="" /></span>
                                            <span className="text-muted text-uppercase"
                                                style={{
                                                    fontSize: "1.4vh"
                                                    /*"font-size: 1.4vh;"*/
                                                }}>ESTADO: <span className="fw-bold">{señal.onu_signal == "Very good" ? "Muy buena" : ""}
                                                    {señal.onu_signal == "Warning" ? "Buena" : ""}
                                                    {señal.onu_signal == "Critical" ? "Mala" : ""}</span></span>
                                        </li>
                                    </div>
                                </div>
                            </div>

                            <div className="col-5 px-1 d-no h-100 rounded-start-4 bg-green-gradient-180">
                                <div className="col-12 h-100 w-100 ">
                                    <div className="container h-40 ">
                                        <div className="col-12 pt-3">
                                            <h4 className="text-white border-start border-3 border-white ps-1" 
                                            style={{
                                                fontSize:"1.7vh"
                                                /*"font-size: 1.7vh;"*/}}>Detalle del Servicio</h4>
                                        </div>
                                    </div>
                                    <div className="container h-30 text-center btn-group-vertical">
                                        <img src="img/opcion mi plan/mi-plan-detalle.png" className="img-fluid drop-shadow-2 mx-auto" 
                                        style={{
                                            height:"9.5vh"
                                            /*"height: 9.5vh;"*/}} alt=""/>
                                    </div>
                                    <div className="container h-30 btn-group-vertical d-none">
                                        <a className="text-uppercase text-success fw-bold none-style bg-white px-4 py-15 rounded-2 border mx-auto" 
                                        style={{
                                            fontSize:"3vw"
                                            /*"font-size: 3vw;"*/}}>ONLINE</a>
                                    </div>
                                </div>
                            </div>

                        </div>{/*<!--cierre card opcion-->*/}

                        <div className="row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">{/*<!--card opcion-->*/}
                            <div className="col-8 h-100 border rounded-start-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" 
                                        style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                            /*"width: 100%;;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;"*/}} >
                                            <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid"
                                             style={{
                                                height:"2vh"
                                                /*"height: 2vh;"*/}} alt=""/> </span>
                                            <span className="text-muted" 
                                            style={{
                                                fontSize:"1.4vh"
                                                /*"font-size: 1.4vh;"*/}}>Señal: <span>-23.65 dBm</span></span>
                                        </li>
                                        <a onClick={() => history.push("/home/soporte")} className="bg-white shadow-1 none-style border px-4 py-1 rounded-pill text-center text-celeste" 
                                        style={{
                                            fontSize:"1.6vh"
                                            /*"font-size: 1.6vh;"*/}}>Soporte Técnico</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-green-gradient">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-100 text-center btn-group-vertical">
                                        <img src="img/opcion mi plan/wifi-signal-mi-plan.png" className="img-fluid drop-shadow-2 mx-auto" 
                                        style={{
                                            height:"8vh"
                                            /*"height: 8vh;"*/}} alt=""/>
                                    </div>
                                </div>
                            </div>

                        </div>{/*<!--cierre card opcion-->*/}

                        <div className="row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">
                            {/*<!--card opcion-->*/}
                            <div className="col-8 h-100 border rounded-start-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" 
                                        style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                            /*"width: 100%;;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;" */}}>
                                            <span className="" >
                                                <img src="img/opcion soporte/signal-wifi.png" className="img-fluid"
                                                 style={{
                                                    height:"2vh"
                                                    /*"height: 2vh;"*/}} alt=""/></span>
                                            <span className="text-muted" 
                                            style={{
                                                fontSize:"1.4vh"
                                                /*"font-size: 1.4vh;"*/}}>Estado: <span>Excelente</span></span>
                                        </li>
                                        <a href="" className="bg-white shadow-1 none-style  border px-4 py-1 rounded-pill text-center text-celeste" 
                                        style={{
                                            fontSize:"1.8vh"
                                            /*"font-size: 1.8vh;"*/}}>Realizar Test</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-green-gradient">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-100 text-center btn-group-vertical">
                                        <img src="img/opcion mi plan/mi-plan-test-.png" className="img-fluid drop-shadow-2 mx-auto" 
                                        style={{
                                            height:"8vh"
                                            /*"height: 8vh;"*/}} alt=""/>
                                    </div>
                                </div>
                            </div>

                        </div>{/*<!--cierre card opcion-->*/}

                        <div className="d-none row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">{/*<!--card opcion-->*/}
                            <div className="col-8 h-100 border rounded-start-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" 
                                        style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                            /*"width: 100%;;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;"*/}} >
                                            <span className="" ><img src="img/opcion pagos/icon-plan.png" className="img-fluid" 
                                            style={{
                                                height:"2vh"
                                                /*"height: 2vh;"*/}} alt=""/></span>
                                            <span className="text-muted text-uppercase" 
                                            style={{
                                                fontSize:"1.4vh"
                                                /*"font-size: 1.4vh;"*/}}>plan advance-antig</span>
                                        </li>
                                        <a href="" className="bg-white shadow-1 none-style border px-4  rounded-pill text-center text-celeste" 
                                        style={{
                                            fontSize:"1.8vh"
                                            /*"font-size: 1.8vh;"*/}}>Speed-Test</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-red-gradient">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-100 text-center btn-group-vertical">
                                        <img src="img/opcion soporte/estado-internet.png" className="img-fluid drop-shadow-2 mx-auto" 
                                        style={{
                                            height:"8vh"
                                            /*"height: 8vh;" */}}alt=""/>
                                    </div>
                                </div>
                            </div>

                        </div>{/*<!--cierre card opcion-->*/}


                    </div>
                </div>
            </div>
            {/*<!--fin card info-->*/}
            <div className="container-fluid h-7 bg-blue-gradient ">
                <div className="container h-100 btn-group-vertical">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto mx-3 text-center d-none"><a className="none-style fs-22" href="home.html"><span className="icon-home-3  text-white"></span></a></div>
                            <div className="col-auto mx-3 text-center d-none"><a className="none-style fs-22" href=""><span className="icon-plus-squared text-white"></span></a></div>
                            <div className="col-auto mx-3 text-center d-none"><a className="none-style fs-22" href="datos.html"><span className="icon-user-4 text-white"></span></a></div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
        </IonPage>

    )
}