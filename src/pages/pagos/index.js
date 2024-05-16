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
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Spin, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import Selectopction from 'components/Selectshear';
import { CreaLaFacturapor, Facturaid, MostrarFacturas, autenticar } from 'util/Queryportal';
import { BuscaclienteContifico, BuscarProductoContific, Consultarcedula, CreaProducto, CrearClienteContifico, IncremetoCon, IncremetoFacturaS, PagoFacturacomnet } from 'util/Querycontifico';
import jsPDF from "jspdf"
import { Mes, userlog } from 'util/User';
import { Arreglarerror, ListarFacturas } from 'util/Querireport';

function SimpleDialogop(props) {
    const { onClose, open, servicios } = props;

    const handleClose = () => {
        onClose("");
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Selecione perfil</DialogTitle>
            <List sx={{ pt: 0 }}>
                {servicios.map((email, i) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(email.id)} key={i}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email.nombre} secondary={email.correo + "\n" + email.direccion_principal} />
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>
        </Dialog>
    );
}
function SimpleDialog(props) {
    const { selectedValue, estado, open } = props;



    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog open={open}>
            {estado ?
                <DialogTitle className="p-5">
                    <Spin ttip="Loading" size="large" className="px-3"></Spin>
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
let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


const PagosView = () => {
    const [openServ, setOpenSer] = useState(false);
    const [servicio, setservisicos] = useState([])
    const [idperfil, setidPerfil] = useState("")
    function closeDialo(e) {
        console.log(e)
        let info = servicio.filter(f => f.id == e)[0]
        setOpenSer(false)
        console.log(info)
        let datos = {
            nombre: info.nombre,
            estado: info.estado,
            cedula: info.cedula,
            movil: info.movil,
            direccion_principal: info.direccion_principal,
            correo: info.correo,
            facturacion: {
                ...info.facturacion
            },
            servicios: info.servicios
        }
        setUser({ ...datos })
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
                    setMensaje({
                        mensaje: "buscando Factura por pagar",
                        estado: true
                    })
                    MostrarFacturas(info.id).then(ouput => {
                        if (ouput.estado === "exito") {
                            setOpen(false)
                            openNotificationWithIcon('success', "Alerta", "Facturas encontradas")
                            console.log(ouput)
                            let datos = ouput.facturas.map((el, index) => {
                                return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                            })
                            datos.unshift({ value: "", label: "Selecione Factura" })
                            seTlist(datos)
                            comprobante({ value: "", label: "Selecione Factura" })
                        } else {
                            setOpen(false)
                        }
                    }).catch(err => {
                        console.log(err)
                        setOpen(false)
                        openNotificationWithIcon('error', "Alerta", "Hubo un error inesperado")

                    })
                }
                console.log(salida)
                return
            }
            setOpen(true)
            setMensaje({
                mensaje: "Creando producto contifico ",
                estado: true
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

                        setValor({
                            total: valor,
                            estado: estado,
                            id: JSON.parse(produ).id,
                        })
                        //dismiss()
                    })
                    setOpen(false)
                }
            }).catch(err => {
                setOpen(false)
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
            setOpen(false)
            openNotificationWithIcon('error', "Alerta", "Hubo un error inesperado al buscar Producto Contifico")
        })
    }
    const [open, setOpen] = React.useState(false);
    const [mesaje, setMensaje] = useState({ mensaje: "", estado: false })
    const [api, contextHolder] = notification.useNotification();
    let [contifico, setContifico] = useState([])
    const openNotificationWithIcon = (type, mensaje, description) => {
        api[type]({
            message: "" + mensaje,
            description:
                "" + description,
            placement: 'bottom'
        });
    };
    const [impri, setimpri] = useState(false)
    const [busca, setBusca] = useState(false)
    const [lugar, setLugar] = useState({ value: "", label: "" })
    function validarCorreoElectronico(correo) {
        // Expresión regular para validar una dirección de correo electrónico
        const expresionRegularCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Utilizamos test() para verificar si el correo coincide con la expresión regular
        return expresionRegularCorreo.test(correo.replace(".@", "@"));
    }

    const [banco, setBanco] = useState({ value: "", label: "" })
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
    function handelChangeT(e) {
        settotal(e.target.value)
    }
    let [descri, setDescrip] = useState({
        factura: "",
        items: []
    })
    let [totalcon, setValor] = useState({
        total: 0,
        estado: "",
        id: "",
    })
    let nombres = userlog()
    const [singleSelect, setSingleSelect] = useState({ value: "", label: "", });
    const [list, seTlist] = useState([])
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
        doc.text(40, 58, "TOTAL: " + parseFloat(total).toFixed(2));
        doc.text(40, 62, "SALDO: $0.00");
        doc.text(3, 65, "*******************************************************************");
        doc.text(20, 69, "CLIENTE")
        doc.text(3, 73, "" + usuario.nombre)
        doc.text(3, 76, "" + usuario.direccion_principal)
        doc.text(3, 79, "" + usuario.cedula.trim().substring(0, 10))
        doc.text(3, 84, "Fecha corte: " + descri.factura.emitido)
        doc.text(3, 88, "*******************************************************************");
        doc.text(3, 94, "Operador " + nombres.usuario);
        doc.text(3, 98, "Impresión:" + result2);
        doc.text(3, 105, "______________________________________________");



        doc.output('dataurlnewwindow');
    }
    function validarCorreoElectronico(correo) {
        const expresionRegularCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        return expresionRegularCorreo.test(correo);
    }
    function buscar() {
        setBusca(true)
        seTlist([])
        document.getElementById("pagos") != undefined ? document.getElementById("pagos").reset() : ""
        if (cedula.trim() == "") return
        
        setOpen(true)
        setMensaje({
            mensaje: "Buscando Cliente en el Portal",
            estado: true
        })
        setDatos({
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
        settotal("")
        autenticar(cedula.trim()).then(ouput => {
            console.log(ouput)
            setBusca(false)
            setimpri(false)
            if (ouput.estado === "exito") {
                setSingleSelect({ value: "", label: "" })
                setMensaje({
                    mensaje: "buscando Cliente en contifico",
                    estado: true
                })
                BuscaclienteContifico(cedula.trim()).then(ouputs => {
                    console.log(ouputs)
                    if (ouputs.length == 0) {
                        let datos = ouput.datos[0].cedula.trim().length < 11 ? {
                            "tipo": "N",
                            "personaasociada_id": null,
                            "nombre_comercial": ouput.datos[0].nombre,
                            "telefonos": ouput.datos[0].movil,
                            "razon_social": ouput.datos[0].nombre,
                            "direccion": ouput.datos[0].direccion_principal,
                            "porcentaje_descuento": "0",
                            "es_cliente": true,
                            "origen": "Panel de Facturacion",
                            "email":  validarCorreoElectronico(ouput.datos[0].correo) ?ouput.datos[0].correo:"",
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
                            "email": validarCorreoElectronico(ouput.datos[0].correo) ?ouput.datos[0].correo:"",
                            "ruc": ouput.datos[0].cedula.trim(),
                            "Provincia": "Guayaquil",
                            "adicional1_cliente": "Cliente de Internet"

                        }
                        console.log(datos)

                        setMensaje({
                            mensaje: "Creando Cliente en Contifico",
                            estado: true
                        })
                        CrearClienteContifico(datos).then(crea => {
                            console.log(crea)
                            if (Object.keys(crea).length > 1 && crea[0].cedula == ouput.datos[0].cedula.trim().substring(0, 10)) {
                                
                                setContifico([crea])
                                setOpen(true)
                                setMensaje({
                                    mensaje: "buscando facturas inpagas",
                                    estado: true
                                })

                                MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                    if (ouput.estado === "exito") {
                                        // dismiss()
                                        setOpen(false)
                                        openNotificationWithIcon('success', "Alerta", "Facturas Encontradas")

                                        console.log(ouput)
                                        let datos = ouput.facturas.map((el, index) => {
                                            return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                        })
                                        datos.unshift({ value: "", label: "Selecione Factura" })
                                        seTlist(datos)
                                        //setSingleSelect({ value: "", label: "Selecione Factura" })
                                        comprobante({ value: "", label: "Selecione Factura" })
                                    } else {
                                        setOpen(false)
                                        openNotificationWithIcon('success', "Alerta", "No se encontro facturas inpagas")
                                        //dismiss()
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    setOpen(false)
                                    openNotificationWithIcon('error', "Alerta", "Hubo un error inesperado")
                                })
                                return
                            } else {
                                setOpen(false)
                                openNotificationWithIcon('error', "Alerta", "Error no se creo cliente contifico ")
                                return
                            }
                            if (crea.response.status == 400) {
                                setimpri(true)
                                setOpen(false)
                                openNotificationWithIcon('error', "Alerta", "El cliente no se creo en contifico")

                                if (ouput.datos[0].cedula.length > 10) {
                                    setOpen(true)
                                    setMensaje({
                                        mensaje: "creando cliente Juridico en Contifico",
                                        estado: false
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
                                            setOpen(false)
                                            openNotificationWithIcon('error', "Alerta", "El clinete contifico no se Creo" + crea.response.data["mensaje"])


                                            return;
                                        }
                                        if (Object.keys(creas).length > 1) {
                                            // dismiss()
                                            setContifico([creas])
                                            setOpen(true)
                                            setMensaje({
                                                mensaje: "Buscando Facturas Inpagas",
                                                estado: false
                                            })
                                            MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                                if (ouput.estado === "exito") {
                                                    // dismiss() 
                                                    setOpen(false)
                                                    openNotificationWithIcon('success', "Alerta", "Facturas encontradas")
                                                    console.log(ouput)
                                                    let datos = ouput.facturas.map((el, index) => {
                                                        return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                    })
                                                    datos.unshift({ value: "", label: "Selecione Factura" })
                                                    seTlist(datos)
                                                    //setSingleSelect({ value: "", label: "Selecione Factura" })
                                                    comprobante({ value: "", label: "Selecione Factura" })
                                                } else {
                                                    setOpen(false)
                                                    openNotificationWithIcon('success', "Alerta", "no se encontro facturas")
                                                    //dismiss()
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                                setOpen(false)
                                                openNotificationWithIcon('error', "Alerta", "Hubo un error inesperado")
                                            })
                                        } else {
                                            setOpen(false)
                                            openNotificationWithIcon('error', "Alerta", "no se creo cliente contifico")

                                        }

                                    }).catch(err => {
                                        setOpen(false)
                                        openNotificationWithIcon('error', "Atento", "no se creo cliente contifico")

                                        console.log(err)
                                    })
                                }


                                return
                            }
                           
                        }).catch(err => {
                            setOpen(false)
                            console.log(err)
                            openNotificationWithIcon('error', "Alerta", "Hubo un error inesperado al crear cliente contifico" + JSON.stringify(err))
                        })
                    }
                    else if (ouputs.length > 0) {

                        console.log(ouput.datos.length)
                        if (ouput.datos.length > 1) {
                            setservisicos(ouput.datos)
                            setOpenSer(true)
                            return
                        }
                        console.log(ouput)
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
                                        setOpen(true)
                                        setMensaje({
                                            mensaje: "Buscando Factura por pagar ",
                                            estado: true
                                        })
                                        MostrarFacturas(ouput.datos[0].id).then(ouput => {
                                            console.log(ouput)
                                            if (ouput.estado === "exito") {
                                                setOpen(false)
                                                openNotificationWithIcon('success', "Alerta", "Facturas encontradas")
                                                //dismiss()
                                                console.log(ouput)
                                                let datos = ouput.facturas.map((el, index) => {
                                                    return { value: el.id, label: "Nº" + el.id + "- ($" + el.total + ") Factura de servicio " + el.vencimiento }
                                                })
                                                datos.unshift({ value: "", label: "Selecione Factura" })
                                                seTlist(datos)
                                                comprobante({ value: "", label: "Selecione Factura" })
                                            } else {
                                                setOpen(false)
                                                openNotificationWithIcon('success', "Alerta", "No se encontro facturas pendientes")
                                                // dismiss()
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                            setOpen(false)
                                            openNotificationWithIcon('error', "Mostrar facturas comnet", "" + err)

                                        })
                                    }
                                    setOpen(false)
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
                                            setOpen(false)
                                            // dismiss()
                                        })
                                    }
                                }).catch(err => {
                                    setOpen(false)
                                    console.log(err)
                                })

                            }).catch(err => {
                                console.log(err)
                                setOpen(false)
                                openNotificationWithIcon('error', "Alerta", "Hubo un error al buscar Producto contifico")
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
                            seTlist([])
                            setOpen(false)
                            openNotificationWithIcon('error', "Alerta", "Este usuario no tiene servicio en el portal ")

                            return
                        }

                    }
                }).catch(err => {
                    console.log(err)
                    setOpen(false)
                    openNotificationWithIcon('error', "Alerta", "Hubo un error inesperado")

                })               
            }
            if (ouput.estado === "error") {
                setOpen(false)
                openNotificationWithIcon('error', "Alerta", "" + ouput.mensaje)
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
            setOpen(false)
            console.log(err)
        })
        Consultarcedula(cedula.trim()).then(ouput => {
            console.log(ouput)
            if (ouput.success) {
                setOpen(false)
                openNotificationWithIcon('success', "Usuario exitestente en el registro civil", ouput.data.name)
                return
            }
            setOpen(false)
            openNotificationWithIcon('error', "Usuario no consta en el regisrto civil", ouput.mensaje)

            console.log(ouput)
        }).catch(erro => {
            console.log(erro)
        })
    }
    async function VerificaError() {
        let fact = await ListarFacturas({
            "estado": "0",
            "idfactura": ""
        })
        if (fact.data.length > 0) {
            await Arreglarerror()
        }

    }
    function comprobante(e) {
        console.log(e)
        setSingleSelect(e)
        if (e.value != "") {
            setOpen(true)
            setMensaje({
                mensaje: "Validando Valor de factura y producto contifico",
                estado: true
            })
            Facturaid(e.value).then(ouput => {
                console.log(ouput)
                if (ouput.estado === "exito") {
                    setFactura({
                        ...ouput.factura
                    })
                    setDescrip({ factura: { ...ouput.factura }, items: ouput.items })
                    sessionStorage.setItem("imp",parseInt(ouput.items[0].imp))
                    sessionStorage.setItem("descripcion", ouput.items[0].descrp)

                    settotal(ouput.factura.total)
                    console.log(parseFloat(total).toFixed(2), parseFloat(ouput.factura.total).toFixed(2))
                    console.log((parseFloat(total).toFixed(2) != parseFloat(ouput.factura.total).toFixed(2)))
                    
                    if (parseFloat(total).toFixed(2) != parseFloat(ouput.factura.total).toFixed(2)) {
                        setMensaje({
                            mensaje: "Cambiando precio producto contifico",
                            estado: true
                        })
                        let valor = parseFloat(ouput.factura.total).toFixed(2);
                        setOpen(false)

                        setValor({
                            ...totalcon,
                            total: valor,
                        })
                    
                        return
                    }
                    setOpen(false)
                }

            }).catch(err => {
                console.log(err)
                setOpen(false)
                openNotificationWithIcon('error', "Hubo un error ", "" + err)
            })
        }
    }
    const handelChange = (e) => {
        setDatos({
            ...datos,
            [e.name]: e.value

        })
        //console.log(e.value)
    }
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
        if (totalcon.id ==" ") {
            openNotificationWithIcon('error', "Producto no encontrado", "")
            return
        }
        //return
        if (lugar.label.includes("CALL")) {

            console.log(banco.value)
            if (datos.asunto.trim().length == 0 && banco.label.trim() == "") {
                setOpen(false)
                openNotificationWithIcon('error', "Info", "Ingrese un numero de comprobante o slecione una cuenta")


            }
            else {
                setOpen(true)
                setMensaje({
                    mensaje: "Pagando factura en el portal",
                    estado: true
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

                        setimpri(true)
                        openNotificationWithIcon('success', "Factura Pagada en portal", "")

                        setOpen(true)
                        setMensaje({
                            mensaje: "Ageragando numero de Factura",
                            estado: true
                        })
                        IncremetoFacturaS().then(num => {
                            if (num.status) {
                                //dismiss()
                                setOpen(false)
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
                                        "cedula": usuario.cedula.trim().substring(0, 10),
                                        "razon_social": usuario.nombre,
                                        "telefonos": usuario.movil,
                                        "direccion": !emailRegex.test(usuario.direccion_principal) ? "" : usuario.direccion_principal,
                                        "tipo": "N",
                                        "email": validarCorreoElectronico(usuario.correo) ? usuario.correo.replace(".@","@") : "",
                                        es_extranjero: (usuario.cedula.trim().length < 9)
                                    },
                                    "vendedor": {
                                        "ruc": "0992782129001",
                                        "razon_social": "COMPUTECNICSNET S.A",
                                        "telefonos": "5104910",
                                        "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
                                        "tipo": "J",
                                        "email": "facturacion@speed.ec",
                                        es_extranjero: (usuario.cedula.trim().length < 9)
                                    },
                                    //contifico[0].
                                     "descripcion": usuario.cedula.trim().substring(0, 10)+" "+singleSelect.value,
                                    "subtotal_0": 0,
                                    "subtotal_12": (total) / 1.12,
                                    "iva": (parseFloat((total) - parseFloat((total) / 1.12))).toFixed(2),
                                    "total": parseFloat(total).toFixed(2),
                                    "detalles": [
                                        {
                                            "producto_id": totalcon.id,
                                            "cantidad": 1,
                                            "precio": (total) / 1.12,
                                            "porcentaje_iva": 12,
                                            "porcentaje_descuento": 0,
                                            "base_cero": 0,
                                            "base_gravable": (total) / 1.12,
                                            "base_no_gravable": 0
                                        }
                                    ],
                                    "cobros": [
                                        lugar.label.includes("CALL Datalink") ? {
                                            "forma_cobro": lugar.value.split("-")[0],
                                            "monto": parseFloat(total).toFixed(2),
                                            "tipo_ping": "D",
                                            "fecha": formattedToday,

                                        } : {
                                            "forma_cobro": lugar.value.split("-")[0],
                                            "monto": parseFloat(total).toFixed(2),
                                            "cuenta_bancaria_id": banco.value,
                                            "numero_comprobante": datos.asunto,
                                            "fecha": formattedToday,
                                        }
                                    ]
                                }

                                setMensaje({
                                    mensaje: "Creando factura Contifico",
                                    estado: true
                                })
                                CreaLaFacturapor(fac, singleSelect.value).then(salida => {
                                    console.log(salida)
                                    let fat = "001-001-00000" + facnum

                                    if (salida.documento) {
                                        VerificaError()
                                        setimpri(true)
                                        document.getElementById("pagos").reset();
                                        setOpen(false)
                                        openNotificationWithIcon('success', "Factura creada", "Factura número 001-001-00000" + salida.documento + " creada con éxito")


                                    }
                                }).catch(error => {
                                    console.log(error)
                                    setOpen(false)
                                    openNotificationWithIcon('error', "Hubo un error inesperado a", "No se Genero Factura")
                                })
                            } else {
                                setOpen(false)
                                openNotificationWithIcon('error', "Hubo un error", "No se genero el numero incremental")
                            }
                        }).catch(err => {
                            console.log(err)
                            setOpen(false)
                            openNotificationWithIcon('error', "Hubo un error ", "No se Genero el número incremental de factura")
                        })
                        //crea factura

                    }
                    else {
                        //muestra mensaje de errror
                        setOpen(false)
                        openNotificationWithIcon('error', "Hubo un error inesperado ", "" + fact.mensaje)
                        console.log(fact)
                    }
                }).catch(err => {
                    setOpen(false)
                    console.log(err)
                })
            }
        }
        if (lugar.label.includes("TARJETA")) {

            if (datos.asunto.trim().length == 0 && banco.label.trim() == "") {
                setOpen(false)
                openNotificationWithIcon('error', "Ingrese número de Autorización", "")
                /*
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
                                })*/
            }
            let datosdefactura = {
                "token": nombres.telefono,
                "idfactura": singleSelect.value,
                "pasarela": lugar.label,
                "cantidad": total,
                "idtransaccion": datos.asunto,
                "nota": banco.label + "/" + datos.mensaje
            }
            setOpen(true)
            setMensaje({
                mensaje: "Registrando factura en el portal ",
                estado: true
            })
            PagoFacturacomnet(datosdefactura).then(fact => {
                if (fact.estado == "exito") {
                    setimpri(true)
                    openNotificationWithIcon('success', "Pagado en el portal", "")
                    setOpen(true)
                    setMensaje({
                        mensaje: "Obteniendo número de factura",
                        estado: true
                    })
                    IncremetoFacturaS().then(num => {
                        if (!num.status) {
                            setOpen(false)
                            openNotificationWithIcon('error', "No se genero el numero de factura", "")
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
                                "cedula": usuario.cedula.trim().substring(0, 10),
                                "razon_social": usuario.nombre,
                                "telefonos": usuario.movil,
                                "direccion": !emailRegex.test(usuario.direccion_principal) ? "" : usuario.direccion_principal,
                                "tipo": "N",
                                "email": validarCorreoElectronico(usuario.correo) ? usuario.correo.replace(".@","@") : "",
                                es_extranjero: (usuario.cedula.trim().length < 9)
                            },
                            "vendedor": {
                                "ruc": "0992782129001",
                                "razon_social": "COMPUTECNICSNET S.A",
                                "telefonos": "5104910",
                                "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
                                "tipo": "J",
                                "email": "facturacion@speed.ec",
                                es_extranjero: (usuario.cedula.trim().length < 9)
                            },
                            //contifico[0].
                             "descripcion": usuario.cedula.trim().substring(0, 10)+" "+singleSelect.value,
                            "subtotal_0": 0,
                            "subtotal_12": (total) / 1.12,
                            "iva": (parseFloat((total) - parseFloat((total) / 1.12))).toFixed(2),
                            "total": parseFloat(total).toFixed(2),
                            "detalles": [
                                {
                                    "producto_id": totalcon.id,
                                    "cantidad": 1,
                                    "precio": (total) / 1.12,
                                    "porcentaje_iva": 12,
                                    "porcentaje_descuento": 0,
                                    "base_cero": 0,
                                    "base_gravable": (total) / 1.12,
                                    "base_no_gravable": 0
                                }
                            ],
                            "cobros": [
                                {
                                    "forma_cobro": lugar.value.split("-")[0],
                                    "monto": parseFloat(total).toFixed(2),
                                    "tipo_ping": "D",
                                    "fecha": formattedToday,
                                }
                            ]
                        }
                        setOpen(true)
                        setMensaje({
                            mensaje: "Creando factura electrónica",
                            estado: true
                        })
                        CreaLaFacturapor(fac, singleSelect.value).then(salida => {
                            let fat = "001-001-00000" + facnum
                            console.log(salida)
                            if (salida.documento) {
                                VerificaError()
                                document.getElementById("pagos").reset();
                                seTlist([])
                                setOpen(false)
                                openNotificationWithIcon('success', "Factura electrónica creada", "número:" + salida.documento)
                            }
                            console.log(salida)
                        }).catch(erro => {
                            setOpen(false)
                            openNotificationWithIcon('error', "Hubo un error inesperado no se registro factura electronica", "" + erro)
                            console.log(erro)
                        })
                    }).catch(err => {
                        setOpen(false)
                        console.log(err)
                    })
                } else {
                    setOpen(false)
                    openNotificationWithIcon('error', "Hubo un error inesperado ", "" + fact.mesaje)
                    console.log(fact)
                }
            }).catch(err => {
                setOpen(false)
                openNotificationWithIcon('error', "Hubo un error al registar la factura en el portal", "" + err)
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
            setOpen(true)
            setMensaje({
                mensaje: "Registrando factura",
                estado: true
            })
            PagoFacturacomnet(datosdefactura).then(fact => {
                if (fact.estado == "exito") {
                    /*  $.get("demo.asp", function (data, status) {
                          alert("Data: " + data + "\nStatus: " + status);
                      });*/
                    setimpri(true)
                    setOpen(false)
                    openNotificationWithIcon('success', "Pagado en el portal", "")

                    if (true) {
                        setOpen(true)
                        setMensaje({
                            mensaje: "Obteniendo numero de factura",
                            estado: true
                        })
                        IncremetoFacturaS().then(num => {
                            if (num.status) {
                                console.log(num)
                                if (!num.status) {
                                    setOpen(false)
                                    openNotificationWithIcon('error', "No se Genero número incremental de la factura", "")
                                    return;
                                }
                                setOpen(true)
                                setMensaje({
                                    mensaje: "Creando Factura Electrónica",
                                    estado: true
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
                                     "descripcion": usuario.cedula.trim().substring(0, 10)+" "+singleSelect.value,
                                    "subtotal_0": 0,
                                    "subtotal_12": (total) / 1.12,
                                    "iva": (parseFloat((total) - parseFloat((total) / 1.12))).toFixed(2),
                                    "total": parseFloat(total).toFixed(2),
                                    "cliente": {
                                        "ruc": null,
                                        "cedula": usuario.cedula.trim().substring(0, 10),
                                        "razon_social": usuario.nombre,
                                        "telefonos": usuario.movil,
                                        "direccion": !emailRegex.test(usuario.direccion_principal) ? "" : usuario.direccion_principal,
                                        "tipo": "N",
                                        "email": validarCorreoElectronico(usuario.correo) ? usuario.correo.replace(".@","@") : "",
                                        es_extranjero: (usuario.cedula.trim().length < 9)
                                    },
                                    "vendedor": {
                                        "ruc": "0992782129001",
                                        "razon_social": "COMPUTECNICSNET S.A",
                                        "telefonos": "5104910",
                                        "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
                                        "tipo": "J",
                                        "email": "facturacion@speed.ec",
                                        es_extranjero: (usuario.cedula.trim().length < 9)
                                    },
                                    "detalles": [
                                        {
                                            "producto_id": totalcon.id,
                                            "cantidad": 1,
                                            "precio": (total) / 1.12,
                                            "porcentaje_iva": 12,
                                            "porcentaje_descuento": 0,
                                            "base_cero": 0,
                                            "base_gravable": (total) / 1.12,
                                            "base_no_gravable": 0
                                        }
                                    ],
                                    "cobros": [
                                        {
                                            "forma_cobro": lugar.value.split("-")[0],
                                            "monto": parseFloat(total).toFixed(2),
                                            "fecha": formattedToday,
                                        }
                                    ]
                                }
                                CreaLaFacturapor(fac, singleSelect.value).then(salida => {
                                    setOpen(false)
                                    let fat = "001-001-00000" + facnum
                                    console.log(salida)
                                    if (salida.documento) {
                                        VerificaError()
                                        setimpri(true)
                                        seTlist([])
                                        document.getElementById("pagos").reset();
                                        setOpen(false)
                                        openNotificationWithIcon('success', "Factura electronica creada con éxito", "numero " + salida.documento)
                                    }
                                    console.log(salida)
                                }).catch(error => {
                                    setOpen(false)
                                    openNotificationWithIcon('error', "Hubo un error no se genero la factura Electrónica", "")
                                    console.log(error)
                                })


                                console.log(num)

                                console.log(datos)
                            }

                            else {
                                console.log(num)
                            }

                        }).catch(err => {
                            setOpen(false)
                            openNotificationWithIcon('error', "No se genero la facura", "")

                            /* dismiss()
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
                             })*/
                            console.log(err)
                        })

                    }
                    else {
                        setimpri(true)
                    }

                } else {
                    setOpen(false)
                    openNotificationWithIcon('error', "Hubo un error inesperado ", "" + fact.mensaje)
                    console.log(fact)
                }
            }).catch(err => {
                setOpen(false)
                openNotificationWithIcon('error', "Error al crear Factura en portal", "")
                console.log(err)
            })

            //  console.log(datosdefactura, fac)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            buscar()
        }
    };
    return (
        <div>
            <SimpleDialogop
                open={openServ}
                servicios={servicio}
                onClose={closeDialo}
            />
            <SimpleDialog
                selectedValue={mesaje.mensaje}
                open={open}
                estado={mesaje.estado}
            />
            {contextHolder}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} >
                    <MainCard contentSX={{ p: 2.25 }} style={{ marginBottom: "15px" }}>
                        <div className="">

                            <Grid style={{ paddingTop: "15px" }} spacing={1.5}>

                                <Typography variant="h6" className="py-2"  >
                                    {usuario.nombre == "" ? "" : <div className={usuario.facturacion.facturas_nopagadas == "0" ? " bg-secondary container-fluid   text-center py-2 rounded-2  " : " bg-danger container-fluid   text-center py-2 rounded-2 "}>
                                        <span className=" text-white">   {
                                            "El cliente cuenta con " + usuario.facturacion.facturas_nopagadas + " Facturas vencidas (Total:" + usuario.facturacion.total_facturas + ")"

                                        }
                                        </span>
                                    </div>}
                                </Typography>
                                <Typography variant="h6"  >
                                    Id contifico: {totalcon.id}/ Estado contifico : {totalcon.estado} / Total producto : {parseFloat(totalcon.total).toFixed(2)} <p className="px-2">{JSON.stringify(impri)}</p>
                                </Typography>
                            </Grid>
                            <div className="col-12  d-flex  justify-content-between align-items-center ">
                                <h5 className=" text-dark">{usuario.nombre}
                                </h5>
                                {usuario.estado === "ACTIVO" ? <span className='badge p-2 pb-3  bg-success texte-center  '> ACTIVO</span> : ""}
                                {usuario.estado === "SUSPENDIDO" ? <span className='badge p-3 bg-danger '>SUSPENDIDO</span> : ""}
                                {usuario.estado === "RETIRADO" ? <span className='badge p-3 bg-warnig '>RETIRADO</span> : ""}

                            </div>
                            <div className=" container text-center mb-3 py-3">

                                <span className=""
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                >Comprobante a pagar</span>
                                {factura.urlpdf == "" ?
                                    <a href={factura.urlpdf}
                                        target="_blank"
                                    >
                                        <i className="px-2 bi bi-file-earmark-pdf"></i>
                                    </a>
                                    : <i className="px-2 bi bi-file-earmark-pdf"></i>}
                                {!impri ? "" : <button className=" btn btn-defaul"
                                    onClick={creaComprobante}
                                >
                                    <i className=" px-3 bi bi-printer-fill"></i>Imprimir Comprobante
                                </button>}

                            </div>
                        </div>
                    </MainCard>
                </Grid>

                <Grid item xs={12} md={6} >
                    <MainCard contentSX={{ p: 2.25 }}>
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
                                        onKeyPress={handleKeyPress}
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

                        {busca ? "" : <form id='pagos' noValidate style={{ paddingTop: '15px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} >
                                    {list.length > 0 ? <Stack spacing={1}>
                                        <InputLabel>Factura a Pagar </InputLabel>
                                        <Selectopction
                                            name="factura"
                                            options={list}
                                            value={singleSelect}
                                            placeholder="Factura"
                                            onChange={(e) => comprobante(e)} />
                                    </Stack> :
                                        <Stack spacing={1}>
                                            <InputLabel>Facturas a Pagar </InputLabel>
                                            <select className='form-control' disabled>
                                                <option ></option>
                                            </select>
                                        </Stack>
                                    }

                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="firstname-signup">Formas de pago</InputLabel>
                                        <Selectopction
                                            name="Forma"
                                            options={[
                                                { value: "EF-Oficina/Matriz", label: "Efectivo Oficina/Matriz" },
                                                { value: "EF-Oficina/Ecocity", label: "Efectivo Oficina/Ecocity" },
                                                { value: "TC-Oficina/Matriz", label: "CALL Datalink" },
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

                                    </Stack>
                                </Grid>

                                {lugar.value.includes("TRA") ?
                                    <Grid item xs={12} md={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="firstname-signup">Bancos</InputLabel>
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
                                        </Stack>
                                    </Grid> : ""}


                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="lastname-signup">Nº transación</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            name="asunto"
                                            value={datos.asunto}
                                            onChange={(e) => handelChange(e.target)}
                                        />

                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="company-signup">Total a pagar</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            name="valor"
                                            value={total}
                                            onChange={handelChangeT}
                                            inputProps={{}}
                                        />

                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="company-signup">Notas</InputLabel>
                                        <textarea className=' form-control'
                                            rows={4}
                                            name="mensaje"
                                            value={datos.mensaje}
                                            onChange={(e) => handelChange(e.target)}

                                        />

                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider className="">
                                        <div className=" text-center ">

                                            {cedula.length >= 10 ?
                                                <button className=" btn-primary m-1 mt-1 p-2  btn"
                                                    disabled={impri}
                                                    onClick={(e) => RegistrarPago(e)}
                                                >
                                                    Registrar Pago
                                                </button> :
                                                <button className=" btn btn-primary m-1 mt-1 p-2 "
                                                    disabled={impri}
                                                    onClick={(e) => RegistrarPago(e)}
                                                >Registro Comnet</button>
                                            }
                                        </div>
                                    </Divider>
                                </Grid>

                            </Grid>
                        </form>}
                    </MainCard>
                </Grid>
            </Grid>


        </div>
    );
};
export default PagosView;
