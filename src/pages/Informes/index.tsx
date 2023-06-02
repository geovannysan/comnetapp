import { IonButton, IonContent } from "@ionic/react";
import { getPlatforms } from "@ionic/react";
import { useEffect, useState } from "react";
import { MostrarFacturas, MostrarFacturasdeuda } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";
import Selectopction from "../../components/Selectshear";
import InputViews from "../../components/Input";

export default function InformeViews() {
    // let user:any = userlog()
    //console.log(getPlatforms().some(e => e === "desktop"))
    const [list, seTlist] = useState([])
    const [singleSelect, setSingleSelect] = useState({ value: "", label: "", });
    const [lugar, setLugar] = useState({ value: "", label: "" })
    const [metodd, setmetodo] = useState({ value: "", label: "" })
    const [datos, setDatos] = useState({
        total: "",
        transacion: "",
        lugarpago: "",
        asunto: "",
        fecha: "",
        tipo: "",
        Factura: "",
        linkimagen: "",
        mensaje: ""
    })
    const handelChange = (e: any) => {
        if (e.name === "linkimagen") {
            setDatos({
                ...datos,
                [e.name]: e.files[0]
            })
        }
        else {
            setDatos({
                ...datos,
                [e.name]: e.value

            })
        }
        //console.log(e.value)
    }

    async function name() {
        console.log(datos, singleSelect, lugar, metodd)

    }
    useEffect(() => {
        MostrarFacturasdeuda(userlog().id).then(ouput => {
            console.log(ouput)
            if (ouput.estado === "exito") {
                console.log(ouput)
                let datos = ouput.facturas.map((el: any, index: number) => {
                    return { value: el.id, label: el.id + "/" + el.emitido + " $" + el.total }
                })
                seTlist(datos)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    // console.log(singleSelect)
    return (
        <IonContent fullscreen={true}>
            <div className="container-fluid ">

                {list.length > 0 ? <div className="card  h-100">
                    <div className=" w-100 py-3 bg-dark">
                        <div className=" text-white ps-3">
                            <i className="bi bi-file-earmark-pdf"></i> Reporte
                        </div>
                    </div>
                    <div className="bg-ligth container-fluid h-auto py-3">
                        <div className="row container-fluid d-flex justify-content-center ">
                            <div className="col-12 col-lg-6 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4 
                                col-form-label  text-md-end">Lugar de Pago</label>
                                    <div className="col-sm-8">
                                        <Selectopction
                                            name="lugar"
                                            options={[{ value: "vecino", label: "Banco Vecino" },
                                            { value: "sucusrcal", label: "Sucursal Pichincha" },
                                            { value: "Transferencia", label: "Transferencia Bancaria" },
                                            { value: "payMente", label: "PayMente" }
                                            ]}
                                            value={metodd}
                                            placeholder="Lugar"
                                            onChange={setmetodo}
                                        />
                                        <span className="font-weight-light">Bancos</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label  text-md-end "> Asunto</label>
                                    <div className="col-sm-8">
                                        <InputViews
                                            name="asunto"
                                            value={datos.asunto}
                                            onChange={handelChange}
                                        />
                                        <span className="font-weight-light">Título del mensaje</span>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-lg-6">
                                <div className=" form-group row">
                                    <label className="col-sm-4 col-form-label text-md-end"> Tipo de pago </label>
                                    <div className="col-sm-8">
                                        <Selectopction
                                            name="lugar"
                                            options={[{ value: "efectivo", label: " Oficina/Matriz" },
                                            { value: "payphone", label: " Call Payhone" },
                                            { value: "recaudacion", label: " Recaudacion-tiendas" },
                                            { value: "efectivo", label: " Oficina/Matriz" }
                                            ]}
                                            value={lugar}
                                            placeholder="Lugar "
                                            onChange={setLugar}
                                        />
                                        <span className="font-weight-light">Como realizó el pago</span>
                                    </div>
                                </div>
                            </div>

                            <div className=" col-lg-6">
                                <div className=" form-group row">
                                    <label className="col-sm-4 col-form-label text-md-end"> Lugar de pago </label>
                                    <div className="col-sm-8">
                                        <Selectopction
                                            name="lugar"
                                            options={[{ value: "completar", label: "Completar cuando selecione Tipo de pago" }]}
                                            value={lugar}
                                            placeholder="Lugar "
                                            onChange={setLugar}
                                        />
                                        <span className="font-weight-light">Donde realizó el pago</span>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-lg-6 mb-3">
                                <div className=" form-group row">
                                    <label className="col-sm-4 col-form-label text-md-end"> Fecha de pago </label>
                                    <div className="col-sm-8">
                                        <input className="form-control" type="date" name="fecha" value={datos.fecha} onChange={(e) => handelChange(e.target)} />
                                        <span className="font-weight-light">Donde realizó el pago</span>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-lg-6 mb-3">
                                <div className=" form-group row">
                                    <label className="col-sm-4 col-form-label text-md-end">No Transacción </label>
                                    <div className="col-sm-8">
                                        <InputViews
                                            name="transacion"
                                            value={datos.transacion}
                                            onChange={handelChange}
                                        />
                                        <span className="font-weight-light">Número de referencia</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4  col-form-label text-md-end">Factura a pagar</label>
                                    <div className="col-sm-8">
                                        <Selectopction
                                            name="factura"
                                            options={list}
                                            value={singleSelect}
                                            placeholder="Factura"
                                            onChange={setSingleSelect}
                                        />
                                        <span className="font-weight-light">Seleccionar factura</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4  col-form-label text-md-end">Total a pagar</label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                            value={singleSelect.label ? singleSelect.label.split(" ")[1] : ""}
                                            onChange={(e) => (e)}
                                        />
                                        <span className="font-weight-light">Número de referencia</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4  col-form-label text-md-end">Adjunto</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" type="file" name="linkimagen" onChange={(e: any) => handelChange(e.target)} />
                                        <span className="font-weight-light">Adjuntar archivo (Max. 2048M)</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="container">
                            <div className="form-group row">
                                <label className="form-label"> Mensaje</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
                                    name="mensaje"
                                    value={datos.mensaje}
                                    onChange={(e: any) => handelChange(e.target)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="container py-3  text-center">
                            <IonButton onClick={name} >Enviar Mensaje</IonButton>
                        </div>

                    </div>


                </div> :
                    <div id="content" className="content text-center"><div className="row"><div className="col-sm-12">
                        <div className="alert alert-danger">

                            <span className="glyphicon glyphicon-warning-sign"></span> <strong> ALERTA!!</strong>
                            <hr className="message-inner-separator"/>
                                <p>
                                    Su último reporte de pago aun se encuentra en Proceso de verificación.
                                    <br/>
                                </p>
                        </div>
                    </div></div></div>}
            </div>
        </IonContent>
    )
}