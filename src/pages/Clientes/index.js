import { useEffect, useState } from "react"
import { ListaClientes } from "util/Queryportal"
import { Tabs, Button } from 'antd';
import MainCard from "components/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { setClientes, setListaFactura } from "store/reducers/menu";
import { useNavigate } from "react-router-dom";

const ListarCliente = () => {
    let usedispatch = useDispatch()
    let history = useNavigate()
    // let [lista, setLista] = useState([])
    let lista = useSelector(state => state.menu.clientes)

    async function ObtenerlistaCliente() {
        try {
            let datos = await ListaClientes()
            //  console.log(datos)
            if (datos.status) {
                usedispatch(setClientes({ clientes: datos.mensaje }))
                //setLista(datos.mensaje)
                if (!$.fn.DataTable.isDataTable("#docliente")) {
                    $(document).ready(function () {
                        $("#docliente").dataTable({
                            stateSave: true,
                            responsive: true,
                            "pageLength": 10,
                            "bDestroy": true,
                            "sSearch": false,
                            paging: true,
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando page _PAGE_ de _PAGES_",
                                "sSearch": "",
                                "searchPlaceholder": "",
                                'paginate': {
                                    'previous': '<span className="prev-icon">Ant </span>',
                                    'next': '<span className="next-icon"> <i className="fa fa-arrow-right">Sigu </i></span>'
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
                                    targets: 1,
                                    visible: true,
                                    "responsive": false
                                },
                                {

                                    "responsivePriority": 1,
                                    className: "hidden-lg",
                                    targets: -1,
                                    visible: true,
                                    "responsive": false
                                }
                            ],
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel', 'pdf'
                            ],
                            lengthMenu: [
                                [10, 20, 30, 50, -1],
                                [10, 20, 30, 50, "All"],
                            ],

                            order: [[0, 'desc']],

                        });
                    })
                }
            }
            return datos
        } catch (error) {
            return error
        }
    }
    useEffect(() => {

        ObtenerlistaCliente()


    }, [])
    const thead = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">
                    <th  >#</th>
                    <th  >Cliente</th>
                    <th >cédula</th>
                    <th >código</th>
                    <th >Ver</th>
                </tr>
            </thead>
        )
    }
    const showDatos = () => {
        try {
            return lista.filter(es => es.estado != "0").map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.Id}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.username}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.cedula}</td>
                        <td className=" font-weight-bold">
                            {(item.respuestados).substring(1, 5)}
                        </td>
                        <td>
                            <Button type="primary" size='small' onClick={() => history("/clientes/" + item.cedula)}  >
                                <i className="fa fa-eye"></i>
                            </Button>

                        </td>
                    </tr>
                )
            });
        } catch (error) { }
        var tabEl = document.querySelector('button[data-bs-toggle="tab"]')
        tabEl.addEventListener('shown.bs.tab', function (event) {
            event.target // newly activated tab
            event.relatedTarget // previous active tab
        })
    }
    return (
        <MainCard contentSX={{ p: 2.25 }}>


            <table id={"docliente"} className="table table-bordered table-striped "
                style={{
                    width: "100%",
                }}>
                {
                    thead()
                }
                <tbody>
                    {
                        showDatos()
                    }
                </tbody>

            </table>



        </MainCard>
    )
}
export default ListarCliente