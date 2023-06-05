import { IonPopover , IonContent, IonList, IonItem } from '@ionic/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Collapse from "react-bootstrap/Collapse"
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ListarFactura } from '../../utils/Queryuser';
import { setPlan } from '../../StoreRedux/Slice/UserSlice';
import "./Home.css"
import { OpcionesView } from './Opciones';
const popover = ()=>{
    return(
        <Popover id="basic">
            <Popover.Body>

            </Popover.Body>
        </Popover>
    )
}
const Inicipage: React.FC = () => {
    let history = useHistory()
    let usedispach = useDispatch()
    const datos = useSelector((state: any) => state.usuario.user)
    let info = useSelector((state: any) => state.usuario.plan)
    const [open, setOpen] = useState<boolean>(false);
    const [opction,setOption]= useState("");
    //console.log(datos)
    //function kbToMb(KB: string) { return parseInt(KB) / 1024; }
    useEffect(() => {
        let datos: any = localStorage.getItem("INFOUSER")
        usedispach(setPlan(JSON.parse(datos)))
        /* ListarFactura(datos.id).then(ouput => {
             let datos = ouput
             console.log(datos, ouput)
             if(ouput.length){
                 usedispach(setPlan(datos.length>1 ? [datos[0], datos[3], datos[4], datos[5]] : datos))
             }
             }).catch(err => {
             console.log(err)
         })*/
    }, [])


    return (
        <div className='px-0'>

            {opction ==""?<div className=' container-fluid px-0  d-flex  justify-content-center'>
                <div className='row col-12 col-md-10 col-lg-12 px-0  '>
                    {/*onClick={() => setOpen(!open)}  id="trigger-button"*/}
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => setOption("Perfil")} >
                        <div className="cardt cardt-dark ">
                            <div className='row'>
                                <div className='col-8'>
                                    <h4 style={{ textTransform: "capitalize" }} className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"}>{datos.estado === "ACTIVO" ? " Servicio Activo" : "Servicio cancelado"}!</h4>

                                </div>
                                <div className='col-3  '>
                                    <div className='   bg-secondary float-end  ms-3 mb-1 card rounded-3 shadow' style={{
                                        width: "48px",
                                        height: "48px",
                                        zIndex: 2
                                    }}>
                                        <div className='m-auto'>
                                            <i className="bi bi-info-circle text-white " style={{
                                                fontSize: 28
                                            }} ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className=' text-capitalize'><span className=' fw-bold'>Plan:</span>{datos.servicios ? datos.servicios[0].perfil : "User Tickets"} </p>
                            <p className="card__apply">
                                <a className="card__link" onClick={() => setOption("Perfil")}>Información <i className="card_icon   bi bi-eye"></i></a>
                            </p>
                        </div>
                        
                    </div>
                    <IonPopover trigger="trigger-button" alignment="center" >
                       
                            <div className='  col-12  p-2' >
                                <span className='p-2'> Servicios :</span>
                                <IonList lines='none'>
                                    {info.length>0? info.map((e: string, i: number) => {
                                        return (
                                            <IonItem className='text-info text-dark' key={i} >
                                                <span
                                                >
                                                    {e}
                                                </span>
                                            </IonItem>
                                        )
                                    }):""}
                                </IonList >
                            </div>
                        
                    </IonPopover>
                  
                    

                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => setOption("Factura")} >
                        <div className="cardt  cardt-success">
                            <div className='row'>
                                <div className='col-8 '>
                                    <h4>Reportar Pago</h4>
                                </div>
                                <div className='col-3 '>
                                    <div className=' bg-success float-end  ms-3 mb-1 card rounded-3 shadow' style={{
                                        width: "48px",
                                        height: "48px",
                                        zIndex: 2

                                    }}>
                                        <div className='m-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill='#fff' className="bi bi-currency-dollar -white" viewBox="0 0 16 16">
                                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                                            </svg>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className=" px-0 row mx-0">
                                <p className=" text-default col-7" style={{
                                    
                                }} > Facturas</p>
                                <p className="  text-default col-5 text-center" style={{
                                   
                                }} > Inpagas: {datos.facturacion.facturas_nopagadas}</p>

                            </div>
                            <p className="card__apply">
                                <a className="card__link" onClick={() => setOption("Factura")}>Pagar facturas <i className="card_icon   bi bi-cash"></i></a>
                            </p>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => history.push("/page/Soporte")} >
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
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' onClick={() => setOption("wifi")}>
                        <div className="cardt  cardt-red ">
                            <div className='row'>
                                <div className='col-8'>
                                    <h4 className=' ' style={{
                                        
                                         fontWeight:"bold"
                                    }}> Opciones Wifi</h4>
                                </div>
                                <div className='col-3'>
                                    <div className=' mb-1  float-end  wifi ms-3 card rounded-3 shadow' style={{
                                        width: "48px",
                                        height: "48px",
                                        zIndex: 2
                                    }}>
                                        <div className='m-auto'>
                                            <i className="bi bi-wifi icon-app"></i>
                                        </div>


                                    </div>
                                </div>


                            </div>
                           
                            <p>Cambiar claves, Bloqueos</p>
                            <p className="card__apply ">
                                <a className="card__link" onClick={() => setOption("wifi")}>Actualizar <i className="card_icon bi bi-wifi"></i></a>
                            </p>
                        </div>
                    </div>
                </div>


            </div>:""}
            <div className='container-fluid mt-4 d-flex  justify-content-center d-none '>

                <div className='row col-12 col-md-10 col-lg-12 px-0  '>


                    <div className=' col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3  py-1  '>
                        <div className='options'>
                            <a onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="example-collapse-text">
                                <div className='animate__pulse   ' >
                                    <div className='   bg-dark  ms-3 mb-1 card rounded-4 shadow' style={{
                                        width: "60px",
                                        height: "60px",
                                        zIndex: 2
                                    }}>
                                        <div className='m-auto'>
                                            <i className="bi bi-info-circle text-white " style={{
                                                fontSize: 35
                                            }} ></i>
                                        </div>
                                    </div>
                                    <div className="card   mb-3 mt-n5  rounded-4  shadow-xs" style={{
                                        position: "relative",
                                        zIndex: 1
                                    }} >
                                        <div className=" card-header    border-activo rounded-top-4 px-3 pt-n  text-end fw-bolder text-white  py-3"
                                            style={{
                                                fontSize: "1.35em",


                                            }}
                                        >
                                            <span className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"}>{datos.estado === "ACTIVO" ? " Servicio Activo" : "Servicio cancelado"}</span>
                                        </div>
                                        <div className=" px-2 py-2 d-flex justify-content-between mx-1">
                                            <h5 className="card-title ms-3  text-default" style={{
                                                fontSize: "15px"
                                            }} >  </h5>
                                            <h5 className=' card-title ms-3 text-default'
                                                style={{
                                                    fontSize: "15px"
                                                }}
                                            >
                                                {datos.servicios ? datos.servicios[0].perfil : "User Tickets"}
                                            </h5>

                                        </div>
                                    </div>
                                </div>
                            </a>
                           { /*<Collapse in={open}>
                                <div className='  col-12 border  rounded-4 bg-white  shadow-sm  p-2' >
                                    <span className='p-2'> Servicios :</span>
                                    <IonList lines='none'>
                                        {info.map((e: string, i: number) => {
                                            return (
                                                <IonItem className='text-info text-dark' key={i} >
                                                    <span
                                                    >
                                                        {e}
                                                    </span>
                                                </IonItem>
                                            )
                                        })}
                                    </IonList >
                                </div>
                            </Collapse>*/}
                        </div>
                    </div>

                    <div className='  options  col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 py-1 ' onClick={() => history.push("/page/Informe")}>
                        <div className=' mb-1    bg-success ms-3 card rounded-4 shadow' style={{
                            width: "60px",
                            height: "60px",
                            zIndex: 2

                        }}>
                            <div className='m-auto'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill='#fff' className="bi bi-currency-dollar -white" viewBox="0 0 16 16">
                                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                                </svg>
                            </div>


                        </div>
                        <div className="card mb-3 mt-n5  rounded-4  shadow-xs" style={{
                            position: "relative",
                            zIndex: 1
                        }} >

                            <div className=" card-header success  rounded-top-4 px-3 pt-n  text-end fw-bolder text-success  py-3"
                                style={{
                                    fontSize: "1.35em",
                                }}
                            >
                                Reportar pago
                            </div>

                            <div className=" px-2 py-2 d-flex justify-content-between mx-1">
                                <h5 className="card-title ms-3  text-default" style={{
                                    fontSize: "15px"
                                }} >  Pagar factura</h5>
                                <h5 className="card-title  text-default" style={{
                                    fontSize: "15px"
                                }} > Inpagas: {datos.facturacion.facturas_nopagadas}</h5>
                            </div>

                        </div>
                    </div>
                    <div className='options col-12 col-sm-6 col-md-6 col-lg-4  col-xl-3 py-1 ' onClick={() => history.push("/page/Soporte")}>
                        <div className='  mb-1    ms-3 card rounded-4 shadow' style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#3691ef",
                            zIndex: 2

                        }}>
                            <div className='m-auto'>
                                <i className="bi bi-radioactive icon-app "  ></i>
                            </div>


                        </div>
                        <div className="card  mb-3 mt-n5  rounded-4  shadow-xs" style={{
                            position: "relative",
                            zIndex: 1
                        }} >

                            <div className=" card-header  reporte  border rounded-top-4 px-3 pt-n  text-end fw-bolder text-white  py-3"
                                style={{
                                    fontSize: "1.35em",
                                    backgroundColor: "",
                                    borderColor: ""


                                }}
                            >
                                Soporte Técnico
                            </div>

                            <div className=" px-2 py-2 d-flex justify-content-between mx-1">


                                <h5 className="card-title ms-3  text-default" style={{
                                    fontSize: "15px"
                                }} >  Reportar inconveniente</h5>
                                <h5 className="card-title ms-3  text-default" style={{
                                    fontSize: "15px"
                                }} > {datos.mantenimiento ? "" : ""}</h5>
                            </div>

                        </div>
                    </div>
                    <div className='options  col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 py-1  ' onClick={() => console.log("clik")}>
                        <div className=' mb-1    wifi ms-3 card rounded-4 shadow' style={{
                            width: "60px",
                            height: "60px",
                            zIndex: 2
                        }}>
                            <div className='m-auto'>
                                <i className="bi bi-wifi icon-app"></i>
                            </div>


                        </div>
                        <div className="card  mb-3 mt-n5  rounded-4  shadow-xs" style={{
                            position: "relative",
                            zIndex: 1
                        }} >

                            <div className=" card-header wifi-sm  border rounded-top-4 px-3 pt-n  text-end fw-bolder text-success  py-3"
                                style={{
                                    fontSize: "1.35em",

                                }}
                            >
                                Opciones Wifi
                            </div>

                            <div className=" px-2 py-2 ">

                                <h5 className="card-title ms-3  text-default" style={{
                                    fontSize: "15px"
                                }} >  Cambiar claves, bloqueos</h5>
                                <p className="card-text"></p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div>
                {opction != "" ?   <OpcionesView
                    opction={opction}
                    setOption={setOption}
                />:""}
            </div>
        </div>

    )
}
export default Inicipage