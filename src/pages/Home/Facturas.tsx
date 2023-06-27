import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Nombressi } from "../../utils/Querystados";
import { setNicknameslice } from "../../StoreRedux/Slice/UserSlice";

export default function FacturasView() {
    let history = useHistory()
    const datos = useSelector((state: any) => state.usuario.user)
    const [nickname, setNickname] = useState('');
    useEffect(()=>{
        Nombressi({ "info": datos.iD_EXTERNO_ONU }).then(ouput => {
            console.log(ouput)
            if (ouput.length > 0) {
                let dst = ouput[0]["InternetGatewayDevice"]["LANDevice"]["1"]["WLANConfiguration"]["1"]["SSID"]._value
                setNickname(dst)
               // setNicknameslice({ nickname: dst })
                console.log(dst)
            }
        }).catch(err => {
            console.log(err)
        })
    },[])
    return (
        <div className='container-fluid px-0  d-flex  justify-content-center'>
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


        </div>
    
        )
}