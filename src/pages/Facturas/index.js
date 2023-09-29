import { useEffect, useState } from "react"
import { ListarFacturas } from "util/Querireport"
//import moment from "moment/moment";
import MainCard from "components/MainCard";

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
            console.log(datos)
            let facturas = []
            datos.data.map(async (e) => {
                let datos = JSON.parse(e.mensajes)
                if (datos.persona != undefined) {

                    facturas.push({ ...e, mensajes: datos, cliente: datos.persona["cedula"] })
                } else {
                    facturas.push({ ...e, mensajes: datos, cliente: datos.cliente["cedula"] })
                }
            })
          //  const factur = await Promise.all(facturaPromesas);
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
                        paging:true,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando page _PAGE_ de _PAGES_",
                            "sSearch": "",
                            "searchPlaceholder": "",
                            'paginate': {
                                'previous': '<span class="prev-icon">Ant </span>',
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
            <thead className="bg-primary">
                <tr className="bg-primary ">

                    <th  >Id Factura</th>
                    <th >Fecha</th>
                    <th ># de factura</th>
                    <th ># cédula</th>
                    <th >estado </th>
                    <th >ID operador </th>
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
                            {item.admin.username}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.iva).toFixed(2)}</td>
                        <td className="text-xs font-weight-bold">
                            { parseFloat(item.subtotal_12).toFixed(2)}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat( item.total).toFixed(2)}
                        </td>
                  
                        <td className=" font-weight-bold">
                            <button className="btn btn-success" onClick={()=>console.log("nuevos datos")}  >ver</button>
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
            <MainCard contentSX={{ p: 2.25 }}>
                <table id={"doc"} className="table table-striped "
                    style={{
                        width: "100%",
                    }}>
                    {thead()}

                    <tbody>
                        {showDatos()}
                    </tbody>
                </table>
            </MainCard>
        </div>)
}
export default FacturasView