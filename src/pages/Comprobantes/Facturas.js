import React from "react";
import { userlog } from "../../utils/User";

export default function FacturaViews() {
    let user = userlog()
    console.log(user)
    return (
        <div className=" container-fluid pt-1 px-3">
            <div className=" bg-light-sm border">
                <div className=" px-0 py-2 w-100  bg-white ">
                    <div className=" d-flex flex-wrap flex-wrap-reverse">
                        <div className="  col-12 col-md-6 ">
                            <div className="px-3 d-flex align-items-center ">
                                <h4 className="px-2  "
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                >{user.nombre}</h4>
                                <div>
                                    <span className="label label-danger">Vencido</span>
                                </div>

                            </div>

                        </div>
                        <div className="col-12 col-md-6 d-flex  text-center justify-content-md-end  align-items-center">
                            <div className="px-2">
                                <div className="btn-group" >
                                    <a className=" btn btn-default btn-md" ><i className="bi bi-credit-card-2-front"></i> Pagar </a>
                                    <a className=" btn btn-default btn-md " ><i className="bi bi-file-earmark-pdf text-danger"></i> Descargar </a>
                                    <a className=" btn btn-default btn-md " ><i className="bi bi-printer"></i> Imprimir </a>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
                <div className="d-flex flex-wrap pt-3 datos px-0">
                    <div className="col-12 col-md-4 border-bottom p-3">
                        <div className="invoice-from">
                            <small>De</small>
                            <div className="m-t-5 m-b-5">
                                <strong className="text-inverse">COMNET - SPEED - T-ICKETS  (COMPUTECNICSNET S.A)</strong>
                                <small>
                                    <br></br>
                                    Edificio City Officce Oficina 301 <br></br>
                                    Indentificación: 092782129001<br></br>
                                    Teléfono: 0980850287 / 042599100<br></br>
                                </small>
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-md-4 border-bottom p-3" >
                        <div className="invoice-from">
                            <small>Para</small>
                            <div className="m-t-5 m-b-5">
                                <strong className="text-inverse">{user.nombre}</strong><br></br>
                                <small>
                                    {user.direccion_principal} <br></br>
                                    {"Teléfono: " + user.telefono}<br></br>
                                    {"Movil: " + user.movil}<br></br>
                                </small>
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-md-4 text-md-end border-bottom p-3 ">
                        <div className="invoice-date">
                            <small>Vencimiento</small>
                            <div className="m-t-5 m-b-5">
                                <small className="text-inverse">16 de Diciembre del 2022</small><br></br>
                                #00149389 <br></br>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="w-100 h-100 bg-white">
                    <div className="w-100 px-3 ">
                        <div className="table-responsive ">
                            <table className="table table-invoice">
                                <thead>
                                    <tr>
                                        <th>DESCRIPCION</th>
                                        <th className="text-center" width="15%">PRECIO</th>
                                        <th className="text-center">CANT.</th>
                                        <th className="text-center" width="15%">IMP %</th>
                                        <th className="text-right" width="15%">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Concierto de Mike bahiala camtidad de boletos1</td>
                                        <td className="text-center">$ 1.00</td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">0.00</td>
                                        <td className="text-right">$ 1.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-center row px-2 ">
                            <div className=" text-white row col-12 col-md-8 bg-secondary ">
                                <div className="col-6 col-md-2 text-center ">
                                    <span>Subtotal</span>
                                    <div className="items-precios">
                                        <small>$</small>
                                        <span >51.00</span>
                                    </div>
                                </div>
                                
                                <div className="col-6 col-md-2 text-center ">
                                    <span>Inpuesto</span>
                                    <div className="items-precios">
                                        <small>$</small>
                                        <span >51.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row col-12  col-md-4 bg-dark px-0 text-white">
                                <div className="d-flex justify-content-between align-items-center py-2" 
                                style={{
                                    fontWeight:"bold",
                                    fontSize:"20px"
                                }}

                                >
                                    <small>TOTAL</small>
                                    <span >
                                        $ 1.00</span>


                                </div>

                            </div>


                        </div>
                        <div className="note  px-3">
                            * Si el pago es vía transferencia bancaria recuerde que debe informarlo desde <b>
                                <a >Aquí</a></b><br></br>
                            * Esta factura vence el <b>16 de Diciembre del 2022</b><br></br>
                            * Si tiene alguna pregunta sobre esta factura, comuníquese con nosotros.

                            <div className="note-sm d-flex flex-column col-2 text-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
                                    <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                                </svg>
                                <span>123554</span>
                            </div>
                            <div className="mt-2 pt-2  border-top text-center ">
                                <span > CONTACTANOS </span>
                                <div className="d-flex justify-content-center align-items-center pb-2">
                                    <a className=' nav-link  px-0 mx-1  nav-icons  text-black' >
                                        <i className="bi bi-phone"></i>
                                        <span className=" " style={{ fontFamily: '', }} > T:0980850287 / 042599100 </span>
                                    </a><div> </div>
                                    <a className=' nav-link  px-0  mx-1 nav-icons  text-black' >
                                        <i className="bi bi-envelope"></i>
                                        <span className=" " style={{ fontFamily: '', }} > facturacion@comnet.ec </span>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}