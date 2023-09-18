import { useEffect, useState } from "react"
import { ListarFacturas } from "util/Querireport"
import moment from "moment/moment";

const FacturasView = () => {
    const [factura, setFactura] = useState([])
    async function getFactura() {
        try {
            let datos = await ListarFacturas({
                "estado": "1",
                "idfactura": ""
            })
            let fact = await ListarFacturas({
                "estado": "0",
                "idfactura": ""
            })
            console.log(fact)
            let facturas = []
            let facturaPromesas = datos.data.map(async (e) => {
                let datos = JSON.parse(e.mensajes)
                if (datos.persona != undefined) {
                  
                    facturas.push({ ...e, mensajes: datos, cliente: datos.persona["cedula"] })
                }else{
                    facturas.push({ ...e, mensajes: datos, cliente: datos.cliente["cedula"] })
                }
            })
            const factur = await Promise.all(facturaPromesas);
            /*datos.data.map(e => {
                let informa = JSON.parse(e.mensajes)
                e.mensajes = JSON.parse(e.mensajes)
                
                e.cliente = informa.persona.telefonos == undefined ? "" : "informa.persona.telefonos"
                return { ...e }
            })*/
            //if (datos.estado) setFactura([...factura, ...datos.data])
            if (fact.estado && datos.estado) setFactura([...factura, ...facturas])
            if (!$.fn.DataTable.isDataTable("#doc")) {
                $(document).ready(function () {
                    $("#doc").dataTable({
                        stateSave: true,
                        responsive: true,
                        "pageLength": 10,
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
                            },
                            {

                                "responsivePriority": 1,
                                className: "hidden-xs",
                                targets: -1,
                                visible: false,
                                "responsive": true
                            }
                        ],
                        dom: "Bfrtip",
                        buttons: [


                        ],
                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],

                        order: [[2, 'desc']],

                    });
                })
            }
            setTimeout(function () {

            }, 1000)


        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getFactura()

    }, [])
    const thead = () => {
        return (
            <thead className="">
                <tr className="border ">

                    <th  >Id Factura</th>
                    <th >Fecha</th>
                    <th ># de factura</th>
                    <th ># cédula</th>
                    <th >estado </th>
                    <th >iva </th>
                    <th >subtotal </th>
                    <th >total </th>
                    <th >Ver </th>


                </tr>
            </thead>
        )

    }
    const showDatos = () => {
        try {

            return factura.filter(es => es.estado != "0").map((item, index) => {
                //  item.estado == "0" ? console.log(item) : ""
             
                //let cedula = item.mensajes.persona["cedula"]

                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.idfactura}</td>
                        <td className=" font-weight-bold">
                            {(item.fecha).split("T")[0]}
                        </td>
                        <td className=" font-weight-bold">
                            {item.numfactura}
                        </td>
                        <td className=" font-weight-bold">
                            {item.estado == "0" ? "No Emitido" : item.cliente}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {item.estado == "0" ? "No Emitido" : "Emitido"}</td>
                        <td className="text-xs font-weight-bold">
                            {item.iva}</td>

                        <td className="text-xs font-weight-bold">
                            {item.subtotal_12}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {item.total}
                        </td>
                        <td className="text-xs font-weight-bold">
                            <button className="btn btn-success"  >ver</button>
                        </td>
                        {/* <td className="text-xs font-weight-bold"  ><code style={{ maxWidth:"400px"}}> <pre>{JSON.stringify(js).replace(/,/g, ",\n")}</pre>
                        </code> </td>
                    */}</tr>
                )
            });
        } catch (error) { }
    }
    return (
        <div>
            <table id={"doc"} className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline collapsed"
                style={{
                    width: "100%",
                }}>
                {thead()}

                <tbody>
                    {showDatos()}
                </tbody>
            </table>
        </div>)
}
export default FacturasView