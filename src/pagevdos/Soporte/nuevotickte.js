
/**
 * 1 Soperte técnico
 * 4 Facturación
 * 5 Retiros
 * 6 ACTUALIZACIONES  
 */

import { IonContent, IonHeader, IonInput, IonModal, useIonToast } from "@ionic/react"
import { useState } from "react"
import * as moment from "moment"
import { userlog } from "../../utils/User"
import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Newtickte } from "../../utils/Queryuser"
import { setModal } from "../../StoreRedux/Slice/UserSlice"
import { useDispatch } from "react-redux"
export default function TicketView(props) {
    let { tiketopen, seticktemoadal } = props
    const [present] = useIonToast();
    let dispat = useDispatch()
    let [tiket, setTickte] = useState({
        "dp": "",
        "asunto": "",
        "turno": "MAÑANA",
        "contenido": "",
    })
    function Agendar_tickets() {
        let cliente = userlog()
        seticktemoadal(false)
        let params = {
            "token": "",
            "idcliente": cliente.id,
            "solicitante": cliente.nombre,
            "fechavisita": moment().format('YYYY-MM-DD'),
            "agendado": "PAGINA WEB",
            ...tiket,
            "contenido": tiket.asunto + " " + cliente.nombre + " " + tiket.contenido
        }
        console.log(params)
        dispat(setModal({ nombre: "Alerta", payloa: "Creando ticket" }))

        Newtickte(params).then(oput => {
            if (oput.estado = "exito") {
                setTimeout(function () {
                    dispat(setModal({ nombre: "", payloa: "" }))
                    present({
                        message: 'Se a creando un ticket de soporte',
                        duration: 5000,
                    })
                }, 1000)

            }
            console.log(oput)

        }).catch(err => {
            present({
                message: 'No se creo el ticket de usuario',
                duration: 5000,
            })
            console.log(err)
        })

    }
    function cerrar() {
        seticktemoadal(false)
    }
    function handelchange(event) {
        setTickte({ ...tiket, [event.target.name]: event.target.value })
    }
    console.log(tiketopen)
    return (
        <Dialog open={tiketopen} onClose={() => seticktemoadal(false)}
            maxWidth="xs">
            <DialogTitle>Nuevo Ticket</DialogTitle>
            <DialogContent>

                <div className="group ">
                    <select className=" textbox " name="turno"
                        onChange={(e) => handelchange(e)}
                        value={tiket.turno}
                    >
                        <option value={""}>
                            Selecione turno
                        </option>
                        <option value={"MAÑANA"}>
                            MAÑANA
                        </option>
                        <option value={"TARDE"}>
                            TARDE
                        </option>
                    </select>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Turno</label>
                </div>
                <div className="group ">
                    <select className=" textbox "
                        name="dp" onChange={(e) => handelchange(e)}
                        value={tiket.dp}
                    >
                        <option value={""}>

                        </option>
                        <option value={"1"}>
                            Soperte técnico
                        </option>
                        <option value={"4"}>
                            Facturación
                        </option>
                        <option value={"6"}>
                            Actualizaciones
                        </option>
                    </select>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Departamento</label>
                </div>
                {tiket.dp == "1" ? <div className="group ">
                    <select className=" textbox "
                        name="asunto" onChange={(e) => handelchange(e)}
                        value={tiket.asunto}
                    >
                        <option value={""}>

                        </option>
                        <option value={"Luz roja"}>
                            Luz roja
                        </option>
                        <option value={"Fibra dañana"}>
                            Fibra dañana
                        </option>
                        <option value={"Cambio de Domicilio"}>
                            Cambio de Domicilio
                        </option>
                    </select>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Asunto </label>
                </div> : ""}
                {tiket.dp == "4" ?
                    <div className="group ">
                        <select className=" textbox "
                            name="asunto" onChange={(e) => handelchange(e)}
                            value={tiket.asunto}
                        >
                            <option value={""}>

                            </option>
                            <option value={"Pago no reportado"}>
                                Pago no reportado
                            </option>
                            <option value={"No se acredito "}>
                                No se acredito
                            </option>
                        </select>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Asunto </label>
                    </div> : ""}
                {tiket.dp == "6" ?
                    <div className="group ">
                        <select className=" textbox "
                            value={tiket.asunto}
                            name="asunto" onChange={(e) => handelchange(e)}>
                            <option value={""}>

                            </option>
                            <option value={"Mejorar plan"}>
                                Mejorar plan
                            </option>
                            <option value={"Fibra dañana"}>
                                Fibra dañana
                            </option>
                            <option value={"Cambio de Domicilio"}>
                                Cambio de Domicilio
                            </option>
                        </select>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Asunto </label>
                    </div> : ""}
                <div className="group">
                    <textarea type="text"
                        className=" textbox textarea "
                        value={tiket.contenido}
                        name="contenido" onChange={(e) => handelchange(e)}
                        placeholder="Mensaje..."
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Descripción </label>

                </div>


            </DialogContent>
            <DialogActions className=' d-flex justify-content-between'>
                <Button className='btn btn-sm   text-white rounded-pill btn-size-1 py-25 shadow-2' color='error' variant={"contained"} onClick={cerrar}>Cerrar</Button>
                <Button className='btn btn-sm  bg-blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2' color={"success"} variant={"contained"} onClick={Agendar_tickets}>Agendar</Button>
            </DialogActions>

        </Dialog>
        

    )
}