import { useEffect, useState } from "react"
import { Arreglarerror, Axiosmikroserdos, EliminarFactura, ListarFacturas } from "util/Querireport"
import { Tabs, Button } from 'antd';
import MainCard from "components/MainCard";
import { setFacturas, setListaFactura } from "store/reducers/menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { Popconfirm } from "../../../node_modules/antd/es/index"
import { userlog } from "util/User";

const FacturasView = () => {
    let usedispatch = useDispatch()
    const [openStates, setOpenStates] = useState({});
    let user = userlog();
    const handleOpenChange = (itemId) => (newOpenState) => {
        setOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [itemId]: newOpenState,
        }));
    };

    let history = useNavigate()
    let factura = useSelector(state => state.menu.facturas)
    const [facturaerr, setFacturaerr] = useState([])
    const fechaReferencia = new Date();
    const primerDiaDelMes = new Date(fechaReferencia.getFullYear(), fechaReferencia.getMonth(), 1);
    const ultimoDiaDelMes = new Date(fechaReferencia.getFullYear(), fechaReferencia.getMonth() + 1, 0);
    
    async function getFactura() {
        try {
            const datos = await ListarFacturas({
                "estado": "1",
                "idfactura": "",
                "mes": ""
            });

            let fact = await ListarFacturas({
                "estado": "0",
                "idfactura": ""
            })
            console.log(fact)
            let facturas = []
            let facturaser = []

            await fact.data.map(async (e) => {
                let fact = JSON.parse(e.mensajes).parame

                if (fact.persona != undefined) {

                    facturaser.push({ ...e, mensajes: fact, cliente: fact.persona["cedula"] || 'No asignado' })
                } else {
                    facturaser.push({ ...e, mensajes: fact, cliente: fact.cliente["cedula"] || 'No asignado' })
                }
            })
            datos.data.map(async (e) => {
                let datos = JSON.parse(e.mensajes)
                if (datos.persona != undefined) {

                    facturas.push({ ...e, mensajes: datos, cliente: datos.persona["cedula"] || 'No asignado' })
                } else {
                    facturas.push({ ...e, mensajes: datos, cliente: datos.cliente["cedula"] || 'No asignado' })
                }
            })
            if (fact.estado && datos.estado) setFacturaerr([...facturaerr, ...facturaser.sort((a, b) => b.Id - a.Id)])
            if (fact.estado && datos.estado) usedispatch(setListaFactura({ listaFactura: [...facturas.sort((a, b) => b.Id - a.Id)] }))
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
    function descarga() {

        Axiosmikroserdos.get('api/descargar', {
            responseType: 'blob'  // Important for handling binary data
        })
            .then(response => {
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'facturas.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => console.error('There was a problem with the Axios request:', error));

    }
    function Emitir() {
        //setFacturaerr([])
        Arreglarerror().then(ouput => {
            console.log(ouput)
            let facturaser = []
            ListarFacturas({
                "estado": "0",
                "idfactura": ""
            }).then(fact => {
                if (fact.data.length == 0) {
                    setFacturaerr([])
                    return
                }
                fact.data.map(async (e) => {
                    let fact = JSON.parse(e.mensajes).parame

                    if (fact.persona != undefined) {

                        facturaser.push({ ...e, mensajes: fact, cliente: fact.persona["cedula"] })
                    } else {
                        facturaser.push({ ...e, mensajes: fact, cliente: fact.cliente["cedula"] })
                    }
                })
                if (fact.estado) setFacturaerr([...facturaser.sort((a, b) => b.Id - a.Id)])

            })

        }).catch(error => {
            console.log(error)
        })
    }
    async function EliminarFacturas(id) {
        try {
            let { data } = await EliminarFactura(id)
            if (data.status) {
                alert(data.mensaje)
                window.location.reload()

            } else {
                alert(data.mensaje)

            }
        } catch (error) {
            alert(error)
        }
    }
    const cancel = () => {
    };
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
                    <th >Metodo </th>
                    <th > operador </th>
                    <th >Forma </th>
                    <th >total </th>
                    <th >subtotal </th>
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
                            {item["mensajes"].cobros[0].forma_cobro}</td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.total).toFixed(2)}
                        </td>
                        <td className="text-xs font-weight-bold">
                            {parseFloat(item.subtotal_12).toFixed(2)}
                        </td>


                        <td className=" font-weight-bold">
                            <div className="d-flex justify-content-around">

                                {  /*   <Popconfirm
                                    title="Eliminar transacion y factura"
                                    description="Despuies de eliminar notificar ha contabilidad la anulacion en contifico"
                                    open={openStates[item.Id] || false}
                                    onOpenChange={handleOpenChange(item.Id)}
                                    onConfirm={() => EliminarFacturas(item.Id)}
                                    onCancel={cancel}
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger size='small'  >
                                        <i className="fa fa-trash"></i>
                                    </Button>


                                </Popconfirm> */}

                                <Button type="primary" size='small' onClick={() => abrirfactura({ ...item.mensajes, idfactura: item.idfactura })}  >
                                    <i className=" fa fa-eye"></i> </Button>
                            </div>
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
        return (<thead className="bg-primary">
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
        </thead>)
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
    const CambiarMes = async () => {
        let meses = document.getElementById("date-month").value
        console.log(meses)
        try {
            let facturas = []
            let datos = await ListarFacturas({
                "estado": "1",
                "idfactura": "",
                "mes": meses,
            })
            //  const { isLoading, isError, data: datos, error } = await useFetchQuery(todos, "",{},meses)
            datos.data.map(async (e) => {
                let datos = JSON.parse(e.mensajes)
                if (datos.persona != undefined) {

                    facturas.push({ ...e, mensajes: datos, cliente: datos.persona["cedula"] })
                } else {
                    facturas.push({ ...e, mensajes: datos, cliente: datos.cliente["cedula"] })
                }
            })
            if (datos.estado && datos.data.length > 0) {
                $('#doc').DataTable().destroy();
                //  setFactura([])
                if (!$.fn.DataTable.isDataTable("#doc")) {
                    usedispatch(setListaFactura({ listaFactura: [...facturas.sort((a, b) => b.Id - a.Id)] }))
                    //    setFactura([...facturas.sort((a, b) => b.Id - a.Id)])
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
                }
            }

            console.log(datos);
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <MainCard contentSX={{ p: 2 }} className="mb-2">
                <div className=" container col-6 text-center">
                    <h3>Periodo de Factura</h3>
                    <input id="date-month" className=" form-control text-center" type="month"></input>
                    <button className=" btn btn-primary m-1 mt-1 p-2 " onClick={CambiarMes}>CONSULTAR</button>
                </div>

            </MainCard>
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
                    <div className=" container-fluid text-end">
                        <button className="btn btn-success" onClick={descarga}>Importar <i className="fa fa-download"></i> </button>

                    </div>
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
                        {facturaerr.length == 0 ? "" : <table id={"doc2"} className="table table-striped "
                            style={{
                                width: "100%",
                            }}>
                            {theaderr()}

                            <tbody>
                                {showDatoserr()}
                            </tbody>
                        </table>}
                    </div>
                </div>

            </MainCard>
        </div>)
}
export default FacturasView