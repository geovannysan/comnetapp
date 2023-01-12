import React from "react";
import { IonModal,IonHeader,IonToolbar,IonButtons,IonButton,IonTitle,IonContent } from "@ionic/react";
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
import { userlog } from "../../../utils/User";
import { ListarTicket } from "../../../utils/Queryuser";
//window.JSZip = JSZip;

class Datatablesoporte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            estdo: "",
            modal:false

        };
    }

abrir=()=>{
    this.setState({ modal: true })
}

    componentDidMount() {
        let datos= userlog()
      // this.abrir()
 
        ListarTicket(datos.id).then(response => {
            console.log(response)
            if(response.estado!=="exito"){
                $('#doc').DataTable({
                    "bDestroy": true,
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
                        "info": "Mostrando page _PAGE_ de _PAGES_",
                        'paginate': {
                            'previous': '<span class="prev-icon"><i class="bi bi-arrow-left-square"> </i> </span>',
                            'next': '<span class="next-icon"> <i class="bi bi-arrow-right-square"> </i></span>'
                        }
                    },
                });
                $('#table').DataTable().destroy();
                $('#table').empty();
                $('#table').css("width", "100%")
                this.setState({ estdo: "d-none" })
                return
            }
          
            this.setState({ data: response.data.tickets })
            if ($.fn.dataTable.isDataTable('#doc')) {
                $('#table').DataTable().clear();
                $('#table').DataTable().destroy();
                $('#table').empty();
                $('#table').css("width", "100%")
            }
            if (!$.fn.DataTable.isDataTable("#doc")) {
                $(document).ready(function () {
             $("#doc").dataTable({
                        pageLength: 10,
                        stateSave: true,
                        responsive: true,
                        "searching": true,
                        "bDestroy": true,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
                            "info": "Mostrando page _PAGE_ de _PAGES_",
                            'paginate': {
                                'previous': '<span class="prev-icon"><i class="bi bi-arrow-left-square"> </i> </span>',
                                'next': '<span class="next-icon"> <i class="bi bi-arrow-right-square"> </i></span>'
                            }
                        },
                        dom: "Bfrtip",
                        select: {
                            style: "single",
                        },
                        buttons: [
                            'excelHtml5',
                            {
                                text: 'Nuevo Ticket',
                                className: "dt-button-ligth shadow-sm d-none",
                                attr: {
                                    id: 'open-modal'
                                },
                                action: function abrir() {
                                   // nuevos()
                                }
                            }
                        ],

                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {
                                className: 'dtr-control',
                                orderable: false,
                                targets: 0,

                            }],
                        order: [1, 'asc'],

                    });
                })

            }
            this.setState({ estdo: "d-none" })

        }
        ).catch(err => {
            console.log(err)
            this.setState({ estdo: "d-none" })
        })

    }

    showDatos = () => {
        try {
            return this.state.data.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="">
                        </td>

                        <td className="text-xs font-weight-bold">{item.id}</td>
                        <td className="text-xs font-weight-bold">{item.asunto}</td>
                        <td className="text-xs font-weight-bold">{item.fecha_soporte}</td>

                        <td className="text-xs font-weight-bold">{item.estado}</td>
                        <td className="text-xs font-weight-bold">{item.lastdate}</td>
                        <td className="text-xs font-weight-bold"></td>

                    </tr>
                )
            });
        } catch (error) { }
    }
    showModal=()=>{
        try {
            return(<IonModal isOpen={this.state.modal}
            backdropDismiss={false}
            >
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => this.setState({ modal: false })}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle></IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={()=>this.setState({modal:false})}>
                                Confirm
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <div className="row   bg-primary1">
                        <div className=" col-12 bg-danger   border" 
                            >
                                ss

                        </div>
                        <div className="col-12">

                        </div>
                        <div className="col-12">

                        </div>
                    </div>
                  
                </IonContent>
            </IonModal>)
            
        } catch (error) {
            
        }
        
    }
    render() {
        return (
            <>
                <div className=" container w-100 h-100  " style={{
                    display: "fixed",
                    height: "100%",
                    width: "100%",
                    zIndex: 1000,
                    background: "black"

                }}>

                </div>
                <div className="container-fluid "
                >
                   
                    <div className="bg-white border shadow">
                        <div className="w-100 py-3 bg-dark">
                            <div className="text-white ps-2">
                                <i className="bi bi-file-earmark-pdf"></i> Soporte
                            </div>
                        </div>
                        <div className="p-2">
                            <div className={"  p-0 pb-2"}
                            >
                                <div className="doc_wrapper py-2">
                                    <button className="dt-button dt-button-ligth shadow-sm"
                                        onClick={() => this.setState({ modal: true })}
                                    > Nuevo Ticket </button>
                                </div>
                                <table id="doc" className="table table-bordered nowrap"
                                    style={{
                                        width: "100%",

                                    }}
                                >
                                    <thead className="">
                                        <tr className="border ">
                                            <th className=" text-center" >ver</th>
                                            <th className="sorting" >No</th>
                                            <th >Asunto</th>
                                            <th >Fecha</th>
                                            <th >Estado</th>
                                            <th >Última Rspta.</th>
                                            <th ></th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.showDatos()}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                    {this.showModal()}
                    <div className={this.state.estdo}
                        style={{
                            display: 'none',
                            position: 'fixed',
                            height: "100%",
                            left: '0',
                            bottom: '0',
                            width: '100%',
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: '3'
                        }}
                    ></div>

                </div>

            </>)
    }

}
export default Datatablesoporte