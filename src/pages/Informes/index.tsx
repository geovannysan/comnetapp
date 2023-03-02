import { IonContent, useIonToast } from "@ionic/react";
import { getPlatforms } from "@ionic/react";
import { useEffect, useState } from "react";
import { autenticar, Facturaid, MostrarFacturas } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";
import Selectopction from "../../components/Selectshear";
import InputViews from "../../components/Input";
import { BuscaclienteContifico, BuscarProductoContific, Creafactura, CreaProducto, CrearClienteContifico, PagoFacturacomnet } from "../../utils/Contifico";

export default function InformeViews() {
    const [present] = useIonToast();
    const [list, seTlist] = useState([])
    const [singleSelect, setSingleSelect] = useState({ value: "", label: "", });
    const [lugar, setLugar] = useState({ value: "", label: "" })
    const [banco, setBanco] = useState({ value: "", label: "" })
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
        setDatos({
            ...datos,
            [e.name]: e.value

        })
        //console.log(e.value)
    }
    let [usuario, setUser] = useState({
        nombre: "",
        estado: "",
        cedula: "",
        facturacion: {
            facturas_nopagadas: 0,
            total_facturas: "0000"
        },
        servicios: []
    })
    let [factura, setFactura] = useState({ urlpdf: "" })
    let [cedula, setCedul] = useState("")
    let [total, settotal] = useState("")
    let [totalcon, setValor] = useState({
        total: 0,
        estado: "",
        id: ""
    })
    function handelChangeT(e: any) {
        settotal(e.target.value)

    }
    function lugarchange(e: any) {
        setLugar(e)
        settotal(e.label ? e.label.split(" ")[1].replace("(", "").replace(")", "") : "")
        console.log(e)
    }
    async function name() {
        console.log(datos, singleSelect, lugar, metodd)

    }
    /** Verificar la cuenta a pagar con el producto contifico (crea producto contifico de ser nesesario)  */
    function comprobante(e: any) {
        setSingleSelect(e)
        if (e.value != "") {

            Facturaid(e.value).then(ouput => {
                console.log(ouput)
                if (ouput.estado === "exito") {
                    setFactura({
                        ...ouput.factura
                    })
                    settotal(ouput.factura.total)
                    console.log(totalcon.total.toFixed(2), parseFloat(ouput.factura.total).toFixed(2))
                    console.log((totalcon.total.toFixed(2) === parseFloat(ouput.factura.total).toFixed(2)))
                    if (totalcon.estado != "A" && totalcon.total.toFixed(2) != parseFloat(ouput.factura.total).toFixed(2)) {
                        CreaProducto({
                            "codigo_barra": null,
                            "porcentaje_iva": "12",
                            "categoria_id": "91qdGvZgXhY6nbN8",
                            "pvp1": ouput.factura.total,
                            "tipo": "SER",
                            "para_supereasy": false,
                            "para_comisariato": false,
                            "minimo": "0.0",
                            "descripcion": "Servicio de Internet Banda ancha",
                            "nombre": usuario.servicios[0]["perfil"],
                            "codigo": usuario.servicios[0]["idperfil"],
                            "estado": "A"
                        }).then(produ => {
                            console.log(produ)
                        })
                    }
                }

            }).catch(err => {
                console.log(err)
            })
        }
    }
    /** regsitra clinete obtine cliente porta y contifico obtiene productos contifico*/
    function buscar() {
        if (cedula.trim().length < 7) {
            return
        }
        autenticar(cedula).then(ouput => {
            console.log(ouput)
            if (ouput.estado === "exito") {
                BuscaclienteContifico(cedula.trim()).then(ouputs => {
                    console.log(ouputs)
                    if (ouputs.length == 0) {
                        let datos = {
                            "tipo": "N",
                            "personaasociada_id": null,
                            "nombre_comercial": ouput.datos[0].nombre,
                            "telefonos": ouput.datos[0].movil,
                            "razon_social": ouput.datos[0].nombre,
                            "direccion": ouput.datos[0].direccion_principal,
                            "porcentaje_descuento": "0",
                            "es_cliente": true,
                            "origen": "Panel de Facturacion",
                            "email": ouput.datos[0].correo,
                            "cedula": ouput.datos[0].cedula,
                            "Provincia": "Guayaquil",
                            "adicional1_cliente": "Cliente de Internet"

                        }
                        CrearClienteContifico(datos).then(e => {
                            //mostrar mensaje de registro
                            console.log(e)
                        }).catch(err => {
                            //mostrar mensaje de no lo registro
                            console.log(err)
                            present({
                                message: "Hubo un error inesperado sl crear cliente contifico",
                                cssClass: '',
                                duration: 1800,
                                position: "top",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",

                                    }
                                ]
                            })
                        })
                    }
                    else if (ouputs.length > 0) {
                        BuscarProductoContific(ouput.datos[0].servicios[0].idperfil).then(salida => {
                            if (salida.length > 0) {
                                let estado = salida[0].estado;
                                let valor = parseFloat(salida[0].pvp1) * 1.12;
                                if (estado == "A") {
                                    setValor({
                                        total: valor,
                                        estado: estado,
                                        id: salida[0].estado,
                                    })
                                }

                                console.log(salida)
                            }
                        }).catch(err => {
                            console.log(err)
                            present({
                                message: "Hubo un error inesperado",
                                cssClass: '',
                                duration: 1800,
                                position: "top",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",

                                    }
                                ]
                            })
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    present({
                        message: "Hubo un error inesperado",
                        cssClass: '',
                        duration: 1800,
                        position: "top",
                        buttons: [
                            {
                                text: "cerrar",
                                role: "cancel",

                            }
                        ]
                    })
                })
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
                    present({
                        message: "Hubo un error inesperado",
                        cssClass: '',
                        duration: 1800,
                        position: "top",
                        buttons: [
                            {
                                text: "cerrar",
                                role: "cancel",

                            }
                        ]
                    })
                })
                if (ouput.datos[0].estado === "ACTIVO") {
                    let datos = {
                        nombre: ouput.datos[0].nombre,
                        estado: ouput.datos[0].estado,
                        cedula: ouput.datos[0].cedula,
                        facturacion: {
                            ...ouput.datos[0].facturacion
                        },
                        servicios: ouput.datos[0].servicios
                    }
                    setUser({ ...datos })
                }
                if (ouput.datos[0].estado === "SUSPENDIDO") {
                    let datos = {
                        nombre: ouput.datos[0].nombre,
                        estado: ouput.datos[0].estado,
                        cedula: ouput.datos[0].cedula,
                        facturacion: {
                            ...ouput.datos[0].facturacion
                        },
                        servicios: ouput.datos[0].servicios
                    }
                    setUser({ ...datos })
                }
                if (ouput.datos.estado[0] === "RETIRADO") {
                    let datos = {
                        nombre: ouput.datos[0].nombre,
                        estado: ouput.datos[0].estado,
                        cedula: ouput.datos[0].cedula,
                        facturacion: {
                            ...ouput.datos[0].facturacion
                        }
                        , servicios: ouput.datos[0].servicios
                    }

                    setUser({ ...datos })
                }
            }
            if (ouput.estado === "error") {
                present({
                    message: ouput.mensaje,
                    cssClass: '-danger',
                    duration: 1800,
                    position: "top",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",

                        }
                    ]
                });
                console.log("err")
                setUser({
                    nombre: "",
                    estado: "",
                    cedula: "",
                    facturacion: {
                        facturas_nopagadas: 0,
                        total_facturas: "0000"
                    }
                    , servicios: []
                })
            }
        }).catch(err => {
            //console.log(err)
        })
    }
    function RegistrarPago() {
        console.log(cedula, total, lugar.value, banco.value, singleSelect.value)
        console.log()
        if (lugar.label.includes("Deposito")) {
            console.log(banco.value)
            if (datos.asunto.trim().length == 0 && banco.label.trim() == "") {
                present({
                    message: "Ingrese número de comprobante o seleccione cuenta",
                    cssClass: '-',
                    duration: 1800,
                    position: "top",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",

                        }
                    ]
                })
            }
            else {
                console.log(datos.asunto, datos.mensaje)
                let datosdefactura = {
                    "token": "ejdGNmVseFZtd1NIczE5eTBhQy9xZz09",
                    "idfactura": singleSelect.value,
                    "pasarela": "" + lugar.value ,
                    "cantidad": total ,
                    "idtransaccion": datos.asunto,
                    "nota": banco.label+"/"+ datos.mensaje
                }
                PagoFacturacomnet(datosdefactura).then(fact=>{
                   console.log(fact)
                    if (fact.estado=="exito"){
                        //crea factura
                    }
                    if (fact.estado == "erro"){
                        //muestra mensaje de errror
                    }
                }).catch(err=>{
                    console.log(err)
                })


            }

        }


    }
  

    useEffect(() => {

    }, [])
    // console.log(singleSelect)
    return (
        <IonContent fullscreen={true}>

            <div className="container-fluid px-0 ">

                <div className=" card  h-100">
                    <div className=" w-100 py-3 bg-dark mx-auto">

                        <div className=" d-flex px-1 ">
                            <div className="col-12 row">
                                <div className="col-12 col-md-2 d-flex   align-items-center text-white ps-3 ">
                                    <h5 className=" text-white">
                                        Buscar cliente

                                    </h5>

                                </div>
                                <div className="col-12 col-md-4">
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
                                    </div>
                                </div>


                                <div className="col-12 col-md-6 d-flex justify-content-center  align-items-center">
                                    <h5 className=" text-white">{usuario.nombre}
                                    </h5>
                                    {usuario.estado === "ACTIVO" ? <span className='badge  bg-success mx-3'>ACTIVO</span> : ""}
                                    {usuario.estado === "SUSPENDIDO" ? <span className='badge bg-danger mx-3'>SUSPENDIDO</span> : ""}
                                    {usuario.estado === "RETIRADO" ? <span className='badge bg-warnig mx-3'>RETIRADO</span> : ""}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-ligth container-fluid   h-auto py-3">
                        {usuario.nombre == "" ? "" : <div className="container-fluid  bg-danger text-center py-2 rounded-2">
                            {
                                "El cliente cuenta con " + usuario.facturacion.facturas_nopagadas + " Facturas vencidas (Total:" + usuario.facturacion.total_facturas + ")"

                            }
                        </div>}
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
                                                { value: "Efectivo Oficina/Matriz", label: "Efectivo Oficina/Matriz" },
                                                { value: "TC-Oficina/Matriz", label: "TC Oficina/Matriz" },
                                                { value: "Deposito Oficina/Matriz", label: "Deposito Oficina/Matriz" },
                                                { value: "Efectivo Oficina/Ecocity", label: "Efectivo Oficina/Ecocity" },
                                                { value: "TC Oficina/Ecocity", label: "TC Oficina/Ecocity" },
                                                { value: "Deposito Oficina/Ecocity", label: "Deposito Oficina/Ecocity" }
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
                                {lugar.value != "" && lugar.value.includes("Deposito") || lugar.value.includes("TC") ?
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label  text-md-end ">
                                            {lugar.value != "" && lugar.value.includes("Deposito") ? "N° Transacción" : ""}
                                            {lugar.value != "" && lugar.value.includes("TC") ? "N° Lote" : ""}
                                        </label>
                                        <div className="col-sm-8">
                                            <div className=" input-group">
                                                <input className="form-control"
                                                    name="asunto"
                                                    value={datos.asunto}
                                                    onChange={(e: any) => handelChange(e.target)}
                                                />
                                            </div>
                                            <span className="font-weight-light"></span>
                                        </div>
                                    </div> : ""}
                            </div>
                            <div className="col-lg-6 mb-3">
                                {lugar.value.includes("Deposito") ? <div className="form-group row mb-3">
                                    <label className="col-sm-4  col-form-label text-md-end">Banco</label>
                                    <div className="col-12 col-lg-8">
                                        <div className="">
                                            <Selectopction
                                                name="Banco"
                                                options={[
                                                    { value: "", label: "" },
                                                    { value: "Q9pdBBVzt6yqd8KE", label: "CTA CTE BCO PICHINCHA 2100106995 COMPUTECNICS" },
                                                    { value: "vj6e9QgXc3DneWBV", label: "CTA CTE BCO PRUBANCO 1058194005 COMPUTECNICS" },
                                                    { value: "5gQbWnq5S9V3a6w2", label: "CTA CTE BCO GUAYAQUIL 18018624 COMPUTECNICS" },
                                                    { value: "xGge0VLoTopvbADR", label: "CTA CTE BCO PACIFICO 8069530 COMPUTECNICS" },
                                                ]}
                                                value={banco.value}
                                                placeholder="Banco "
                                                onChange={setBanco}
                                            />
                                        </div>
                                    </div>
                                </div> : ""}
                                <div className="form-group row mt-3">
                                    <label className="col-sm-4  col-form-label text-md-end">Total a pagar</label>
                                    <div className="col-12 col-lg-8">
                                        <div className=" input-group">
                                            <input className="form-control"
                                                name="valor"
                                                value={total}
                                                onChange={handelChangeT}
                                            />
                                            <button className=" btn-primary p-2  btn-sm"
                                                onClick={RegistrarPago}
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
                                            onChange={(e: any) => handelChange(e.target)}>

                                        </textarea>
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