import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import { IonButton, IonIcon, IonPage, IonButtons, IonToolbar, useIonToast, IonLabel } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import { OCRApi, Obtenerlinkimagen } from "../../utils/Querystorepago";

export default function CargarComprobante() {
    const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];
    let history = useHistory()
    let factura = useSelector(state => state.usuario.factura)
    
    let user = useSelector(state => state.usuario.user)
    const [report, setReport] = useState(false)
    const [file, setFile] = useState(null);
    const [present] = useIonToast();
    const [campos, setCampos] = useState({
        valor: "",
        control: ""
    })
    const handleChange = async (file) => {
        console.log(file[0])
        setFile(file);
    };

    /*
    {
        "beneficiario": "Computecnicsnet S.A.",
        "banco": "BANCO PICHINCHA",
        "valor": 15,
        "comprobante": "TRANSFERENCIA",
        "numero_documento": "17326450",
        "numer_cuenta": "******6995",
        "hora": null,
        "fecha": "19 jul. 2023",
        "afavor": 0
    }
    */
    // Agregar eventos de clic para mostrar y ocultar el div
    //miDiv.addEventListener('click', mostrarConZoom);
    // document.body.addEventListener('click', ocultarConZoom);
    let idcuenta={
        "pichincha":"",
        "pacifico":"",
        "guayaquil":"",
        "produbanco":""
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
        if (consulta.success) {
            let datos = consulta.data
            let { beneficiario, valor, numero_documento, banco }= datos
            if (!beneficiario.toLowerCase().includes("computecnicsnet")) {

                return
            }
            if (!(String(valor) == campos.valor)){
                
                return
            }
            if ((String(numero_documento) == campos.control)){

                return
            }

        }
        document.getElementById("carga").src = imagen
        console.log(consulta)
        } catch (error) {
            console.log(error)
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
            <IonToolbar className=" ion-no-border">
                <IonButtons slot="start">
                    <IonButton color={"dark"} onClick={() => history.goBack()}>
                        <IonIcon className=" text-black" icon={arrowBack} />
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
                        <div className=" d-flex flex-column">
                            <IonButton shape="round"  >Reportar</IonButton>
                            <IonButton shape="round" onClick={() => window.location.reload()}>Subir oto comprobante</IonButton>
                        </div>
                    </div>

                </div>


            </div> :
                <div className=" container-fluid h-100   d-flex flex-column justify-content-center align-items-center ">
                    <div className="h-40">
                        <img src="/img/cohete.gif">
                        </img>
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
                                    <input type="text"
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