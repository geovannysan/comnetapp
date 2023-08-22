import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Actualizarsolicitud, ListarSolicituID } from "../../utils/Queryuser"
import moment from "moment"
import { IonButton, IonButtons, IonHeader, IonModal, IonIcon, IonContent, IonTitle, IonToolbar } from "@ionic/react"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "../../StoreRedux/Slice/UserSlice"
import { close } from "ionicons/icons"

export default function Detallesolicitud() {
    let usedispatch = useDispatch()
    let modal = useSelector((state) => state.usuario.modal)
    let { id } = useParams()
    let history = useHistory()
    let [disable,setDisable]= useState(false)
    console.log(id)
    let [datosin, setDatosinf] = useState({
        asunto: "",
        Nombre: "",
        cedula: "",
        fecha: "",
        estado: "",
        Prioridad: "",
        Tipo: "",
        cantiadad: "",
        observacion: ""
    })
    function agegar() {

        usedispatch(setModal({ nombre: "solicitudes", payloa: "" }))
    }
    function handelchange(e) {
        setDatosinf({
            ...datosin,
            [e.name]: e.value
        })
    }
    function actualizarsolicitud() {
        setDisable(true)
        let datos = {
            "asunto": datosin.asunto,
            "cedula": datosin.cedula,
            "Nombre": datosin.Nombre,
            "fecha": datosin.fecha,
            "estado": datosin.estado,
            "Prioridad": datosin.Prioridad,
            "Tipo": datosin.Tipo,
            "cantiadad": datosin.cantiadad,
            "observacion": datosin.observacion
        }
        console.log(datos, parseInt(id))
        Actualizarsolicitud(datos, parseInt(id)).then(oup => {
            console.log(oup)
            if (oup.status) {
                setDisable(false)
                usedispatch(setModal({ nombre: "", payloa: "" }))
            }else{
                setDisable(false)
                usedispatch(setModal({ nombre: "", payloa: "" }))

            }
        }).catch(err => {
            setDisable(false)
            console.log(err)
        })
    }
    useEffect(() => {
        ListarSolicituID(id).then(oupt => {
            console.log(oupt)
            if (oupt.success) {
                setDatosinf(oupt.data)
            } else {
                history.goBack()
            }
            console.log(oupt)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className="container-fluid h-100">
            <IonModal isOpen={modal.nombre === "solicitudes"}
                backdropDismiss={false}
            >
                <IonHeader className=" ion-toolbar-transparent border-0">
                    <IonToolbar >
                        <IonButtons slot="start">
                            <IonButton className="d-none" onClick={() => usedispatch(setModal({ nombre: "", payloa: "" }))}>
                                Cancel
                            </IonButton>
                        </IonButtons>
                        <IonTitle></IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => usedispatch(setModal({ nombre: "", payloa: "" }))}>
                                <IonIcon md={close} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <div className=" text-center px-3">
                        <h4 style={{
                            fontWeight: "bold",
                        }}>Atención de Solicitud</h4>
                    </div>
                    <div className=" row px-5">
                        <div className="col-12">
                            <label className="">Estado</label>
                            <select className=" form-control form-select" value={datosin.estado} name="estado" onChange={(e) => handelchange(e.target)} >
                                <option value={"Rechazado"}>Rechazado</option>
                                <option value={"Pendiente"}>Pendiente</option>
                                <option value={"Por revisar"}>Por revisar</option>
                                <option value={"Aprobado"}>Aprobado</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label>Observación</label>
                            <textarea value={datosin.observacion} name="observacion" onChange={(e) => handelchange(e.target)} style={{
                                height: "200px"
                            }} className=" form-control">

                            </textarea>
                        </div>
                        <div className="p-5">
                            <button className=" btn btn-success float-end" disabled={disable} onClick={actualizarsolicitud}>Contestar </button>
                        </div>
                    </div>
                    <div className="row  h-75 px-5 pb-5 bg-primary1 d-none ">
                        <div className="opciones col-12 m-2  px-2 rounded-3  bg-danger m-2 "
                        >
                            <h5 className="px-2">
                                Soporte Técnico
                            </h5>
                            <ul className="px-2 subindice">
                                <li>Lunes a Sabados 9 am a 6 pm </li>
                                <li>Domingo Cerrado</li>
                            </ul>

                        </div>
                        <div className="opciones col-12  rounded-3 bg-primary m-2">
                            <h5 className="px-2">
                                Ventas
                            </h5>
                            <ul className="px-2 subindice">
                                <li>Lunes a Sabados 9 am a 6 pm </li>
                                <li>Domingo Cerrado</li>
                            </ul>
                        </div>
                        <div className=" opciones col-12 rounded-3 bg-warning m-2" >
                            <h5 className="px-2" >
                                Facturación
                            </h5>
                            <ul className="px-2  ">
                                <li className=" text-bange"

                                >Reporte de pago, Reactivación de servicios, Cambios de fecha de pagos </li>
                            </ul>
                        </div>
                    </div>

                </IonContent>
            </IonModal>
            <div className=" container-fluid">
                <button className="btn btn-success float-end" onClick={() => agegar()} ><i className=" bi bi-pencil"></i></button>
            </div>
            <div className="row ">
                <h1></h1>
                <div className="row px-4">
                    <div className="col-12 ">
                        <div className=" px-0 py-2 w-100   ">
                            <div className=" d-flex flex-wrap flex-wrap-reverse">
                                <div className="  col-12 col-md-6 ">
                                    <div className="px-3 d-flex align-items-center ">
                                        <h4 className="px-2  "
                                            style={{
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {datosin.Tipo == "Trabajos" ? datosin.Tipo + "\n Tecnico Responsable:" + datosin.Nombre : ""}
                                            {datosin.Tipo == "Anticipo" ? datosin.Tipo + "\nSolicitante:" + datosin.Nombre : ""}
                                            {datosin.Tipo == "Permiso" ? datosin.Tipo + "\nSolicitante:" + datosin.Nombre : ""}

                                        </h4>
                                        <div className="d-flex  flex-wrap ">
                                            <div>
                                                <span>
                                                    {datosin.estado}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 bg-secondary-sm">
                        <div className="d-flex flex-wrap pt-3 datos px-0 ">
                            <div className="col-12 col-md-4 border-bottom p-3">
                                <div className="invoice-from">
                                    <small>De</small>
                                    <div className="m-t-5 m-b-5">
                                        <strong className="text-inverse">COMNET - SPEED - T-ICKETS  (COMPUTECNICSNET S.A)</strong>
                                        <small>
                                            <br></br>
                                            Edificio City Officce Oficina 301 <br></br>
                                            Indentificación: 092782129001<br></br>
                                            Teléfono: 0980850287 / 042599100<br></br>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 border-bottom p-3" >
                                <div className="invoice-from">
                                    <small>Reporte</small>
                                    <div className="m-t-5 m-b-5">
                                        <strong className="text-inverse">
                                            {datosin.Tipo == "Trabajos" ? " Tecnico Responsable: " + datosin.Nombre : ""}
                                            {datosin.Tipo == "Anticipo" ? datosin.Tipo + " Solicitante: " + datosin.Nombre : ""}
                                            {datosin.Tipo == "Permiso" ? datosin.Tipo + " Solicitante: " + datosin.Nombre : ""}
                                        </strong><br></br>
                                        <small>

                                            {"Cédula: " + datosin.cedula}<br></br>
                                            {"Fecha " + moment(datosin.fecha).format('MMM DD YYYY, h:mm:ss a')}<br></br>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 text-md-end border-bottom p-3 ">
                                <div className="invoice-date">
                                    <small>Registro</small>
                                    <div className="m-t-5 m-b-5">
                                        #{id} <br></br>


                                        <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className=" table-responsive">
                        <table className="table table-invoice">
                            <thead>
                                <tr>
                                    <th width="100%" >DESCRIPCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>
                                        <div className="card p-5">
                                            <div className=" card-body">
                                                {datosin.Tipo == "Trabajos" ? datosin.Tipo + " \n Tecnico Responsable:" + datosin.Nombre + "\n Hora inicio:" + datosin.cantiadad + "\n Hora de cirre:" + datosin.Prioridad : ""}
                                                {datosin.Tipo == "Anticipo" ? datosin.Tipo + " \nSolicitante:" + datosin.Nombre + "\n Valor solicitado:" + datosin.cantiadad : ""}
                                                {datosin.Tipo == "Permiso" ? datosin.Tipo + " \nSolicitante:" + datosin.Nombre + "\n Días" + datosin.cantiadad + "\n Fecha solicitada:" + datosin.Prioridad : ""}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=" table-responsive">
                        <table className="table table-invoice">
                            <thead>
                                <tr>
                                    <th width="100%" >OBSERVACIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="card p-5">
                                            <div className=" card-body">
                                                {datosin.observacion}
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-2 pt-2  border-top text-center ">
                        <span > CONTACTANOS </span>
                        <div className="d-flex justify-content-center align-items-center pb-2">
                            <a className=' nav-link  px-0 mx-1  nav-icons  text-black' >
                                <i className="bi bi-phone"></i>
                                <span className=" " style={{ fontFamily: '', }} > T:0980850287 / 042599100 </span>
                            </a><div> </div>
                            <a className=' nav-link  px-0  mx-1 nav-icons  text-black' >
                                <i className="bi bi-envelope"></i>
                                <span className=" " style={{ fontFamily: '', }} > facturacion@comnet.ec </span>
                            </a>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}