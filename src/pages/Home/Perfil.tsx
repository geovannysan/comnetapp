import { useDispatch, useSelector } from "react-redux"
import { userlog } from "../../utils/User"
import { useHistory } from "react-router"
import { useEffect, useState } from "react"
import { obtenervaariables } from "./parsesmart"
import { IonButton, IonIcon } from "@ionic/react"
import { createOutline, settingsOutline, speedometerOutline } from "ionicons/icons"
import { Get_onu_profile_speed, Nombressi } from "../../utils/Querystados"

export default function ProfileView() {
    const opction = useSelector((state: any) => state.usuario.opcion)
    let user: any = userlog()
    let history = useHistory()
    let usedispach = useDispatch()
    const [señal, setSeñal] = useState({
        status: "",
        upload_speed_profile_name: "",
        download_speed_profile_name: ""
    })
    const [devices, setDevices] = useState([])
    const [ssi, setSsid] = useState("")
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setModal] = useState(false);
    const [wifi, setFifi] = useState(false)
    const [nickname, setNickname] = useState('');
    const datos = useSelector((state: any) => state.usuario.user)
    let infouser: any = obtenervaariables(datos.servicios[0].smartolt)
    //console.log(obtenervaariables(datos.servicios[0].smartolt))

    let inforoute: any = obtenervaariables(datos.servicios[0].smartolt)
    useEffect(() => {
        Get_onu_profile_speed(user.servicios[0].id).then(salida => {
            if (salida.status) {
                setSeñal(salida)
            }
            console.log(salida)
        }).catch(err => {
            console.log(err)
        })
        Nombressi({
            "info": datos.iD_EXTERNO_ONU
        }).then(oup => {
            if (oup.length > 0) {
                let dst = oup[0]["InternetGatewayDevice"]["LANDevice"]["1"]["WLANConfiguration"]["1"]["SSID"]._value
                setNickname(dst)
                //setNicknameslice(dst)
                console.log(dst)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className='container-fluid px-0  d-flex  justify-content-center'>

            <div className='row col-12 col-md-10 col-lg-12 px-0  '>
                {/*onClick={() => setOpen(!open)}  id="trigger-button"*/}
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' >
                    <div className="cardt cardt-dark boxshadow border">
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
                    <div className="cardt  cardt-success boxshadow border">
                        <div className='row py-0'
                            style={{

                            }}>
                            <div className=" text-end">
                                <IonButton
                                    slot="end"
                                    className="p-tn-2 "

                                    color="tertiary"
                                    size="small">
                                Tipo de Plan 
                                    <IonIcon
                                        slot="end"
                                        icon={speedometerOutline}
                                    />

                                </IonButton>
                            </div>

                            <div className=' '

                            >


                                {datos.estado === "ACTIVO" ? <h6

                                    style={{
                                        textTransform: "capitalize",
                                        fontSize: "1em",
                                        lineHeight: "15px",
                                        verticalAlign: "top"
                                    }} className=" text-success " >
                                    <i className=" bi bi-hdd-network px-1"></i>{datos.servicios ? datos.servicios[0].perfil : "User Tickets"}</h6>
                                    : <h6

                                        style={{
                                            textTransform: "capitalize",
                                            fontSize: "1em",
                                            lineHeight: "15px",
                                            verticalAlign: "top"
                                        }} className=" " >
                                        <i className=" bi bi-person"></i>{datos.servicios ? datos.servicios[0].perfil : "User Tickets"}</h6>
                                }
                            </div>
                        </div>
                        <div className='row d-none'>
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
                                        {señal.upload_speed_profile_name}
                                    </h4>
                                </p>
                            </div>
                            <div className="">
                                <p className="card__apply    "
                                    style={{

                                    }} >
                                    <h4 className="card__link">
                                        <i className=" bi bi-cloud-arrow-down-fill"></i>
                                        {señal.download_speed_profile_name}

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
                    <div className="cardt cardt-primary boxshadow border">
                        <div className='row'>
                            <div className='col-6 d-none'>
                                <h4 className=' text-primary'
                                    style={{
                                        fontSize: "0.9em"
                                    }}
                                >Soporte Técnico</h4>
                            </div>
                            <div className='col-12 '>
                                <div className=" text-end">
                                    <IonButton
                                        slot="end"
                                        className="p-tn-2 "

                                        color="tertiary"
                                        size="small">
                                        Soporte Técnico
                                        <IonIcon
                                            slot="end"
                                            icon={settingsOutline}
                                        />

                                    </IonButton>
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
    )
}