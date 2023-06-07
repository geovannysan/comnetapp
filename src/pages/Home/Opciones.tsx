import { useHistory } from "react-router"
import { userlog } from "../../utils/User"
import { useDispatch, useSelector } from "react-redux"
import { obtenervaariables } from "./parsesmart"
import {  IonFab, IonFabButton, IonIcon, createAnimation } from "@ionic/react"
import { arrowBack } from "ionicons/icons"
import { useEffect, useRef } from "react"

export function OpcionesView(props: any) {
    let { setOption, opction } = props
    let user: any = userlog()
    let history = useHistory()
    let usedispach = useDispatch()
    const datos = useSelector((state: any) => state.usuario.user)
     console.log(obtenervaariables(datos.servicios[0].smartolt))
    let info: any = [
        {
            lista: "Datos",
            view: [
                {
                    nombres: datos.nombre,
                    icons: "",
                    class: ""

                },
                {
                    nombres: datos.nombre,
                    icons: "",
                    class: ""

                }
            ]
        }
    ]
    let inforoute: any = obtenervaariables(datos.servicios[0].smartolt)
    const animatedElement:any = useRef(null);
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
    
    useEffect(()=>{
        const animation = createAnimation()
            .addElement(animatedElement.current)
            .duration(800)
           
            .fromTo('transform', 'translateY(100%)', 'translateY(0)')
            .fromTo('opacity', '0', '1')
            .beforeAddClass('animated-element')
            .afterAddClass('animated-element');


        animation.play();
    }, [opction])

    return (
        <>
            <IonFab vertical="bottom" horizontal="end">
                <IonFabButton size="small" onClick={() => setOption("")}>
                    <IonIcon icon={arrowBack}></IonIcon>
                </IonFabButton>
            </IonFab>
            <div ref={animatedElement}>

            
            {opction == "Perfil" ?

                <div className='container-fluid px-0  d-flex  justify-content-center'>

                    <div className='row col-12 col-md-10 col-lg-12 px-0  '>
                        {/*onClick={() => setOpen(!open)}  id="trigger-button"*/}
                        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' >
                            <div className="cardt cardt-dark ">
                                <div className='row '
                                style={{
                                    marginTop:-15
                                }}>
                                    <div className='col-8'>
                                        <h4 style={{
                                            textTransform: "capitalize",
                                            fontSize: "1em"
                                        }} className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"}>{datos.nombre}</h4>

                                    </div>
                                    <div className='col-3  d-flex  justify-content-center'>
                                        <h4 className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"} style={{ fontSize: "1em" }}><i className=" bi bi-phone"></i>{datos.movil}</h4>

                                    </div>
                                </div>
                                <p className='card__link text-capitalize'  ><span className=' fw-bold'><i className="bi bi-pin-map-fill px-1"></i></span>{datos.direccion_principal} </p>
                                <div className="row">
                                    <div className="col-8 col-md-6">
                                        <p className="card__apply ">
                                            <a className="card__link" style={{
                                                fontSize: "0.8em"
                                            }}><i className="card_icon px-2  bi  bi-envelope"></i>{datos.correo}</a>
                                        </p>
                                    </div>
                                    <div className=" col-4 col-md-6 text-center ">
                                        <p className="card__apply ">
                                            <a className="card__link"
                                            
                                            onClick={() => history.push("/page/perfil")}>Perfil  <i className="card_icon px-2  bi  bi-pencil"></i></a>
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>




                        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => console.log("")} >
                            <div className="cardt  cardt-success">
                                <div className='row'>
                                    <div className='col-6 col-md-8 '>
                                        <h4 className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"} style={{
                                            textTransform: "capitalize",
                                            fontSize: "1em"
                                        }}>{datos.servicios ? datos.servicios[0].perfil : "User Tickets"}</h4>
                                    </div>
                                    <div className='col-6 col-md-3 text-center'>

                                        <h4 className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"} style={{ fontSize: "1em" }}><i className=" bi  bi-router"></i> {datos.modelO_DE_EQUIPO}</h4>



                                    </div>
                                </div>
                                <div className=" px-0 d-flex  justify-content-around pt-4 ">
                                    < div className=" ">
                                        <p className="card__apply" style={{

                                        }} >
                                            <h4 className="card__link">
                                                <i className=" bi bi-cloud-arrow-up-fill"></i>
                                                {inforoute["upload_speed_profile_name"]}
                                            </h4>
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="card__apply    "
                                            style={{

                                            }} >
                                            <h4 className="card__link">
                                                <i className=" bi bi-cloud-arrow-down-fill"></i>
                                                {inforoute["download_speed_profile_name"]}

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
                                        <h4 className=' text-primary'>Soporte Técnico</h4>
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
                            <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span>{datos.modelO_DE_EQUIPO} </p>

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
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' >
                        <div className="cardt cardt-red ">
                            <div className='row'>
                                <div className='col-8'>
                                    <h4 style={{
                                        textTransform: "capitalize",
                                        fontSize: "0.9em"
                                    }} >Cambiar Clave</h4>

                                </div>
                                <div className='col-4  d-flex  justify-content-end'>
                                    <h4 style={{ fontSize: "1em" }}><i className=" bi bi-arrow-repeat"></i> Cambiar</h4>

                                </div>
                            </div>
                            <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span>{datos.modelO_DE_EQUIPO} </p>

                            <div className="row pt-2">
                                <div className="col-sm">
                                    <p className="card__apply ">
                                        <a className="card__link" ><i className=" bi bi-wifi"></i> Cambiar  <i className=" bi bi-arrow-left-right"></i></a>

                                    </p>

                                </div>

                                <div className=" col-8 col-md-6 text-center d-none ">
                                    <p className="card__apply ">
                                        <a className="card__link" ><i className=" bi bi-wifi"></i> Cambiar  ${datos.facturacion.total_facturas} <i className=" bi bi-arrow-left-right"></i></a>
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>




                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => console.log("")} >
                        <div className="cardt  cardt-dark">
                            <div className='row'>
                                <div className='col-7 col-md-7 '>
                                    <h4 style={{
                                        textTransform: "capitalize",
                                        fontSize: "1em"
                                    }}>Ocultar red Wifi</h4>
                                </div>
                                <div className='col-5 col-md-5 d-flex  justify-content-end '>

                                    <h4 style={{ fontSize: "0.9em" }}><i className=" bi bi-wifi-off"></i> Ocultar </h4>
                                </div>
                                <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span>{datos.modelO_DE_EQUIPO} </p>

                            </div>
                            <p className="card__apply">
                                <a className="card__link" >Cambiar a red oculta <i className=" m-2 card_icon bi bi-pip-fill"></i></a>
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
                                    }} >Ver dispositivos </h4>

                                </div>
                                <div className='col-5  d-flex  justify-content-end'>
                                    <h4 style={{
                                        fontSize: "1em",
                                        color: "#3171e0"
                                    }}><i className=" bi bi-hdd-network"></i> Conectados </h4>

                                </div>
                            </div>
                            <p  ><span className=' fw-bold'><i className="bi bi-router px-1"></i></span>{datos.modelO_DE_EQUIPO} </p>


                            <p className="card__apply  float-end">
                                <a className="card__link " >Listar dipositivos <i className=" m-2 card_icon bi  bi-usb-symbol"></i></a>
                            </p>
                        </div>
                    </div>

                </div>


            </div> : ""}
            </div>
        </>)
}