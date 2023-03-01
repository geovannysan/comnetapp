import { IonButton, IonContent } from "@ionic/react";
import { getPlatforms } from "@ionic/react";
import { useEffect, useState } from "react";
import { autenticar, Facturaid, MostrarFacturas } from "../../utils/Queryuser";
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
        cedula: "",
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
    let [usuario, setUser] = useState({
        nombre: "",
        estado: "",
        cedula: "",
        facturacion: {
            facturas_nopagadas: 0,
            total_facturas: "0000"
        }
    })
    let [factura, setFactura] = useState({
        urlpdf: ""
    })
    let [cedula, setCedul] = useState("")
    let [total,settotal]=useState("")
    function handelChangeT(e:any){
        settotal(e.target.value)
    }
    function lugarchange(e:any){
        setLugar(e)
        settotal(e.label ? e.label.split(" ")[1].replace("(", "").replace(")", "") : "" )
console.log(e)
    }
    async function name() {
        console.log(datos, singleSelect, lugar, metodd)

    }
    function comprobante(e: any) {
        setSingleSelect(e)
        if (e.value != "") {
            Facturaid(e.value).then(ouput => {
                console.log(ouput)
                if (ouput.estado == "exito") {
                    setFactura({
                        ...ouput.factura
                    })
                    settotal(ouput.factura.total)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
    function buscar() {
        if (cedula.trim().length < 7) {
            return
        }

        autenticar(cedula).then(ouput => {
            console.log(ouput)
            if (ouput.estado === "exito") {
                MostrarFacturas(ouput.datos[0].id).then(ouput => {
                    if (ouput.estado === "exito") {
                        console.log(ouput)
                        let datos = ouput.facturas.map((el: any, index: number) => {
                            return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                        })
                        seTlist(datos)
                    }
                }).catch(err => {
                    console.log(err)
                })
                if (ouput.datos[0].estado === "ACTIVO") {
                    let datos = {
                        nombre: ouput.datos[0].nombre,
                        estado: ouput.datos[0].estado,
                        cedula: ouput.datos[0].cedula,
                        facturacion: {
                            ...ouput.datos[0].facturacion
                        }
                    }
                    setUser({ ...datos })
                }
                if (ouput.datos[0].estado === "SUSPENDIDO") {
                    let datos = {
                        nombre: ouput.datos[0].nombre,
                        estado: "<span className='badge badge-success mx-3'>SUSPENDIDO</span>",
                        cedula: ouput.datos[0].cedula,
                        facturacion: {
                            ...ouput.datos[0].facturacion
                        }
                    }
                    setUser({ ...datos })
                }
                if (ouput.datos.estado[0] === "RETIRADO") {
                    let datos = {
                        nombre: ouput.datos[0].nombre,
                        estado: '<span className="badge badge-success mx-3">RETIRADO</span>',
                        cedula: ouput.datos[0].cedula,
                        facturacion: {
                            ...ouput.datos[0].facturacion
                        }
                    }
                    setUser({ ...datos })
                }
            }
            //

        }).catch(err => {
            //console.log(err)
        })
    }
    useEffect(() => {

    }, [])
    // console.log(singleSelect)
    return (
        <IonContent fullscreen={true}>

            <div className="container-fluid px-0 ">

                <div className=" card  h-100">
                    <div className=" w-100 py-3 bg-dark">

                        <div className=" col-12   row ">
                            <div className="col-2 col-md-2 d-flex justify-content-center  align-items-center text-white ps-3 ">
                                <h5 className=" text-white">
                                    Buscar cliente

                                </h5>

                            </div>
                            <div className="col-4">
                                <div className="  input-group">
                                    <input className="form-control form-control-sm"
                                        placeholder="Cédula cliente"
                                        type={"number"}
                                        value={cedula}
                                        onChange={(e) => setCedul(e.target.value)}
                                    ></input>
                                    <button className="btn btn-primary" id="inputGroupPrepend"
                                        onClick={buscar}
                                    >
                                        <i className=" bi bi-search"></i>

                                    </button>
                                    {/* <InputViews
                                    name="Cédula cliente"
                                    value={datos.cedula}
                                    onChange={handelChange}
                                />*/}
                                </div>
                            </div>


                            <div className="col-6 d-flex justify-content-center  align-items-center">
                                <h5 className=" text-white">{usuario.nombre}



                                </h5>
                                {usuario.estado === "ACTIVO" ? <span className='badge  bg-success mx-3'>ACTIVO</span> : ""}
                                {usuario.estado === "SUSPENDIDO" ? <span className='badge bg-danger mx-3'>SUSPENDIDO</span> : ""}
                                {usuario.estado === "RETIRADO" ? <span className='badge bg-warnig mx-3'>RETIRADO</span> : ""}

                            </div>

                        </div>
                    </div>
                    <div className="bg-ligth container-fluid   h-auto py-3">
                        <div className="container-fluid m-2 bg-danger text-center py-2 rounded-2">
                            {
                                "El cliente cuenta con " + usuario.facturacion.facturas_nopagadas + " Facturas vencidas (Total:" + usuario.facturacion.total_facturas + ")"

                            }

                        </div>
                        <div className="row container-fluid d-flex justify-content-center ">
                            <div className=" container text-center mb-2">
                                <span className=""
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                >Comprobante a pagar</span>
                                {factura.urlpdf != "" ?
                                    <a href={factura.urlpdf}
                                        target="_blank"
                                    >
                                        <i className="px-2 bi bi-file-earmark-pdf"></i>
                                    </a>
                                    : <i className="px-2 bi bi-file-earmark-pdf"></i>}

                            </div>

                            <div className="col-md-12 col-lg-8 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4  col-form-label text-md-end">Factura a pagar</label>
                                    <div className="col-sm-8">
                                        <Selectopction
                                            name="factura"
                                            options={list}
                                            value={singleSelect}
                                            placeholder="Factura"
                                            onChange={(e: any) => comprobante(e)}
                                        />


                                    </div>

                                </div>
                            </div>

                            <div className=" col-lg-6">
                                <div className=" form-group row">
                                    <label className="col-sm-4 col-form-label text-md-end">Forma de pago </label>
                                    <div className="col-sm-8">
                                        <Selectopction
                                            name="Forma"
                                            options={[
                                                { value: "Efectivo-Oficina/Matriz", label: "Efectivo Oficina/Matriz" },                                           
                                                { value: "TC-Oficina/Matriz", label: "TC Oficina/Matriz" },
                                            { value: "Deposito-Oficina/Matriz", label: "Deposito Oficina/Matriz" },
                                                { value: "Efectivo-Oficina/Ecocity", label: "Efectivo Oficina/Ecocity" },
                                                { value: "TC-Oficina/Ecocity", label: "TC Oficina/Ecocity" },
                                                { value: "Deposito-Oficina/Ecocity", label: "Deposito Oficina/Ecocity" }
                                            ]}
                                            value={lugar}
                                            placeholder="Forma "
                                            onChange={setLugar}
                                        />
                                        <span className="font-weight-light"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label  text-md-end "> 
                                    
                                        {lugar.value != "" && lugar.value.includes("Deposito") ?"N° Transacción":""}
                                        {lugar.value != "" && lugar.value.includes("TC") ? "N° Lote" : ""}
                                        </label>
                                    <div className="col-sm-8">
                                        <InputViews
                                            name="asunto"
                                            value={datos.asunto}
                                            onChange={handelChange}
                                        />
                                        <span className="font-weight-light"></span>
                                    </div>
                                </div>
                            </div>

                           
                            
                           
                          
                            <div className="col-lg-6 mb-3">
                                <div className="form-group row">
                                    <label className="col-sm-4  col-form-label text-md-end">Total a pagar</label>
                                    <div className="col-12 col-lg-8">
                                        <div className=" input-group">
                                            <input className="form-control"
                                                name="valor"
                                                value={total}
                                                onChange={handelChangeT}
                                            />

                                            <button className="btn btn-primary" id="inputGroupPrepend"

                                            >
                                                Registrar Pago

                                            </button>
                                        </div>
                                   </div>
                                   
                                    
                                </div>
                                
                            </div>
                            <div className="col-lg-6 mb-3">
                               
                                    <div className="form-group row">
                                    <label className=" col-sm-4 form-label text-md-end"> Notas</label>
                                    <div className="col-sm-8">
                                        <textarea className=" form-control" id="exampleFormControlTextarea1" rows={3}
                                            name="mensaje"
                                            value={datos.mensaje}
                                            onChange={(e: any) => handelChange(e.target)}
                                        ></textarea>
                                    </div>
                                   
                                    </div>
                               
                            </div>
                           
                            

                        </div>
                     
                       

                    </div>


                </div>
            </div>

        </IonContent>
    )
}