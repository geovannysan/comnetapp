import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EliminarSolict, listarSolicitud } from "util/Queryportal";
import { userlog } from "util/User";
import MainCard from 'components/MainCard';
import moment from "moment/moment";
import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
export default function SolicitudView() {
    const [datos, setDatos] = useState([])
    let history = useNavigate()
    const [spiner, setSpiner] = useState("d-none")
    const [spinerdos, setSpinerdos] = useState("d-none")
    const [openStates, setOpenStates] = useState({});

    const handleOpenChange = (itemId) => (newOpenState) => {
        setOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [itemId]: newOpenState,
        }));
    };

    const confirm = (itemId) => {
        EliminarSolict(itemId).then(oup => {
            if (oup.estado) {
                history("/")
                setTimeout(function () {
                    history("/Solicitud")
                }, 1000)
            }
        })


        /*   */
        //console.log(itemId)
    };

    const cancel = () => {
    };

    async function abreir(e) {
        history("/detalle/" + e.Id)
    };

    function validarFormatoFechaHora(cadena) {
        // Expresión regular para el formato ISO 8601
        const formatoISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

        // Verifica si la cadena coincide con el formato ISO 8601
        return formatoISO8601.test(cadena);
    }
    useEffect(() => {
        listarSolicitud(2).then(sali => {
           
          let newdatos=  sali.data.map(e=>{
               // console.log(e.Prioridad)
                let pr = validarFormatoFechaHora(e.Prioridad) ? e.Prioridad :JSON.parse(e.Prioridad)
                let date = !validarFormatoFechaHora(e.Prioridad) ?{
                    cierre:pr.fin,
                    inicio: pr.inicio,
                    cantiadad:pr.monto
                }:{...e}
                return{
                    ...e,
                    ...date,
                    Prioridad:pr
                }
            })
            console.log(newdatos)
            setDatos(newdatos)
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

                            order: [[3, 'desc']],

                        });
                    })
                }
                setSpiner("")
                setSpinerdos("d-none")
            }, 1000)
        }).catch(errr => {
            console.log(errr)
        })
        if (userlog().cedula == "0930570395" || userlog().cedula == "0999999999") {
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
            return datos.map((item, index) => {
                
                let anticipo = item.cantiadad == null ? item.Prioridad.monto : item.cantiadad 
                
                return (
                    <tr key={index}>

                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.asunto}</td>
                        <td className=" font-weight-bold" style={{
                            whiteSpace: "initial"
                        }}>{item.Tipo == "Trabajos" ? item.Tipo + "\n Tecnico Responsable:" + item.Nombre + "\n Hora inicio:" + moment(item.inicio).format('YYYY/MM/DD h:mm a') + "\n Hora de cirre: " + moment(item.cierre).format('YYYY/MM/DD h:mm a')   : ""}
                            {item.Tipo == "Anticipo" ? item.Tipo + "\nSolicitante:" + item.Nombre + "\n Valor solicitado:" + anticipo : ""}
                            {item.Tipo == "Permiso" ? item.Tipo + "\nSolicitante:" + item.Nombre + "\n Días" + item.cantiadad + "\n Fecha solicitada:" + moment(item.Prioridad).format('YYYY/MM/DD h:mm a') : ""}
                        </td>
                        <td className="text-xs font-weight-bold">{item.cedula}</td>
                        <td className="text-xs font-weight-bold">{moment(item.fecha).format('YYYY/MM/DD')}</td>

                        <td className="text-xs font-weight-bold">
                            {item.estado}

                        </td>

                        <td className="text-xs font-weight-bold">
                            <button className="btn btn-sm btn-success" onClick={() => abreir(item)}>ver</button>
                            <Popconfirm
                                title="Eliminar solicitud"
                                description="Estas seguro@ de eliminar esta solicitud?"
                                open={openStates[item.Id] || false}
                                onOpenChange={handleOpenChange(item.Id)}
                                onConfirm={() => confirm(item.Id)}
                                onCancel={cancel}
                                okText="Si"
                                cancelText="No"
                            >
                                <button className="btn btn-sm btn-danger"><DeleteOutlined /> </button>
                            </Popconfirm>
                        </td>



                    </tr>
                )                   
            });
        } catch (error) { }
    }
    return (
        <>


            {userlog().cedula == "0930570395" || userlog().cedula == "0999999999"? 
            <MainCard contentSX={{ p: 2.25 }} style={{ marginBottom: "15px" }}>
                <div className={spiner + "table-responsive"}>

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
            </MainCard>:""}
        </>

    )
}