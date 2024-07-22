import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ActualizarPasswordClienet, Cliente } from "util/Queryportal"
import TextoView from "./texto"
import {
    Tabs, FloatButton,
    Modal,
    Form,
    Input,
    Button,
    Radio
} from 'antd';
import { KeyOutlined, EditOutlined } from '@ant-design/icons';
import { userlog } from "util/User";
const TabPane = Tabs.TabPane
const Clienteid = () => {
    let { id } = useParams()
    let [infocliente, setCLiente] = useState([])
    async function cargarCliente() {
        try {
            const clienteI = await Cliente(id)
            if (clienteI.estado == 'exito') {
                setCLiente(clienteI.datos)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        cargarCliente()
    }, [])

    const onFinish = async (values) => {
        console.log('Success:', values);
        let user = userlog().Id
        if (String(values.movil).length > 0 && String(values.codigo).length > 0) {
            let parametro =
            {
                "Id": user,
                codigo: values.codigo,
                movil: values.movil,
                idcliente: infocliente[0].id,
                cedula: infocliente[0].cedula
            }
            let actualiza = await ActualizarPasswordClienet(parametro)
            console.log(actualiza)
            if (actualiza.estado == 'exito') {
                setIsModalOpen(false);
            }


        }
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="row">
            <div>
                <FloatButton
                    shape="circle"
                    type="primary"
                    style={{
                        right: 94,
                    }}
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    icon={<EditOutlined />}
                />
            </div>
            <Tabs
                defaultActiveKey={0}
            >
                {infocliente.map((elm, index) => {
                    return (
                        <TabPane tab={"Perfil #" + Number(elm.id)} key={index} >
                            {
                                Object.keys(infocliente).length > 0 ?
                                    <div className="row">
                                        {Object.keys(infocliente[index]).map((valor, idex) => {
                                            return (
                                                <TextoView key={idex}
                                                    keys={valor}
                                                    params={infocliente[index][valor]}
                                                />
                                            )
                                        })}
                                    </div>
                                    : ""
                            }
                        </TabPane>
                    )
                })
                }
            </Tabs>

            {isModalOpen ?
                <Modal title="Datos de usuarios" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            initialValues={id == 0 ? { size: componentSize, } : { size: "default", codigo: infocliente[0].codigo, movil: infocliente[0].movil }}
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
                            <Form.Item label="movil" name="movil"

                                rules={[
                                    {
                                        required: true,
                                        message: 'Complete el número móvil',
                                    },
                                ]}>
                                <Input id="username" />
                            </Form.Item>
                            <Form.Item label="Password" name="codigo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'codigo',
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
        </div>
    )
}
export default Clienteid