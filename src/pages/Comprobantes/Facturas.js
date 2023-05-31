import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Facturaid } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";
import moment from "moment";
import "moment"
import 'moment/locale/es';
import JsBarcode from "jsbarcode"

export default function FacturaViews() {
    let user = userlog()
    //console.log(user) 
    const {id}  = useParams();
    const [Factura,setFactur]= useState({
        factura:{},
        items:[]
    })
    //console.log(moment("2023-12-05").format('LL'))
    useEffect(()=>{
        Facturaid(parseInt(id)).then(ouput => {
            if(ouput.estado==="exito"){
                setFactur({
                    factura:ouput.factura,
                    items:ouput.items
                })
            console.log(ouput)}
        }).catch(err => {
            console.log(console.error(err))
        })
        JsBarcode(".barcode").init();
     
    },[])
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
                                    <span className="label label-danger">{(new Date(Factura.factura.vencimiento + "00:00:00") > new Date())?"Por Pagar":"Vencida"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex  text-center justify-content-md-end  align-items-center">
                            <div className="px-2">
                                <div className="btn-group" >
                                    <a className=" btn btn-default btn-md" ><i className="bi bi-credit-card-2-front"></i> Pagar </a>
                                    <a className=" btn btn-default btn-md " ><i className="bi bi-file-earmark-pdf text-danger"></i> Descargar </a>
                                    <a className=" btn btn-default btn-md " href={Factura.factura.urlpdf?Factura.factura.urlpdf :""} target="_blank" ><i className="bi bi-printer"></i> Imprimir </a>
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
                                <small className="text-inverse">{Factura.factura.vencimiento ? moment(Factura.factura.vencimiento).format('LL'):""}</small><br></br>
                                #{id.padStart(8, 0)} <br></br>
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
                                   {Factura.items.length>0? Factura.items.map((item,i)=>{
                                    return(
                                    <tr key={i}>
                                            <td>{item.descrp}</td>
                                        <td className="text-center">$ {item.precio}</td>
                                        <td className="text-center"> {item.unidades} </td>
                                        <td className="text-center">{item.imp}</td>
                                            <td className="text-right">${item.total}</td>
                                    </tr>
                                    )
                                   }):''}
                                  
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-center row px-2 ">
                            <div className=" text-white row col-12 col-md-8 bg-secondary ">
                                <div className="col-6 col-md-2 text-center ">
                                    <span>Subtotal</span>
                                    <div className="items-precios">
                                        <small>$</small>
                                        <span >{Factura.factura.subtotal? Factura.factura.subtotal:""}</span>
                                    </div>
                                </div>
                                
                                <div className="col-6 col-md-2 text-center ">
                                    <span>Inpuesto</span>
                                    <div className="items-precios">
                                        <small>$</small>
                                        <span >{Factura.factura.impuesto ? Factura.factura.impuesto : ""}</span>
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
                                        $ {Factura.factura.total ? Factura.factura.total : ""}</span>
                                </div>
                            </div>
                        </div>
                        <div className="note  px-3">
                            * Si el pago es vía transferencia bancaria recuerde que debe informarlo desde <b>
                                <a className=" nav-item  text-primary"
                                 
                                
                                >Aquí</a></b><br></br>
                            * Esta factura vence el <b>16 de Diciembre del 2022</b><br></br>
                            * Si tiene alguna pregunta sobre esta factura, comuníquese con nosotros.

                            <div className="note-sm d-flex flex-column col-2 text-center ">
                                <svg className="barcode"
                                    
                                    jsbarcode-value={id.padStart(8,0)}
                                    jsbarcode-textmargin="0"
                                    jsbarcode-fontoptions="bold">
                                </svg>
                               
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