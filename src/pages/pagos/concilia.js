import MainCard from "components/MainCard"
import { useEffect, useState } from "react"
import "../Usuarios/index.css"
import * as xlsx from 'xlsx';
import SpinerView from "components/Spiner/index";
const Conciliacion = () => {
    const thead = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">

                    <th >ID</th>
                    <th  ># Factura</th>
                    <th ># Legal</th>
                    <th ># Transacción</th>
                    <th >TIPO</th>
                    <th >Forma de Pago</th>
                    <th>Cobrado</th>
                    <th >Fecha & Hora</th>
                    <th>estado</th>
                    <th>valor_verif</th>
                    <th >Operador</th>
                    <th >Descripción</th>
                    <th >Cédula</th>
                </tr>
            </thead>
        )
    }
    const showDatos = () => {
        //  console.log(transacion)
        try {
            return transacion.map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.ID}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item["# Factura"]}</td>
                        <td className=" font-weight-bold">
                            {item["# Legal"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["# Transacción"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["TIPO"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["Forma de Pago"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["Cobrado"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["Fecha & Hora"]}
                        </td>
                        <td className={String(item["estado"]).includes("OK") ? "bg-danger font-weight-bold" : "font-weight-bold"}>
                            {item["estado"] || " "}
                        </td>
                        <td>
                            {item["verifiva_valor"] || " "}
                        </td>
                        <td className=" font-weight-bold">
                            {item["Operador"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["Descripción"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["Cédula"]}
                        </td>
                    </tr>
                )
            });
        } catch (error) { }
    }
    const [load, setUload] = useState(false)
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileUploadedban, setFileUploadedban] = useState(false);
    const [fileUploadPa, setFileUploadPa] = useState(false);
    const [fileUploadGu, setFileUploadGu] = useState(false);
    const [transacion, setTransacion] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [archivoGua, setGuayaquil] = useState([])
    const [archivosPa, setPAcifico] = useState([])
    const [percenta, setPesent] = useState(0)
    const Subir_archivo = async () => {
        setUload(true);
        setPesent(10); // Inicia el porcentaje en 0

        setTimeout(function () {
            const totalItems = [...archivos, ...archivoGua, ...archivosPa].length;
            const porcentajeIncremento = 10;
            const itemsPorPorcentaje = Math.ceil(totalItems / (100 / porcentajeIncremento));
            let porcentajeActual = 0;

            if (totalItems > 0 && transacion.length > 0) {
                const nuevos = transacion.map((e, index) => {
                    const objetoCon = archivos.find(item =>
                        Object.values(item).some(value => String(value).includes(e["# Transacción"]))
                    );

                    let cobrado = String(e["Cobrado"].replace("$", ""));

                    // Incrementa el porcentaje cada 10% y limita al 100%
                    if ((index + 1) % itemsPorPorcentaje === 0 && porcentajeActual < 100) {
                        porcentajeActual += porcentajeIncremento;
                        if (porcentajeActual > 100) porcentajeActual = 100; // Limitar al 100%
                        console.log(`Progreso: ${porcentajeActual}%`);
                        setPesent(porcentajeActual);
                    }

                    if (objetoCon) {
                        const numerocompro = Object.values(objetoCon)
                            .filter(f => String(f).includes(String(e["# Transacción"])));

                        e.verifiva_valor = Object.values(objetoCon).some(value =>
                            String(value).includes(parseFloat(cobrado))
                        ) ? `Valor Correcto ${numerocompro[0]}` : `Valor incorrecto ${numerocompro[0]}`;

                        e.estado = "ok";
                        return e;
                    }

                    // Verificaciones para BANCO GUAYAQUIL y BANCO PACIFICO
                    if (["CALL BANCO GUAYAQUIL EMP", "SpeedMan BANCO GUAYAQUIL EMP", "APP BANCO GUAYAQUIL EMP"].includes(String(e["Forma de Pago"]))) {
                        const objetoCoincidente = archivoGua.find(item =>
                            String(e["# Transacción"]).includes(String(item.NUMERO))
                        );

                        if (objetoCoincidente) {
                            e.verifiva_valor = Object.values(objetoCoincidente).some(value =>
                                parseFloat(value) === parseFloat(cobrado)
                            ) ? `Valor Correcto ${objetoCoincidente.NUMERO}` : `Valor incorrecto ${objetoCoincidente.NUMERO}`;

                            e.estado = "ok GUAYAQUIL";
                            return e;
                        }
                    }

                    if (["CALL BANCO PACIFICO EMP", "CALL BANCO PACIFICO PRS", "SpeedMan BANCO PACIFICO EMP", "SpeedMan BANCO PACIFICO PRS", "APP BANCO PACIFICO EMP"].includes(String(e["Forma de Pago"]))) {
                        let total = String(e["Cobrado"]).replace("$ ", "");
                        let fecha = String(e["Fecha & Hora"]).split(" ")[0].split("/");
                        let fe = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;

                        const buscarFecha = archivosPa.filter(elem => parseFloat(elem["VALOR"]) === parseFloat(total));

                        if (buscarFecha.length > 0) {
                            const buscardo = buscarFecha.filter(element => {
                                let fechas = element["FECHA"].split(" ")[0].split("/");
                                let pagofe = `${fechas[2]}-${fechas[0]}-${fechas[1]}`;
                                return pagofe === fe;
                            });

                            if (buscardo.length > 0) {
                                e.estado = `OK pacifico ${buscardo.length}`;
                                return e;
                            }
                        }
                    }

                    return e;
                });

                setTransacion(nuevos);
            } else {
                setUload(false);
            }
        }, 1000);
    };

    const handleFileUpload = (event) => {
        // Verificar si se cargó un archivo
        if (event.target.files.length > 0) {
            setUload(true)
            setPesent(10)
            // Cambiar el estado para indicar que se ha cargado un archivo
            setFileUploaded(true);
            const reader = new FileReader();
            reader.onload = (e) => {

                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                if (Object.keys(json).some(value => String(value).includes("ID"))) {
                    setPesent(60)
                    setTransacion(json)
                    console.log(json);
                } else {
                    const range = xlsx.utils.decode_range(worksheet['!ref']);
                    setPesent(50)
                    // Eliminar la primera columna (columna A)
                    for (let R = range.s.r; R <= range.e.r; ++R) {
                        const cellAddress = { r: R, c: range.s.c };
                        const cellRef = xlsx.utils.encode_cell(cellAddress);
                        delete worksheet[cellRef];

                    }

                    const jsons = xlsx.utils.sheet_to_json(worksheet);
                    setTransacion(json);
                    console.log(jsons);
                    setPesent(100)
                    setTimeout(function () {
                        setUload(false)
                    }, 600)


                }
            };
            reader.readAsArrayBuffer(event.target.files[0]);
        } else {
            $('#docs').DataTable().destroy();
            setTransacion([])
            setFileUploaded(false);
        }
    };
    const handleFileUploadbanco = (event) => {
        // Verificar si se cargó un archivo
        if (event.target.files.length > 0) {
            // Cambiar el estado para indicar que se ha cargado un archivo
            setFileUploadedban(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                setArchivos(json)
                console.log(json);
            };
            reader.readAsArrayBuffer(event.target.files[0]);
        } else {
            setArchivos([])
            setFileUploadedban(false);
        }
    };
    const handleFileUploadbancoGu = (event) => {
        // Verificar si se cargó un archivo
        if (event.target.files.length > 0) {
            // Cambiar el estado para indicar que se ha cargado un archivo
            setFileUploadGu(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                setGuayaquil(json)
                console.log(json);
            };
            reader.readAsArrayBuffer(event.target.files[0]);
        } else {
            setGuayaquil([])
            setFileUploadGu(false);
        }
    };
    const handleFileUploadbancoPa = (event) => {
        // Verificar si se cargó un archivo
        if (event.target.files.length > 0) {
            // Cambiar el estado para indicar que se ha cargado un archivo
            setFileUploadPa(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                setPAcifico(json)
                console.log(json);
            };
            reader.readAsArrayBuffer(event.target.files[0]);
        } else {
            setPAcifico([])
            setFileUploadPa(false);
        }
    };
    useEffect(() => {
        console.log(transacion)
        console.log(transacion.map(r => (Object.values(r))))
        transacion.length > 0 ?
            $(document).ready(function () {
                setUload(true)
                $('#docs').DataTable().destroy();
                $("#docs").dataTable({
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
                    ],
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Exportar a Excel',
                            customize: function (xlsx) {
                                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                var rowIndex = 0;

                                $('row', sheet).each(function () {
                                    rowIndex++;
                                    if (rowIndex > 1) { // Evita la primera fila (encabezado)

                                        var cellC = $('c[r^="C"] t', this).text();  // Obtiene el valor de la columna "C"
                                        var cellI = $('c[r^="I"] t', this).text();  // Obtiene el valor de la columna "I"
                                        var cellD = $('c[r^="D"] t', this).text();  // Obtiene el valor de la columna "C"
                                        var cellJ = $('c[r^="J"] t', this).text();  // Obtiene el valor de la columna "I"
                                        console.log("cellD" + cellD, "cellI" + cellI, "cellJ" + cellJ, "cellC" + cellC)
                                        // Condición: si el valor en la columna C es igual al de la columna I
                                        if (cellJ == "") return
                                        if (cellJ.includes(cellD)) {
                                            if (cellJ.toLowerCase().includes("incorrecto")) {
                                                // Cambia el estilo de la celda en la columna "I"
                                                $(this).find('c[r^="J"]').attr('s', '36'); // Aplica el fondo amarillo
                                                return
                                            }
                                            if (cellJ.toLowerCase().includes("correcto")) {
                                                $(this).find('c[r^="J"]').attr('s', '19'); // azul
                                                return
                                            }
                                        }
                                        else {
                                            if (cellJ.toLowerCase().includes("incorrecto")) {
                                                // Cambia el estilo de la celda en la columna "I"
                                                $(this).find('c[r^="J"]').attr('s', '22'); // Aplica el fondo amarillo
                                                return
                                            }
                                            if (cellJ.toLowerCase().includes("correcto")) {
                                                $(this).find('c[r^="J"]').attr('s', '46'); // Aplica el fondo amarillo
                                                return
                                            }
                                        }


                                    }
                                });
                            }
                        }
                    ],
                    lengthMenu: [
                        [10, 20, 30, 50, -1],
                        [10, 20, 30, 50, "All"],
                    ],

                    order: [[0, 'desc']],

                });
                setUload(false)

            }) : ""
    }, [transacion])
    return (
        <div>
            <SpinerView
                bolean={load}
                percent={percenta}
            />
            <div className="p-3">

                <div className='d-flex  mt-3 pt-3 mb-1  pb-3 text-center  justify-content-around '>
                    <label className="custum-file-upload" >
                        <div className="icon">
                            {fileUploaded ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" fill="green" />
                                    <path fill="green" d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                            ) : (
                                // Si no se cargó un archivo, mostrar el icono de subida
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                    <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" />
                                </svg>
                            )} </div>
                        <div className="text">
                            {fileUploaded ? (<span></span>) : (<span>Cargar Transaciones</span>)}
                        </div>
                        <input type="file" id="file" onChange={handleFileUpload} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                    </label>

                </div>
                <div className=" d-flex  justify-content-around align-items-end flex-wrap">

                    <label className="custum-file-upload2"  >
                        <div className="icon">
                            {fileUploadedban ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" fill="green" />
                                    <path fill="green" d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                            ) : (
                                // Si no se cargó un archivo, mostrar el icono de subida
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                    <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" />
                                </svg>
                            )} </div>
                        <div className="text">
                            {fileUploadedban ? (<span id="banco"></span>) : (<span>Banco Pi & PRO</span>)}
                        </div>
                        <input type="file" id="banco" onChange={handleFileUploadbanco} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                    </label>
                    <label className="custum-file-upload2"  >
                        <div className="icon">
                            {fileUploadGu ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" fill="green" />
                                    <path fill="green" d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                            ) : (
                                // Si no se cargó un archivo, mostrar el icono de subida
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                    <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" />
                                </svg>
                            )} </div>
                        <div className="text">
                            {fileUploadGu ? (<span id></span>) : (<span>Banco Gua</span>)}
                        </div>
                        <input type="file" id="banco" onChange={handleFileUploadbancoGu} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                    </label>
                    <label className="custum-file-upload2" style={{

                    }} >
                        <div className="icon">
                            {fileUploadPa ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" fill="green" />
                                    <path fill="green" d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                            ) : (
                                // Si no se cargó un archivo, mostrar el icono de subida
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                    <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" />
                                </svg>
                            )} </div>
                        <div className="text">
                            {fileUploadPa ? (<span></span>) : (<span>Banco Pac</span>)}
                        </div>
                        <input type="file" id="banco" onChange={handleFileUploadbancoPa} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                    </label>
                </div>
                <div className="d-flex justify-content-center pt-2">
                    {([...archivoGua, ...archivos, ...archivosPa].length > 0) ? <button className="btn btn-primary" onClick={Subir_archivo}>
                        Comparar
                    </button> : ""}
                </div>

            </div>
            {/*
                (id == 0) ? user : ""*/
            }


            <MainCard contentSX={{}}>
                <div className="tab-content" id="pills-tabContent">
                    <div id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        {transacion.length > 0 ? <table id={"docs"} className="table table-striped "
                            style={{
                                width: "100%",
                            }}>
                            {thead()}

                            <tbody>
                                {showDatos()}
                            </tbody>
                        </table> : ""}

                    </div>

                </div>


            </MainCard>
        </div>
    )
}

export default Conciliacion