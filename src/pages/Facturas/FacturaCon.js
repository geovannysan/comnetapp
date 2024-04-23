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
const FacturasCon = () => {
    let [transacion, setTransacion] = useState([])
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
                    <th>Subtotal</th>
                    <th >Iva</th>
                </tr>
            </thead>
        )
    }

    const showDatos = () => {
        try {
            return transacion.map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.id}</td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item["documento"]}</td>
                        <td className=" font-weight-bold">
                            {item["persona"].cedula||item["cliente"].cedula}
                        </td>
                        <td className=" font-weight-bold">
                            {item["cobros"][0].forma_cobro=="TRA"?item["cobro"][0].numero_comprobante:item["cobro"].forma_cobro}
                        </td>
                        <td className=" font-weight-bold">
                            {item["fecha_emision"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["subtotal_12"]}
                        </td>
                        <td className=" font-weight-bold">
                            {item["total"]}
                        </td>

                    
                    </tr>
                )
            });
        } catch (error) { }
    }

    return (
        <div>
            <MainCard contentSX={{ p: 2 }} className="mb-2">
                <div className=" container col-6 text-center">
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
                    <h3>Periodo de Factura</h3>
                    
                    <input id="date" className=" form-control text-center" type="month"></input>
                    <button className=" btn btn-primary m-1 mt-1 p-2 " onClick={CambiarMes}>CONSULTAR</button>
                </div>

            </MainCard>
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
export default FacturasCon