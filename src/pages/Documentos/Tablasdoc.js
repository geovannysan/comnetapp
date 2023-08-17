import React, { useEffect, useState } from "react";
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent } from "@ionic/react";
import "jquery/dist/jquery.slim"
import "jszip"
import "pdfmake"
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.print"
import "datatables.net-responsive-dt/js/responsive.dataTables.min.mjs"
import "datatables.net-responsive-dt"
import $ from "jquery"
import * as moment from "moment"

export default function TablasViwe({...props}){
    const [spiner,setSpiner]=useState("")
    
    useEffect(()=>{
        setSpiner("d-none")
       // console.log(props)
       // setSpiner("")
        if (props.datos.length>0) {  
            setTimeout(function(){
           
            if (!$.fn.DataTable.isDataTable("#doc")) {
                $(document).ready(function () {
                    $("#doc").DataTable({
                        stateSave: true,
                        responsive: true,
                        "pageLength": 10,
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
                        ],
                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {

                                "responsivePriority": 1,
                                className: "",
                                targets: props.number,
                                visible: true,
                                "responsive": false
                            },
                            {
                                className: 'dtr-control',
                                targets: 0,
                                "orderable": false,
                            }],
                        order: [[0, 'desc']],

                    });
                })
                setSpiner("d-none")
                return
            }
           // setSpiner("d-none")
        },1000)}
        else{
            setSpiner("")
        }
    },[])
    return(
        <>
            <div className="">
                <div className="bg-white border shadow">
                    <div className="w-100 py-3 bg-dark">
                        <div className="text-white ps-2">
                           {props.Titel}
                        </div>
                    </div>
                    <div className="p-2">
                        <div className={"  p-0 pb-2"}
                        >
                            <table id={"doc"} className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline collapsed"
                                style={{
                                    width: "100%",
                                }}>
                                <props.thead/>

                                <tbody>
                                    {props.showDatos()}
                                </tbody>
                            </table>
                        </div>

                    </div>

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
        </>
    )
}