import MainCard from "components/MainCard"
import {
    Modal,
    Form,
    Input,
    Button,
    Radio,
    Select,
    notification,
} from "antd"
import { useEffect, useState } from "react"
import { Actualiza_Usuario_Portal, Crear_Usuario_Portal, Lista_Contratos, Lista_Usuario_Portal, Lista_archivo } from "util/Queryportal"
import "./index.css"
import { Axiosmikroser, EditarArchivo, EliminarArchivo } from "util/Querireport"
import axios from "../../../node_modules/axios/index"
const Usuario = () => {
    let [usuarios, setUsuarios] = useState([])
    let [id, setID] = useState({

    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenid, setIsModalOpenid] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [user, setDatos] = useState({
        "username": "",
        "cedula": "",
        "password": "",
        "tocken": "",
        "nombre": "",
        "permiso": ""

    })
    const openNotificationWithIcon = (type, mensaje, description) => {
        api[type]({
            message: "" + mensaje,
            description:
                "" + description,
            placement: 'bottom'
        });
    };

    function eliminarPropiedadesVacias(objeto) {
        for (let clave in objeto) {
            if (
                objeto[clave] === null ||
                objeto[clave] === undefined ||
                objeto[clave] === "" ||
                (Array.isArray(objeto[clave]) && objeto[clave].length === 0) ||
                (typeof objeto[clave] === "object" && Object.keys(objeto[clave]).length === 0)
            ) {
                delete objeto[clave];
            }
        }
        return objeto;
    }

    useEffect(() => {
        Lista_Contratos().then(async ouput => {
            console.log(ouput)
            if (ouput.estado) {
                let datas = await Lista_archivo()
                console.log(datas)
                let constrayos = await ouput.contratos.map((item) => {
                    if (datas.length>0&& datas.includes(item.nombreDocumento)){
                        item.nombreDocumento=item.nombreDocumento
                        return {...item}
                    }else{
                        item.nombreDocumento = item.nombreDocumento 
                        return {...item}
                    }
                })
                setUsuarios(constrayos)
                //  if (!$.fn.DataTable.isDataTable("#docs")) {
                $(document).ready(function () {
                    $("#docs").dataTable({
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
                    /* $("#doc2").dataTable({
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
 
                     });*/
                })
                // }
            }
        }).catch(err => { })
    }, [])
    const thead = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">

                    <th >ID</th>
                    <th  >Contrato</th>
                    <th >Cliente</th>
                    <th >Estado</th>
                    <th >Aciones</th>
                </tr>
            </thead>
        )
    }

    const showDatos = () => {
        try {
            return usuarios.map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.idContrato}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.nombreDocumento}</td>
                        <td className=" font-weight-bold">
                            {item.nombreUsuario}
                        </td>
                        <td className=" font-weight-bold">
                            {(item.estadoContrato!="undefined") ? item.estadoContrato||'NO' :  'NO'}
                        </td>


                        <td className=" font-weight-bold text-center">
                            <div className=" btn-group">
                            <button className="btn btn-sm btn-success" onClick={() => abrirfactura({ ...item, id: item.idContrato })}  >Editar</button>
                            <button className="btn btn-sm btn-danger text-white" onClick={() => eliminarContrato({ ...item, id: item.idContrato })}  >Eliminar</button>
                                <button className="btn btn-sm btn-success " onClick={() => window.open("https://api.t-ickets.com/store/img/" + item.nombreDocumento.split("(")[0],"_blank")} >Ver</button>
                            </div>

                        </td></tr>
                )
            });
        } catch (error) { }
    }

    const showModal = () => {
        setID(0)
        setDatos({
            "username": "",
            "cedula": "",
            "password": "",
            "tocken": "",
            "nombre": "",
            "permiso": ""

        })
        setIsModalOpen(true);
    };
    const Subir_archivo = async () => {
        try {
            const fileInput = document.getElementById('file');
            if (!fileInput || !fileInput.files || fileInput.files.length === 0 || fileInput.files[0] == null) {

                openNotificationWithIcon('error', "No se ha seleccionado ningún archivo", "", "");
                console.error("No se ha seleccionado ningún archivo.");
                return;
            }
            const selectedFile = fileInput.files[0];
            const nombreSelect = fileInput.files[0].name.replace("Contrato Nº ", "").toLowerCase().replace(/ /g, "_")//.split("Nº ")[1];
            const formdata = new FormData();
            formdata.append("archivo", selectedFile);

           // formdata.append("nombre", "porcaca");
            let { data, statusText } = await Axiosmikroser.post("Comnet/contrato", formdata)
            const form = new FormData()
            form.append("image",selectedFile, nombreSelect);

            let datos = await axios.post("https://api.ticketsecuador.ec/store/api/img/",form)
           console.log(datos)
            console.log(data, statusText)
           // return
            if (statusText === 'OK') {
                setFileUploaded(false);
                openNotificationWithIcon('success', "" + data.nombre + "", data.message, "");
                setUsuarios([])
                Lista_Contratos().then(async ouput => {
                    window.location.reload()
                    console.log(ouput)
                    if (ouput.estado) {
                        let datas = await Lista_archivo()
                        console.log(datas)
                        let constrayos = await ouput.contratos.map((item) => {
                            if (datas.length > 0 && datas.includes(item.nombreDocumento)) {
                                item.nombreDocumento = item.nombreDocumento + "(Subido)"
                                return { ...item }
                            } else {
                                item.nombreDocumento = item.nombreDocumento + "(No Subido)"
                                return { ...item }
                            }
                        })
                        setUsuarios(constrayos)
                         if (!$.fn.DataTable.isDataTable("#docs")) {
                        $(document).ready(function () {
                            $("#docs").dataTable({
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
                            /* $("#doc2").dataTable({
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
         
                             });*/
                        })
                        }
                    }
                }).catch(err => { })
            } else {
                openNotificationWithIcon('error', "" + data.nombre + "", data.message, "");
            }
        } catch (err) {
            openNotificationWithIcon('error', "Hubio un error " + err, "", "");
            console.log(err)
            console.log(err)
        }
    };
    const handleOk = () => {
        setID(0)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleOkid = () => {


        setIsModalOpenid(false);
    };

    const handleCancelid = () => {
        setIsModalOpenid(false);
    };
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        let params = {
            "username": values.username,
            "cedula": values.cedula,
            "password": values.password,
            "tocken": values.tocken,
            "nombre": values.nombre,
            "permiso": values.permiso
        }
        //  const objetoSinPropiedadesVacias = eliminarPropiedadesVacias(params);
        //console.log(objetoSinPropiedadesVacias)
        //return
        if (id == 0) {
            Crear_Usuario_Portal(params).then(ouput => {
                if (ouput.status) {
                    handleCancel()
                    window.location.reload()
                } else {
                    openNotificationWithIcon('error', "Alerta", ouput.mensaje)


                }
            }).catch(err => {
                console.error(err)
            })
        } else {
            let paramss = {
                "username": values.username,
                "cedula": values.cedula,
                "password": values.password,
                "campo": values.tocken,
                "repuestauno": values.nombre,
                "respuestatres": values.permiso
            }
            const onjetonuevo = eliminarPropiedadesVacias(paramss);
            console.log(onjetonuevo)
            Actualiza_Usuario_Portal(id, onjetonuevo).then(ouput => {
                console.log(ouput)
                if (ouput.status) {
                    handleCancel()
                    window.location.reload()
                } else {
                    openNotificationWithIcon('error', "Alerta", ouput.mensaje)
                }
            }).catch(err => {
                consol.log(ouput)
                console.error(err)
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [inputValue, setInputValue] = useState('');
    const abrirfactura = (e) => {
        //return
        $.confirm({
            title: 'Prompt!',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Digite la cédula</label>' +
                '<input type="text" placeholder="" class="name form-control" required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Submit',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.name').val();
                        if (!name) {
                            $.alert("escriba un nombre o un numero unico");
                        }

                        EditarArchivo(e.idContrato, { nombre: name }).then(ou => {
                            window.location.reload()
                        })
                    }
                },
                cancel: function () {
                },
            },

        });
    }
    function eliminarContrato(e) {
        console.log(e)

        $.confirm({
            theme: 'supervan',
            closeIcon: true,
            title: 'Validar código',
            content: 'Una vez validado el codigo no podra volver a ser usado',
            type: 'red',
            buttons: {
                rechaza: {
                    text: "Cancelar",
                    btnClass: 'btn-success',
                    action: function () { }
                },
                aceptar: {
                    text: "Acapetar ",
                    btnClass: 'btn-success',
                    action: function () {
                        console.log("nuevos")

                        EliminarArchivo(e.idContrato, {
                            "nombreArchivo": e.nombreDocumento
                        }).then(ou => {
                            console.log(ou)
                            //return
                            window.location.reload()
                        })
                    }
                }
            }
        });

    }
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleFileUpload = (event) => {
        // Verificar si se cargó un archivo
        if (event.target.files.length > 0) {
            // Cambiar el estado para indicar que se ha cargado un archivo
            setFileUploaded(true);
        } else {
            setFileUploaded(false);
        }
    };

    return (
        <div>
            {contextHolder}
            <div className="p-3">

                <div className='d-flex  mt-3 pt-3 mb-1  pb-3 text-center justify-content-center '>
                    <label className="custum-file-upload" >
                        <div className="icon">
                            {fileUploaded ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" class="bi bi-check-circle" viewBox="0 0 16 16">
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
                            {fileUploaded ? (<span></span>) : (<span>Cargar archivo</span>)}
                        </div>
                        <input type="file" id="file" onChange={handleFileUpload} />

                    </label>

                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={Subir_archivo}>
                        Subir Contrato
                    </button>
                </div>

            </div>
            {/*
                (id == 0) ? user : ""*/
            }
            {isModalOpen ? <Modal title="Datos de usuarios" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        initialValues={id == 0 ? { size: componentSize, } : { size: "default", ...user, }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                        style={{ maxWidth: 600 }}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="Tamaño" name="size"
                            rules={[
                                {
                                    required: true,
                                    message: 'seleccione',
                                },
                            ]}>
                            <Radio.Group>
                                <Radio.Button value="small">Pequeño</Radio.Button>
                                <Radio.Button value="default">Defecto</Radio.Button>
                                <Radio.Button value="large">Grande</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="username" name="username"

                            rules={[
                                {
                                    required: true,
                                    message: 'Complete el usuario',
                                },
                            ]}>
                            <Input id="username" />
                        </Form.Item>
                        <Form.Item label="Cédula" name="cedula"
                            rules={[
                                {
                                    required: id == 0 ? true : false,
                                    message: 'Complete la cédula',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="token Api" name="tocken"

                            rules={[
                                {
                                    required: id == 0 ? true : false,
                                    message: 'Compete el token Api',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Nombre" name="nombre"
                            rules={[
                                {
                                    required: true,
                                    message: 'Complete el nombre',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="perfil" name="permiso"
                            rules={[
                                {
                                    required: id == 0 ? true : false,
                                    message: 'Seleccione un perfil',
                                },
                            ]} >
                            <Select>
                                <Select.Option value="1">Administrador</Select.Option>
                                <Select.Option value="2">Agente</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Password" name="password"

                            rules={[
                                {
                                    required: id == 0 ? true : false,
                                    message: 'Complete la contraseña',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                            <Button type="primary" htmlType="submit">
                                Guardar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal> : ""}

            <MainCard contentSX={{}}>
                <div className="tab-content" id="pills-tabContent">
                    <div id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        {usuarios.length > 0 ? <table id={"docs"} className="table table-striped "
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

export default Usuario