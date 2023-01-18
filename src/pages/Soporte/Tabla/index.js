import React, { useEffect, useState } from "react";
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon } from "@ionic/react";
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
import { ListarTicket } from "../../../utils/Queryuser";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../StoreRedux/Slice/UserSlice";
//window.JSZip = JSZip;

export default function Datatablesoporte() {
    let usedispatch=  useDispatch()
    let modal = useSelector((state) => state.usuario.modal)
    const [spiner, setSpiner] = useState("")
    const [datos, setDatos] = useState([])
   // console.log(modal)
    const abrir = () => {
        usedispatch(setModal({ nombre: "Soporte", payloa: "" }))
       // console.log("datos")
    }
    useEffect(() => {
        let datos = userlog()
        setSpiner("")
        ListarTicket(datos.id).then(response => {
            console.log(response)
            if (response.estado == "exito") {
                setDatos(response.data.tickets)
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
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando page _PAGE_ de _PAGES_",
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

    }, [])
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
            return (<IonModal isOpen={modal.nombre==="Soporte"}
                backdropDismiss={false}
            >
                <IonHeader className=" ion-toolbar-transparent border-0">
                    <IonToolbar >
                        <IonButtons slot="start">
                            <IonButton className="d-none" onClick={() => usedispatch(setModal({nombre:"",payloa:""}))}>
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
                            fontWeight:"bold"
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

    return (
        <>
            <div className="">
                <div className="bg-white border shadow">
                    <div className="w-100 py-3 bg-dark">
                        <div className="text-white ps-2">
                            <i className="bi bi-file-earmark-pdf"></i> Soporte
                        </div>
                    </div>
                    <div className="p-2">
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

                <div className={spiner}
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
            </div>
        </>)


}