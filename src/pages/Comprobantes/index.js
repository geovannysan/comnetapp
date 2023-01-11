import React, { useEffect, useState } from "react";
import { MostrarFacturas } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";

import "jquery/dist/jquery.slim"
import "jszip"
import "pdfmake"
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.html5.min.mjs"
import "datatables.net-responsive-dt/js/responsive.dataTables.min.mjs"
import "datatables.net-responsive-dt"

import * as $ from "jquery"
 function ComprovanteViews() {
    const [datos, setDatos] = useState([])
    const [cargar,setCargar]=useState("")
     const [expand, setExpand] = useState("")
    let user = userlog()
    useEffect(() => {
        MostrarFacturas(user.id).then(ouput => {
            console.info(ouput)
            if(ouput.estado=="exito"){
                setCargar("")
            setDatos(ouput.facturas)
            setTimeout(function(){
                if (ouput.facturas.length==0) {
                    $('#table').DataTable().clear();
                    $('#example').DataTable({
                        "bDestroy": true,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando page _PAGE_ de _PAGES_",
                            'paginate': {
                                'previous': '<span class="prev-icon"><i class="bi bi-arrow-left-square"> </i> </span>',
                                'next': '<span class="next-icon"> <i class="bi bi-arrow-right-square"> </i></span>'
                            }
                        },

                    });
                    $('#table').empty();
                    $('#table').css("width", "100%")
                    setCargar("d-none")
                }
                if (!$.fn.DataTable.isDataTable("#example")) {
                    $(document).ready(function () {
                        $("#example").dataTable({
                            pageLength: 10,
                            stateSave: true,
                            responsive: true,
                            "bDestroy": true,
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando page _PAGE_ de _PAGES_",
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
                                    className: 'dtr-control',
                                    orderable: false,
                                    targets: 0
                                }],
                            order: [1, 'asc'],

                        });

                    });
                }
                setCargar("d-none")
            },1000)
           }
        }).catch(errr => { 
            console.error(errr)
            setCargar("") 
        }
        )



    }, [])

   const showDatos = () => {

        try {
            return datos.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="">
                        </td>                        
                        <td>{item.id}</td>
                        <td>{item.legal}</td>
                        <td>{item.emitido}</td>
                        <td>{item.vencimiento}</td>
                        <td>{item.fechapago}</td>
                        <td>${item.subtotal}  </td>
                        <td>$ {item.subtotal2}</td>
                        <td>$  {item.total}</td>
                        <td>{item.estado === "vencido" ? <span className="label label-danger">{item.estado}</span> : <span className="badge bg-secondary border">{item.estado}</span>}</td>
                        <td> <a className=" btn btn-default btn-sm" ><i className="bi bi-credit-card-2-front"></i> Pagar </a> </td>
                    </tr>
                )
            });
        } catch (error) { }
    }
    return (
        <div className="container-fluid" >
            <h5></h5>

            <div className={"panel panel-default  bg-white "+ expand}>
                <div className="w-100 py-3 bg-dark d-flex justify-content-between">
                    <div className="text-white ps-2">
                        <i className="bi bi-file-earmark-pdf"></i> Comprobantes
                    </div>
                    <div  className="text-white px-3" >
                        <i className="bi bi-arrows-angle-expand" onClick={() => setExpand(expand == "panel-fullscreen" ? "" : "panel-fullscreen")}></i>
                    </div>
                </div>
                <div className="p-2 ">
                    <table id="example" className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline collapsed" width="100%" >
                        <thead className="border">
                            <tr> 
                                <th ></th>
                                <th >Nº</th>
                                <th >Nº LEGAL</th>
                                <th >EMITIDO</th>
                                <th >VENCIMIENTO</th>
                                <th >PAGADO</th>
                                <th >SUBTOTAL</th>
                                <th >IMPUESTO</th>
                                <th >TOTAL</th>
                                <th >ESTADO</th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                           
                            {showDatos()}

                        </tbody>
                    </table>

                </div>

            </div>
            <div className={cargar}
                style={{
                    display: 'none',
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
            ></div>


        </div>
    )


}
export default ComprovanteViews