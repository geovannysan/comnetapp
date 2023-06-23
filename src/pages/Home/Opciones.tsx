import { useHistory } from "react-router"
import { userlog } from "../../utils/User"
import { useDispatch, useSelector } from "react-redux"
import { obtenervaariables } from "./parsesmart"
import { IonAlert, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToggle, IonToolbar, createAnimation } from "@ionic/react"
import { arrowBack, createOutline, disc, expandOutline } from "ionicons/icons"
import { useEffect, useRef, useState } from "react"
import { Changessihide, Detalleoltport, Deviceslist, Estadossi, Get_onu_signal, Gt_onu_status, Nombressi, Refresssi } from "../../utils/Querystados"
import { close } from "ionicons/icons";
import DeviceView from "./Modaldevices"
import { setOpctionslice } from "../../StoreRedux/Slice/UserSlice"
import AlerView from "../../components/Alert"
export function OpcionesView() {
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
    const [showAlert, setShowAlert] = useState(false);
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
                }).then(salida=>{
                    console.log(salida)
                }).catch(err=>{
                    console.log(err)
                })
            }
            console.log(change)
        }).catch(erro => {
            console.log(erro)
        })
        setAlert("")
    }

    useEffect(() => {
        console.log(opction)
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
                    Gt_onu_status(datos.servicios[0].idperfil).then(ouputv => {
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
        if (datos.iD_EXTERNO_ONU != "") {
            Deviceslist({ "info": datos.iD_EXTERNO_ONU }).then(ouput => {
                console.log(ouput)
                if (ouput.length > 0) {
                    console.log(ouput)
                    let dtso = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["Hosts"]["Host"]
                    console.log(Object.values(dtso))
                    let dat = Object.values(dtso).map((e: any, i) => {

                    })
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
        }

    }, [opction])





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
                header={wifi ? "Desea ocultar de la red wifi? " :"Desea mostrar de la red wifi?"}
                //subheader={wifi ? "A red oculta ":"A red Visible"}
                Confirmcall={Confirmcall}
            />
            <DeviceView
                showModal={showModal}
                setModal={setModal}
                nickname={nickname}
                devices={devices}
            />
            <IonModal isOpen={showAlert}
                id="example-modal2"
                backdropDismiss={false}
            >
                <IonHeader className="  border-0">
                    <IonToolbar className="ion-toolbar-transparent" >

                        <IonButtons slot="end" onClick={() => setShowAlert(false)}>
                            <IonButton onClick={() => setShowAlert(false)}>
                                <IonIcon md={close} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="pt-5 px-2">
                        <IonItem>
                            <IonLabel position="floating">Nombre WIFI</IonLabel>
                            <IonInput
                                id="custom-input"



                                maxlength={20}
                                value={ssi}
                                onIonChange={(e) => console.log(e)}
                            />
                        </IonItem>
                        <IonButton expand="full">Cambiar</IonButton>

                    </div>


                </IonContent>
            </IonModal>
            <div ref={animatedElement}>


                {opction == "Perfil" ?

                    <div className='container-fluid px-0  d-flex  justify-content-center'>

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
                {opction == "Factura" ? <div className='container-fluid px-0  d-flex  justify-content-center'>
                    <div className='row col-12 col-md-10 col-lg-12 px-0  '>
                        {/*onClick={() => setOpen(!open)}  id="trigger-button"*/}
                        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' >
                            <div className="cardt cardt-dark ">
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
                            <div className="cardt  cardt-red">
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
                            <div className="cardt cardt-primary ">
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
                {opction == "wifi" ? <div className='container-fluid px-0  d-flex  justify-content-center'>
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
                                            <a className="card__link" onClick={() => setShowAlert(true)} ><i className=" bi bi-wifi"></i> Cambiar nombre</a>

                                        </p>

                                    </div>

                                    <div className="col-6  d-none ">
                                        <p className="card__apply  float-end">
                                            <a className="card__link" onClick={() => setShowAlert(true)} ><i className=" bi bi-wifi"></i> Cambiar  clave</a>

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
                                <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span> {nickname}</p>

                                <div className="row pt-2">
                                    <div className="col-6 ">
                                        <p className="card__apply ">
                                            <a className="card__link" onClick={() => setShowAlert(true)} ><i className=" bi bi-wifi"></i> Cambiar clave</a>

                                        </p>

                                    </div>

                                    <div className="col-6 d-none  ">
                                        <p className="card__apply  float-end">
                                            <a className="card__link" onClick={() => setShowAlert(true)} ><i className=" bi bi-wifi"></i> Cambiar  clave</a>

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


                </div> : ""}

            </div>

        </>)
}