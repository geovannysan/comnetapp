import MainCard from "components/MainCard"
import {
    Modal, Cascader,
    DatePicker,
    Form,
    Input,
    Button,
    Radio,
    Select,
    Switch,
    notification,
} from "antd"
import { useEffect, useState } from "react"
import { Crear_Usuario_Portal, Lista_Usuario_Portal } from "util/Queryportal"

const Usuario = () => {
    let [usuarios, setUsuarios] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mensaje, description) => {
        api[type]({
            message: "" + mensaje,
            description:
                "" + description,
            placement: 'bottom'
        });
    };

    useEffect(() => {
        Lista_Usuario_Portal().then(ouput => {
            if (ouput.status) {
                setUsuarios(ouput.data)
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
            }
        }).catch(err => { })
    }, [])
    const thead = () => {
        return (
            <thead className="bg-primary">
                <tr className="bg-primary ">
                    <th  >#</th>
                    <th  >Nombre</th>
                    <th >Cédula/nombre</th>
                    <th >token api</th>
                    <th >perfil</th>
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
                            {item.Id}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.username}</td>
                        <td className=" font-weight-bold">
                            {item.cedula}
                        </td>
                        <td className=" font-weight-bold">
                            {item.campo}
                        </td>
                        <td className=" font-weight-bold">
                            {item.respuestatres == "1" ? "Administrador" : "Agente"}
                        </td>

                        <td className=" font-weight-bold">
                            <button className="btn btn-sm btn-success" onClick={() => abrirfactura({ ...item, id: item.Id })}  >Editar</button>
                        </td>
                        {/* <td className="text-xs font-weight-bold"  ><code style={{ maxWidth:"400px"}}> <pre>{JSON.stringify(js).replace(/,/g, ",\n")}</pre>
                        </code> </td>
                    */}</tr>
                )
            });
        } catch (error) { }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
            "password": values.nombre,
            "tocken": values.tocken,
            "nombre": values.nombre,
            "permiso": values.permiso
        }
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
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div className="p-3">
                <button className="btn btn-primary" onClick={showModal}>
                    Nuevo usuario
                </button>
            </div>
            <Modal title="Datos de usuarios" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        initialValues={{ size: componentSize }}
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
                            <Input />
                        </Form.Item>
                        <Form.Item label="Cédula" name="cedula"
                            rules={[
                                {
                                    required: true,
                                    message: 'Complete la cédula',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="token Api" name="tocken"

                            rules={[
                                {
                                    required: true,
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
                                    required: true,
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
                                    required: true,
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
            </Modal>
            <MainCard contentSX={{}}>
                <div className="tab-content" id="pills-tabContent">
                    <div id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
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

                </div>


            </MainCard>
        </div>
    )
}

export default Usuario