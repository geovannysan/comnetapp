import React, { useEffect, useState } from "react";
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon, IonCardSubtitle, getPlatforms, IonList, IonItem, IonLabel, useIonLoading, useIonToast } from "@ionic/react";
import "jquery/dist/jquery.slim"
import "jszip"
import "pdfmake"
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.print"
import "datatables.net-responsive-dt/js/responsive.dataTables.min.mjs"
import "datatables.net-responsive-dt"
import $ from "jquery"
import { close } from "ionicons/icons";
import * as moment from "moment"
import { userlog } from "../../../utils/User";
import { Equipos, ListarTicket, Newtickte } from "../../../utils/Queryuser";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../StoreRedux/Slice/UserSlice";
import { Editor } from 'react-draft-wysiwyg';
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorConvertToHTML } from "./Texarea";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { DetalleOlt, Detalleoltport, Get_onu_signal, Gt_onu_status } from "../../../utils/Querystados";
import { obtenervaariables } from "../../Home/parsesmart";

//window.JSZip = JSZip;

export default function Datatablesoporte() {
    let usedispatch = useDispatch()
    const [present] = useIonToast();
    let [presentlo, dismiss] = useIonLoading()
    let modal = useSelector((state) => state.usuario.modal)
    const infouser = useSelector((state) => state.usuario.user)
    let infor = obtenervaariables(infouser.servicios[0].smartolt).onu_external_id
    // console.log(obtenervaariables(infouser.servicios[0].smartolt))
    const [spiner, setSpiner] = useState("")
    const [datos, setDatos] = useState([])
    const [contentState, setContentState] = useState({})
    const [señal, setSeñal] = useState({
        onu_signal_value: "",
        onu_status: "",
        onu_signal: ""
    })
    // console.log(modal)
    const abrir = () => {
        usedispatch(setModal({ nombre: "Soporte", payloa: "" }))
        // console.log("datos")
    }
    function onContentStateChange(contentState) {
        setContentState(contentState)
    }


    useEffect(() => {
        let datos = userlog()
        setSpiner("")
        ListarTicket(datos.id).then(response => {
            console.log(response)
            if (response.estado == "exito") {
                setDatos(response.data.tickets)
                let soport = response.data.tickets.filter(e => e.estado == "abierto")
                Soporte(soport.length)
            }
            setTimeout(function () {
                if ($.fn.dataTable.isDataTable('#doc')) {
                    $('#table').DataTable().clear();
                    $('#table').DataTable().destroy();
                    $('#table').empty();
                    $('#table').css("width", "100%")
                }
                if (!$.fn.DataTable.isDataTable("#doc")) {
                    $(document).ready(function () {
                        $("#doc").dataTable({
                            stateSave: true,
                            responsive: true,
                            "pageLength": 15,
                            "bDestroy": true,
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando de_START_ a _END_ de _TOTAL_ Pagina _PAGE_ de _PAGES_",
                                "sSearch": "",
                                "searchPlaceholder": "Buscar...",
                                'paginate': {
                                    'previous': '<span class="prev-icon"><i class="bi bi-caret-left"> </i> </span>',
                                    'next': '<span class="next-icon"> <i class="bi bi-caret-right"> </i></span>'
                                }
                            },
                            dom: "Bfrtip",
                            select: {
                                style: "single",
                            },

                            buttons: [
                                {
                                    extend: "excelHtml5",
                                    className: "btn btn-default btn-sm",
                                },
                                {

                                    text: "<span><i class='bi bi-plus-lg'></i>Nuevo ticket</span>",
                                    className: "btn btn-default btn-sm",
                                    action: function (e, dt, node, config) {
                                        abrir()
                                    }
                                }
                            ],
                            lengthMenu: [
                                [10, 20, 30, 50, -1],
                                [10, 20, 30, 50, "All"],
                            ],
                            columnDefs: [
                                {

                                    "responsivePriority": 1,
                                    className: "",
                                    targets: 6,
                                    visible: true,
                                    "responsive": false
                                },
                                {
                                    className: 'dtr-control',
                                    targets: 0,
                                    "orderable": false,

                                }],
                            order: [[1, 'desc']],

                        });
                    })

                }
                setSpiner("d-none")
            }, 1000)
        }
        ).catch(err => {
            console.log(err)
        })
        if (obtenervaariables(infouser.servicios[0].smartolt).onu_external_id != "") {
            Get_onu_signal(obtenervaariables(infouser.servicios[0].smartolt).onu_external_id).then(ouput => {
                if (ouput.status) {
                    console.log(ouput)
                    Gt_onu_status(infouser.servicios[0].idperfil).then(ouputv => {
                        if (ouputv.status) {
                            setSeñal({
                                onu_signal_value: ouput.onu_signal_value,
                                onu_status: ouputv.onu_status,
                                onu_signal: ouput.onu_signal
                            })
                            console.log(ouputv)
                        }
                    })
                }
            })
        }
        /*Detalleoltport(obtenervaariables(infouser.servicios[0].smartolt).olt_id).then(ouput => {
            if (ouput.status) {
                let board = ouput.response.filter(e => e.board == obtenervaariables(infouser.servicios[0].smartolt).board)
                let estado = board.find(e => e.pon_port == obtenervaariables(infouser.servicios[0].smartolt).port)
                console.log(estado)
                return
            }
            console.log(ouput)
        }).catch(err => {
            console.log(err)
        })*/
        /* DetalleOlt(obtenervaariables(infouser.servicios[0].smartolt).onu_external_id).then(ouput=>{
             //console.log(ouput)
             if(ouput.status){
                 Detalleoltport(ouput.onu_details[""])
             }
         })*/

        //console.log(consultaseñal())
        /* var editor = new wysihtml5.Editor('editor', {
             toolbar: 'toolbar', // defined in file parser rules javascript
         });*/


    }, [])
    function Soporte(so) {
        let datos = localStorage.getItem("INFOUSER")
        let infos = localStorage.getItem("USERLOGIN")
        let users = JSON.parse(infos)
        let infouser = obtenervaariables(users.servicios[0].smartolt)
        Equipos(users.servicios[0].nodo).then(ou => {
            // dismiss()
            if (ou.estado == "exito") {
                dismiss()
                if (ou.routers.length > 0) {
                    console.log(ou.routers[0].estado)
                    console.log(infouser)
                    dismiss()
                    presentlo({
                        message: 'Comprobando Olt',
                        cssClass: 'custom-loading',
                        spinner: "bubbles",
                        //duration: 1500,
                    })
                    DetalleOlt(users.servicios[0].id).then(ouput => {
                        console.log(ouput)
                        if (ouput.status) {
                            dismiss()
                            presentlo({
                                message: 'Comprobando puertos olt',
                                cssClass: 'custom-loading',
                                spinner: "bubbles",
                                duration: 2500
                            })
                            // dismiss()
                            Detalleoltport(infouser.olt_id).then(ou => {
                                //console.log(ou)
                                dismiss()
                                let board = ouput.onu_details["board"]
                                let poart = ouput.onu_details["port"]
                                console.log(ouput.onu_details, ou)
                                let oltstatus = ou.response.find((e) => e.board == board && e.pon_port == poart)
                                if (!oltstatus.operational_status.includes("Up")) {
                                    /**crear pantalla con mensaje daño masivo y no se genera tickte */
                                    present({
                                        message: 'crear pantalla con mensaje daño masivo y no se genera tickte',
                                        cssClass: 'custom-loading',
                                        duration: 4500,
                                        buttons: [
                                            {
                                                text: "cerrar",
                                                role: "cancel",

                                            }
                                        ]
                                    })
                                }
                                else {
                                    dismiss()
                                    presentlo({
                                        message: 'Comprobando estado onu ',
                                        cssClass: 'custom-loading',
                                        spinner: "bubbles",
                                        // duration: 1500
                                    })
                                    Gt_onu_status(users.servicios[0].id).then(ouputv => {
                                        console.log(ouputv)
                                        if (ouputv.status) {
                                            if (ouputv.onu_status == "Los") {
                                                /* crear tickte */
                                                present({
                                                    message: 'crear pantalla con mensaje de Los',
                                                    cssClass: 'custom-loading',
                                                    duration: 4500,
                                                    buttons: [
                                                        {
                                                            text: "cerrar",
                                                            role: "cancel",

                                                        }
                                                    ]
                                                })
                                                return
                                            }
                                            if (ouputv.onu_status == "Power fail") {
                                                present({
                                                    message: 'crear gif intructivo. seria un modal con el gif',
                                                    cssClass: 'custom-loading',
                                                    duration: 4500,
                                                    buttons: [
                                                        {
                                                            text: "cerrar",
                                                            role: "cancel",

                                                        }
                                                    ]
                                                })
                                                /* Revisar conexio gif intructivo */
                                                return
                                            }
                                            if (ouputv.onu_status == "Online") {
                                                dismiss()
                                                presentlo({
                                                    message: 'Comprobando estado de la señal',
                                                    cssClass: 'custom-loading',
                                                    spinner: "bubbles",
                                                    duration: 3500
                                                })
                                                Get_onu_signal(users.servicios[0].id).then(ouput => {
                                                    if (ouput.status) {
                                                        dismiss()
                                                        console.log(ouput)
                                                        let se = ouput.onu_signal_1490.replace("-", "").replace("dBm", "")
                                                        console.log(se)
                                                        if (se < 29) {
                                                            /** mostrar servicio ok */
                                                            present({
                                                                message: 'Buena señal',
                                                                cssClass: 'custom-loading',
                                                                duration: 4500,
                                                            })
                                                        }
                                                        /*if (se > 26.50 && se < 29) {
                                                            /** tickte de revision *
                                                            

                                                        }*/
                                                        if (se > 29) {
                                                            /**visita tecnica */
                                                            let info = {
                                                                "idcliente": users.id,
                                                                "asunto": "Revision de señal",
                                                                "solicitante": users.nombre,
                                                                "fechavisita": moment().format('YYYY-MM-D'),
                                                                "turno": "MAÑANA",
                                                                "agendado": "PAGINA WEB",
                                                                "contenido": "Hola,<br> Necesito ayuda para mi conexión de internet " + ouput.onu_signal_1490 + "."
                                                            }
                                                            if (so == 0) {
                                                                present({
                                                                    message: 'Creando ticket de soporte',
                                                                    cssClass: 'custom-loading',
                                                                    duration: 4500,
                                                                })

                                                                Newtickte(info).then(oput => {
                                                                    dismiss()
                                                                    console.log(oput)
                                                                }).catch(err => {
                                                                    console.log(err)
                                                                })

                                                                return
                                                            } else {

                                                                present({
                                                                    message: 'Tienes un ticke abierto ',
                                                                    cssClass: 'custom-loading',
                                                                    duration: 4500,
                                                                })
                                                            }
                                                        }
                                                    } else {
                                                        /* present({
                                                             message: 'Hubo un error intente mas tarde',
                                                             cssClass: 'custom-loading',
                                                             duration: 4500,
                                                             buttons: [
                                                                 {
                                                                     text: "cerrar",
                                                                     role: "cancel",
 
                                                                 }
                                                             ]
                                                         })*/
                                                    }
                                                })
                                                return
                                            }

                                        }
                                    })
                                }
                                console.log(oltstatus)
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    })
                    /* OLTcardDETA(infouser.olt_id).then(oltouput => {
                         console.log(oltouput)
                     }).catch(err => {
                         console.log(err)
                     })*/
                }

            }
            else {
                /*  dismiss()
                  presentlo({
                      message: ou.mensaje,
                      cssClass: 'custom-loading',
                      spinner: "bubbles",
                      duration: 4500,
                  })*/
            }
        }).catch(err => {
            console.log(err)
        })
    }
    function fecha(item) {
        if (moment(new Date()).diff(item, 'days', true) < 31) {
            if (moment(new Date()).diff(item, 'days', true) < 2)
                return "Hace un " + moment(new Date()).diff(item, 'days', true).toFixed(1).split(".")[0] + " dias"
            else return "Hace " + moment(new Date()).diff(item, 'days', true).toFixed(1).split(".")[0] + " días"
        }
        else {
            if (moment(new Date()).diff(item, 'months', true) > 1)
                return "Hace " + moment(new Date()).diff(item, 'months', true).toFixed(1).split(".")[0] + " meses"
            else return "Hace un" + moment(new Date()).diff(item, 'months', true).toFixed(1) + "mese"

        }

    }

    const showDatos = () => {
        try {
            return datos.map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="">
                        </td>

                        <td className="text-xs font-weight-bold">{item.id}</td>
                        <td className="text-xs font-weight-bold">{item.asunto}</td>
                        <td className="text-xs font-weight-bold">{item.fecha_soporte}</td>

                        <td className="text-xs font-weight-bold">{item.estado}</td>
                        <td className="text-xs font-weight-bold">
                            {fecha(item.lastdate)}</td>
                        <td className="text-xs font-weight-bold">
                            <a className="btn btn-default btn-sm" > <i className=" bi bi-pencil"> </i></a>
                        </td>

                    </tr>
                )
            });
        } catch (error) { }
    }
    const showModal = () => {
        try {
            return (
                <IonModal isOpen={modal.nombre === "Soporte"}
                    backdropDismiss={false}

                    className="full-screen-modal"
                >
                    <IonHeader className=" ion-toolbar-transparent border-0">
                        <IonToolbar >
                            <IonButtons slot="start">
                                <IonButton className="d-none" onClick={() => usedispatch(setModal({ nombre: "", payloa: "" }))}>
                                    Cancel
                                </IonButton>
                            </IonButtons>
                            <IonTitle></IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => usedispatch(setModal({ nombre: "", payloa: "" }))}>
                                    <IonIcon md={close} />
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent >
                        <div className=" text-center px-3">
                            <h4 style={{
                                fontWeight: "bold"
                            }}>Seleccione el Departamento correcto para una mejor atención</h4>

                        </div>
                        <div className="row  h-75 px-5 pb-5 bg-primary1 ">
                            <div className="opciones col-12 m-2  px-2 rounded-3  bg-danger m-2 "
                            >
                                <h5 className="px-2">
                                    Soporte Técnico
                                </h5>
                                <ul className="px-2 subindice">
                                    <li>Lunes a Sabados 9 am a 6 pm </li>
                                    <li>Domingo Cerrado</li>
                                </ul>

                            </div>
                            <div className="opciones col-12  rounded-3 bg-primary m-2">
                                <h5 className="px-2">
                                    Ventas
                                </h5>
                                <ul className="px-2 subindice">
                                    <li>Lunes a Sabados 9 am a 6 pm </li>
                                    <li>Domingo Cerrado</li>
                                </ul>
                            </div>
                            <div className=" opciones col-12 rounded-3 bg-warning m-2" >
                                <h5 className="px-2" >
                                    Facturación
                                </h5>
                                <ul className="px-2  ">
                                    <li className=" text-bange"

                                    >Reporte de pago, Reactivación de servicios, Cambios de fecha de pagos </li>
                                </ul>
                            </div>
                        </div>

                    </IonContent>
                </IonModal>)

        } catch (error) {

        }

    }
    const ShowModalBoos = () => {
        return (
            <IonModal isOpen={false}
                backdropDismiss={false}>
                <IonHeader className=" ion-toolbar-transparent border-0">
                    <IonToolbar >
                        <IonButtons slot="start">

                        </IonButtons>
                        <IonTitle></IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => usedispatch(setModal({ nombre: "", payloa: "" }))}>
                                <IonIcon md={close} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className=" container pt-2">
                        <div className="row ">
                            <div class="col-md-12 mb-4">
                                <label>Asunto del ticket</label>
                                <input class="form-control" name="soporte[asunto]" list="listasp" required="" />
                                <datalist id="listasp">
                                    <option value="Disponibilidad del servicio por falla técnica"></option>
                                    <option value="Lentitud o baja velocidad del servicio"></option>
                                    <option value="Problemas con la antena o baja señal de equipo CPE"></option>
                                    <option value="Problemas del servicio por ausencia o falla en potencia óptica"></option>
                                    <option value="Problemas con el router o señal WIFI"></option>
                                    <option value="Cambio de clave WIFI"></option>
                                    <option value="Bloqueo de servicios o accesos a internet"></option>
                                    <option value="Falla masiva"></option>
                                    <option value="Congelamiento temporal del servicio"></option>
                                    <option value="Traslado del servicio"></option>
                                    <option value="Cambio de condiciones del servicio"></option>
                                    <option value="Suspensión Injustificada"></option>
                                    <option value="Cesión de contrato"></option>
                                    <option value="Servicios adicionales"></option>
                                    <option value="Equipos en comodato"></option>
                                    <option value="Terminación de contrato"></option>
                                    <option value="Certificaciones y paz y salvo"></option>
                                    <option value="Fidelización"></option>
                                    <option value="Reclamo sobre reporte a centrales de riesgos"></option>
                                    <option value="Cambio de periodos de facturación"></option>
                                    <option value="Reclamo sobre facturación"></option>
                                    <option value="Descuento o compensación"></option>
                                    <option value="Recurso de reposición"></option>
                                    <option value="Recurso de reposición y en subsidio de apelación"></option>
                                    <option value="Cumplimiento de una orden de la SIC"></option>
                                    <option value="Sugerencias"></option>
                                    <option value="Otras PQ"></option>
                                </datalist>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div className="form-group">
                                    <label>Archivo Ajdunto</label>
                                    <input className="form-control-file form-control" name="adjunto" type="file" accept="image/*,.pdf,.zip" />
                                </div>
                            </div>
                            <div className=" col-md-12">
                                <EditorConvertToHTML />
                            </div>
                        </div>
                    </div>

                </IonContent>
            </IonModal>
        )
    }

    return (
        <>
            <IonContent fullscreen>
                <div className="row pb-2 px-0">
                    <div className="col-12 col-md-6 pb-1 py-2">
                        <div className="card-t boxshadow border">
                            <div className='row'>
                                <div className='col-7'>
                                    <h4 style={{
                                        textTransform: "capitalize",
                                        fontSize: "0.9em",
                                        color: "#3171e0"
                                    }} >Señal </h4>

                                </div>
                                <div className='col-5  d-flex  justify-content-end'>
                                    <h4 style={{
                                        fontSize: "1em",
                                        color: "#3171e0"
                                    }}><i className=" bi  bi-router-fill p-1"></i>{señal.onu_status}  </h4>

                                </div>
                            </div>
                            <p  ><span className=' fw-bold'><i className="bi bi-reception-4 px-1"></i></span> {señal.onu_signal_value}  </p>


                            <p className="card__apply  float-end">
                                <a className="card__link " >
                                    {señal.onu_signal == "Very good" ? "Muy buena" : ""}
                                    {señal.onu_signal == "Warning" ? "Buena" : ""}
                                    {señal.onu_signal == "Critical" ? "Mala" : ""}
                                    <i className=" m-2 card_icon bi bi-hdd-network"></i></a>
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-1 py-2">
                        <div className="card-t boxshadow border">
                            <div className="row">
                                <div className="col-6">
                                    <div className="">
                                        <h4 style={{
                                            textTransform: "capitalize",
                                            fontSize: "0.9em",
                                            color: "#3171e0"
                                        }} >Estado </h4>
                                    </div>
                                    <IonCardSubtitle>
                                        Luz Verde
                                    </IonCardSubtitle>
                                    <IonCardSubtitle>
                                        Activo
                                    </IonCardSubtitle>

                                </div>
                                <div className="col-6 m-auto">
                                    <svg width="90%" height="150px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000"
                                    >

                                        <g>
                                            <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                                                <path className="line3" d="M5449.5,3817.6c-112.9-32.5-419.2-423-568.5-729.3c-103.4-206.7-187.6-446-237.4-670c-47.9-224-47.9-819.3,0-1043.2c105.3-476.6,306.3-882.4,612.5-1234.6c178-202.9,277.5-231.6,402-114.9c40.2,38.3,51.7,67,51.7,130.2c0,70.8-13.4,97.6-124.4,227.8c-235.4,275.6-382.8,536-476.6,832.7c-224,710.2-68.9,1539,390.5,2080.7c189.5,222,210.6,256.5,210.6,329.2c0,88.1-44,151.2-126.3,185.7c-34.5,15.3-67,26.8-68.9,24.9C5510.7,3836.8,5482,3827.2,5449.5,3817.6z" />
                                                <path className="line3" d="M8910.3,3815.7c-68.9-19.1-137.8-111-137.8-183.8c0-63.2,30.6-112.9,147.4-243.1c403.9-446,618.3-1093,560.8-1688.3c-47.9-511.1-254.6-980-583.8-1326.5c-132.1-137.8-151.2-201-93.8-308.2C8839.4-5,8944.7-54.7,9023.2-37.5c67,15.3,239.3,189.5,382.8,390.5c208.7,292.9,359.9,643.2,442.2,1022.2c59.3,277.6,59.3,763.8,0,1041.3c-107.2,497.7-333.1,939.8-645.1,1261.4C9063.4,3823.4,9015.5,3846.3,8910.3,3815.7z" />
                                                <path className="line1" d="M5928,3164.9c-178-164.6-382.8-518.7-453.7-790.5c-135.9-509.2-45.9-1058.5,243.1-1489.2c128.3-191.4,266.1-336.9,323.5-342.6c149.3-9.6,252.7,68.9,252.7,193.3c0,51.7-17.2,91.9-57.4,143.6c-32.5,38.3-90,111-130.2,160.8c-101.4,126.3-199.1,331.2-245,520.7c-57.4,227.8-45.9,555.1,28.7,775.2c61.3,183.8,168.4,369.4,287.1,501.5c47.9,53.6,95.7,118.7,107.2,147.4c45.9,124.4-53.6,260.3-193.3,260.3C6029.4,3245.3,5998.8,3231.9,5928,3164.9z" />
                                                <path className="line1" d="M8269,3199.4c-109.1-101.5-93.8-191.4,65.1-380.9c128.3-151.2,245-377.1,296.7-568.5c51.7-187.6,47.9-539.8-7.6-733.1c-65.1-231.6-176.1-426.9-335-601.1C8161.8,779.9,8179,615.2,8326.4,554c97.6-42.1,176.1-9.6,296.7,126.3c210.6,231.6,384.7,601,436.4,924.5c55.5,346.5-7.7,773.3-164.6,1098.7c-72.8,151.2-262.2,415.4-354.1,491.9C8460.4,3262.5,8339.8,3264.4,8269,3199.4z" />
                                                <path className="line2" d="M6496.5,2579.2c-352.2-365.6-354.1-1001.1-5.7-1362.9c82.3-84.2,101.4-95.7,170.4-95.7c99.5,0,191.4,70.8,208.6,162.7c11.5,68.9-5.7,114.8-90,220.1c-30.6,36.4-70.8,105.3-91.9,153.1c-101.4,235.4-63.2,423,143.6,708.2c38.3,51.7,45.9,82.3,38.3,134c-15.3,97.6-105.3,172.3-206.7,172.3C6592.2,2671,6573,2659.6,6496.5,2579.2z" />
                                                <path className="line2" d="M7721.6,2644.3c-59.3-32.5-95.7-101.5-97.6-178c0-42.1,24.9-93.8,86.1-174.2c107.2-143.6,143.6-243.1,143.6-396.2s-36.4-254.6-143.6-398.1c-109.1-145.5-116.8-235.4-30.6-321.6c70.8-68.9,199.1-78.5,275.6-17.2c61.3,49.8,206.7,269.9,248.8,377.1c122.5,313.9,63.2,692.9-151.2,985.8C7949.3,2661.5,7832.6,2705.5,7721.6,2644.3z" />
                                                <path fill="#5e5a5ada" d="M7155,2073.8c-21-11.5-53.6-38.3-70.8-61.2c-30.6-36.4-34.4-139.7-34.4-1403.1V-755.3H4050.2c-3300,0-3143,3.8-3391.9-118.7c-252.7-122.5-476.6-417.3-536-700.6c-34.5-162.7-26.8-1117.9,7.6-1257.6c93.8-365.6,356-635.5,727.4-750.4c109.1-32.5,287.1-34.5,4144.2-34.5s4035,1.9,4144.2,34.5c340.7,105.3,581.9,331.2,704.4,660.4c36.4,99.5,40.2,157,47.9,664.2c7.7,625.9-1.9,710.2-105.3,926.5c-86.1,179.9-269.9,367.5-446,457.5c-218.2,109.1-308.2,118.7-1142.8,118.7h-752.3v1361v1361l-65.1,65.1C7317.7,2100.6,7231.5,2115.9,7155,2073.8z M9136.1-1222.3c137.8-72.8,227.8-164.6,291-294.8l63.2-128.3v-545.5v-545.5l-51.7-109.1c-59.3-126.3-174.2-245-298.6-306.3l-90-44H5001.5H953.1l-90,44c-124.4,61.3-239.3,179.9-298.6,306.3l-51.7,109.1v545.5c0,528.3,1.9,549.4,44,639.3c59.3,128.3,126.3,214.4,214.4,271.8c162.7,109.1-109.1,101.5,4259,97.6C8939-1186,9071-1187.9,9136.1-1222.3z" />
                                                <path fill="#5e5a5ada" d="M1422-2022.5c-135.9-91.9-118.7-290.9,30.6-352.2c197.1-82.3,365.6,158.9,223.9,317.7C1602-1974.6,1510.1-1963.1,1422-2022.5z" />
                                                <path fill="#5e5a5ada" d="M2647.1-2022.5c-135.9-91.9-118.7-290.9,30.6-352.2c197.2-82.3,365.6,158.9,224,317.7C2827-1974.6,2735.2-1963.1,2647.1-2022.5z" />
                                                <path fill="#5e5a5ada" d="M3872.2-2022.5c-135.9-91.9-118.7-290.9,30.6-352.2c197.2-82.3,365.6,158.9,224,317.7C4052.1-1974.6,3960.2-1963.1,3872.2-2022.5z" />
                                                <path fill="#5e5a5ada" d="M5097.2-2022.5c-135.9-91.9-118.7-290.9,30.6-352.2c197.2-82.3,365.6,158.9,223.9,317.7C5277.2-1974.6,5185.3-1963.1,5097.2-2022.5z" />
                                                <path className="green" fill="#5e5a5ada" d="M6320.4-2024.4c-132.1-88-114.8-289,30.6-350.3c97.6-40.2,2103.7-40.2,2201.3,0c145.5,61.3,162.7,262.2,30.6,350.3l-65.1,44H7451.7H6385.5L6320.4-2024.4z" />
                                            </g></g>
                                    </svg>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-1 py-2">
                        <div className="card-t boxshadow border">
                            <div className='row'>
                                <div className='col-7'>
                                    <h4 style={{
                                        textTransform: "capitalize",
                                        fontSize: "0.9em",
                                        color: "#3171e0"
                                    }} >Reportar inconvvememte </h4>

                                </div>
                                <div className='col-5  d-flex  justify-content-end'>
                                    <h4 style={{
                                        fontSize: "1em",
                                        color: "#3171e0"
                                    }}><i className=" bi  bi-router-fill p-1"></i>{señal.onu_status}  </h4>

                                </div>
                            </div>
                            <p  ><span className=' fw-bold'><i className="bi bi-reception-4 px-1"></i></span> {señal.onu_signal_value}  </p>


                            <p className="card__apply  float-end">
                                <a className="card__link " >{señal.onu_signal == "Very good" ? "Muy buena" : ""
                                }
                                    {señal.onu_signal == "Warning" ? "Buena" : ""}
                                    {señal.onu_signal == "Critical" ? "Mala" : ""}
                                    <i className=" m-2 card_icon bi bi-hdd-network"></i></a>
                            </p>
                        </div>
                    </div>

                </div>

                {getPlatforms().some(e => e == "android") ? <IonList
                    className="border  rounded-3 "
                >
                    {
                        datos.length > 0 ?
                            datos.map((e, ind) => {
                                return (

                                    <IonItem key={ind}>
                                        <IonLabel >
                                            <h3>{e.asunto}</h3>
                                            <p>{e.fecha_soporte}</p>
                                        </IonLabel>
                                        <IonLabel slot="end">
                                            <p>{e.estado}</p>
                                        </IonLabel>

                                    </IonItem>

                                )
                            }) : ""}
                </IonList> :
                    <div className="px-0 d-none">
                        <div className="bg-white border shadow ">
                            <div className="w-100 py-3 bg-dark">
                                <div className="text-white ps-2">
                                    <i className="bi bi-file-earmark-pdf"></i> Soporte
                                </div>
                            </div>
                            <div className="p-2 d-none">
                                <div className={"  p-0 pb-2"}
                                >
                                    <table id="doc" className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline collapsed"
                                        style={{
                                            width: "100%",
                                        }}>
                                        <thead className="">
                                            <tr className="border ">
                                                <th className=" text-center" ></th>
                                                <th className="sorting" >No</th>
                                                <th >Asunto</th>
                                                <th >Fecha</th>
                                                <th >Estado</th>
                                                <th >Última Rspta.</th>
                                                <th ></th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {showDatos()}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            {showModal()}

                        </div>
                        {ShowModalBoos()}
                        <div className="container px-0 card">

                            {/*<Editor
                       
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onContentStateChange={onContentStateChange}
                        toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                        }}
                    />*/}

                        </div>

                        <div className={"d-none"}
                            style={{

                                position: 'fixed',
                                height: "100%",
                                left: '0',
                                bottom: '0',
                                width: '100%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: '3'
                            }}
                        >
                            <div className="spinner-border" >
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    </div>}
            </IonContent>
        </>)


}