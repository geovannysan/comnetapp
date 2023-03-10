import { IonContent, useIonLoading, useIonToast } from "@ionic/react";
import { getPlatforms } from "@ionic/react";
import { useEffect, useState } from "react";
import { autenticar, CreaLaFacturapor, Facturaid, MostrarFacturas } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";
import Selectopction from "../../components/Selectshear";
import InputViews from "../../components/Input";
import { BuscaclienteContifico, BuscarProductoContific, Creafactura, CreaProducto, CrearClienteContifico, IncremetoFacturaS, PagoFacturacomnet } from "../../utils/Contifico";
import * as $ from "jquery"
import { useHistory } from "react-router";
export default function InformeViews() {
    const [present] = useIonToast();
    const [list, seTlist] = useState([])
    const [singleSelect, setSingleSelect] = useState({ value: "", label: "", });
    const [lugar, setLugar] = useState({ value: "", label: "" })
    // { value: "Q9pdBBVzt6yqd8KE", label: "CTA CTE BCO PICHINCHA 2100106995 COMPUTECNICS" },
    let history = useHistory()
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
    const handelChange = (e) => {
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
        correo: "",
        direccion_principal: "",
        movil: "",
        facturacion: {
            facturas_nopagadas: 0,
            total_facturas: "0000"
        },
        servicios: []
    })
    let [factura, setFactura] = useState({ urlpdf: "" })
    let [cedula, setCedul] = useState("")
    let [total, settotal] = useState("")
    let [descri, setDescrip] = useState({
        items: []
    })
    let [totalcon, setValor] = useState({
        total: 0,
        estado: "",
        id: "",
    })
    function handelChangeT(e) {
        settotal(e.target.value)

    }
    function lugarchange(e) {
        setLugar(e)
        settotal(e.label ? e.label.split(" ")[1].replace("(", "").replace(")", "") : "")
        console.log(e)
    }
    /** Verificar la cuenta a pagar con el producto contifico (crea producto contifico de ser nesesario)  */
    function comprobante(e) {
        setSingleSelect(e)
        if (e.value != "") {
            Facturaid(e.value).then(ouput => {
                console.log(ouput)
                if (ouput.estado === "exito") {
                    setFactura({
                        ...ouput.factura
                    })
                    setDescrip({ items: ouput.items })
                    settotal(ouput.factura.total)
                    console.log(totalcon.total.toFixed(2), parseFloat(ouput.factura.total).toFixed(2))
                    console.log(totalcon.estado != "A" && (totalcon.total.toFixed(2) === parseFloat(ouput.factura.total).toFixed(2)))
                    if ( totalcon.total.toFixed(2) != parseFloat(ouput.factura.total).toFixed(2)) {
                        CreaProducto({
                            "codigo_barra": null,
                            "porcentaje_iva": "12",
                            "categoria_id": "91qdGvZgXhY6nbN8",
                            "pvp1": parseFloat(ouput.factura.total).toFixed(2),
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
    let [presentlo, dismiss] = useIonLoading()
    let [contifico, setContifico] = useState([])

    /** regsitra clinete obtine cliente porta y contifico obtiene productos contifico*/
    function buscar() {
        if (cedula.trim().length < 7) {
            return
        }
        presentlo({
            message: 'Busacando Cliente en el Portal ',
            cssClass: 'custom-loading'
        })
        autenticar(cedula.trim()).then(ouput => {
            console.log(ouput)
            if (ouput.estado === "exito") {
                seTlist([])
                setSingleSelect({ value: "", label: "" })
                dismiss()
                presentlo({
                    message: 'Busacando Cliente en Contifico ',
                    cssClass: 'custom-loading'
                })
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
                        console.log(datos)
                        dismiss()
                        presentlo({
                            message: 'Creando Cliente en Contifico ',
                            cssClass: 'custom-loading'
                        })
                        CrearClienteContifico(datos).then(crea => {

                            //mostrar mensaje de registro
                            //  console.log(e)
                            if (Object.keys(crea).length > 1) {
                                dismiss()
                                setContifico([crea])
                                presentlo({
                                    message: 'Busacndo facturas inpagas ',
                                    cssClass: 'custom-loading'
                                })
                                MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                    if (ouput.estado === "exito") {
                                        dismiss()

                                        console.log(ouput)
                                        let datos = ouput.facturas.map((el, index) => {
                                            return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                        })
                                        datos.unshift({ value: "", label: "Selecione Factura" })
                                        seTlist(datos)
                                        //setSingleSelect({ value: "", label: "Selecione Factura" })
                                        comprobante({ value: "", label: "Selecione Factura" })
                                    } else {
                                        dismiss()
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    dismiss()
                                    present({
                                        message: "Hubo un error inesperado",
                                        cssClass: '',
                                         duration: 4500,
                                        position: "middle",
                                        buttons: [
                                            {
                                                text: "cerrar",
                                                role: "cancel",

                                            }
                                        ]
                                    })
                                })
                            } else {
                                dismiss()
                                present({
                                    message: "Erro No se creo cliente contifico",
                                    cssClass: '',
                                     duration: 4500,
                                    position: "middle",
                                    buttons: [
                                        {
                                            text: "cerrar",
                                            role: "cancel",

                                        }
                                    ]
                                })
                            }
                        }).catch(err => {
                            dismiss()
                            present({
                                message: "Hubo un error inesperado al crear cliente contifico",
                                cssClass: '',
                                 duration: 4500,
                                position: "middle",
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
                        console.log(ouput)
                        if (ouput.datos[0].servicios == undefined) {
                            dismiss()
                            present({
                                message: "Este usuario no tiene servicio registrado en el Perfil",
                                cssClass: '',
                                 duration: 4500,
                                position: "middle",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",
                                    }
                                ]
                            })
                            return
                        }
                        setContifico(ouputs)
                        dismiss()
                        presentlo({
                            message: 'Busacando Producto en Contifico ',
                            cssClass: 'custom-loading'
                        })
                        BuscarProductoContific(ouput.datos[0].servicios[0].idperfil).then(salida => {
                            if (salida.length > 0) {
                                let estado = salida[0].estado;
                                let valor = parseFloat(salida[0].pvp1) * 1.12;
                                if (estado == "A") {
                                    setValor({
                                        total: valor,
                                        estado: estado,
                                        id: salida[0].id,
                                    })
                                    dismiss()
                                    presentlo({
                                        message: 'Busacando Facturas por pagar',
                                        cssClass: 'custom-loading'
                                    })
                                    MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                        if (ouput.estado === "exito") {
                                            dismiss()
                                            console.log(ouput)
                                            let datos = ouput.facturas.map((el, index) => {
                                                return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                            })
                                            datos.unshift({ value: "", label: "Selecione Factura" })
                                            seTlist(datos)
                                            comprobante({ value: "", label: "Selecione Factura" })
                                        }else{
                                            dismiss()
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                        dismiss()
                                        present({
                                            message: "Hubo un error inesperado",
                                            cssClass: '',
                                             duration: 4500,
                                            position: "middle",
                                            buttons: [
                                                {
                                                    text: "cerrar",
                                                    role: "cancel",

                                                }
                                            ]
                                        })
                                    })
                                }
                                console.log(salida)
                                return
                            }
                            dismiss()
                            presentlo({
                                message: 'No se encontro Producto Contifico ',
                                cssClass: 'custom-loading'
                            })

                        }).catch(err => {
                            console.log(err)
                            dismiss()
                            present({
                                message: "Hubo un error inesperado al Buscar Producto Contifico",
                                cssClass: '',
                                 duration: 4500,
                                position: "middle",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",
                                    }
                                ]
                            })
                        })
                        // ouput.datos[0].servicios == undefined ? seTlist([{ value: "", label: "Selecione Factura" }]) :

                    }
                }).catch(err => {
                    console.log(err)
                    dismiss()
                    present({
                        message: "Hubo un error inesperado",
                        cssClass: '',
                         duration: 4500,
                        position: "middle",
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
                        movil: ouput.datos[0].movil,
                        direccion_principal: ouput.datos[0].direccion_principal,
                        correo: ouput.datos[0].correo,
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
                        movil: ouput.datos[0].movil,
                        direccion_principal: ouput.datos[0].direccion_principal,
                        correo: ouput.datos[0].correo,
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
                        movil: ouput.datos[0].movil,
                        direccion_principal: ouput.datos[0].direccion_principal,
                        correo: ouput.datos[0].correo,
                        facturacion: {
                            ...ouput.datos[0].facturacion
                        }
                        , servicios: ouput.datos[0].servicios
                    }

                    setUser({ ...datos })
                }
            }
            if (ouput.estado === "error") {
                dismiss()
                present({
                    message: ouput.mensaje,
                    cssClass: '-danger',
                     duration: 4500,
                    position: "middle",
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
                    movil: "",
                    direccion_principal: "",
                    correo: "",
                    facturacion: {
                        facturas_nopagadas: 0,
                        total_facturas: "0000"
                    }
                    , servicios: []
                })
            }
        }).catch(err => {
            /* dismiss()
             present({
                 message: err,
                 cssClass: '-danger',
                  duration: 4500,
                 position: "middle",
                 buttons: [
                     {
                         text: "cerrar",
                         role: "cancel",
 
                     }
                 ]
             });*/
            //console.log(err)
        })
    }
    function FormaPago() {
        if (lugar.value.includes("Efectivo")) {
            return ""
        }
        if (lugar.value.includes("TC-Oficina")) {
            return ""
        }
        if (lugar.value.includes("Deposito")) {
            return "TRA"
        }
    }
    /** registra factura en portal obtiene numero incremento crea factura contifico */
    function RegistrarPago() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        console.log(cedula, total, lugar.value, banco.value, singleSelect.value)
        //console.log()

        /*setTimeout(function(){
            dismiss();
        },3000)*/
        if (false) return
        if (lugar.label.includes("Deposito")) {
            console.log(banco.value)
            if (datos.asunto.trim().length == 0 && banco.label.trim() == "") {
                present({
                    message: "Ingrese número de comprobante o seleccione cuenta",
                    cssClass: '-',
                     duration: 4500,
                    position: "middle",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",
                        }
                    ]
                })
            }
            else {
                presentlo({
                    message: 'Pagando Factura en portal ',
                    cssClass: 'custom-loading'
                })
                console.log(datos.asunto, datos.mensaje)
                let datosdefactura = {
                    "token": "ejdGNmVseFZtd1NIczE5eTBhQy9xZz09",
                    "idfactura": singleSelect.value,
                    "pasarela": "" + lugar.value,
                    "cantidad": total,
                    "idtransaccion": datos.asunto,
                    "nota": banco.label + "/" + datos.mensaje
                }

                //  console.log(datosdefactura,fac)
                PagoFacturacomnet(datosdefactura).then(fact => {
                    console.log(fact)
                   
                    if (fact.estado == "exito") {
                        dismiss()
                        presentlo({
                            message: 'Agregando numero de Factura',
                            cssClass: 'custom-loading'
                        })
                        IncremetoFacturaS().then(num => {
                            if (num.status) {
                                dismiss()
                                let facnum = num.result[0].contadores
                                let fac = {
                                    "pos": "4511aa3d-fce0-4441-a3e1-0961bd3357af",
                                      "fecha_emision":formattedToday,
                                    "tipo_documento": "FAC",
                                    "documento": "001-001-00000" + facnum,
                                    "estado": "G",
                                    "electronico": true,
                                    "autorizacion": null,
                                    "caja_id": null,
                                    "cliente": {
                                        "ruc": null,
                                        "cedula": usuario.cedula,
                                        "razon_social": usuario.nombre,
                                        "telefonos": usuario.movil,
                                        "direccion": usuario.direccion_principal,
                                        "tipo": "N",
                                        "email": usuario.correo,
                                        "es_extranjero": false
                                    },
                                    "vendedor": {
                                        "ruc": "0992782129001",
                                        "razon_social": "COMPUTECNICSNET S.A",
                                        "telefonos": "5104910",
                                        "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
                                        "tipo": "J",
                                        "email": "facturacion@speed.ec",
                                        "es_extranjero": false
                                    },
                                    //contifico[0].
                                    "descripcion": descri.items[0]["descrp"],
                                    "subtotal_0": 0,
                                    "subtotal_12": (totalcon.total) / 1.12,
                                    "iva": (totalcon.total * 0.12).toFixed(2),
                                    "total": totalcon.total.toFixed(2),
                                    "detalles": [
                                        {
                                            "producto_id": totalcon.id,
                                            "cantidad": 1,
                                            "precio": (totalcon.total) / 1.12,
                                            "porcentaje_iva": 12,
                                            "porcentaje_descuento": 0,
                                            "base_cero": 0,
                                            "base_gravable": (totalcon.total) / 1.12,
                                            "base_no_gravable": 0
                                        }
                                    ],
                                    "cobros": [
                                        {
                                            "forma_cobro": lugar.value.split("-")[0],
                                            "monto": totalcon.total.toFixed(2),
                                            "cuenta_bancaria_id": banco.value,
                                            "numero_comprobante": datos.asunto,
                                            "fecha":formattedToday,
                                        }
                                    ]
                                }
                                presentlo({
                                    message: "Creando factura Contifico"
                                })
                                CreaLaFacturapor(fac).then(salida => {
                                    console.log(salida)
                                    let fat = "001-001-00000" + facnum
                                    if (salida.documento === fat){
                                    dismiss()
                                    present({
                                        
                                        message:  "Factura número001-001-00000" + facnum+" creada con éxito",
                                        cssClass: '-',
                                         duration: 4500,
                                        position: "middle",
                                        buttons: [
                                            {
                                                text: "cerrar",
                                                role: "cancel",
                                            }
                                        ]
                                    })
                                    setTimeout(function(){
                                          window.location.reload()
                                      },3000)
                                }
                                }).catch(error => {
                                    console.log(error)
                                    present({
                                        message: "Hubo un error no se Genero Factura en Contifico",
                                        cssClass: '-',
                                         duration: 4500,
                                        position: "middle",
                                        buttons: [
                                            {
                                                text: "cerrar",
                                                role: "cancel",
                                            }
                                        ]
                                    })
                                })
                            } else {
                                dismiss()
                                present({
                                    message: "No se Genero el numero incremental de la factura",
                                    cssClass: '-',
                                     duration: 4500,
                                    position: "middle",
                                    buttons: [
                                        {
                                            text: "cerrar",
                                            role: "cancel",
                                        }
                                    ]
                                })

                            }
                        }).catch(err => {
                            console.log(err)
                            dismiss()
                            present({
                                message: "No se Genero el numero incremental de la factura",
                                cssClass: '-',
                                 duration: 4500,
                                position: "middle",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",
                                    }
                                ]
                            })
                        })
                        //crea factura

                    }
                    if (fact.estado == "error") {
                        //muestra mensaje de errror
                        dismiss()
                        present({
                            message: fact.mensaje,
                            cssClass: '-',
                             duration: 4500,
                            position: "middle",
                            buttons: [
                                {
                                    text: "cerrar",
                                    role: "cancel",
                                }
                            ]
                        })
                        console.log(fact)
                    }
                }).catch(err => {
                    dismiss()
                    console.log(err)
                })


            }

        }
        if (lugar.label.includes("TARJETA")) {
            if (datos.asunto.trim().length == 0 && banco.label.trim() == "") {
                present({
                    message: "Ingrese número de Autorización",
                    cssClass: '-',
                     duration: 4500,
                    position: "middle",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",

                        }
                    ]
                })
            }
            let datosdefactura = {
                "token": "ejdGNmVseFZtd1NIczE5eTBhQy9xZz09",
                "idfactura": singleSelect.value,
                "pasarela": "" + lugar.value,
                "cantidad": total,
                "idtransaccion": datos.asunto,
                "nota": banco.label + "/" + datos.mensaje
            }
            presentlo({
                message: 'Registrando factura en el portal',
                cssClass: 'custom-loading'
            })
            PagoFacturacomnet(datosdefactura).then(fact => {
                if (fact.estado == "exito") {
                    presentlo({
                        message: 'Obteniendo número factura',
                        cssClass: 'custom-loading'
                    })
                    IncremetoFacturaS().then(num => {
                        if (!num.status) {
                            dismiss()
                            present({
                                message: "No se Genero el número incremental de la factura",
                                cssClass: '-',
                                 duration: 4500,
                                position: "middle",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",
                                    }
                                ]
                            })

                            return;
                        }
                        let facnum = num.result[0].contadores
                        let fac = {
                            "pos": "4511aa3d-fce0-4441-a3e1-0961bd3357af",
                              "fecha_emision":formattedToday,
                            "tipo_documento": "FAC",
                            "documento": "001-001-00000" + facnum,
                            "estado": "G",
                            "electronico": true,
                            "autorizacion": null,
                            "caja_id": null,
                            "cliente": {
                                "ruc": null,
                                "cedula": usuario.cedula,
                                "razon_social": usuario.nombre,
                                "telefonos": usuario.movil,
                                "direccion": usuario.direccion_principal,
                                "tipo": "N",
                                "email": usuario.correo,
                                "es_extranjero": false
                            },
                            "vendedor": {
                                "ruc": "0992782129001",
                                "razon_social": "COMPUTECNICSNET S.A",
                                "telefonos": "5104910",
                                "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
                                "tipo": "J",
                                "email": "facturacion@speed.ec",
                                "es_extranjero": false
                            },
                            //contifico[0].
                            "descripcion": descri.items[0]["descrp"],
                            "subtotal_0": 0,
                            "subtotal_12": (totalcon.total) / 1.12,
                            "iva": (totalcon.total * 0.12).toFixed(2),
                            "total": totalcon.total.toFixed(2),
                            "detalles": [
                                {
                                    "producto_id": totalcon.id,
                                    "cantidad": 1,
                                    "precio": (totalcon.total) / 1.12,
                                    "porcentaje_iva": 12,
                                    "porcentaje_descuento": 0,
                                    "base_cero": 0,
                                    "base_gravable": (totalcon.total) / 1.12,
                                    "base_no_gravable": 0
                                }
                            ],
                            "cobros": [
                                {
                                    "forma_cobro": lugar.value.split("-")[0],
                                    "monto": totalcon.total.toFixed(2),
                                    "tipo_ping": "D",
                                    "fecha":formattedToday,
                                }
                            ]
                        }
                        dismiss()
                        presentlo({
                            message: 'Creando factura electrónica',
                            cssClass: 'custom-loading'
                        })
                        CreaLaFacturapor(fac).then(salida => {
                            //dismiss()
                            let fat = "001-001-00000" + facnum
                            console.log(salida)
                            if (salida.documento === fat) {
                                dismiss()
                                present({
                                    message:  "Factura número001-001-00000" + facnum+" creada con éxito",
                                    cssClass: '-',
                                     duration: 4500,
                                    position: "middle",
                                    buttons: [
                                        {
                                            text: "cerrar",
                                            role: "cancel",
                                        }
                                    ]
                                })
                                setTimeout(function(){
                                          window.location.reload()
                                      },3000)
                            }
                            console.log(salida)
                        }).catch(error => {
                            dismiss()
                            present({
                                message: "Hubo un error no se registro la factura electrónica",
                                cssClass: '-',
                                 duration: 4500,
                                position: "middle",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",
                                    }
                                ]
                            })
                            console.log(error)

                        })
                    }).catch(err => {
                        console.log(err)

                    })

                }
            }).catch(err => {
                dismiss()
                present({
                    message: "Hubo un error al registrar la factura en el portal",
                    cssClass: '-',
                     duration: 4500,
                    position: "middle",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",
                        }
                    ]
                })
                console.log(err)
            })

            //console.log(datosdefactura, fac)
        }
        if (lugar.label.includes("Efectivo")) {
            let datosdefactura = {
                "token": "ejdGNmVseFZtd1NIczE5eTBhQy9xZz09",
                "idfactura": singleSelect.value,
                "pasarela": "" + lugar.value,
                "cantidad": total,
                "idtransaccion": datos.asunto,
                "nota": banco.label + "/" + datos.mensaje
            }
            presentlo({
                message: 'Registrando factura',
                cssClass: 'custom-loading'
            })
            PagoFacturacomnet(datosdefactura).then(fact => {
                if (fact.estado == "exito") {
                    /*  $.get("demo.asp", function (data, status) {
                          alert("Data: " + data + "\nStatus: " + status);
                      });*/
                    presentlo({
                        message: 'Obteniendo numero de factura ',
                        cssClass: 'custom-loading'
                    })
                    $.ajax({
                        type: "post",
                        url: "https://portalfac.netbot.ec/incrementov.php",
                        success: function (num) {
                            if (num.status) {
                                console.log(num)
                                if (!num.status) {
                                    dismiss()
                                    present({
                                        message: "No se Genero el número incremental de la factura",
                                        cssClass: '-',
                                         duration: 4500,
                                        position: "middle",
                                        buttons: [
                                            {
                                                text: "cerrar",
                                                role: "cancel",
                                            }
                                        ]
                                    })

                                    return;
                                }
                                presentlo({
                                    message: 'Creando Factura Electrónica ',
                                    cssClass: 'custom-loading'
                                })
                                let facnum = num.result[0].contadores
                                let fac = {
                                    "pos": "4511aa3d-fce0-4441-a3e1-0961bd3357af",
                                      "fecha_emision":formattedToday,
                                    "tipo_documento": "FAC",
                                    "documento": "001-001-00000" + facnum,
                                    "estado": "G",
                                    "electronico": true,
                                    "autorizacion": null,
                                    "caja_id": null,
                                    "cliente": {
                                        "ruc": null,
                                        "cedula": usuario.cedula,
                                        "razon_social": usuario.nombre,
                                        "telefonos": usuario.movil,
                                        "direccion": usuario.direccion_principal,
                                        "tipo": "N",
                                        "email": usuario.correo,
                                        "es_extranjero": false
                                    },
                                    "vendedor": {
                                        "ruc": "0992782129001",
                                        "razon_social": "COMPUTECNICSNET S.A",
                                        "telefonos": "5104910",
                                        "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
                                        "tipo": "J",
                                        "email": "facturacion@speed.ec",
                                        "es_extranjero": false
                                    },
                                    "descripcion": descri.items[0]["descrp"],
                                    "subtotal_0": 0,
                                    "subtotal_12": (totalcon.total) / 1.12,
                                    "iva": (totalcon.total * 0.12).toFixed(2),
                                    "total": totalcon.total.toFixed(2),
                                    "detalles": [
                                        {
                                            "producto_id": totalcon.id,
                                            "cantidad": 1,
                                            "precio": (totalcon.total) / 1.12,
                                            "porcentaje_iva": 12,
                                            "porcentaje_descuento": 0,
                                            "base_cero": 0,
                                            "base_gravable": (totalcon.total) / 1.12,
                                            "base_no_gravable": 0
                                        }
                                    ],
                                    "cobros": [
                                        {
                                            "forma_cobro": lugar.value.split("-")[0],
                                            "monto": totalcon.total.toFixed(2),
                                            "fecha":formattedToday,
                                        }
                                    ]
                                }
                                console.log(facnum, fac)
                                var myHeaders = new Headers();
                                myHeaders.append("Authorization", "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w");
                                myHeaders.append("Content-Type", "application/json");
                                var requestOptions = {
                                    method: 'GET',
                                    headers: myHeaders,
                                    body: JSON.stringify(fac),
                                    redirect: 'follow'
                                };
                                
                                CreaLaFacturapor(fac).then(salida => {
                                    dismiss()
                                    let fat = "001-001-00000" + facnum
                                    console.log(salida)
                                    if (salida.documento === fat) {
                                        dismiss()
                                        present({
                                            message:  "Factura número001-001-00000" + facnum+" creada con éxito",
                                            cssClass: '-',
                                             duration: 4500,
                                            position: "middle",
                                            buttons: [
                                                {
                                                    text: "cerrar",
                                                    role: "cancel",
                                                }
                                            ]
                                        })
                                      setTimeout(function(){
                                          window.location.reload()
                                      },3000)
                                      

                                    }
                                    console.log(salida)
                                   // sessionStorage.setItem("facturas", JSON.stringify(salida))
                                }).catch(error => {
                                    dismiss()
                                    present({
                                        message: "Hubo un error no se genero la factura Electrónica",
                                        cssClass: '-',
                                         duration: 4500,
                                        position: "middle",
                                        buttons: [
                                            {
                                                text: "cerrar",
                                                role: "cancel",
                                            }
                                        ]
                                    })
                                    console.log(error)
                                })
                                /* fetch("https://api.contifico.com/sistema/api/v1/documento/", requestOptions)
                                              .then(response => response.text())
                                              .then(result => console.log(result))
                                              .catch(error => {console.log('error', error)
                                                  
                                          });*/
                                /* CreaLaFacturapor(fac).then(salida => {
                                     dismiss()
                                     console.log(salida)
                                 }).catch(error => {
                                     dismiss()
                                     console.log(error)
                                 })*/

                                console.log(num)
                                // console.log(datos)  (async () => {

                                console.log(datos)
                            }

                            else {
                                console.log(num)
                            }
                        },
                        error: function (error) {
                            dismiss()
                            present({
                                message: "No se Genero el Numero de Factura",
                                cssClass: '-',
                                 duration: 4500,
                                position: "middle",
                                buttons: [
                                    {
                                        text: "cerrar",
                                        role: "cancel",
                                    }
                                ]
                            })
                            console.log(error)

                        }
                    })
                    /* IncremetoFacturaS().then(num => {
                     }).catch(err => {
                         console.log(err)
                     })*/

                }
            }).catch(err => {
                dismiss()
                present({
                    message: "Erro al crear Factura en portal",
                    cssClass: '-',
                     duration: 4500,
                    position: "middle",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",
                        }
                    ]
                })
                console.log(err)
            })

            //  console.log(datosdefactura, fac)
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
                                        {list.length > 0 ? <Selectopction
                                            name="factura"
                                            options={list}
                                            value={singleSelect}
                                            placeholder="Factura"
                                            onChange={(e) => comprobante(e)}
                                        /> : ""}
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
                                                { value: "EF-Oficina/Matriz", label: "Efectivo Oficina/Matriz" },
                                                { value: "EF-Oficina/Ecocity", label: "Efectivo Oficina/Ecocity" },
                                                { value: "TC-Oficina/Matriz", label: "TARJETA Oficina/Matriz" },
                                                { value: "TC-Oficina/Ecocity", label: "TARJETA Oficina/Ecocity" },
                                                { value: "TRA-Oficina/Matriz", label: "Deposito Oficina/Matriz" },
                                                { value: "TRA-Oficina/Ecocity", label: "Deposito Oficina/Ecocity" }
                                            ]}
                                            value={lugar}
                                            placeholder="Forma"
                                            onChange={setLugar}
                                        />
                                        <span className="font-weight-light"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                {lugar.value != "" && lugar.value.includes("TRA") || lugar.value.includes("TC") ?
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label  text-md-end ">
                                            {lugar.value != "" && lugar.value.includes("TRA") ? "N° Transacción" : ""}
                                            {lugar.value != "" && lugar.value.includes("TC") ? "N° Autorización" : ""}
                                        </label>
                                        <div className="col-sm-8">
                                            <div className=" input-group">
                                                <input className="form-control"
                                                    name="asunto"
                                                    value={datos.asunto}
                                                    onChange={(e) => handelChange(e.target)}
                                                />
                                            </div>
                                            <span className="font-weight-light"></span>
                                        </div>
                                    </div> : ""}
                            </div>
                            <div className="col-lg-6 mb-3">
                                {lugar.value.includes("TRA") ? <div className="form-group row mb-3">
                                    <label className="col-sm-4  col-form-label text-md-end">Banco</label>
                                    <div className="col-12 col-lg-8">
                                        <div className="">
                                            <Selectopction
                                                name="Banco"
                                                options={[
                                                    { value: "", label: "" },

                                                    { value: "Q9pdBBVzt6yqd8KE", label: "CTA CTE BCO PICHINCHA 2100106995 COMPUTECNICS" },
                                                    { value: "vj6e9QgXc3DneWBV", label: "CTA CTE BCO PRODUBANCO 1058194005 COMPUTECNICS" },
                                                    { value: "5gQbWnq5S9V3a6w2", label: "CTA CTE BCO GUAYAQUIL 18018624 COMPUTECNICS" },
                                                    { value: "xGge0VLoTopvbADR", label: "CTA CTE BCO PACIFICO 8069530 COMPUTECNICS" },
                                                ]}
                                                value={banco}
                                                placeholder="Banco"
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
                                            onChange={(e) => handelChange(e.target)}>

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