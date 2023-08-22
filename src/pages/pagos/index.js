import {
    Divider,
    Grid,
    Box,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    FormControl, InputAdornment,
    DialogContent,
    DialogContentText
} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Spin, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import Selectopction from 'components/Selectshear';
import { MostrarFacturas, autenticar } from 'util/Queryportal';
import { BuscarProductoContific, Consultarcedula, CreaProducto, IncremetoCon } from 'util/Querycontifico';

import ModalalerView from './ModalAlert';
function SimpleDialog(props) {
    const { selectedValue, estado, open } = props;



    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog open={open}>
            {estado ?
                <DialogTitle>
                    <Spin ttip="Loading" size="large"></Spin>
                    {selectedValue}
                </DialogTitle> :
                <DialogContent>
                    <DialogContentText >
                        {selectedValue}
                    </DialogContentText>
                </DialogContent>}
        </Dialog>
    );
}
const PagosView = () => {
    const [open, setOpen] = React.useState(false);
    const [mesaje, setMensaje] = useState({ mensaje: "", estado: false })
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mensaje, description) => {
        api[type]({
            message: mensaje,
            description:
                description,
            placement: 'bottom'
        });
    };
    const [impri, setimpri] = useState(false)
    const [busca, setBusca] = useState(false)
    const [values, setValue] = useState(
        {
            firstname: '',
            lastname: '',
            email: '',
            company: '',
            password: '',
            submit: null
        }
    )
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
    let [totalcon, setValor] = useState({
        total: 0,
        estado: "",
        id: "",
    })
    const [singleSelect, setSingleSelect] = useState({ value: "", label: "", });
    const [list, seTlist] = useState([])
    function comprobante(e){
        console.log(e)
    }
    function buscar() {
        console.log("keyh")
        setBusca(true)
        if (cedula.trim().length < 10) {
            setBusca(false)
            setOpen(true)
            setMensaje({
                mensaje: "Busacando Cliente portal",
                estado: true
            })
            /* presentlo({
                 message: 'Busacando Clinete portal ',
                 cssClass: 'custom-loading'
             })*/
            autenticar(cedula.trim()).then(ouput => {
                console.log(ouput)
                setimpri(false)
                if (ouput.estado === "exito") {
                    /*  presentlo({
                          message: 'Busacando Facturas comnet',
                          cssClass: 'custom-loading'
                      })*/
                    setMensaje({
                        mensaje: "Buscando Facturas comnet",
                        estado: true
                    })
                    seTlist([])
                    setSingleSelect({ value: "", label: "" })
                    let infor = ouput.datos.find(e => e.estado == "ACTIVO")
                    console.log(infor.id)
                    MostrarFacturas(infor.id).then(ouput => {
                        console.log(ouput)
                        if (ouput.estado === "exito") {
                            // dismiss()
                            setOpen(false)
                            console.log(ouput)
                            let datos = ouput.facturas.map((el, index) => {
                                return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                            })
                            datos.unshift({ value: "", label: "Selecione Factura" })
                            seTlist(datos)
                            comprobante({ value: "", label: "Selecione Factura" })
                        } else {
                            setOpen(false)
                            openNotificationWithIcon('info', "Rinformación", "No hay facturas pendientes")
                        }
                    }).catch(err => {
                        console.log(err)                        
                        setOpen(false)
                        openNotificationWithIcon('error', "Alerta", ouput.mensaje)
                      
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
                    setOpen(false)
                    openNotificationWithIcon('error', "Alerta", ouput.mensaje)

                    /*dismiss()
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
                    });*/

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
                 })/ */
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
        setOpen(true)
        setMensaje({
            mensaje:"Buscando Cliente en el Portal",
            estado:true
        })
        settotal("")
        autenticar(cedula.trim()).then(ouput => {
            console.log(ouput)
            setimpri(false)
            if (ouput.estado === "exito") {
                seTlist([])
                setSingleSelect({ value: "", label: "" })
               
                setMensaje({
                    mensaje: "buscando Cliente en contifico",
                    estado: true
                })

                /* dismiss()
                 presentlo({
                     message: 'Busacando Cliente en Contifico ',
                     cssClass: 'custom-loading'
                 })*/
                BuscaclienteContifico(cedula.trim()).then(ouputs => {
                    console.log(ouputs)
                    if (ouputs.length == 0) {
                        let datos = ouput.datos[0].cedula.trim().length == 10 ? {
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
                            "cedula": ouput.datos[0].cedula.trim(),
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
                            "cedula": ouput.datos[0].cedula.trim().substring(0, 10),
                            "email": ouput.datos[0].correo,
                            "ruc": ouput.datos[0].cedula.trim(),
                            "Provincia": "Guayaquil",
                            "adicional1_cliente": "Cliente de Internet"

                        }
                        console.log(datos)
                        
                        setMensaje({
                            mensaje: "Creando Cliente en Contifico",
                            estado: true
                        })
                        /* dismiss()
                         presentlo({
                             message: 'Creando Cliente en Contifico ',
                             cssClass: 'custom-loading'
                         })*/
                        CrearClienteContifico(datos).then(crea => {
                            if (crea.response.status == 400) {
                                setimpri(true)
                                setOpen(false)
                                openNotificationWithIcon('error', "Alerta", "El cliente no de creo en contifico")

                                if (ouput.datos[0].cedula.length > 10) {
                                    setOpen(true)
                                    setMensaje({
                                        mensaje: "creando cliente Juridico en Contifico",
                                        estado: false
                                    })
                                    /*presentlo({
                                        message: 'Creando Cliente Juridico en Contifico ',
                                        cssClass: 'custom-loading'
                                    })*/
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
                                            setOpen(false)
                                            openNotificationWithIcon('error', "Alerta", "El clinete contifico no se Creo"+crea.response.data["mensaje"])

                                            
                                            return;
                                        }
                                        if (Object.keys(creas).length > 1) {
                                            // dismiss()
                                            setContifico([creas])
                                            /* presentlo({
                                                 message: 'Busacndo facturas inpagas ',
                                                 cssClass: 'custom-loading'
                                             })*/
                                            setOpen(true)
                                            setMensaje({
                                                mensaje: "Buscando Facturas Inpagas",
                                                estado: false
                                            })
                                            MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                                if (ouput.estado === "exito") {
                                                    // dismiss()
                                                    setOpen(false)
                                                    console.log(ouput)
                                                    let datos = ouput.facturas.map((el, index) => {
                                                        return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                    })
                                                    datos.unshift({ value: "", label: "Selecione Factura" })
                                                    seTlist(datos)
                                                    //setSingleSelect({ value: "", label: "Selecione Factura" })
                                                    comprobante({ value: "", label: "Selecione Factura" })
                                                } else {
                                                    //dismiss()
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                                /*dismiss()
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
                                                })*/
                                            })
                                        } else {
                                            /* dismiss()
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
                                             })*/
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
                                setContifico([crea])
                                /* dismiss()
                                 setContifico([crea])
                                 presentlo({
                                     message: 'Busacndo facturas inpagas ',
                                     cssClass: 'custom-loading'
                                 })*/
                                MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                    if (ouput.estado === "exito") {
                                        // dismiss()

                                        console.log(ouput)
                                        let datos = ouput.facturas.map((el, index) => {
                                            return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                        })
                                        datos.unshift({ value: "", label: "Selecione Factura" })
                                        seTlist(datos)
                                        //setSingleSelect({ value: "", label: "Selecione Factura" })
                                        comprobante({ value: "", label: "Selecione Factura" })
                                    } else {
                                        //dismiss()
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    /* dismiss()
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
                                     })*/
                                })
                            } else {
                                /* dismiss()
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
                                 })*/
                            }
                        }).catch(err => {
                            /* dismiss()
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
                             })*/
                        })
                    }
                    else if (ouputs.length > 0) {
                        console.log(ouput)
                        if (ouput.datos[1] != undefined && ouput.datos[1].servicios != undefined) {
                            setContifico(ouputs)
                            /* dismiss()
                             presentlo({
                                 message: 'Busacando Producto en Contifico ',
                                 cssClass: 'custom-loading'
                             })*/
                            let dato = ouput.datos
                            let info = ouput.datos.includes(e => e.estado = "Activo") ? dato.find(dato => dato.estado = "ACTIVO") : dato.find(dato => dato.estado = "SUSPENDIDO" && dato.servicios != null)
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
                                        /* dismiss()
                                         presentlo({
                                             message: 'Busacando Facturas por pagar',
                                             cssClass: 'custom-loading'
                                         }) */
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
                                                //dismiss()
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                            // dismiss()
                                            /*present({
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
                                            })*/
                                        })
                                    }
                                    console.log(salida)
                                    return
                                }
                                /*dismiss()
                                presentlo({
                                    message: 'No se encontro Producto Contifico ',
                                    cssClass: 'custom-loading'
                                })*/
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
                                            //dismiss()
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })

                            }).catch(err => {
                                console.log(err)
                                /*dismiss()
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
                                })*/
                            })
                            return
                        }
                        if (ouput.datos[1] != undefined && ouput.datos[1].servicios != undefined) {
                            setContifico(ouputs)
                            /*dismiss()
                            presentlo({
                                message: 'Busacando Producto en Contifico ',
                                cssClass: 'custom-loading'
                            })*/
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
                                        /* dismiss()
                                         presentlo({
                                             message: 'Busacando Facturas por pagar',
                                             cssClass: 'custom-loading'
                                         })*/
                                        MostrarFacturas(ouput.datos[1].id).then(ouput => {
                                            if (ouput.estado === "exito") {
                                                //dismiss()
                                                console.log(ouput)
                                                let datos = ouput.facturas.map((el, index) => {
                                                    return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                })
                                                datos.unshift({ value: "", label: "Selecione Factura" })
                                                seTlist(datos)
                                                comprobante({ value: "", label: "Selecione Factura" })
                                            } else {
                                                //dismiss()
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                            /* dismiss()
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
                                             })*/
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
                                            ///dismiss()
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                                /*  dismiss()
                                  presentlo({
                                      message: 'No se encontro Producto Contifico ',
                                      cssClass: 'custom-loading'
                                  })*/

                            }).catch(err => {
                                console.log(err)
                                /* dismiss()
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
                                 })*/
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
                                        /* dismiss()
                                         presentlo({
                                             message: 'Busacando Facturas por pagar',
                                             cssClass: 'custom-loading'
                                         })*/
                                        MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                            console.log(ouput)
                                            if (ouput.estado === "exito") {
                                                //dismiss()
                                                console.log(ouput)
                                                let datos = ouput.facturas.map((el, index) => {
                                                    return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                })
                                                datos.unshift({ value: "", label: "Selecione Factura" })
                                                seTlist(datos)
                                                comprobante({ value: "", label: "Selecione Factura" })
                                            } else {
                                                // dismiss()
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                            /* dismiss()
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
                                             })*/
                                        })
                                    }
                                    console.log(salida)
                                    return
                                }
                                /* dismiss()
                                 presentlo({
                                     message: 'No se encontro Producto Contifico ',
                                     cssClass: 'custom-loading'
                                 })*/
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
                                            // dismiss()
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })

                            }).catch(err => {
                                console.log(err)
                                /* dismiss()
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
                                 })*/
                            })
                        }
                        if (ouput.datos[0].servicios == undefined) {
                            /*  dismiss()
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
                              })*/
                            return
                        }

                        // ouput.datos[0].servicios == undefined ? seTlist([{ value: "", label: "Selecione Factura" }]) :

                    }
                }).catch(err => {
                    console.log(err)
                    /*dismiss()
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
                    })*/
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
                /*  dismiss()
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
                  });*/

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
                /*present2({
                    message: "" + ouput.message + " " + ouput.data.name,
                    cssClass: '-',
                    duration: 4500,
                    position: "bottom",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",
                        }
                    ]
                })*/
                return
            }
            /* present2({
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
             })*/
            console.log(ouput)
        }).catch(erro => {
            console.log(erro)
        })
    }

    return (
        <div>
            <SimpleDialog
                selectedValue={mesaje.mensaje}
                open={open}
                estado={mesaje.estado}
            />
            {contextHolder}
            <MainCard contentSX={{ p: 2.25 }} style={{ marginBottom: "15px" }}>
                <div className="">
                    <div className="col-4 col-md-5 d-flex   align-items-center text-white ps-3 ">
                        <h5 className=" text-dark">
                            Buscar cliente
                        </h5>
                    </div>
                    <div className="  ">
                        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
                            <FormControl sx={{ width: { xs: '100%', md: '100%' } }}>
                                <OutlinedInput
                                    size="small"
                                    id="header-search"
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </InputAdornment>
                                    }
                                    onChange={(e) => setCedul(e.target.value)}

                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    endAdornment={
                                        <Button
                                            onClick={buscar}
                                            position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </Button>
                                    }
                                    placeholder="cédula"
                                />
                            </FormControl>
                        </Box>


                    </div>
                    <Grid style={{ paddingTop: "15px" }} spacing={1.5}>


                        <Typography variant="h6"  >
                            Id contifico: {""} / Estado contifico : {""} / Total producto : {""}
                        </Typography>
                    </Grid>
                    <div className="col-12 col-md-6 d-flex  align-items-center">
                        <h5 className=" text-dark">{usuario.nombre}
                        </h5>
                        {usuario.estado === "ACTIVO" ? <span className='badge p-3 bg-success mx-3'>ACTIVO</span> : ""}
                        {usuario.estado === "SUSPENDIDO" ? <span className='badge p-3 bg-danger mx-3'>SUSPENDIDO</span> : ""}
                        {usuario.estado === "RETIRADO" ? <span className='badge p-3 bg-warnig mx-3'>RETIRADO</span> : ""}

                    </div>
                </div>
            </MainCard>
            <MainCard contentSX={{ p: 2.25 }}>

                <form noValidate style={{ paddingTop: '15px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} >
                            <Stack spacing={1}>
                                <InputLabel>Factura a Pagar </InputLabel>
                                <Selectopction
                                    name="factura"
                                    options={list}
                                    value={singleSelect}
                                    placeholder="Factura"
                                    onChange={(e) => comprobante(e)} />
                            </Stack>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                                <OutlinedInput
                                    id="firstname-login"
                                    type="firstname"
                                    value={values.firstname}
                                    name="firstname"


                                    placeholder="John"
                                    fullWidth

                                />

                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="lastname-signup"
                                    type="lastname"
                                    value={values.lastname}
                                    name="lastname"


                                    placeholder="Doe"
                                    inputProps={{}}
                                />

                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="company-signup">Company</InputLabel>
                                <OutlinedInput
                                    fullWidth

                                    id="company-signup"
                                    value={values.company}
                                    name="company"


                                    placeholder="Demo Inc."
                                    inputProps={{}}
                                />

                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider>
                                <Typography variant="caption">Sign up with</Typography>
                            </Divider>
                        </Grid>

                    </Grid>
                </form>
            </MainCard>


        </div>
    );
};
export default PagosView;
