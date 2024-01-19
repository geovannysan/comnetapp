
import { useHistory } from 'react-router';
import { IonContent, IonItem, IonList, IonPage, IonSelect, IonSelectOption, useIonAlert, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { Preregitrouser } from '../../utils/Querystados';
export default function RegisterViews() {
    let history = useHistory()
    const [present] = useIonToast();
    const [presentAlert] = useIonAlert();
    const [params, setParams] = useState({
        "cedularuc": "",
        "direccioncont": "", "emailcont": "", "indicaciones": ""
        , "nombrecont": ""
        , "nombrefam": ""
        , "nombreper": ""
        , "phone1": ""
        , "phone2": ""
        , "phonefam": ""
        , "phoneper": "",
        "planes": ""
    })
    function handelchange(e) {
        // console.log(e)
        setParams({
            ...params,
            [e.target.name]: e.target.value
        })
    }
    function onsubmint() {
        //console.log(params)
        if (!Object.values(params).every(e => e)) {
            present({
                message: "Completa toda la información del registro",
                duration: 4500,
                position: "bottom"
            });
            return
        };
        if (!validarDocumento()) {
            setParams({
                ...params,
                cedularuc: ""
            })
            return
        }
        let data = {
            "cliente": params.nombrecont,
            "cedula": params.cedularuc,
            "direccion": params.direccioncont,
            "telefono": params.phone2,
            "movil": params.phone1,
            "email": params.emailcont,
            "notas": params.indicaciones + " Referencia personal:" + params.nombreper + " Telefono:" + params.phoneper + " Referencia Familiar:" + params.nombrefam + " Telefono:" + params.phonefam + "  Plan:" + params.planes + " Ingresado desde la Web",
            "fecha_instalacion": new Date()
        }
        console.log(data)
        //return
        Preregitrouser(data).then(ouput => {
            if (ouput.estado == "error") {
                console.log(ouput)
                return
            }
            if (ouput.estado == "exito") {
                console.log(ouput)
                presentAlert({
                    header: ouput.mensaje,
                    message: 'Solicitud de instalación registrada, espere a que un agente se comunique ',
                    buttons: ['ok'],
                })
                /*
                present({
                    message:  mensaje+" Solicitud de registro ",
                    duration: 4500,
                    position: "bottom"
                });*/
                history.push("/")
                return
            }
        }).catch(error => {

        })
    }

    function validarDocumento() {

        var numero = document.getElementById('cedula').value;
        /* alert(numero); */

        var suma = 0;
        var residuo = 0;
        var pri = false;
        var pub = false;
        var nat = false;
        var numeroProvincias = 22;
        var modulo = 11;
        var p1, p2, p3, p4, p5, p6, p7, p8, p9
        var digitoVerificador


        /* Verifico que el campo no contenga letras */
        var ok = 1;
        for (let i = 0; i < numero.length && ok == 1; i++) {
            var n = parseInt(numero.charAt(i));
            if (isNaN(n)) ok = 0;
        }
        if (ok == 0) {
            present({
                message: "No puedo ingresar caracteres en el número",
                duration: 4500,
                position: "bottom"
            });

            //alert("No puede ingresar caracteres en el número");         
            return false;
        }

        if (numero.length < 10) {
            present({
                message: "El número ingresado no es válido",
                duration: 4500,
                position: "bottom"
            });
            //alert('El número ingresado no es válido');                  
            return false;
        }

        /* Los primeros dos digitos corresponden al codigo de la provincia */
        var provincia = numero.substr(0, 2);
        if (provincia < 1 || provincia > numeroProvincias) {

            present({
                message: "El código de la provicia (dos primeros dijitos es invalido)",
                duration: 4500,
                position: "bottom"
            });
            //alert('El código de la provincia (dos primeros dígitos) es inválido');
            return false;
        }

        /* Aqui almacenamos los digitos de la cedula en variables. */
        const d1 = numero.substr(0, 1);
        const d2 = numero.substr(1, 1);
        const d3 = numero.substr(2, 1);
        const d4 = numero.substr(3, 1);
        const d5 = numero.substr(4, 1);
        const d6 = numero.substr(5, 1);
        const d7 = numero.substr(6, 1);
        const d8 = numero.substr(7, 1);
        const d9 = numero.substr(8, 1);
        const d10 = numero.substr(9, 1);

        /* El tercer digito es: */
        /* 9 para sociedades privadas y extranjeros   */
        /* 6 para sociedades publicas */
        /* menor que 6 (0,1,2,3,4,5) para personas naturales */

        if (d3 == 7 || d3 == 8) {

            present({
                message: "El tercer dígito ingresado es invalido ",
                duration: 4500,
                position: "bottom"
            });
            //alert('El tercer dígito ingresado es inválido');
            return false;
        }

        /* Solo para personas naturales (modulo 10) */
        if (d3 < 6) {
            nat = true;
            p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
            p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
            p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
            p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
            p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
            p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
            p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
            p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
            p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
            modulo = 10;
        }

        /* Solo para sociedades publicas (modulo 11) */
        /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
        else if (d3 == 6) {
            pub = true;
            p1 = d1 * 3;
            p2 = d2 * 2;
            p3 = d3 * 7;
            p4 = d4 * 6;
            p5 = d5 * 5;
            p6 = d6 * 4;
            p7 = d7 * 3;
            p8 = d8 * 2;
            p9 = 0;
        }

        /* Solo para entidades privadas (modulo 11) */
        else if (d3 == 9) {
            pri = true;
            p1 = d1 * 4;
            p2 = d2 * 3;
            p3 = d3 * 2;
            p4 = d4 * 7;
            p5 = d5 * 6;
            p6 = d6 * 5;
            p7 = d7 * 4;
            p8 = d8 * 3;
            p9 = d9 * 2;
        }

        suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
        residuo = suma % modulo;

        /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
        digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

        /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
        if (pub == true) {
            if (digitoVerificador != d9) {


                //alert('El ruc de la empresa del sector público es incorrecto.');
                return false;
            }
            /* El ruc de las empresas del sector publico terminan con 0001*/
            if (numero.substr(9, 4) != '0001') {


                // alert('El ruc de la empresa del sector público debe terminar con 0001');
                return false;
            }
        }
        else if (pri == true) {
            if (digitoVerificador != d10) {

                //alert('El ruc de la empresa del sector privado es incorrecto.');
                return false;
            }
            if (numero.substr(10, 3) != '001') {

                //alert('El ruc de la empresa del sector privado debe terminar con 001');
                return false;
            }
        }

        else if (nat == true) {
            if (digitoVerificador != d10) {


                //alert('El número de cédula de la persona natural es incorrecto.');
                return false;
            }
            if (numero.length > 10 && numero.substr(10, 3) != '001') {

                // alert('El ruc de la persona natural debe terminar con 001');
                return false;
            }
        }
        return true;
    }
    return (
        <IonPage>
            <IonContent>
                <div className="container-fluid px-0 h-100">

                    <div className="container-fluid  h-10 bg-welcome bg-welcome-radius ">
                        {/*<!--header welcome-->*/}
                        <div className="container-fluid btn-group-vertical h-100 text-center px-0 ">
                            <div className="col-4 col-md-3 mx-auto"><img style={{
                                height: "50px"
                            }} src="img/btn speed welcome.png" className="img-fluid" alt="" /></div>
                            <div className="col-5 col-md-4 mx-auto mt-n3 d-none"><img src="img/speed logo name.png" className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                    {/*!--fin header welcome-->*/}
                    <div className="container-fluid h-25  ">
                        <div className="d-flex justify-content-center align-items-end h-20  pb-1">
                            <div className="">
                                <h4 style={{ fontSize: "1.5em" }} className="fw-bold">Solicitud de registro de servicio </h4>
                            </div>

                        </div>
                        <div className="container-fluid btn-group-vertical  d-flex  align-items-center "
                            style={{
                                overflow: "scroll"
                            }}
                        >
                            <div className="col-10">
                                <div className="group">
                                    <input type="text"
                                        name="nombrecont"
                                        onChange={(e) => handelchange(e)}
                                        value={params.nombrecont}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Apellidos y Nombres</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input type="number"
                                        autoComplete="false"
                                        id='cedula'
                                        name="cedularuc"
                                        onChange={(e) => handelchange(e)}
                                        value={params.cedularuc}
                                        onBlur={validarDocumento}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input type="text"
                                        name="phone1"
                                        onChange={(e) => handelchange(e)}
                                        value={params.phone1}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Télefono 1</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input type="text"
                                        name="phone2" onChange={(e) => handelchange(e)}
                                        value={params.phone2}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Télefono 2</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input type="text"
                                        name="emailcont"
                                        onChange={(e) => handelchange(e)}
                                        value={params.emailcont}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Correo electrónico</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input type="text"
                                        name="direccioncont"
                                        onChange={(e) => handelchange(e)}
                                        value={params.direccioncont}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Dirección del domicilio. Mz. Solar</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <textarea
                                        name="indicaciones"
                                        onChange={(e) => handelchange(e)}
                                        value={params.indicaciones}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Indícanos brevemente cómo llegar a tu domicilio. (Un punto de referencia)</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input
                                        name="nombreper"
                                        onChange={(e) => handelchange(e)}
                                        value={params.nombreper}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Nombre de una Referencia Personal</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input
                                        name="phoneper"
                                        onChange={(e) => handelchange(e)}
                                        value={params.phoneper}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Télefono</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input
                                        name="nombrefam"
                                        onChange={(e) => handelchange(e)}
                                        value={params.nombrefam}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Nombre de una Referencia Personal</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <input
                                        name="phonefam"
                                        onChange={(e) => handelchange(e)}
                                        value={params.phonefam}
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Télefono</label>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="group">
                                    <IonSelect name="planes"
                                        onIonChange={(e) => handelchange(e)}
                                        id="validationCustom12"
                                        placeholder="Seleccione plan"
                                        interface="action-sheet"
                                        okText="Aceptar"
                                        cancelText="Cancelar">
                                        <IonSelectOption value=""></IonSelectOption>
                                        <IonSelectOption value="PLAN-HOME">HOME-80Mbps $22.40</IonSelectOption>
                                        <IonSelectOption value="PLAN-SILVER">SILVER-130Mbps $26.00</IonSelectOption>
                                        <IonSelectOption value="PLAN-ADVANCE">ADVANCE-170Mbps $31.12</IonSelectOption>
                                        <IonSelectOption value="PLAN-PRO">PRO-170Mbps $33.60</IonSelectOption>
                                        <IonSelectOption value="PLAN-SPEED">SPEED-350Mbps $50.00</IonSelectOption>
                                    </IonSelect>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>

                                </div>
                            </div>
                            <div className="col-12 text-center mt-2 ">

                                <div className='row'>
                                    <div className='col-6'>
                                        <button
                                            onClick={onsubmint}
                                            className="btn blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2">
                                            Registrar
                                        </button>
                                    </div>
                                    <div className='col-6'>
                                        <button
                                            onClick={()=>history.goBack()}
                                            className="btn bg-danger text-white rounded-pill btn-size-1 py-25 shadow-2">
                                            Atrás
                                        </button>
                                    </div>
                                </div>
                                
                            </div>


                        </div>
                    </div>
                    {/*<!--fin card info-->*/}
                    <div className="d-none container-fluid h-10 bg-blue-gradient position-absolute bottom-0">
                        <div className="container-fluid btn-group-vertical  h-100">
                            <div className="col-12 text-center text-white fs-13"> COMPUTECNICSNET S.A </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}