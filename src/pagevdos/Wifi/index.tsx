import { useSelector } from "react-redux"
import { Changessihide, Deviceslist, Estadossi, Nombressi, Refresssi } from "../../utils/Querystados"
import { useEffect, useState } from "react"
import { setNicknameslice } from "../../StoreRedux/Slice/UserSlice"
import Button from '@mui/material/Button';
import "./index.css"
import DeviceView from "../../pages/Home/Modaldevices"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Modal } from "react-bootstrap";
import ModalViews from "../../components/Modal";
import { Cambiarclave, Cambiarname } from "../../utils/Queryuser";
import AlerView from "../../components/Alert";


export default function WifiView(){
    const datos = useSelector((state: any) => state.usuario.user)

    const [devices, setDevices] = useState([])

    const [Alert, setAlert] = useState('');

    const [showModal, setModal] = useState(false);
    const [señal, setSeñal] = useState({
        onu_signal_value: "",
        onu_status: "",
        onu_signal: ""})

    const [wifi, setFifi] = useState(false)
    const [open, setOpen] = React.useState(false);

    const [showAlert, setShowAlert] = useState("");
    const [nickname, setNickname] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    function cambiarPWS(e: any) {
        if (e.trim().length < 6) {
            setAlert("password")
            return
        }
        console.log(e)
       /* presentlo({
            message: 'Actualizando contraseña...',
            cssClass: 'custom-loading',
            spinner: "bubbles",
        })*/
        let campo = datos.iD_EXTERNO_ONU.includes("IGD") ? "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey" : "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey.1.PreSharedKey"
        Cambiarclave({
            "info": datos.iD_EXTERNO_ONU,
            "booleas": e,
            "confi": campo
        }).then(ou => {
            console.log(ou)
            Refresssi({
                "info": datos.iD_EXTERNO_ONU,
                "booleas": "" + !wifi,
                "confi": campo
            }).then(salida => {
                cargarssi()
                setShowAlert("")
               //dismiss()
                console.log(salida)
            }).catch(err => {
             //   dismiss()
                console.log(err)
            })
        }).catch(err => {
            //dismiss()
            setShowAlert("")
            console.log(err)
        })
    }

    function Confirmcall() {
        Changessihide({
            "info": datos.iD_EXTERNO_ONU,
            "booleas": "" + !wifi
        }).then(change => {
            if (change.device) {
                setFifi(!wifi)
                Refresssi({
                    "info": datos.iD_EXTERNO_ONU,
                    "booleas": "" + !wifi
                }).then(salida => {
                    console.log(salida)
                }).catch(err => {
                    console.log(err)
                })
            }
            console.log(change)
        }).catch(erro => {
            console.log(erro)
        })
        setAlert("")
    }
    function cambiarSSi(e: any) {
        if (e.trim().length < 7) {
            setAlert("mensaje")
            return
        }
        /*presentlo({
            message: 'Actualizando nombre...',
            cssClass: 'custom-loading',
            spinner: "bubbles",
        })*/
        Cambiarname({
            "info": datos.iD_EXTERNO_ONU,
            "booleas": e
        }).then(ou => {
            console.log(ou)
            Refresssi({
                "info": datos.iD_EXTERNO_ONU,
                "booleas": "" + !wifi
            }).then(salida => {
                cargarssi()
                setShowAlert("")
                //dismiss()
                console.log(salida)
            }).catch(err => {
                //dismiss()
              /*  present({
                    message: 'Hubo un error',
                    cssClass: 'custom-loading',
                    duration: 3500,
                })*/
                console.log(err)
            })
        }).catch(err => {
            setShowAlert("")
          //  dismiss()
            /*present({
                message: 'Hubo un error',
                cssClass: 'custom-loading',
                duration: 3500,
            })*/
            console.log(err)
        })
        console.log(e)
    }
    function cargarssi() {
        if (datos.iD_EXTERNO_ONU != "") {
            Deviceslist({ "info": datos.iD_EXTERNO_ONU }).then(ouput => {
                console.log(ouput)
                if (ouput.length > 0) {
                    console.log(ouput)
                    let dtso = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["Hosts"]["Host"]
                    setDevices(Object.values(dtso))
                    console.log(Object.values(dtso))
                }
            }).catch(err => {
                console.log(err)
            })
            Nombressi({ "info": datos.iD_EXTERNO_ONU }).then(ouput => {
                console.log(ouput)
                if (ouput.length > 0) {
                    let dst = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["WLANConfiguration"]["1"]["SSID"]._value
                   setNickname(dst)
                    setNicknameslice({ nickname: dst })
                    console.log(dst)
                }
            }).catch(err => {
                console.log(err)
            })
            Estadossi({ "onu": datos.iD_EXTERNO_ONU }).then(ouput => {
                console.log("estado ssi", ouput)
                if (ouput.length > 0) {
                    let dst = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["WLANConfiguration"]["1"]["SSIDAdvertisementEnabled"]._value
                    console.log(dst)
                    let net: boolean = dst
                    setFifi(net)
                }
            }).catch(err => {
                console.log(err)
            })
        } else {

        }
    }
    useEffect(()=>{
        console.log("wifi")
        cargarssi()
    },[])
    return(
        <>
            <DeviceView
                showModal={showModal}
                setModal={setModal}
                nickname={nickname}
                devices={devices}
            />
            <AlerView
                setAlert={setAlert}
                alert={(Alert == "hidessi")}
                header={wifi ? "Desea ocultar de la red wifi? " : "Desea mostrar de la red wifi?"}
                //subheader={wifi ? "A red oculta ":"A red Visible"}
                Confirmcall={Confirmcall}
            />
            <AlerView
                setAlert={setAlert}
                alert={(Alert == "mensaje")}
                header={"El nombre debe ser de minimo"}
                subheader={" 7 caracteres"}
                Confirmcall={() => setAlert("")}
            />
            <AlerView
                setAlert={setAlert}
                alert={(Alert == "cambiarssi")}
                header={"Esta segur@ de cambiar el nombre de la red wifi"}
                subheader={"se reiniciara el equipo"}
                Confirmcall={() => setShowAlert("ssi")}
            />
            <AlerView
                setAlert={setAlert}
                alert={(Alert == "password")}
                header={"Esta segur@ de cambiar la clave de la red wifi"}
                subheader={"se reiniciara el equipo"}
                Confirmcall={() => setShowAlert("password")}
            />
            <DeviceView
                showModal={showModal}
                setModal={setModal}
                nickname={nickname}
                devices={devices}
            />
            <ModalViews
                showAlert={(showAlert == "ssi")}
                setShowAlert={setShowAlert}
                ssi={nickname} submitHAndel={cambiarSSi}
                header={"Cambiar nombre wifi"}
            />
            <ModalViews
                showAlert={(showAlert == "password")}
                setShowAlert={setShowAlert}
                ssi={""} submitHAndel={cambiarPWS}
                header={"Cambiar clave wifi"}
            />
            
            <div className="container-fluid px-0 vh-100 ">
                {/*<!--Contenedor General-->*/}

                <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
                    {/*<!--header welcome-->*/}
                    <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                        <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{height:"50px"}} alt=""/>
                    </div>
                    <div className="container-fluid h-50 bg-welcome-radius px-0">
                        <div className="container  h-100 ">
                            <div className="row h-100 pt-2 justify-content-center">
                                <div className="col-5 w-50 text-end p-0">
                                    <img src="img/opcion wifi/mi wifi.png" style={{height:"8vh"}} className="img-fluid " alt=""/>
                                </div>
                                <div className="col-auto w-50 btn-group-vertical text-white">
                                    <p className="text-uppercase subtitulo" style={{fontSize:"1.8vh"}}>OPCIÓN</p>
                                    <h5 className="mt-n4 text-uppercase titulo" style={{fontSize:"2.7vh"}} >Mi Wifi</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!--fin header welcome-->*/}



                {datos.iD_EXTERNO_ONU == "" ?"":<div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                    {/*<!--card info-->*/}
                    <div className="container-fluid h-100 btn-group-vertical" >
                        <div className="container-fluid btn-group-vertical h-100  ">
                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">   
                                        {/*<!--card texto-->*/}
                                            <div className="col-12 text-muted" style={{fontSize:"1.6vh"}}>Nombre de Red</div>
                                            <div className="col-12 mt-1 text-celeste" style={{ fontSize: "1.6vh" }}><span id="nombre_de_red">{nickname}</span></div>
                                        </div>
                                        {/* <!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a onClick={() => setAlert("cambiarssi")} className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " style={{fontSize:"1.4vh"}}>Cambiar</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/wifi signal.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}

                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">  
                                        {/* <!--card texto-->*/}
                                            <div className="col-12 text-muted" 
                                            style={{fontSize:"1.6vh"}}>Clave WIFI</div>
                                            <div className="col-12 mt-1 text-celeste" 
                                            style={{fontSize:"1.8vh"}}><span id="nombre_de_red">*****************</span></div>
                                        </div>
                                        {/* <!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a onClick={() => setAlert("password")} className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " 
                                            style={{fontSize:"1.4vh"}}>Cambiar</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/wifi pass.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}


                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">   
                                        {/*<!--card texto-->*/}
                                            <div className="col-12 text-muted" style={{fontSize:"1.6vh"}}>Estado RED WIFI</div>
                                            <div className="col-12 mt-1 text-celeste" style={{ fontSize: "1.6vh" }}><span id="nombre_de_red">{!wifi?"OCULTO":"VISIBLE"}</span></div>
                                        </div>
                                        {/* <!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a onClick={() => setAlert("hidessi")} className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " style={{ fontSize: "1.4vh" }}>{wifi ? "Ocultar Red" : "Mostrar Red"}</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/ocultar wifi.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}


                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">   
                                        {/*<!--card texto-->*/}
                                            <div className="col-12 text-muted" 
                                            style={{fontSize:"1.6vh"}}>Ver Dispositivos</div>
                                            <div className="col-12 mt-1 text-celeste" 
                                            style={{fontSize:"1.6vh"}}><span id="nombre_de_red">CONECTADOS</span></div>
                                        </div>                                         
                                        {/*<!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a  className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " onClick={() => setModal(true)} style={{fontSize:"1.4vh"}}>Ver Lista</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/ver dispositivos.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}
                        </div>
                    </div>
                </div>}
                {datos.iD_EXTERNO_ONU != "" ?"":<div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                    <section className="page_404">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 ">
                                    <div className="col-sm-10 col-sm-offset-1  text-center">
                                        <div className="four_zero_four_bg">
                                            <h2 style={{
                                                fontSize:"3em"
                                            }} className="text-center ">UPS!</h2>


                                        </div>

                                        <div className="contant_box_404">
                                            <h3 className="h2">
                                               Comunniquese con soporte</h3>

                                            <p> Este perfil no dispone de un <span className=" fw-bold">EXTERNAL ID</span> 
                                            </p>

                                            <a href="https://api.whatsapp.com/send?phone=593997500911&text=Vi%20su%20pagina%20web,%20quiero%20contratar%20sus%20servicios%20para%20mi%20domicilio" className="link_404 py-3 rounded-circle shadow"><i className="bi bi-whatsapp " style={{
                                                fontSize:"1.5em"
                                            }}></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>}
                {/*<!--fin card info-->*/}

                <div className="container-fluid h-7 bg-blue-gradient d-none ">
                    <div className="container h-100 btn-group-vertical">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-auto mx-3 text-center "><a className="none-style fs-22" href="home.html"><span className="icon-home-3 text-white"></span></a></div>
                                <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href=""><span className="icon-plus-squared text-white"></span></a></div>
                                <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href="datos.html"><span className="icon-user-4 text-white"></span></a></div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            
        </>
    )
}