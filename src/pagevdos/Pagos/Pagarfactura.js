import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import { IonButton, IonIcon, IonPage, IonButtons, IonToolbar, useIonToast, IonLabel } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router";
import { OCRApi, Obtenerlinkimagen, PAgosViewaapp } from "../../utils/Querystorepago";

export default function CargarComprobante() {
    const fileTypes = ["JPEG", "PNG", "GIF", "JPG", "JFIF"];

    let history = useHistory()
    let factura = useSelector(state => state.usuario.facttura)
    const datos = useSelector((state) => state.usuario.user)
    let user = useSelector(state => state.usuario.user)
    const [report, setReport] = useState(false)
    const [file, setFile] = useState(null);
    const [present] = useIonToast();
    const [disable, setDisable] = useState(false)
    const [campos, setCampos] = useState({
        valor: "",
        control: ""
    })
    const [datopagos, setPagos] = useState({
        "idfactura": factura.id,
        "pasarela": "",
        "cantidad": "",
        "idtransaccion": "",
        "nota": "",
        "operador": "appspeed",
        "idcliente": datos.id,
        "idcuenta": "",
        "fechapago": ""
    })
    const [imagnlugar,setImagen]= useState("")
    const handleChange = async (file) => {
        console.log(file[0])
        const imageUrl = URL.createObjectURL(file[0]);
        setFile(file);
        setImagen(imageUrl)
    };

    let formapago = {
        "pichincha": "CALL BANCO PICHINCHA EMP",
        "pacifico": "CALL BANCO PACIFICO EMP",
        "guayaquil": "CALL BANCO GUAYAQUIL EMP",
        "produbanco": "CALL PRODUBANCO"
    }
    let idcuneta = {
        "pichincha": "Q9pdBBVzt6yqd8KE",
        "pacifico": "xGge0VLoTopvbADR",
        "guayaquil": "5gQbWnq5S9V3a6w2",
        "produbanco": "vj6e9QgXc3DneWBV"
    }
    const LeerPago = async () => {
        try {
            let imagen = await Obtenerlinkimagen(file[0])
            if (imagen == null) {
                return
            }
            setReport(true)
            let datos = {
                "cedulaBeneficiario": "0923980742",
                "url": imagen,
                "cedula": user.cedula,
                "valor_pagar": campos.valor
            }
            let consulta = await OCRApi(datos)
            console.log(consulta)
            if (consulta.success) {
                let datos = consulta.data
                let { beneficiario, valor, numero_documento, banco } = datos
                if (!beneficiario.toLowerCase().includes("computecnicsnet")) {
                    setReport(false)
                    return
                }
                if ((String(valor) != campos.valor)) {
                    setReport(false)
                    return
                }
                if ((String(numero_documento) != campos.control)) {
                    setReport(false)
                    return
                }
                const today = new Date();
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                const formattedToday = yyyy + '-' + mm + '-' + dd;
                setDisable(true)
                if (banco.toLowerCase().includes("pichincha")) setPagos({ ...datopagos, fechapago: formattedToday, idcuenta: idcuneta["pichincha"], pasarela: formapago["pichincha"], idtransaccion: numero_documento, cantidad: valor, nota: formapago["pichincha"] + "/" + numero_documento + "/"+imagen })
                if (banco.toLowerCase().includes("pacifico")) setPagos({ ...datopagos, fechapago: formattedToday, idcuenta: idcuneta["pacifico"], pasarela: formapago["pacifico"], idtransaccion: numero_documento, cantidad: valor, nota: formapago["pichincha"] + "/" + numero_documento + "/" + imagen })
                if (banco.toLowerCase().includes("guayaquil")) setPagos({ ...datopagos, fechapago: formattedToday, idcuenta: idcuneta["guayaquil"], pasarela: formapago["guayaquil"], idtransaccion: numero_documento, cantidad: valor, nota: formapago["pichincha"] + "/" + numero_documento + "/" + imagen })
                if (banco.toLowerCase().includes("produbanco")) setPagos({ ...datopagos, fechapago: formattedToday, idcuenta: idcuneta["produbanco"], pasarela: formapago["produbanco"], idtransaccion: numero_documento, cantidad: valor, nota: formapago["pichincha"] + "/" + numero_documento + "/" + imagen })
                
            } else {
                present({
                    message: "Hubo problemas con su comprobante comunicate con +593 98 085 0287",
                    position: "bottom",
                    buttons: [
                        {
                            text: 'Cerrar',
                            role: 'cancel',
                        }
                    ]
                });
                setReport(false)
            }
            document.getElementById("carga").src = imagen
            console.log(consulta)
        } catch (error) {
            present({
                message: "Hubo un error de carga",
                position: "bottom",
                buttons: [
                    {
                        text: 'Cerrar',
                        role: 'cancel',
                    }
                ]
            });
            setReport(false)
            console.log(error)
        }
    }
    const ReportarPago = async () => {
        console.log(Object.values(datopagos), Object.values(datopagos).every(e => e == ""))
        if (Object.values(datopagos).every(e => e == "")) {
            present({
                message: "Faltan datos por cargar",
                position: "bottom",
                buttons: [
                    {
                        text: 'Cerrar',
                        role: 'cancel',
                    }
                ]
            });
        } else {
            setDisable(false)
            PAgosViewaapp({ ...datopagos, TRA: "TRA" }).then(ouput => {
               
                console.log(ouput)
                if (ouput.estado == "exito") {
                    setDisable(true)
                    history.push("/")
                    //window.location.reload()
                }
            }).catch(err => {
                console.log(err)
                setDisable(true)
            })
        }
    }
    const Comprobar = () => {

        if (campos.valor.trim() == "" && campos.control.trim() == "") {
            present({
                message: "Complete el # control y valor del comprobante de pago",
                duration: 2500,
                position: "bottom"
            });
            return
        }

    }
    return (
        <IonPage>
            <IonToolbar className="  bg-welcome ion-no-border">
                <IonButtons slot="start">
                    <IonButton color={"light"} onClick={() => history.goBack()}>
                        <IonIcon className="" icon={chevronBack} />
                    </IonButton>
                </IonButtons>

            </IonToolbar>
            {report ? <div id="miDiv" className=" container-fluid h-100   d-flex flex-column justify-content-center align-items-center ">
                <div className="h-40">
                    <img className=" img-fluid" src="/img/loandig.gif" style={{
                        maxHeight: "300px"
                    }} id="carga" />
                </div>
                <div className="d-flex flex-column justify-content-end align-content-center h-50">
                    <div className=" d-flex flex-column text-center mx-auto align-items-center justify-content-center ">
                        <div className="col-6">
                            <div className="">
                                <h3> #Control</h3>
                                <IonLabel>  <h3>{"" + (campos.control).replace(".", "")} </h3></IonLabel>
                                <p className="" id="comprobante"></p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="">
                                <h3>Valor</h3>
                                <IonLabel>  <h3>${campos.valor.replace("$", "")}</h3></IonLabel>
                                <p className="" id="valor"></p>
                            </div>
                        </div>
                        <div className=" d-flex flex-column ">
                            <IonButton className=" bg-speed" disabled={!disable} shape="round" onClick={ReportarPago}  >Reportar</IonButton>
                            <IonButton className=" bg-speed" shape="round" onClick={() => window.location.reload()}>Subir otro comprobante</IonButton>
                        </div>
                    </div>

                </div>


            </div> :
                <div className=" container-fluid h-100   d-flex flex-column justify-content-center align-items-center ">
                    <div className="h-40">
                        {!file ?  <img src="/img/cohete.gif">
                        </img>:
                            <img src={imagnlugar} style={{maxHeight:"350px"}}>
                            </img>}
                    </div>
                    <div className="text-center h-50">
                        <FileUploader
                            className=""
                            multiple={true}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        />
                        <p>{file ? `Imagen cargada: ${file[0].name}` : "no hay archivo subido"}</p>
                        <div className=" d-flex flex-column mx-auto align-items-center justify-content-center ">
                            <div className="col-6">
                                <div className="group">
                                    <input type="number"
                                        name="control"
                                        onChange={(e) => setCampos({ ...campos, control: e.target.value })}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label># de comprobante </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="group">
                                    <input type="text"
                                        name="valor"
                                        onChange={(e) => setCampos({ ...campos, valor: e.target.value })}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>$00.00</label>
                                </div>
                            </div>
                            <div className="">
                                {campos.valor.trim() != "" && campos.control.trim() != "" ? <IonButton shape="round" onClick={LeerPago} >Cargar</IonButton> : <IonButton shape="round" onClick={Comprobar} >Cargar</IonButton>}
                            </div>
                        </div>

                    </div>


                </div>}
        </IonPage>
    )
}