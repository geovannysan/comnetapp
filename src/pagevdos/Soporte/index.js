import React from "react"
import { useEffect, useState } from "react"
import { obtenervaariables } from "../../pages/Home/parsesmart"
import { DetalleOlt, Detalleoltport, Get_onu_signal, Gt_onu_status } from "../../utils/Querystados"
import { useDispatch, useSelector } from "react-redux"
import { Equipos, ListarTicket, Newtickte } from "../../utils/Queryuser"
import * as moment from "moment"
import { userlog } from "../../utils/User"
import { IonFab, IonFabButton, IonIcon, useIonLoading, useIonToast } from "@ionic/react"
import AlerModal from "../../components/Modal/Modal"
import { setModal, setSeñal, setSoport } from "../../StoreRedux/Slice/UserSlice"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { radioOutline } from "ionicons/icons"
import { useHistory } from "react-router"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function SoporteView() {
    const infouser = useSelector((state) => state.usuario.user)
    let history = useHistory()
    const dispat = useDispatch()
    const soportes = useSelector((state) => state.usuario.soporte)
    const señal = useSelector((state) => state.usuario.señal)
    const modal = useSelector((state) => state.usuario.modal)
    let dtos = userlog()
    const [present] = useIonToast();
    const [btn, setBtn] = useState(false)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handelaceptar = () => {
        setBtn(!btn)
        setOpen(false);
    }


    useEffect(() => {
        let tick = userlog()
        document.addEventListener('ionBackButton', (ev) => {
            ev.detail.register(10, () => {
                console.log('Handler was called!');
            });
        });
        if (infouser.servicios[0].smartolt != "" && obtenervaariables(infouser.servicios[0].smartolt).onu_external_id != "") {

            Get_onu_signal(obtenervaariables(infouser.servicios[0].smartolt).onu_external_id).then(ouput => {
                if (ouput.status) {
                    Gt_onu_status(infouser.servicios[0].idperfil).then(ouputv => {
                        if (ouputv.status) {
                            console.log({
                                onu_signal_value: ouput.onu_signal_value,
                                onu_status: ouputv.onu_status,
                                onu_signal: ouput.onu_signal
                            })
                            dispat(setSeñal({
                                onu_signal_value: ouput.onu_signal_value,
                                onu_status: ouputv.onu_status,
                                onu_signal: ouput.onu_signal
                            }))
                        }
                    })
                }
            })
        }
        ListarTicket(tick.id).then(response => {
            if (response.estado == "exito") {
                let soport = response.data.tickets.filter(e => e.estado == "abierto")
                //console.log(response.data)
                // return
                if (!soportes) {

                    Soporte(soport)
                }
            } else {
                if (!soportes) Soporte(0)
            }
        }).catch(err => {

        })
    }, [])
    function Soportenew() {
        let tick = userlog()
        //console.log(tick)
        ListarTicket(tick.id).then(response => {
            console.log(response)
            if (response.estado == "exito") {
                console.log(response)
                let soport = response.data.tickets.filter(e => e.estado == "abierto")
                console.log(response)
                //return
                Soporte(soport)
            }
            else {
                Soporte(0)
            }
        }).catch(err => {

        })
    }
    function cerre() {
        //history.goBack()
        //setShowModal(false)
        window.open(encodeURI("https://speedecuador.speedtestcustom.com"))
    }
    function Soporte(so) {
        let datos = localStorage.getItem("INFOUSER")
        let infos = localStorage.getItem("USERLOGIN")
        let users = JSON.parse(infos)
        let infouser = obtenervaariables(users.servicios[0].smartolt)
        console.log(infouser)
        //if (infouser.servicios[0].smartolt == "" ){ return}
        dispat(setModal({ nombre: "Alerta", payloa: "Comprobando estado de equipo" }))

        Equipos(users.servicios[0].nodo).then(ou => {
            // dismiss()
            console.log(ou)
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
                        console.log(ouput)
                      //  console.log(users.servicios[0].id, ouput)
                        if (ouput.status) {
                            dispat(setModal({ nombre: "Alerta", payloa: "Comprobando puertos olt" }))
                            if (ouput.onu_details.administrative_status != "Enabled") {
                                dispat(setSoport({ soporte: true }))
                                /*
                                //agregar mensaje
                                */
                                dispat(setModal({ nombre: "", payloa: "" }))
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
                                }
                                else {
                                    console.log("Gt_onu_status")
                                    dispat(setModal({ nombre: "Alerta", payloa: "Comprobando estado onu" }))
                                    Gt_onu_status(users.servicios[0].id).then(ouputv => {
                                        console.log("Gt_onu_status->" + JSON.stringify(ouputv))
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

                                                present({
                                                    message: "Ya tines un Ticket de soporte pendiente",
                                                    duration: 4500,
                                                    position: "bottom"
                                                });

                                                setTimeout(function () {
                                                    dispat(setModal({ nombre: "", payloa: "" }))
                                                }, 1000)
                                                return
                                            }
                                            if (ouputv.onu_status == "Power fail") {
                                                dispat(setSoport({ soporte: true }))
                                                //agregar mensaje
                                                /* present({
                                                     message: 'crear gif intructivo. seria un modal con el gif',
                                                     cssClass: 'custom-loading',
                                                     duration: 4500,
                                                     buttons: [
                                                         {
                                                             text: "cerrar",
                                                             role: "cancel",
 
                                                         }
                                                     ]
                                                 })*/
                                                /* Revisar conexio gif intructivo */
                                                return
                                            }
                                            if (ouputv.onu_status == "Online") {
                                                //agregar mensaje
                                                dispat(setSoport({ soporte: true }))
                                                //dismiss()
                                                /*presentlo({
                                                    message: 'Comprobando estado de la señal',
                                                    cssClass: 'custom-loading',
                                                    spinner: "bubbles",
                                                    duration: 3500
                                                })*/
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
                                                        /*if (se < 29) {
                                                            //agregar mensaje
                                                            /** mostrar servicio ok */
                                                        /*present({
                                                            message: 'Buena señal',
                                                            cssClass: 'custom-loading',
                                                            duration: 4500,
                                                        })*
                                                    }
                                                    if (se > 26.50 && se < 29) {
                                                        //agregar mensaje
                                                        /** tickte de revision *
                                                    }*/
                                                        if (se > 29) {
                                                            //agregar mensaje
                                                            /**visita tecnica */
                                                            console.log("entro")
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
                                                                /*  present({
                                                                      message: 'Creando ticket de soporte',
                                                                      cssClass: 'custom-loading',
                                                                      duration: 4500,
                                                                  })*/

                                                                Newtickte(info).then(oput => {
                                                                    // dismiss()
                                                                    if (ouput.estado = "exito") {
                                                                        dispat(setModal({ nombre: "", payloa: "" }))
                                                                        present({
                                                                            message: 'Se a creando un ticket de soporte',
                                                                            duration: 5000,
                                                                        })
                                                                    }
                                                                    console.log(oput)

                                                                }).catch(err => {
                                                                    present({
                                                                        message: 'No se creo el ticket de usuario',
                                                                        duration: 5000,
                                                                    })
                                                                    console.log(err)
                                                                })

                                                                return
                                                            } else {
                                                                present({
                                                                    message: "Ya tines Ticket pendiente",
                                                                    duration: 2500,
                                                                    position: "bottom"
                                                                });
                                                                /*present({
                                                                    message: 'Tienes un ticke abierto ',
                                                                    cssClass: 'custom-loading',
                                                                    duration: 4500,
                                                                })*/
                                                            }
                                                        } else {
                                                            present({
                                                                message: 'El servicio no cuenta con problemas ',
                                                                duration: 5000,
                                                            })
                                                        }
                                                    } else {
                                                        //agregar mensaje no hubo problemasa 

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
                                            console.log("mmmm")
                                            dispat(setSoport({ soporte: true }))
                                            //agregar mensaje
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                        dispat(setModal({ nombre: "", payloa: "" }))
                                    })
                                    dispat(setModal({ nombre: "", payloa: "" }))


                                }

                            }).catch(err => {
                                dispat(setModal({ nombre: "", payloa: "" }))
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

    return (
        <div className="container-fluid px-0 vh-100">

            {modal.nombre == "Alerta" ? "" : <IonFab slot="fixed" className="d-none" vertical="bottom" horizontal="end">
                <IonFabButton onClick={() => Soportenew()}>
                    <IonIcon icon={radioOutline}></IonIcon>
                </IonFabButton>
            </IonFab>}
            <AlerModal />


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{!btn ? "Reportar inconvenientes" : "Ocultar botón de, autosoporte"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelaceptar}>Aceptar</Button>
                    <Button onClick={handleClose}>cancelar</Button>
                </DialogActions>
            </Dialog>

            {/* <!--Contenedor General-->*/}


            <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
                {/*<!--header welcome-->*/}
                <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                    <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{ height: "50px" }} alt="" />
                </div>
                <div className="container-fluid h-50 bg-welcome-radius px-0">
                    <div className="container  h-100 ">
                        <div className="row h-100 pt-2 justify-content-center">
                            <div className="col-5 w-20 text-end p-0">
                                <img src="img/opcion soporte/icon-soporte-tecnico-speed.png" style={{ height: "8vh" }} className="img-fluid " alt="" />
                            </div>
                            <div className="col-auto  text-white pt-2">
                                <p className="text-uppercase subtitulo " style={{ fontSize: "1.8vh" }}>OPCIÓN</p>
                                <h5 className="mt-n4 text-uppercase titulo" style={{ fontSize: "2.5vh" }}>SOPORTE TÉCNICO</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--fin header welcome-->*/}
            <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                {/*  <!--card info-->*/}
                <div className="container-fluid h-100 btn-group-vertical " >
                    <div className="container-fluid btn-group-vertical h-100">
                        <div className="row flex-row-reverse col-12 shadow-3  rounded-4 mx-auto my-2 h-30 bg-white py-0">
                            {/* <!--card opcion-->*/}
                            <div className="col-7 h-100 border rounded-end-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                            <span className="" ><img src="img/opcion pagos/icon-plan.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                            <span className="text-muted text-uppercase" style={{ fontSize: "1.4vh" }}>{dtos.servicios[0].perfil}</span>
                                        </li>
                                        <li className="list-unstyled my-md-1" style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
                                            <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                            <span className="text-muted" style={{ fontSize: "1.4vh" }}>{señal.onu_signal_value}</span>
                                        </li>
                                        <li className="list-unstyled my-md-1" style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
                                            <span className="" ><img src="img/opcion soporte/estado-check.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                            <span className="text-muted text-uppercase" style={{ fontSize: "1.4vh" }}>ESTADO:
                                                <span className="fw-bold">
                                                    {señal.onu_signal == "Very good" ? "Muy buena" : ""}
                                                    {señal.onu_signal == "Warning" ? "Buena" : ""}
                                                    {señal.onu_signal == "Critical" ? "Mala" : ""}

                                                </span></span>
                                        </li>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 px-1 d-no h-100 rounded-start-4 bg-red-gradient-180">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-30">
                                        <div className="col-12 pt-3">
                                            <h4 className="text-white border-start border-3 border-white ps-1" style={{ fontSize: "1.6vh" }}>Estado del Servicio</h4>
                                        </div>
                                    </div>
                                    <div className="container h-40 text-center btn-group-vertical pt-4">
                                        <img src="img/opcion soporte/estado-internet.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "8.0vh" }} alt="" />
                                    </div>
                                    <div className="container h-30 btn-group-vertical ">
                                        <a className="text-uppercase text-success fw-bold none-style bg-white px-4 py-15 rounded-2 border mx-auto" style={{ fontSize: "3vw" }}>ONLINE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<!--cierre card opcion-->*/}
                        {!btn ? "" : <div className="row col-12 shadow-3   rounded-4 mx-auto my-2 h-15 bg-white py-0">
                            {/* <!--card opcion-->*/}
                            <div className="col-8 h-100 border rounded-start-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
                                            <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid" style={{ height: "2vh" }} alt="" /> </span>
                                            <span className="text-muted" style={{ fontSize: "1.4vh" }}>Señal: <span>-23.65 dBm</span></span>
                                        </li>
                                        <a onClick={() => Soportenew()} className="bg-white shadow-1 none-style border px-4 rounded-pill text-center text-celeste" style={{ fontSize: "1.6vh" }}>Auto soporte</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-red-gradient">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-100 text-center btn-group-vertical">
                                        <img src="img/opcion soporte/reportar-inconvenientes.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "8vh" }} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {/*<!--cierre card opcion-->*/}

                        {btn ? <div className="row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">
                            {/* <!--card opcion-->*/}
                            <div className="col-8 h-100 border rounded-start-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                            <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                            <span className="text-muted" style={{ fontSize: "1.4vh" }}>Estado: <span>
                                                {señal.onu_signal == "Very good" ? "Muy buena" : ""}
                                                {señal.onu_signal == "Warning" ? "Buena" : ""}
                                                {señal.onu_signal == "Critical" ? "Mala" : ""}</span></span>
                                        </li>
                                        <a className="bg-white shadow-1 none-style  border px-4 rounded-pill text-center text-celeste" onClick={handleClickOpen} style={{ fontSize: "1.8vh" }}>regresar</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-red-gradient">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-100 text-center btn-group-vertical">
                                        <img src="img/opcion soporte/estado-internet.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "8vh" }} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div> : <div className="row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">
                            {/* <!--card opcion-->*/}
                            <div className="col-8 h-100 border rounded-start-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                            <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                            <span className="text-muted" style={{ fontSize: "1.4vh" }}>Estado: <span>
                                                {señal.onu_signal == "Very good" ? "Muy buena" : ""}
                                                {señal.onu_signal == "Warning" ? "Buena" : ""}
                                                {señal.onu_signal == "Critical" ? "Mala" : ""}</span></span>
                                        </li>
                                        <a className="bg-white shadow-1 none-style  border px-4 rounded-pill text-center text-celeste" onClick={handleClickOpen} style={{ fontSize: "1.8vh" }}>Soporte</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-red-gradient">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-100 text-center btn-group-vertical">
                                        <img src="img/opcion soporte/estado-internet.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "8vh" }} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>}
                        {/*<!--cierre card opcion-->*/}

                        <div className="row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">
                            {/*<!--card opcion-->*/}
                            <div className="col-8 h-100 border rounded-start-4">
                                <div className="row w-100 mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
                                            <span className="" ><img src="img/opcion pagos/icon-plan.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                            <span className="text-muted text-uppercase" style={{ fontSize: "1.4vh" }}>{dtos.servicios[0].perfil}</span>
                                        </li>
                                        <a onClick={cerre} className="bg-white shadow-1 none-style border px-4  rounded-pill text-center text-celeste" style={{ fontSize: "1.8vh" }}>Speed-Test</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-red-gradient">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-100 text-center btn-group-vertical">
                                        <img src="img/opcion soporte/estado-internet.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "8vh" }} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/*<!--cierre card opcion-->*/}


                    </div>
                </div>
            </div>
            {/*<!--fin card info-->*/}

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
    )
}