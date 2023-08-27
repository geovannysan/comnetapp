import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { listarSolicitud } from "util/Queryportal";
import { userlog } from "util/User";
import MainCard from 'components/MainCard';
import moment from "moment/moment";
export default function SolicitudView() {
    const [datos, setDatos] = useState([])
    let history = useNavigate()
    const [spiner, setSpiner] = useState("d-none")
    const [spinerdos, setSpinerdos] = useState("d-none")
    async function abreir(e) {
        history("/detalle/" + e.Id)
        // setInfo(e)
        //setShowAlert(true)
    }
    useEffect(() => {
        listarSolicitud(2).then(sali => {
            console.log(sali)
            setDatos(sali.data)
            setSpinerdos("")
            setSpiner("d-none")
            setTimeout(function () {
                if (!$.fn.DataTable.isDataTable("#doc")) {
                    $(document).ready(function () {
                        $("#doc").dataTable({
                            stateSave: true,
                            responsive: true,
                            "pageLength": 15,
                            "bDestroy": true,
                            "sSearch": false,
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando page _PAGE_ de _PAGES_",
                                "sSearch": "",
                                "searchPlaceholder": "",
                                'paginate': {
                                    'previous': '<span class="prev-icon"><i class="fa fa-arrow-left"> </i> </span>',
                                    'next': '<span class="next-icon"> <i class="fa fa-arrow-right"> </i></span>'
                                }
                            },
                            "oLanguage": {
                                "sSearch": ""
                            },
                            select: {
                                style: "single",
                            },
                            columnDefs: [
                                {

                                    "responsivePriority": 1,
                                    className: "",
                                    targets: 5,
                                    visible: true,
                                    "responsive": false
                                },
                                {

                                    "responsivePriority": 1,
                                    className: "",
                                    targets: 1,
                                    visible: true,
                                    "responsive": false
                                }
                            ],
                            dom: "Bfrtip",
                            buttons: [


                            ],
                            lengthMenu: [
                                [10, 20, 30, 50, -1],
                                [10, 20, 30, 50, "All"],
                            ],

                            order: [[1, 'desc']],

                        });
                    })
                }
                setSpiner("")
                setSpinerdos("d-none")
            }, 1000)
        }).catch(errr => {
            console.log(errr)
        })
        if (userlog().password == "0930570395" || userlog().password == "0999999999") {
            console.log(userlog())

        }
    }, [])
    const thead = () => {
        return (
            <thead className="">
                <tr className="border ">
                    
                    <th  >Asunto</th>
                    <th >Información completa</th>
                    <th >Ingreso</th>
                    <th >Fecha de registro</th>

                    <th >Estado </th>
                    <th >Ver </th>



                </tr>
            </thead>
        )

    }
    const showDatos = () => {
        try {
            console.log(datos)
            return datos.map((item, index) => {
                // console.log(item)
                return (
                    <tr key={index}>
                        
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.asunto}</td>
                        <td className=" font-weight-bold" style={{
                            whiteSpace: "initial"
                        }}>{item.Tipo == "Trabajos" ? item.Tipo + "\n Tecnico Responsable:" + item.Nombre + "\n Hora inicio:" + item.cantiadad + "\n Hora de cirre:" + item.Prioridad : ""}
                            {item.Tipo == "Anticipo" ? item.Tipo + "\nSolicitante:" + item.Nombre + "\n Valor solicitado:" + item.cantiadad : ""}
                            {item.Tipo == "Permiso" ? item.Tipo + "\nSolicitante:" + item.Nombre + "\n Días" + item.cantiadad + "\n Fecha solicitada:" + item.Prioridad : ""}
                        </td>
                        <td className="text-xs font-weight-bold">{item.cedula}</td>
                        <td className="text-xs font-weight-bold">{moment(item.fecha).format('YYYY/MM/DD')}</td>

                        <td className="text-xs font-weight-bold">
                            {item.estado}

                        </td>

                        <td className="text-xs font-weight-bold">
                        <button className="btn btn-success" onClick={()=>abreir(item)} >ver</button>
                        </td>



                    </tr>
                )
            });
        } catch (error) { }
    }
    return (
        <>


            <MainCard contentSX={{ p: 2.25 }} style={{ marginBottom: "15px" }}>


                <div className={spiner + " table-responsive"}>

                    <table id={"doc"} className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline collapsed"
                        style={{
                            width: "100%",
                        }}>
                        {thead()}

                        <tbody>
                            {showDatos()}
                        </tbody>
                    </table>
                </div>
                <div className={spinerdos}
                    style={{


                        height: "200px",
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
            </MainCard>
        </>

    )
}