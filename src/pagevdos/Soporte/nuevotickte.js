
/**
 * 1 Soperte técnico
 * 4 Facturación
 * 5 Retiros
 * 6 ACTUALIZACIONES  
 */

import { IonModal } from "@ionic/react"
import { useState } from "react"
import * as moment from "moment"
import { userlog } from "../../utils/User"
import { IonList, IonItem, IonSelect } from "@ionic/react"
export default function TicketView(tiketopen, seticktemoadal) {
    let [tiket, setTickte] = useState({
        "dp": "",
        "asunto": "",
        "turno": "MAÑANA",
        "contenido": "",
    })
    function Agendar_tickets() {
        let cliente = userlog()
        let params = {
            "token": "",
            "idcliente": cliente.idcliente,
            "solicitante": cliente.nombre,
            "fechavisita": moment().format('YYYY-MM-D'),
            "agendado": "VIA TELEFONICA",
            ...tiket
        }
    }
    function handelchange(event) {
        setTickte({ ...tiket, [event.target.name]: event.target.value })
    }
    return (
        <IonModal isOpen={tiketopen}
            onDidDismiss={() => seticktemoadal(false)}
            initialBreakpoint={0.50} breakpoints={[0, 0.25, 0.5, 0.75, 1]}
        >
            <div className="row">
                <IonList>
                    <IonItem>
                        <IonSelect
                            name="turno"
                            onIonChange={(e) => handelchange(e)}
                            interface="popover" placeholder="Turno">
                            <IonSelectOption value="MAÑANA">MAÑANA</IonSelectOption>
                            <IonSelectOption value="TARDE">TARDE</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSelect
                            name="dp"
                            onIonChange={(e) => handelchange(e)}
                            interface="popover" placeholder="Departamento">
                            <IonSelectOption value="1">Soperte técnico</IonSelectOption>
                            <IonSelectOption value="4">Facturación</IonSelectOption>
                            <IonSelectOption value="6">Actualizaciones</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSelect
                            onIonChange={(e) => handelchange(e)}
                            name="asunto"
                            interface="popover" placeholder="asunto">
                            <IonSelectOption value="Luz roja">Luz roja </IonSelectOption>
                            <IonSelectOption value="Intermitencia en el servicio">Intermitencia en el servicio</IonSelectOption>

                        </IonSelect>
                    </IonItem>
                </IonList>
            </div>
        </IonModal>
    )
}