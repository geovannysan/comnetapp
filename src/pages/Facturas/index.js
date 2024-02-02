import { useEffect, useState } from "react"
import { Arreglarerror, ListarFacturas } from "util/Querireport"
import { Tabs } from 'antd';
import MainCard from "components/MainCard";
import { setFacturas } from "store/reducers/menu";
import { useDispatch } from "react-redux";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const FacturasView = () => {
    let usedispatch = useDispatch()
    let history = useNavigate()

    const [factura, setFactura] = useState([])
    const [facturaerr, setFacturaerr] = useState([])
    const fechaReferencia = new Date();

    // Obtener el primer día del mes
    const primerDiaDelMes = new Date(fechaReferencia.getFullYear(), fechaReferencia.getMonth(), 1);

    // Obtener el último día del mes
    const ultimoDiaDelMes = new Date(fechaReferencia.getFullYear(), fechaReferencia.getMonth() + 1, 0);

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
            let facturaser = []

            await fact.data.map(async (e) => {
                let fact = JSON.parse(e.mensajes).parame
                console.log(fact)
                if (fact.persona != undefined) {

                    facturaser.push({ ...e, mensajes: fact, cliente: fact.persona["cedula"] })
                } else {
                    facturaser.push({ ...e, mensajes: fact, cliente: fact.cliente["cedula"] })
                }
            })

           // console.log(actual)
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
            console.log(facturas)
            if (fact.estado && datos.estado) setFacturaerr([...facturaerr, ...facturaser.sort((a, b) => b.Id - a.Id)])
            if (fact.estado && datos.estado) setFactura([...factura, ...facturas.sort((a, b) => b.Id - a.Id)])
            if (!$.fn.DataTable.isDataTable("#doc")) {
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
                                'next': '<span className="next-icon"> <i className="fa fa-arrow-right"> </i></span>'
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
                    $("#doc2").dataTable({
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
                                'next': '<span className="next-icon"> <i className="fa fa-arrow-right"> </i></span>'
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
            }
            setTimeout(function () {

            }, 1000)


        } catch (error) {
            return error
        }
    }
    function abrirfactura(e) {
        usedispatch(setFacturas({ factura: { ...e } }))
        history("/Facturaid")
    }
    function Emitir() {
        Arreglarerror().then(ouput => {
            console.log(ouput)
            window.location.reload()
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        getFactura()
    }, [])
    const thead = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">
                    <th  >#</th>
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
                            {item.Id}</td>
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
                            {item.cliente}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {item.estado == "0" ? "No Emitido" : (parseFloat(item.subtotal_12).toFixed(2) != parseFloat(item.mensajes.subtotal_12).toFixed(2)) ? "importe" : "Emitido"}</td>
                        <td className="text-xs font-weight-bold">
                            {item.admin.username}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.iva).toFixed(2)}</td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.subtotal_12).toFixed(2)}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.total).toFixed(2)}
                        </td>

                        <td className=" font-weight-bold">
                            <button className="btn btn-success" onClick={() => abrirfactura({ ...item.mensajes, idfactura: item.idfactura })}  >ver</button>
                        </td>
                        {/* <td className="text-xs font-weight-bold"  ><code style={{ maxWidth:"400px"}}> <pre>{JSON.stringify(js).replace(/,/g, ",\n")}</pre>
                        </code> </td>
                    */}</tr>
                )
            });
        } catch (error) { }
        var tabEl = document.querySelector('button[data-bs-toggle="tab"]')
        tabEl.addEventListener('shown.bs.tab', function (event) {
            event.target // newly activated tab
            event.relatedTarget // previous active tab
        })
    }
    let [tab, setTabs] = useState(1)
    const onChange = (key) => {
        setTabs(key);
    };
    const theaderr = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">
                    <th  >#</th>
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

    const showDatoserr = () => {
        try {

            return facturaerr.filter(es => es.estado == "0").map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.Id}</td>
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
                            {item.cliente}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {item.estado == "0" ? "No Emitido" : (item.subtotal_12.toFixed(2) == item.mensajes.subtotal_12.toFixed(2)) ? "importe" : "Emitido"}</td>
                        <td className="text-xs font-weight-bold">
                            {item.admin.username}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.iva).toFixed(2)}</td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.subtotal_12).toFixed(2)}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.total).toFixed(2)}
                        </td>

                        <td className=" font-weight-bold">
                            <button className="btn btn-success" onClick={() => Emitir()}  >Emitir</button>
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
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Emitida',
                            key: '1',
                            children: '',
                        },
                        {
                            label: 'Error',
                            key: '2',
                            children: '',
                        },
                    ]}
                    onChange={onChange}
                />

                <div className="tab-content" id="pills-tabContent">
                    <div className={!(tab == 1) ? "d-none" : "tab-pane fade show active"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
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
                    <div className={!(tab == 2) ? "d-none" : "tab-pane fade show active"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <table id={"doc2"} className="table table-striped "
                            style={{
                                width: "100%",
                            }}>
                            {theaderr()}

                            <tbody>
                                {showDatoserr()}
                            </tbody>
                        </table>
                    </div>
                </div>

            </MainCard>
        </div>)
}
export default FacturasView