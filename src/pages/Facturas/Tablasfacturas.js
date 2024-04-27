import { useEffect } from "react"

const Lsita_de_Factura = ({ nombre, transacion }) => {
    const thead = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">
                    <th>Pre Factura</th>
                    <th >cedula cli</th>
                    <th  ># Factura</th>

                    <th ># Transacción</th>

                    <th >Forma de Pago</th>
                    <th>Subtotal</th>
                    <th >Iva</th>
                    <th>Total</th>
                </tr>
            </thead>
        )
    }

    const showDatos = () => {
        try {
            console.log(transacion)
            return transacion.map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold">{item.idfactura}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.id ? item.persona.cedula | "" : ""}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.documento}</td>

                        <td className=" font-weight-bold">
                            {item.cobros[0].forma_cobro == "TRA" ? item.cobros[0].numero_comprobante : item.fecha}
                        </td>
                        <td className=" font-weight-bold">
                            {item.cobros[0].forma_cobro}
                        </td>
                        <td className=" font-weight-bold">
                            {item.subtotal_12}
                        </td>
                        <td className=" font-weight-bold">
                            {item.iva}
                        </td>
                        <td>
                            {item.total}
                        </td>


                    </tr>
                )
            });
        } catch (error) { }
    }

    useEffect(() => {
        transacion.length > 0 ?
            $(document).ready(function () {
                $('#' + nombre).DataTable().destroy();
                $("#" + nombre).dataTable({
                    stateSave: true,
                    responsive: true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "sSearch": false,
                    paging: true,
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "sSearch": "",
                        "searchPlaceholder": "",
                        'paginate': {
                            'previous': '<span className="prev-icon">Ant </span>',
                            'next': '<span className="next-icon"> Next</span>'
                        }
                    },
                    "oLanguage": {
                        "sSearch": ""
                    },
                    select: {
                        style: "single",
                    },
                    columnDefs: [
                    ],
                    dom: 'Bfrtip',
                    buttons: [
                        "excel",
                    ],
                    lengthMenu: [
                        [10, 20, 30, 50, -1],
                        [10, 20, 30, 50, "All"],
                    ],

                    order: [[0, 'desc']],

                });

            }) : ""
    }, [transacion])

    return (
        <table id={nombre} className="table table-striped "
            style={{
                width: "100%",
            }}>
            {thead()}

            <tbody>
                {showDatos()}
            </tbody>
        </table>
    )
}

export default Lsita_de_Factura