import { IonContent } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ObtenerFactura, ObtenerFacturas } from "../../utils/Contifico";
import TablasViwe from "./Tablasdoc";
import { listarSolicitud } from "../../utils/Queryuser";
import { userlog } from "../../utils/User";
import moment from "moment";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';
import { useHistory } from "react-router";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function DocuumentosViews() {
    const [datos, setDatos] = useState([])
    let history = useHistory()
    let [wifi, setWifi] = useState("")
    let [showAlert, setShowAlert] = useState(false)
    function handleClose() {
        setShowAlert("")
    }
    let [info, setInfo] = useState({})
    async function abreir(e) {
        console.log(e)
        history.push("/page/detalle/"+e.Id)
       // setInfo(e)

        //setShowAlert(true)

    }
    useEffect(() => {
        // console.log(userlog())
        if (userlog().password == "0930570395") {

            listarSolicitud(2).then(sali => {
                console.log(sali)
                setDatos(sali.data)
            }).catch(errr => {
                console.log(errr)
            })
        }
        /*ObtenerFactura().then((salida) =>{
            console.log(salida.status)
            if (salida.length == 0) return
            setDatos([...salida])
            console.log(salida)
        }).catch(err=>{
            console.log(err)
        })*/
        //abreir()

    }, [])
    const thead = () => {
        return (
            <thead className="">
                <tr className="border ">
                    <th className=" text-center" ></th>
                    <th className="sorting" >Asunto</th>
                    <th >Información completa</th>
                    <th >Cédula</th>
                    <th >Fecha de registro</th>

                    <th >Estado </th>
                    <th >Ver </th>



                </tr>
            </thead>
        )

    }
    const showDatos = () => {
        try {
            console.log(datos)
            return datos.map((item, index) => {
                // console.log(item)
                return (
                    <tr key={index}>
                        <td className="dtr-hidde">
                        </td>
                        <td className="text-xs font-weight-bold " style={{
                            whiteSpace: "initial"
                        }}>
                            {item.asunto}</td>
                        <td className=" font-weight-bold" style={{
                            whiteSpace: "initial"
                        }}>{item.Tipo == "Trabajos" ? item.Tipo + "\n Tecnico Responsable:" + item.Nombre + "\n Hora inicio:" + item.cantiadad + "\n Hora de cirre:" + item.Prioridad : ""}
                            {item.Tipo == "Anticipo" ? item.Tipo + "\nSolicitante:" + item.Nombre + "\n Valor solicitado:" + item.cantiadad : ""}
                            {item.Tipo == "Permiso" ? item.Tipo + "\nSolicitante:" + item.Nombre + "\n Días" + item.cantiadad + "\n Fecha solicitada:" + item.Prioridad : ""}
                        </td>
                        <td className="text-xs font-weight-bold">{item.cedula}</td>
                        <td className="text-xs font-weight-bold">{moment(item.fecha).format("L")}</td>

                        <td className="text-xs font-weight-bold">
                            {item.estado}

                        </td>

                        <td className="text-xs font-weight-bold">
                            <a onClick={() => abreir(item)} className="btn btn-md btn-default"><i className=" bi bi-pencil"></i> </a>

                        </td>



                    </tr>
                )
            });
        } catch (error) { }
    }
    useEffect(() => {

    }, [])
    return (
        <IonContent fullscreen={true}>
            <div className="container-fluid">
                <h5 className="">Documentos</h5>

                {datos.length > 0 ? <TablasViwe
                    number={6}
                    thead={thead}
                    showDatos={showDatos}
                    datos={datos}
                    Titel={"Solicitudes"}
                /> : <div className=""
                    style={{

                        position: 'fixed',
                        height: "100%",
                        left: '0',
                        bottom: '0',
                        width: '100%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: '3'
                    }}
                >
                    <div className="spinner-border" >
                        <span className="sr-only"></span>
                    </div>
                </div>}

            </div>
            <Dialog
                fullScreen={"md"}
            open={showAlert} TransitionComponent={Transition} onClose={() => setShowAlert("")}>
                {/*<Modal show={showAlert}
            id="example-modal2"
            backdrop={false}
            centered
        >
            <IonHeader className="  border-0">
                <IonToolbar className="ion-toolbar-transparent" >

                    <IonButtons slot="end" onClick={() => setShowAlert("")}>
                        <IonButton onClick={() => setShowAlert("")}>
                            <IonIcon md={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <Modal.Body>
          
                <div className="pt-5 px-2">
                    <IonItem>
                        <IonLabel position="floating">{header}</IonLabel>
                        <IonInput
                            id="custom-input"
                            maxlength={20}
                            value={wifi}
                            onIonChange={(e) => setWifi(e.detail.value)}
                        />
                    </IonItem>
                    <IonButton expand="full" onClick={() => submitHAndel(wifi)}  >Cambiar</IonButton>

                </div>

    </Modal.Body0>
{ /* </Modal>*}*/}
                <DialogTitle>Actualizar Datos</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="observacion"
                        id="custom-input"
                        maxlength={20}
                        value={wifi}
                        onChange={(e) => setWifi(e.target.value)}

                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => console.log("wifi")}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </IonContent>
    )
}