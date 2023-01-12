import { IonButton, IonContent } from "@ionic/react";
import { getPlatforms } from "@ionic/react";
import { useEffect, useState } from "react";
import { MostrarFacturas } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";

export default function InformeViews() {
    let user = userlog()
    console.log(getPlatforms().some(e => "desktop"))
    const[list,seTlist]=useState([])
   useEffect(()=>{
    MostrarFacturas(user.id).then(ouput=>{
        if (ouput.estado=="exito"){
        seTlist(ouput.facturas)
    }
      
    }).catch(err=>{
        console.log(err)
    })


   },[])
    return (
        <IonContent  fullscreen={true}>
        <div className="container ">
            <h5>Reportar Pago</h5>
            <div className="card  h-100">
                <div className=" w-100 py-3 bg-dark">
                    <div className=" text-white ps-3">
                        <i className="bi bi-file-earmark-pdf"></i> Reporte
                    </div>
                </div>
                <div className="bg-ligth container h-auto py-3">
                    <div className="row container">
                        <div className="col-sm-6 mb-3">
                            <div className="form-group row">
                                <label className="col-sm-4 
                                col-form-label  text-md-end">Lugar de Pago</label>
                                <div className="col-sm-8">
                                    <select name="LugardePago41" className="form-select " data-select2-id="1" aria-hidden="true">
                                        <option>Banco Vecino</option><option> Sucursal del Banco Pichincha</option><option> Traferencia Bancaria</option><option>  PayMentez</option>
                                    </select>
                                    <span className="font-weight-light">Bancos</span>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label  text-md-end "> Asunto</label>
                                <div className="col-sm-8">
                                    <input className="form-control" />
                                    <span className="font-weight-light">Título del mensaje</span>
                                </div>
                            </div>
                        </div>
                        <div className=" col-sm-6 mb-3">
                            <div className=" form-group row">
                                <label className="col-sm-4 col-form-label text-md-end"> Fecha de pago </label>
                                <div className="col-sm-8">
                                    <input className="form-control" type="date" />
                                    <span className="font-weight-light">Donde realizó el pago</span>
                                </div>
                            </div>
                        </div>
                        <div className=" col-sm-6">
                            <div className=" form-group row">
                                <label className="col-sm-4 col-form-label text-md-end"> Lugar de pago </label>
                                <div className="col-sm-8">
                                    <select name="LugardePago41" className="form-select " >
                                        <option ></option>

                                    </select>
                                    <span className="font-weight-light">Donde realizó el pago</span>
                                </div>
                            </div>
                        </div>
                        <div className=" col-sm-6">
                            <div className=" form-group row">
                                <label className="col-sm-4 col-form-label text-md-end"> Tipo de pago </label>
                                <div className="col-sm-8">
                                    <select name="LugardePago41" className="form-select " >
                                        <option ></option>
                                    </select>
                                    <span className="font-weight-light">Como realizó el pago</span>
                                </div>
                            </div>
                        </div>
                        <div className=" col-sm-6 mb-3">
                            <div className=" form-group row">
                                <label className="col-sm-4 col-form-label text-md-end">No Transacción </label>
                                <div className="col-sm-8">
                                    <input className="form-control" />
                                    <span className="font-weight-light">Número de referencia</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="form-group row">
                                <label className="col-sm-4  col-form-label text-md-end">Factura a pagar</label>
                               <div className="col-sm-8">
                                    <select className=" form-select ">
                                        {list.length>0? 
                                        list.map((elm:any,id:number)=>{
                                            return(
                                                <option key={id}>{elm.id + " / " + elm.emitido + " $" + elm.total }</option>
                                            )
                                        })
                                        :""}
                                    </select>
                                    <span className="font-weight-light">Seleccionar factura</span>
                               </div>                                
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="form-group row">
                                <label className="col-sm-4  col-form-label text-md-end">Total a pagar</label>
                                <div className="col-sm-8">
                                    <input  className=" form-control"/>
                                    <span className="font-weight-light">Número de referencia</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="form-group row">
                                <label className="col-sm-4  col-form-label text-md-end">Adjunto</label>
                                <div className="col-sm-8">
                                    <input className=" form-control" type="file" />
                                    <span className="font-weight-light">Adjuntar archivo (Max. 2048M)</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="container">
                        <div className="form-group row">
                            <label className="form-label"> Mensaje</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                        </div>
                    </div>
                    <div className="container py-3  text-center">
                        <IonButton>Enviar Mensaje</IonButton>
                    </div>

                </div>


            </div>
        </div>
        </IonContent>
    )
}