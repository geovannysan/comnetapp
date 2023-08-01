import { IonContent, useIonLoading, useIonToast } from "@ionic/react";
import { getPlatforms } from "@ionic/react";
import { useEffect, useState } from "react";
import { autenticar, CreaLaFacturapor, Facturaid, MostrarFacturas } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";
import Selectopction from "../../components/Selectshear";
import InputViews from "../../components/Input";
import { BuscaclienteContifico, BuscarProductoContific, Consultarcedula, Creafactura, CreaProducto, CrearClienteContifico, IncremetoCon, IncremetoFacturaS, PagoFacturacomnet } from "../../utils/Contifico";
import * as $ from "jquery"
import jsPDF from "jspdf"
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Mes } from "../../utils/variables";
export default function InformeViews() {
    const [present] = useIonToast();
    const [present2] = useIonToast();
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
    //  let nombres = useSelector((state) => state.usuario)
    let nombres = userlog()
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
        factura: "",
        items: []
    })
    function creaComprobante() {
        // console.log(usuario,descri)
        const result2 = new Date().toLocaleString('en-GB', {
            hour12: false,
        });
        const hoy = new Date(descri.factura.vencimiento).getMonth()

        var opciones = {
            orientation: 'p',
            unit: 'mm',
            format: [240, 400]
        };

        var doc = new jsPDF(opciones);
        let pagnum = 80
        doc.setFontSize(7);
        doc.text(3, 3, 'COMNET - SPEED - T-ICKETS (COMPUTECNICSNET');
        doc.text(18, 8, '                S.A.)');
        doc.text(20, 12, 'RUC 092782129001');
        doc.text(15, 15, 'Edifico City Officce Oficina 310');
        doc.text(3, 18, 'Fecha:' + result2);
        doc.text(3, 21, '*******************************************************************');
        doc.text(25, 23, 'DESCRIPCIÓN');
        doc.text(3, 26, '*******************************************************************');
        doc.text(3, 29, "Servicio de intennet");
        doc.text(3, 34, "Plan internet :" + usuario.servicios[0]["perfil"]);
        doc.text(3, 38, "facturación del " + descri.factura.emitido + " " + descri.factura.vencimiento);

        doc.text(3, 43, "Mes: " + Mes[hoy]);
        doc.text(3, 49, "*******************************************************************");
        doc.text(35, 54, "DESCUENTO $0.00");
        doc.text(40, 58, "TOTAL: " + descri.items[0]["total2"]);
        doc.text(40, 62, "SALDO: $0.00");
        doc.text(3, 65, "*******************************************************************");
        doc.text(20, 69, "CLIENTE")
        doc.text(3, 73, "" + usuario.nombre)
        doc.text(3, 76, "" + usuario.direccion_principal)
        doc.text(3, 79, "" + usuario.cedula.trim())
        doc.text(3, 84, "Fecha corte: " + descri.factura.emitido)
        doc.text(3, 88, "*******************************************************************");
        doc.text(3, 94, "Operador " + nombres.usuario);
        doc.text(3, 98, "Impresión:" + result2);
        doc.text(3, 105, "______________________________________________");



        // doc.text(3, 32, descri.items[0]["descrp"])
        /*  doc.text(3, 25, 'Fecha Registro');
          doc.text(3, 30, '_______________________________');
          doc.text(3, 80, 'Recibí conforme');
          doc.text(3, 85, 'Concierto       LOC	CANT.');
         /* JSON.parse(nombres.info_concierto).map(e => {
              doc.text(10, pagnum + 5, "" + LocalidadPrecio(e.idespaciolocalida, e.id_localidad) + "       " + parseInt(e.cantidad) * parseFloat(ListarPrecio(e.idespaciolocalida, e.id_localidad))
              );
          })*/




        // doc.save('comprobante.pdf');
        //doc.autoPrint();

        doc.output('dataurlnewwindow');
    }
    let [totalcon, setValor] = useState({
        total: 0,
        estado: "",
        id: "",
    })
    function handelChangeT(e) {
        settotal(e.target.value)

    }
    let [valorport, setValorportal] = useState("")
    function lugarchange(e) {
        setLugar(e)
        settotal(e.label ? e.label.split(" ")[1].replace("(", "").replace(")", "") : "")
        console.log(e)

    }
    /** Verificar la cuenta a pagar con el producto contifico (crea producto contifico de ser nesesario)  */
    function comprobante(e) {
        setSingleSelect(e)
        if (e.value != "") {
            presentlo({
                message: 'Validando valores de factura y producto',
                cssClass: 'custom-loading'
            })
            Facturaid(e.value).then(ouput => {
                console.log(ouput)
                if (ouput.estado === "exito") {
                    setFactura({
                        ...ouput.factura
                    })
                    setDescrip({ factura: { ...ouput.factura }, items: ouput.items })
                    settotal(ouput.factura.total)
                    console.log(totalcon.total.toFixed(2), parseFloat(ouput.factura.total).toFixed(2))
                    console.log((totalcon.total.toFixed(2) != parseFloat(ouput.factura.total).toFixed(2)))
                    console.log({
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
                    })
                    if(cedula.trim().length<10){
                        return
                    }
                    if (totalcon.total.toFixed(2) != parseFloat(ouput.factura.total).toFixed(2)) {
                        dismiss()
                        presentlo({
                            message: 'Creando producto en Contifico ',
                            cssClass: 'custom-loading'
                        })
                        IncremetoCon().then(salida => {
                            console.log(salida)
                            if (salida.status) {
                                let facnum = salida.result[0].contadores
                                CreaProducto({
                                    "pvp1": parseFloat(ouput.factura.subtotal).toFixed(2),
                                    "nombre": usuario.servicios[0]["perfil"],
                                    "codigo": facnum + "" + usuario.servicios[0]["idperfil"]
                                }).then(produ => {
                                    console.log(produ)
                                    /*if (produ.response.data.status != 200) {
                                        setimpri(true)
                                        dismiss()
                                        present({
                                            message: "El PRODUCTO no se creo en contifico" + produ.response.data["mensaje"],
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
                                    }*/
                                    console.log({
                                        "codigo_barra": null,
                                        "porcentaje_iva": "12",
                                        "categoria_id": "91qdGvZgXhY6nbN8",
                                        "pvp1": parseFloat(ouput.factura.subtotal).toFixed(2),
                                        "tipo": "SER",
                                        "para_supereasy": false,
                                        "para_comisariato": false,
                                        "minimo": "0.0",
                                        "descripcion": "Servicio de Internet Banda ancha",
                                        "nombre": usuario.servicios[0]["perfil"],
                                        "codigo": facnum + "" + usuario.servicios[0]["idperfil"],
                                        "estado": "A"
                                    })
                                    console.log(produ)
                                    let estado = produ.estado;
                                    let valor = parseFloat(produ.pvp1).toFixed(2) * 1.12;
                                    /* console.log({
                                         total: valor,
                                         estado: estado,
                                         id: JSON.parse(produ).id,
                                     })*/
                                    setValor({
                                        total: valor,
                                        estado: estado,
                                        id: produ.id,
                                    })
                                    dismiss()
                                }).catch(err => {
                                    console.log(err)
                                    present({
                                        message: "Hubo un error inesperado al crear producto contifico " + err.status,
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
                        }).catch(err => {
                            console.log(err)
                            present({
                                message: "Hubo un error inesperado al crear producto contifico no se creo" + err,
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
                        return
                    }
                    dismiss()
                }

            }).catch(err => {
                dismiss()
                present({
                    message: "Hubo un error" + err,
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
                console.log(err)
            })
        }
    }
    let [presentlo, dismiss] = useIonLoading()
    let [contifico, setContifico] = useState([])

    /** regsitra clinete obtine cliente porta y contifico obtiene productos contifico*/
    function buscar() {
        setBusca(true)
        if (cedula.trim().length < 10) {
            setBusca(false)
            presentlo({
                message: 'Busacando Clinete portal ',
                cssClass: 'custom-loading'
            })
            autenticar(cedula.trim()).then(ouput => {
                console.log(ouput)
                setimpri(false)
                if (ouput.estado === "exito") {
                    presentlo({
                        message: 'Busacando Facturas comnet',
                        cssClass: 'custom-loading'
                    })
                    seTlist([])
                    setSingleSelect({ value: "", label: "" })
                    let infor = ouput.datos.find(e => e.estado == "ACTIVO")
                    console.log(infor.id)
                    MostrarFacturas(infor.id).then(ouput => {
                        console.log(ouput)
                        if (ouput.estado === "exito") {
                            dismiss()
                            console.log(ouput)
                            let datos = ouput.facturas.map((el, index) => {
                                return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                            })
                            datos.unshift({ value: "", label: "Selecione Factura" })
                            seTlist(datos)
                            comprobante({ value: "", label: "Selecione Factura" })
                        } else {
                            dismiss()
                            present({
                                message: "No hay facturas pendientes",
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
                   
                    if (ouput.datos.length == 2) {
                        if (ouput.datos[1].estado === "ACTIVO") {
                            let datos = {
                                nombre: ouput.datos[1].nombre,
                                estado: ouput.datos[1].estado,
                                cedula: ouput.datos[1].cedula,
                                movil: ouput.datos[1].movil,
                                direccion_principal: ouput.datos[1].direccion_principal,
                                correo: ouput.datos[1].correo,
                                facturacion: {
                                    ...ouput.datos[1].facturacion
                                },
                                servicios: ouput.datos[1].servicios
                            }
                            setUser({ ...datos })
                        }

                        if (ouput.datos[1].estado === "SUSPENDIDO") {
                            let datos = {
                                nombre: ouput.datos[1].nombre,
                                estado: ouput.datos[1].estado,
                                cedula: ouput.datos[1].cedula,
                                movil: ouput.datos[1].movil,
                                direccion_principal: ouput.datos[1].direccion_principal,
                                correo: ouput.datos[1].correo,
                                facturacion: {
                                    ...ouput.datos[1].facturacion
                                },
                                servicios: ouput.datos[1].servicios
                            }
                            setUser({ ...datos })
                        }
                        if (ouput.datos.estado[1] === "RETIRADO") {
                            let datos = {
                                nombre: ouput.datos[1].nombre,
                                estado: ouput.datos[1].estado,
                                cedula: ouput.datos[1].cedula,
                                movil: ouput.datos[1].movil,
                                direccion_principal: ouput.datos[1].direccion_principal,
                                correo: ouput.datos[1].correo,
                                facturacion: {
                                    ...ouput.datos[1].facturacion
                                }
                                , servicios: ouput.datos[1].servicios
                            }

                            setUser({ ...datos })
                        }
                        return
                    }
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
                dismiss()
                present({
                    message: "Hubo un error" + err,
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
            return
        }
        setBusca(false)
        presentlo({
            message: 'Busacando Cliente en el Portal ',
            cssClass: 'custom-loading'
        })
        settotal("")
        autenticar(cedula.trim()).then(ouput => {
            console.log(ouput)
            setimpri(false)
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
                        let datos = ouput.datos[0].cedula.length==10? {
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

                        } : {
                            "tipo": "N",
                            "personaasociada_id": null,
                            "nombre_comercial": ouput.datos[0].nombre,
                            "telefonos": ouput.datos[0].movil,
                            "razon_social": ouput.datos[0].nombre,
                            "direccion": ouput.datos[0].direccion_principal,
                            "porcentaje_descuento": "0",
                            "es_cliente": true,
                            "origen": "Panel de Facturacion",
                                "cedula": ouput.datos[0].cedula,
                            "email": ouput.datos[0].correo,
                            "ruc": ouput.datos[0].cedula,
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
                            if (crea.response.status == 400) {
                                setimpri(true)
                                dismiss()
                                present({
                                    message: "El cliente no se creo en contifico" + crea.response.data["mensaje"],
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
                               
                                if (ouput.datos[0].cedula.length > 10){
                                    presentlo({
                                        message: 'Creando Cliente Juridico en Contifico ',
                                        cssClass: 'custom-loading'
                                    })
                                    CrearClienteContifico({
                                        "tipo": "J",
                                        "personaasociada_id": null,
                                        "nombre_comercial": ouput.datos[0].nombre,
                                        "telefonos": ouput.datos[0].movil,
                                        "razon_social": ouput.datos[0].nombre,
                                        "direccion": ouput.datos[0].direccion_principal,
                                        "porcentaje_descuento": "0",
                                        "es_cliente": true,
                                        "origen": "Panel de Facturacion",
                                        "cedula": "",
                                        "email": ouput.datos[0].correo,
                                        "ruc": ouput.datos[0].cedula,
                                        "Provincia": "Guayaquil",
                                        "adicional1_cliente": "Cliente de Internet"

                                    }).then(creas => {
                                        if (crea.response.status == 400) {
                                            setimpri(true)
                                            dismiss()
                                            present({
                                                message: "El cliente Juridico no se creo en contifico" + crea.response.data["mensaje"],
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
                                            return;
                                        }
                                        if (Object.keys(creas).length > 1) {
                                            dismiss()
                                            setContifico([creas])
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
                                        console.log(err)
                                    })
                                }
                                 
                            
                                return
                            }
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
                            console.log(err.response.data);
                            present({
                                message: "Hubo un error inesperado al crear cliente contifico no se creo" + err,
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
                        if (ouput.datos[1] != undefined && ouput.datos[1].servicios != undefined) {
                            setContifico(ouputs)
                            dismiss()
                            presentlo({
                                message: 'Busacando Producto en Contifico ',
                                cssClass: 'custom-loading'
                            })
                            let dato = ouput.datos
                            let info = ouput.datos.includes(e => e.estado = "Activo") ? dato.find(dato => dato.estado = "ACTIVO") : dato.find(dato => dato.estado = "SUSPENDIDO" && dato.servicios!= null)
                            console.log(ouput.datos)
                            console.log(info)
                            BuscarProductoContific(info.servicios[0].idperfil).then(salida => {
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
                                        MostrarFacturas(info.id).then(ouput => {
                                            if (ouput.estado === "exito") {
                                                dismiss()
                                                console.log(ouput)
                                                let datos = ouput.facturas.map((el, index) => {
                                                    return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                })
                                                datos.unshift({ value: "", label: "Selecione Factura" })
                                                seTlist(datos)
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
                                    }
                                    console.log(salida)
                                    return
                                }
                                dismiss()
                                presentlo({
                                    message: 'No se encontro Producto Contifico ',
                                    cssClass: 'custom-loading'
                                })
                                IncremetoCon().then(salida => {
                                    console.log(salida)
                                    if (salida.status) {
                                        let facnum = salida.result[0].contadores
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
                                            "codigo": facnum + "" + usuario.servicios[0]["idperfil"],
                                            "estado": "A"
                                        }).then(produ => {
                                            console.log(JSON.parse(produ))
                                            let estado = JSON.parse(produ).estado;
                                            let valor = parseFloat(JSON.parse(produ).pvp1) * 1.12;
                                            /* console.log({
                                                 total: valor,
                                                 estado: estado,
                                                 id: JSON.parse(produ).id,
                                             })*/
                                            setValor({
                                                total: valor,
                                                estado: estado,
                                                id: JSON.parse(produ).id,
                                            })
                                            dismiss()
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
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
                            return
                        }
                        if (ouput.datos[1] != undefined && ouput.datos[1].servicios != undefined) {
                            setContifico(ouputs)
                            dismiss()
                            presentlo({
                                message: 'Busacando Producto en Contifico ',
                                cssClass: 'custom-loading'
                            })
                            BuscarProductoContific(ouput.datos[1].servicios[0].idperfil).then(salida => {
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
                                        MostrarFacturas(ouput.datos[1].id).then(ouput => {
                                            if (ouput.estado === "exito") {
                                                dismiss()
                                                console.log(ouput)
                                                let datos = ouput.facturas.map((el, index) => {
                                                    return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                })
                                                datos.unshift({ value: "", label: "Selecione Factura" })
                                                seTlist(datos)
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
                                    }
                                    console.log(salida)
                                    return
                                }
                                IncremetoCon().then(salida => {
                                    console.log(salida)
                                    if (salida.status) {
                                        let facnum = salida.result[0].contadores
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
                                            "codigo": facnum + "" + usuario.servicios[0]["idperfil"],
                                            "estado": "A"
                                        }).then(produ => {
                                            console.log(JSON.parse(produ))
                                            let estado = JSON.parse(produ).estado;
                                            let valor = parseFloat(JSON.parse(produ).pvp1) * 1.12;
                                            /* console.log({
                                                 total: valor,
                                                 estado: estado,
                                                 id: JSON.parse(produ).id,
                                             })*/
                                            setValor({
                                                total: valor,
                                                estado: estado,
                                                id: JSON.parse(produ).id,
                                            })
                                            dismiss()
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
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
                            return
                        }
                        if (ouput.datos[0].servicios != undefined) {
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
                                            console.log(ouput)
                                            if (ouput.estado === "exito") {
                                                dismiss()
                                                console.log(ouput)
                                                let datos = ouput.facturas.map((el, index) => {
                                                    return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                })
                                                datos.unshift({ value: "", label: "Selecione Factura" })
                                                seTlist(datos)
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
                                    }
                                    console.log(salida)
                                    return
                                }
                                dismiss()
                                presentlo({
                                    message: 'No se encontro Producto Contifico ',
                                    cssClass: 'custom-loading'
                                })
                                IncremetoCon().then(salida => {
                                    console.log(salida)
                                    if (salida.status) {
                                        let facnum = salida.result[0].contadores
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
                                            "codigo": facnum + "" + usuario.servicios[0]["idperfil"],
                                            "estado": "A"
                                        }).then(produ => {
                                            console.log(JSON.parse(produ))
                                            let estado = JSON.parse(produ).estado;
                                            let valor = parseFloat(JSON.parse(produ).pvp1) * 1.12;
                                            /* console.log({
                                                 total: valor,
                                                 estado: estado,
                                                 id: JSON.parse(produ).id,
                                             })*/
                                            setValor({
                                                total: valor,
                                                estado: estado,
                                                id: JSON.parse(produ).id,
                                            })
                                            dismiss()
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
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
                        }
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
                if (ouput.datos.length == 2) {
                    if (ouput.datos[1].estado === "ACTIVO") {
                        let datos = {
                            nombre: ouput.datos[1].nombre,
                            estado: ouput.datos[1].estado,
                            cedula: ouput.datos[1].cedula,
                            movil: ouput.datos[1].movil,
                            direccion_principal: ouput.datos[1].direccion_principal,
                            correo: ouput.datos[1].correo,
                            facturacion: {
                                ...ouput.datos[1].facturacion
                            },
                            servicios: ouput.datos[1].servicios
                        }
                        setUser({ ...datos })
                    }

                    if (ouput.datos[1].estado === "SUSPENDIDO") {
                        let datos = {
                            nombre: ouput.datos[1].nombre,
                            estado: ouput.datos[1].estado,
                            cedula: ouput.datos[1].cedula,
                            movil: ouput.datos[1].movil,
                            direccion_principal: ouput.datos[1].direccion_principal,
                            correo: ouput.datos[1].correo,
                            facturacion: {
                                ...ouput.datos[1].facturacion
                            },
                            servicios: ouput.datos[1].servicios
                        }
                        setUser({ ...datos })
                    }
                    if (ouput.datos.estado[1] === "RETIRADO") {
                        let datos = {
                            nombre: ouput.datos[1].nombre,
                            estado: ouput.datos[1].estado,
                            cedula: ouput.datos[1].cedula,
                            movil: ouput.datos[1].movil,
                            direccion_principal: ouput.datos[1].direccion_principal,
                            correo: ouput.datos[1].correo,
                            facturacion: {
                                ...ouput.datos[1].facturacion
                            }
                            , servicios: ouput.datos[1].servicios
                        }

                        setUser({ ...datos })
                    }
                    return
                }
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
        Consultarcedula(cedula.trim()).then(ouput => {
            console.log(ouput)
            if (ouput.success) {
                present2({
                    message: "" + ouput.message+" "+ ouput.data.name,
                    cssClass: '-',
                    duration: 4500,
                    position: "bottom",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",
                        }
                    ]
                })
                return
            }
            present2({
                message: "" + ouput.message,
                cssClass: '-',
                duration: 4500,
                position: "bottom",
                buttons: [
                    {
                        text: "cerrar",
                        role: "cancel",
                    }
                ]
            })
            console.log(ouput)
        }).catch(erro => {
            console.log(erro)
        })
    }
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    
    const [impri, setimpri] = useState(false)
    const [busca, setBusca] = useState(false)
    //const []
    /** registra factura en portal obtiene numero incremento crea factura contifico */
    function RegistrarPago(e) {
        e.preventDefault()
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        console.log(cedula, total, lugar.value, banco.value, singleSelect.value)
        // creaComprobante() 
        // if(true) return
        if (lugar.label.includes("CALL")) {
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
                    "token": nombres.telefono,
                    "idfactura": singleSelect.value,
                    "pasarela": lugar.label,
                    "cantidad": total,
                    "idtransaccion": datos.asunto,
                    "nota": banco.label + "/" + datos.mensaje
                }

                //  console.log(datosdefactura,fac)
                PagoFacturacomnet(datosdefactura).then(fact => {
                    console.log(fact)

                    if (fact.estado == "exito") {
                        dismiss()
                        
                        if(cedula.trim().length <10){
                            setimpri(true)
                            present({
                                message: "pagado en el portal",
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
                            return
                        }
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
                                    "fecha_emision": formattedToday,
                                    "tipo_documento": "FAC",
                                    "documento": "001-001-00000" + facnum,
                                    "estado": "G",
                                    "electronico": true,
                                    "autorizacion": null,
                                    "caja_id": null,
                                    "cliente": {
                                        "ruc": null,
                                        "cedula": usuario.cedula.trim().trim(),
                                        "razon_social": usuario.nombre,
                                        "telefonos": usuario.movil,
                                        "direccion": !emailRegex.test(usuario.direccion_principal) ? "" : usuario.direccion_principal,
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
                                    "iva": (parseFloat((totalcon.total) - parseFloat((totalcon.total) / 1.12))).toFixed(2),
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
                                            "fecha": formattedToday,
                                        }
                                    ]
                                }
                                presentlo({
                                    message: "Creando factura Contifico"
                                })
                                CreaLaFacturapor(fac).then(salida => {
                                    console.log(salida)
                                    let fat = "001-001-00000" + facnum

                                    if (salida.documento === fat) {
                                        // creaComprobante()
                                        setimpri(true)
                                        document.getElementById("pagos").reset();
                                        dismiss()
                                        present({

                                            message: "Factura número 001-001-00000" + facnum + " creada con éxito",
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
                                        /* setTimeout(function () {
                                             window.location.reload()
                                         }, 3000)*/
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
                    else {
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
                })}
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
                "token": nombres.telefono,
                "idfactura": singleSelect.value,
                "pasarela": lugar.label,
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
                    if (cedula.trim().length < 10) {
                        setimpri(true)
                        present({
                            message: "pagado en el portal",
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
                        return
                    }
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
                            "fecha_emision": formattedToday,
                            "tipo_documento": "FAC",
                            "documento": "001-001-00000" + facnum,
                            "estado": "G",
                            "electronico": true,
                            "autorizacion": null,
                            "caja_id": null,
                            "cliente": {
                                "ruc": null,
                                "cedula": usuario.cedula.trim(),
                                "razon_social": usuario.nombre,
                                "telefonos": usuario.movil,
                                "direccion": !emailRegex.test(usuario.direccion_principal) ? "" : usuario.direccion_principal,
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
                            "iva": (parseFloat((totalcon.total) - parseFloat((totalcon.total) / 1.12))).toFixed(2),
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
                                    "fecha": formattedToday,
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
                                //creaComprobante()
                                document.getElementById("pagos").reset();
                                dismiss()
                                present({
                                    message: "Factura número001-001-00000" + facnum + " creada con éxito",
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
                                setTimeout(function () {
                                    window.location.reload()
                                }, 3000)
                            }
                            console.log(salida)
                        }).catch(erro => {
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
                            console.log(erro)

                        })
                    }).catch(err => {
                        console.log(err)

                    })

                }else{
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
        }
        if (lugar.label.includes("Efectivo")) {
            let datosdefactura = {
                "token": nombres.telefono,
                "idfactura": singleSelect.value,
                "pasarela": lugar.label,
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
                    if (cedula.trim().length < 10) {
                        setimpri(true)
                        present({
                            message: "pagado en el portal",
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
                        return
                    }
                    if(!cedula.trim().length<10){
                        presentlo({
                        message: 'Obteniendo numero de factura ',
                        cssClass: 'custom-loading'
                    })
                        IncremetoFacturaS().then(num=>{
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
                                    "fecha_emision": formattedToday,
                                    "tipo_documento": "FAC",
                                    "documento": "001-001-00000" + facnum,
                                    "estado": "G",
                                    "electronico": true,
                                    "autorizacion": null,
                                    "caja_id": null,
                                    "cliente": {
                                        "ruc": null,
                                        "cedula": usuario.cedula.trim(),
                                        "razon_social": usuario.nombre,
                                        "telefonos": usuario.movil,
                                        "direccion": !emailRegex.test(usuario.direccion_principal) ? "" : usuario.direccion_principal,
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
                                    "iva": (parseFloat((totalcon.total) - parseFloat((totalcon.total) / 1.12))).toFixed(2),
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
                                            "fecha": formattedToday,
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
                                        // creaComprobante()
                                        setimpri(true)
                                        document.getElementById("pagos").reset();
                                        dismiss()
                                        present({
                                            message: "Factura número001-001-00000" + facnum + " creada con éxito",
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
                                    console.log(salida)
                                    // sessionStorage.setItem("facturas", JSON.stringify(salida))
                                }).catch(error => {
                                    //  dismiss()
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


                                console.log(num)
                                // console.log(datos)  (async () => {

                                console.log(datos)
                            }

                            else {
                                console.log(num)
                            }

                        }).catch(err=>{
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
                            console.log(err)
                        })
                  /*  $.ajax({
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
                                    "fecha_emision": formattedToday,
                                    "tipo_documento": "FAC",
                                    "documento": "001-001-00000" + facnum,
                                    "estado": "G",
                                    "electronico": true,
                                    "autorizacion": null,
                                    "caja_id": null,
                                    "cliente": {
                                        "ruc": null,
                                        "cedula": usuario.cedula.trim(),
                                        "razon_social": usuario.nombre,
                                        "telefonos": usuario.movil,
                                        "direccion": !emailRegex.test(usuario.direccion_principal) ? "" : usuario.direccion_principal,
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
                                    "iva": (parseFloat((totalcon.total) - parseFloat((totalcon.total) / 1.12))).toFixed(2),
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
                                            "fecha": formattedToday,
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
                                        // creaComprobante()
                                        setimpri(true)
                                        document.getElementById("pagos").reset();
                                        dismiss()
                                        present({
                                            message: "Factura número001-001-00000" + facnum + " creada con éxito",
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
                                    console.log(salida)
                                    // sessionStorage.setItem("facturas", JSON.stringify(salida))
                                }).catch(error => {
                                    //  dismiss()
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


                                console.log(num)
                                // console.log(datos)  (async () => {

                                console.log(datos)
                            }

                            else {
                                console.log(num)
                            }
                        },
                        error: function (error) {
                            //  dismiss()
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
                    })*/
                }
                    else{
                        setimpri(true)
                    }
                    /* IncremetoFacturaS().then(num => {
                     }).catch(err => {
                         console.log(err)
                     })*/

                }else{
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
    

    return (
        <IonContent fullscreen={true}>

            <div className="container-fluid px-5 ">

                <div className="card  h-100">
                    <div className=" w-100 py-3  mx-auto px-2" style={{
                        background:"#10063e"
                    }} >

                        <div className=" d-flex px-1 ">
                            <div className="container row">
                                <div className="col-4 col-md-5 d-flex   align-items-center text-white ps-3 ">
                                    <h5 className=" text-white">
                                        Buscar cliente

                                    </h5>

                                </div>
                                <div className=" col-12 col-md-6  px-0  ">
                                    <form className="form d-none" action="">
                                        <input className="input"

                                            placeholder="Cédula cliente"
                                            type={"search"}
                                            value={cedula}
                                            onChange={(e) => setCedul(e.target.value)} />
                                        <a onClick={buscar}><i className="fas bi bi-search"  >
                                        </i></a>

                                    </form>

                                    

                                        <div className="row px-0  height d-flex justify-content-center align-items-center">

                                            <div className="col-12 col-md-12">

                                                <div className="search">
                                                    <i className="bi bi-search"></i>
                                                <input 
                                                type={"search"}
                                                    value={cedula}
                                                    onChange={(e) => setCedul(e.target.value)} className="form-control" placeholder="Cédula cliente"/>
                                                    <button className=" btn-primary "
                                                    onClick={buscar}
                                                        >Buscar</button>
                                                </div>

                                            </div>

                                        </div>
                                

                                </div>
                              



                            </div>
                        </div>
                    </div>
                    <div className="bg-ligth container-fluid   h-auto py-3">
                        {usuario.nombre == "" ? "" : <div className={usuario.facturacion.facturas_nopagadas == "0" ? " bg-secondary container-fluid   text-center py-2 rounded-2  " :" bg-danger container-fluid   text-center py-2 rounded-2 "}>
                            <span className=" text-white">   {
                                "El cliente cuenta con " + usuario.facturacion.facturas_nopagadas + " Facturas vencidas (Total:" + usuario.facturacion.total_facturas + ")"

                            }
                            </span>
                        </div>}

                        <div className="col-12 col-md-6 d-flex  align-items-center">
                            <h5 className=" text-dark">{usuario.nombre}
                            </h5>
                            {usuario.estado === "ACTIVO" ? <span className='badge p-3 bg-success mx-3'>ACTIVO</span> : ""}
                            {usuario.estado === "SUSPENDIDO" ? <span className='badge p-3 bg-danger mx-3'>SUSPENDIDO</span> : ""}
                            {usuario.estado === "RETIRADO" ? <span className='badge p-3 bg-warnig mx-3'>RETIRADO</span> : ""}

                        </div>
                        <div className="row container-fluid d-flex  ">
                            <div className=" container-fluid d-flex flex-wrap text-secondary">
                                <p>Id contifico: {totalcon.id}</p>

                                <p className="px-2">Estado Contifico: {totalcon.estado}</p>

                                <p>Total producto Contifico: {parseFloat(totalcon.total).toFixed(2)}</p>

                                <p className="px-2">{JSON.stringify(impri)}</p>
                            </div>
                            <div className=" container text-center mb-3 py-3">

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
                                {!impri ? "" : <a className=" btn btn-defaul"
                                    onClick={creaComprobante}
                                >
                                    <i className=" px-3 bi bi-printer-fill"></i>Imprimir Comprobante
                                </a>}

                            </div>
                            {!busca ? <form id="pagos">
                                <div className="col-md-12 col-lg-6">
                                   
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
                                                        { value: "TRA-Oficina/Matriz", label: "CALL PRODUBANCO" },
                                                        { value: "TRA-Oficina/Ecocity", label: "CALL BANCO PICHINCHA EMP" },
                                                        { value: "TRA-Ecocity", label: "CALL BANCO PICHINCHA PRS" },
                                                        { value: "TRA-Ecoty", label: "CALL BANCO GUAYAQUIL PRS" },
                                                        { value: "TRA-bancoguay", label: "CALL BANCO GUAYAQUIL EMP" },
                                                        { value: "TRA-bancopac", label: "CALL BANCO PACIFICO PRS" },
                                                        { value: "TRA-pacifico", label: "CALL BANCO PACIFICO EMP" },

                                                    ]}
                                                    value={lugar}
                                                    placeholder="Forma"
                                                    onChange={setLugar}
                                                />
                                                <span className="font-weight-light"></span>
                                            </div>
                                        </div>
                                   
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
                                
                                
                                <div className="col-md-12 col-lg-6 mb-3">

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label  text-md-end ">
                                            N° Transacción

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
                                    </div>
                                </div>
                                
                              
                                <div className="col-md-12 col-lg-6 mb-3">
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
                                                        { value: "1mBdJqpkurVOb0J6", label: "CTA BCO PACIFICO PERSONAL 1051475596" },
                                                        { value: "Q9jaKZqohE6Kek5K", label: "CTA BCO PICHINCHA 6164998400" }
                                                    ]}
                                                    value={banco}
                                                    placeholder="Banco"
                                                    onChange={setBanco}
                                                />
                                            </div>
                                        </div>
                                    </div> : ""}
                                    <div>
                                        <div>
                                            <div className="form-group row mt-3  ">
                                                <label className="col-sm-4  col-form-label text-md-end">Total a pagar</label>
                                                <div className="col-12 col-lg-8">
                                                    <div className=" text-center ">
                                                        <input className="form-control "
                                                            name="valor"
                                                            value={total}
                                                            onChange={handelChangeT}
                                                        />
                                                        {cedula.length>=10? 
                                                        <button className=" btn-primary m-1 mt-5 p-2  btn"
                                                            disabled={impri}
                                                            onClick={(e) => RegistrarPago(e)}
                                                        >
                                                            Registrar Pago
                                                        </button>:
                                                            <button className=" btn btn-primary m-1 mt-5 p-2 " 
                                                                disabled={impri}
                                                                onClick={(e) => RegistrarPago(e)}
                                                            >Registro Comnet</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                             
                                

                            </form> : ""}

                        </div>



                    </div>


                </div>
            </div>

        </IonContent>
    )
}