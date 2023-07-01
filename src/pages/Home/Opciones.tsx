import { useHistory } from "react-router"
import { userlog } from "../../utils/User"
import { useDispatch, useSelector } from "react-redux"
import { obtenervaariables } from "./parsesmart"
import { IonButton, IonCardSubtitle, IonContent, IonIcon, IonTitle, IonToggle, useIonLoading, useIonToast } from "@ionic/react"
import { createOutline } from "ionicons/icons"
import { useEffect, useRef, useState } from "react"
import { Changessihide, Deviceslist, Estadossi, Nombressi, Refresssi } from "../../utils/Querystados"
import { close } from "ionicons/icons";
import DeviceView from "./Modaldevices"
import { setNicknameslice } from "../../StoreRedux/Slice/UserSlice"
import AlerView from "../../components/Alert"
import ModalViews from "../../components/Modal"
import { Cambiarclave, Cambiarname } from "../../utils/Queryuser"
export function OpcionesView() {
    let [presentlo, dismiss] = useIonLoading()
    const [present] = useIonToast();
    const opction = useSelector((state: any) => state.usuario.opcion)
    let user: any = userlog()
    let history = useHistory()
    let usedispach = useDispatch()
    const [señal, setSeñal] = useState({
        onu_signal_value: "",
        onu_status: "",
        onu_signal: ""
    })
    const [devices, setDevices] = useState([])
    const [ssi, setSsid] = useState("")
    const [showAlert, setShowAlert] = useState("");
    const [showModal, setModal] = useState(false);
    const [wifi, setFifi] = useState(false)
    const datos = useSelector((state: any) => state.usuario.user)
    let infouser: any = obtenervaariables(datos.servicios[0].smartolt)
    //console.log(obtenervaariables(datos.servicios[0].smartolt))

    let inforoute: any = obtenervaariables(datos.servicios[0].smartolt)
    const animatedElement: any = useRef(null);
    /*const startAnimation = () => {
        const animation = createAnimation()
            .addElement(animatedElement.current)
            .duration(1000)
            .iterations(Infinity)
            .keyframes([
                { offset: 0, transform: 'scale(1)', opacity: '1' },
                { offset: 1, transform: 'scale(1.5)', opacity: '0' }
            ]);

        animation.play();
    };*/
    const [nickname, setNickname] = useState('');
    const [Alert, setAlert] = useState('');
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
    function cargarssi() {
        if (datos.iD_EXTERNO_ONU != "") {
            Deviceslist({ "info": datos.iD_EXTERNO_ONU }).then(ouput => {
                console.log(ouput)
                if (ouput.length > 0) {
                    console.log(ouput)
                    let dtso = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["Hosts"]["Host"]
                    setDevices(Object.values(dtso))
                    //console.log(Object.values(dtso))
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
    useEffect(() => {
        /*console.log(opction)
        const animation = createAnimation()
            .addElement(animatedElement.current)
            .duration(800)

            .fromTo('transform', 'translateY(100%)', 'translateY(0)')
            .fromTo('opacity', '0', '1')
            .beforeAddClass('animated-element')
            .afterAddClass('animated-element');


        animation.play();
        if (infouser != undefined) {
            Get_onu_signal(infouser.onu_external_id).then(ouput => {
                if (ouput.status) {
                    //console.log(ouput)
                    Gt_onu_status(datos.servicios[0].id).then(ouputv => {
                        console.log(ouputv)
                        if (ouputv.status) {
                            setSeñal({
                                onu_signal_value: ouput.onu_signal_value,
                                onu_status: ouputv.onu_status,
                                onu_signal: ouput.onu_signal
                            })
                            //console.log(ouputv)
                        }
                    })
                }
            })
            Get_onu_profile_speed(infouser.onu_external_id).then(ou=>{
                console.log(ou)
            }).catch(err=>{
                console.log(err)
            })
            Detalleoltport(infouser.olt_id).then(ouput => {
                console.log(infouser.olt_id, datos.servicios[0].idperfil)
                if (ouput.status) {
                    let board = ouput.response//.filter((e: any) => e.board == infouser.board)
                    let estado = board//.find((e: any) => e.pon_port == infouser.port)
                    console.log(ouput)
                    return
                }
                console.log(ouput)
            }).catch(err => {
                console.log(err)
            })
        }
        //console.log(datos)
        */
        cargarssi()

    }, [opction])

    function cambiarSSi(e: any) {
        if (e.trim().length < 7) {
            setAlert("mensaje")
            return
        }
        presentlo({
            message: 'Actualizando nombre...',
            cssClass: 'custom-loading',
            spinner: "bubbles",
        })
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
                dismiss()
                console.log(salida)
            }).catch(err => {
                dismiss()
                present({
                    message: 'Hubo un error',
                    cssClass: 'custom-loading',
                    duration: 3500,
                })
                console.log(err)
            })
        }).catch(err => {
            setShowAlert("")
            dismiss()
            present({
                message: 'Hubo un error',
                cssClass: 'custom-loading',
                duration: 3500,
            })
            console.log(err)
        })
        console.log(e)
    }
    function cambiarPWS(e: any) {
        if (e.trim().length < 6) {
            setAlert("password")
            return
        }
        console.log(e)
        presentlo({
            message: 'Actualizando contraseña...',
            cssClass: 'custom-loading',
            spinner: "bubbles",
        })
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
                dismiss()
                console.log(salida)
            }).catch(err => {
                dismiss()
                console.log(err)
            })
        }).catch(err => {
            dismiss()
            setShowAlert("")
            console.log(err)
        })
    }



    return (
        <>
            {/*<IonFab vertical="bottom" horizontal="end">
                <IonFabButton size="small" onClick={() => opciones("")}>
                    <IonIcon icon={arrowBack}></IonIcon>
                </IonFabButton>
            </IonFab>*/}
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
            <ModalViews

            />
            <IonContent fullscreen  
            className="  m-auto text-center"
            >

          
            <div ref={animatedElement} className=" h-100  my-auto pt-5"
            
            >


                {opction == "Perfil" ?

                    <div className='container-fluid d-none px-0  d-flex  justify-content-center'>

                        <div className='row col-12 col-md-10 col-lg-12 px-0  '>
                            {/*onClick={() => setOpen(!open)}  id="trigger-button"*/}
                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' >
                                <div className="cardt cardt-dark ">
                                    <div className='row py-0'
                                        style={{

                                        }}>
                                        <div className=" text-end">
                                            <IonButton
                                                slot="end"
                                                className="p-tn-2 "
                                                onClick={() => history.push("/page/perfil")}
                                                color="tertiary"
                                                size="small">
                                                Mis datos
                                                <IonIcon
                                                    slot="end"
                                                    icon={createOutline}
                                                />

                                            </IonButton>
                                        </div>

                                        <div className=' '

                                        >

                                            {datos.estado === "ACTIVO" ?
                                                <h6

                                                    style={{
                                                        textTransform: "capitalize",
                                                        fontSize: "1em",
                                                        lineHeight: "15px",
                                                        verticalAlign: "top"
                                                    }} className="text-success " > <i className=" bi bi-person"></i>{datos.nombre}</h6> :
                                                <h6 style={{
                                                    textTransform: "capitalize",
                                                    fontSize: "0.9em"
                                                }} className=" text-danger" ><i className=" bi bi-person"></i>{datos.nombre}</h6>
                                            }


                                        </div>

                                    </div>
                                    <p className='card__link text-capitalize p-0' style={{
                                        fontSize: "0.9em"
                                    }}  ><span className=' fw-bold'><i className="bi bi-pin-map-fill px-1" ></i></span>{datos.direccion_principal} </p>


                                    <div className="row px-0">
                                        <div className="d-none col-7 col-md-6 px-1">
                                            <p className="card__apply ">
                                                <i className=" px-1  bi  bi-envelope"></i>
                                                <a className="card__link" style={{
                                                    fontSize: "0.7em"
                                                }}>{datos.correo}</a>
                                            </p>
                                        </div>
                                        <div className=" col-5 col-md-6 text-center ">

                                            <a className=" d-none btn btn-sm btn-default"

                                                onClick={() => history.push("/page/perfil")}>Editar  <i className="card_icon px-2  bi  bi-pencil"></i></a>

                                        </div>
                                    </div>

                                </div>

                            </div>




                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => console.log("")} >
                                <div className="cardt  cardt-success">
                                    <div className='row'>
                                        <div className='col-6 col-md-6 '>
                                            <h4 className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"} style={{
                                                textTransform: "capitalize",
                                                fontSize: "0.9em"
                                            }}>{datos.servicios ? datos.servicios[0].perfil : "User Tickets"}</h4>
                                        </div>
                                        <div className='col-6 col-md-6 '>

                                            <h4 className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"} style={{ fontSize: "0.9em" }}><i className=" bi  bi-router"></i>{nickname}</h4>



                                        </div>
                                    </div>
                                    <div className=" px-0 d-flex  justify-content-around pt-4 ">
                                        < div className=" ">
                                            <p className="card__apply" style={{

                                            }} >
                                                <h4 className="card__link">
                                                    <i className=" bi bi-cloud-arrow-up-fill"></i>
                                                    {inforoute == undefined ? "Desconocido" : inforoute["upload_speed_profile_name"]}
                                                </h4>
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="card__apply    "
                                                style={{

                                                }} >
                                                <h4 className="card__link">
                                                    <i className=" bi bi-cloud-arrow-down-fill"></i>
                                                    {inforoute == undefined ? "Desconocido" : inforoute["download_speed_profile_name"]}

                                                </h4>
                                            </p>
                                        </div>


                                    </div>
                                    {/*<div className="row">
                                <div className="col-6">
                                    
                                </div>
                                <div className=" col-6 text-center">
                                    <p className="card__apply ">
                                        <a className="card__link" style={{
                                            fontSize: "0.9em"
                                        }}><i className="card_icon px-2  bi  bi-globe-americas"></i>{inforoute["zone"]}</a>
                                    </p>
                                </div>
                                    </div>*/}
                                </div>
                            </div>
                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => console.log("")} >
                                <div className="cardt cardt-primary ">
                                    <div className='row'>
                                        <div className='col-8'>
                                            <h4 className=' text-primary'
                                                style={{
                                                    fontSize: "0.9em"
                                                }}
                                            >Soporte Técnico</h4>
                                        </div>
                                        <div className='col-3 '>
                                            <div className='  mb-1  float-end   ms-3 card rounded-4 shadow' style={{
                                                width: "48px",
                                                height: "48px",
                                                backgroundColor: "#3691ef",
                                                zIndex: 2

                                            }}>
                                                <div className='m-auto'>
                                                    <i className="bi bi-radioactive icon-app "  ></i>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <p>Reportar inconveniente en el servicio.</p>
                                    <p className="card__apply">
                                        <a className="card__link" onClick={() => history.push("/page/Soporte")}>Reportar <i className=" m-2 card_icon bi  bi-radioactive"></i></a>
                                    </p>
                                </div>
                            </div>

                        </div>



                    </div>

                    : ""}
                {opction == "Factura" ?
                    <div className='container-fluid d-none px-0  d-flex  justify-content-center'>
                        <div className='row col-12 col-md-10 col-lg-12 px-0  '>
                            {/*onClick={() => setOpen(!open)}  id="trigger-button"*/}
                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' >
                                <div className="cardt cardt-dark boxshadow border">
                                    <div className='row'>
                                        <div className='col-8'>
                                            <h4 style={{
                                                textTransform: "capitalize",
                                                fontSize: "0.9em"
                                            }} >Valores pendientes</h4>

                                        </div>
                                        <div className='col-4  d-flex  justify-content-center'>
                                            <h4 style={{ fontSize: "1em" }}><i className=" bi bi-building-check"></i> Cuenta</h4>

                                        </div>
                                    </div>
                                    <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span> {nickname}</p>

                                    <div className="row pt-2">
                                        <div className="col-4 col-md-6">
                                            <p className="card__apply ">
                                                <a className="card__link" style={{

                                                }}>Facturas:{datos.facturacion.facturas_nopagadas}</a>
                                            </p>
                                        </div>
                                        <div className=" col-8 col-md-6 text-center ">
                                            <p className="card__apply ">
                                                <a className="card__link" >Valor Pendiente ${datos.facturacion.total_facturas}</a>
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>




                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => console.log("")} >
                                <div className="cardt  cardt-red boxshadow border ">
                                    <div className='row'>
                                        <div className='col-6 col-md-8 '>
                                            <h4 style={{
                                                textTransform: "capitalize",
                                                fontSize: "1em"
                                            }}>Reportar pagos</h4>
                                        </div>
                                        <div className='col-6 col-md-3 text-center'>

                                            <h4 style={{ fontSize: "1em" }}><i className=" bi bi-clipboard-check-fill"></i> Informes </h4>
                                        </div>
                                        <p  ><span className=' fw-bold'><i className="bi bi-shield-check px-1"></i></span> Reporta tu pago desde este medio </p>

                                    </div>
                                    <p className="card__apply">
                                        <a className="card__link" onClick={() => history.push("/page/Informe")}>Reportar <i className=" m-2 card_icon bi  bi-radioactive"></i></a>
                                    </p>

                                </div>
                            </div>
                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => console.log("")} >
                                <div className="cardt cardt-primary boxshadow border">
                                    <div className='row'>
                                        <div className='col-7'>
                                            <h4 style={{
                                                textTransform: "capitalize",
                                                fontSize: "0.9em",
                                                color: "#3171e0"
                                            }} >Preguntas Frecuentes</h4>

                                        </div>
                                        <div className='col-5  d-flex  justify-content-center'>
                                            <h4 style={{
                                                fontSize: "1em",
                                                color: "#3171e0"
                                            }}><i className=" bi bi-list-check"></i> Facturación </h4>

                                        </div>
                                    </div>

                                    <p>Consulta tus dudas.</p>
                                    <p className="card__apply  float-end">
                                        <a className="card__link text-primary" >Preguntas <i className=" m-2 card_icon bi bi-patch-question"></i></a>
                                    </p>
                                </div>
                            </div>

                        </div>


                    </div> : ""}

                {datos.iD_EXTERNO_ONU == "" ? 
                <div className="">
                    <div className=" m-auto text-center">
                        
                                <img src="data:image/png;base64,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" />
                       
                        <div className=" text-center">
                            <IonTitle>
                                No puedes acceder a este servicio 
                            </IonTitle>
                            <IonCardSubtitle>
                                Comuniquese con atección al cliente
                            </IonCardSubtitle>
                                    <IonCardSubtitle>
                                        <span className=" fw-bold">Error:</span>  ID EXTERNO ONU
                                    </IonCardSubtitle>
                        </div>
                    </div>

                </div> : 
                <div className='container-fluid px-0  d-flex  justify-content-center'>
                    <div className='row col-12 col-md-10 col-lg-12 px-0  '>
                        {/*onClick={() => setOpen(!open)}  id="trigger-button"*/}
                        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-2  ' >
                            <div className="cardt cardt-red border boxshadow">
                                <div className='row'>
                                    <div className='col-8'>
                                        <h4 style={{
                                            textTransform: "capitalize",
                                            fontSize: "0.9em"
                                        }} >Nombre wifi</h4>

                                    </div>
                                    <div className='col-4  d-flex  justify-content-end'>
                                        <h4 style={{ fontSize: "1em" }}><i className=" bi bi-arrow-repeat"></i> Cambiar</h4>

                                    </div>
                                </div>
                                <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span> {nickname}</p>

                                <div className="row pt-2">
                                    <div className="col-6 ">
                                        <p className="card__apply ">
                                            <a className="card__link" onClick={() => setAlert("cambiarssi")} ><i className=" bi bi-wifi"></i> Cambiar nombre</a>

                                        </p>

                                    </div>

                                    <div className="col-6  d-none ">
                                        <p className="card__apply  float-end">
                                            <a className="card__link" onClick={() => setAlert("cambiarssi")} ><i className=" bi bi-wifi"></i> Cambiar  nombre</a>

                                        </p>

                                    </div>
                                </div>

                            </div>

                        </div>


                        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-2 ' >
                            <div className="cardt cardt-success border boxshadow">
                                <div className='row'>
                                    <div className='col-8'>
                                        <h4 style={{
                                            textTransform: "capitalize",
                                            fontSize: "0.9em"
                                        }} >Clave wifi</h4>

                                    </div>
                                    <div className='col-4  d-flex  justify-content-end'>
                                        <h4 style={{ fontSize: "1em" }}><i className=" bi bi-arrow-repeat"></i> Cambiar</h4>

                                    </div>
                                </div>
                                <p  ><span className=' fw-bold'><i className="bi bi-key px-1"></i>***********</span> {/*nickname*/}</p>

                                <div className="row pt-2">
                                    <div className="col-6 ">
                                        <p className="card__apply ">
                                            <a className="card__link" onClick={() => setAlert("password")} ><i className=" bi bi-wifi"></i> Cambiar clave</a>

                                        </p>

                                    </div>

                                    <div className="col-6 d-none  ">
                                        <p className="card__apply  float-end">
                                            <a className="card__link" onClick={() => setAlert("password")} ><i className=" bi bi-wifi"></i> Cambiar  clave</a>

                                        </p>

                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-2 '  >
                            <div id="present-alert" className="cardt  cardt-dark border boxshadow" onClick={() => setAlert("hidessi")}>
                                <div className='row'>
                                    <div className='col-7 col-md-7 '>
                                        <h4 style={{

                                            fontSize: "0.9em"
                                        }}>Estado de SSi Wifi</h4>
                                    </div>
                                    <div className='col-5 col-md-5 d-flex  justify-content-end '>

                                        {wifi ? <h4 style={{ fontSize: "0.9em" }}> <i className=" bi bi-wifi"></i>  Visible </h4> :
                                            <h4 style={{ fontSize: "0.9em" }}>  <i className=" bi bi-wifi-off"></i> Oculto </h4>
                                        }
                                    </div>

                                </div>
                                <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span>{nickname} </p>

                                <div className="d-flex flex-wrap  justify-content-between align-items-center">
                                    <div className="col-sm "

                                        style={{
                                            marginTop: "-30px"
                                        }}>
                                        <IonToggle

                                            checked={wifi}
                                            //  onIonChange={(e: any) => setFifi(e.detail["checked"])}
                                            enableOnOffLabels={true}

                                        ></IonToggle>
                                    </div>
                                    <div className="col-sm d-flex justify-content-end">
                                        <p className="card__apply">
                                            <a className="card__link" >Cambiar a red oculta/visible </a>
                                        </p>
                                    </div>

                                </div>



                            </div>
                        </div>
                        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-2 ' onClick={() => console.log("")} >
                            <div className="cardt cardt-primary border boxshadow ">
                                <div className='row'>
                                    <div className='col-7'>
                                        <h4 style={{
                                            textTransform: "capitalize",
                                            fontSize: "0.9em",
                                            color: "#3171e0"
                                        }} >Ver dispositivos </h4>

                                    </div>
                                    <div className='col-5  d-flex  justify-content-end'>
                                        <h4 style={{
                                            fontSize: "1em",
                                            color: "#3171e0"
                                        }} onClick={() => setModal(true)} ><i className=" bi bi-hdd-network"></i> Conectados </h4>

                                    </div>
                                </div>
                                <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span>{nickname} </p>


                                <p className="card__apply  float-end">
                                    <a className="card__link " onClick={() => setModal(true)} >Listar dipositivos <i className=" m-2 card_icon bi  bi-usb-symbol"></i></a>
                                </p>
                            </div>
                        </div>
                        <div className="d-none col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1">
                            <div className="card-t">
                                <div className='row'>
                                    <div className='col-7'>
                                        <h4 style={{
                                            textTransform: "capitalize",
                                            fontSize: "0.9em",
                                            color: "#3171e0"
                                        }} >Señal </h4>

                                    </div>
                                    <div className='col-5  d-flex  justify-content-end'>
                                        <h4 style={{
                                            fontSize: "1em",
                                            color: "#3171e0"
                                        }}><i className=" bi  bi-router-fill p-1"></i>{señal.onu_status}  </h4>

                                    </div>
                                </div>
                                <p  ><span className=' fw-bold'><i className="bi bi-reception-4 px-1"></i></span> {señal.onu_signal_value}  </p>


                                <p className="card__apply  float-end">
                                    <a className="card__link " >{señal.onu_signal} <i className=" m-2 card_icon bi bi-hdd-network"></i></a>
                                </p>
                            </div>
                        </div>

                    </div>


                </div>}

            </div>
            </IonContent>
        </>)
}