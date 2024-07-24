import { useEffect, useState } from "react"
import { Departamento } from "util/User"
import { useSelector } from "react-redux"

export default function TicktesVies() {
    let ticketss = useSelector((state) => state.menu.tickets)
    const thead = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">
                    <th  >#</th>
                    <th  >numero de tickets</th>
                    <th  >Id cliente</th>
                    <th >fecha_soporte</th>
                    <th >operador</th>
                    <th >agendado</th>
                    <th >Departamento </th>
                    <th >estado </th>
                </tr>
            </thead>
        )

    }

    const showDatos = () => {
        try {

            return ticketss.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                        </td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.id}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.idcliente}</td>
                        <td className=" font-weight-bold">
                            {(item.fecha_soporte).split("T")[0]}
                        </td>
                        <td className=" font-weight-bold">
                            {item.operador?item.operador:"Cliente"}
                        </td>
                        <td className=" font-weight-bold">
                            {item.agendado}
                        </td>
                        <td className=" font-weight-bold">
                            {Departamento[item.dp]}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {item.estado}</td>
                    </tr>
                )
            });
        } catch (error) { }


    }
    useEffect(() => {
        $(document).ready(function () {
            $("#doc").dataTable({
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
    }, [])
    return (
        <div>
            <table id={"doc"} className="table table-striped "
                style={{
                    width: "100%",
                }}>
                {thead()}

                <tbody>
                    {showDatos()}
                </tbody>
            </table>
        </div>
    )
}