import { IonIcon, IonInput, IonItem, IonLabel, IonToggle, useIonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import logo from "../../imagen/logo.png"

import { useDispatch } from 'react-redux';
import { setDatosuser, setPlan, setlogin } from '../../StoreRedux/Slice/UserSlice';
import { useState } from 'react';
import { ListarFactura, Logearusar, autenticar } from '../../utils/Queryuser';
import { arrowBack, arrowForwardCircleOutline, eye, eyeOff } from 'ionicons/icons';
export default function LoginView() {
    let usedispat = useDispatch()
    let historys = useHistory()
    const [present] = useIonToast();
    const [datos, setDatos] = useState({
        cedula: "",
        codigo: ""
    })
    function Iniciarsession() {
        if (datos.cedula.trim() !== "" && datos.codigo.trim() !== "") {
            Logearusar({ "cedula": datos.cedula, "passwors": datos.codigo }).then(ou => {
                console.log(ou)
                if (ou.estado == "exito") {
                    let datos = ou.datos.map((e: any) => {
                        let servicio = e.servicios[e.servicios.length - 1]
                        return {
                            ...e,
                            servicios: [servicio]
                        }
                    })
                    localStorage.setItem("Perfiles", JSON.stringify([...datos]))
                    localStorage.setItem("USERLOGIN", JSON.stringify({ ...datos[0] }))
                    //window.location.href = "/home/inicio"
                    historys.push("/home/inicio")
                    usedispat(setDatosuser(datos[0]))
                    usedispat(setlogin({ estado: true }))
                } else {
                    present({
                        message: ou.mensaje,
                        cssClass: 'custom-toast',
                        duration: 1500,
                        position: "bottom"
                    });
                }
                console.log(ou)
            }).catch(err => {
                console.log(err)
            })

        }
    }
    function Registro() {
        window.location.href = "/registro"
    }
    const [passwordVisible, setPasswordVisible] = useState(false);
    function handeChange(e: any) {
        setDatos({
            ...datos,
            [e.name]: e.value
        })
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    
    return (
        <div className="container-fluid px-0 vh-100">
            <div className="container-fluid h-35 bg-welcome bg-welcome-radius ">
                {/*<!--header welcome-->*/}
                <div className="container-fluid btn-group-vertical h-100 text-center px-0 ">
                    <div className="col-4 col-md-3 mx-auto"><img src="img/btn speed welcome.png" className="img-fluid" alt="" /></div>
                    <div className="col-5 col-md-4 mx-auto mt-n3 d-none"><img src="img/speed logo name.png" className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
            {/*!--fin header welcome-->*/}
            <div className="container-fluid h-50  ">
                <div className="d-flex justify-content-center align-items-end h-30  pb-3">
                    <div className="">
                        <h4 style={{ fontSize: "2em" }} className="fw-bold">¡Bienvenido!</h4>
                    </div>
                </div>
                <div className="container-fluid btn-group-vertical  d-flex  align-items-center ">
                    <div className="col-8">
                        <div className="group">
                            <input type="text"
                                name="cedula"
                                onChange={(e) => handeChange(e.target)}
                                value={datos.cedula} className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Cédula</label>
                        </div>
                    </div>
                    <div className="col-8  text-center">
                        <div className="group ">
                            <input type={passwordVisible ? 'text' : 'password'}
                                value={datos.codigo}
                                onChange={(e) => handeChange(e.target)}
                                name="codigo"
                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <span onClick={togglePasswordVisibility} className=" float-end mt-n5">{passwordVisible ? <i className=" icon-eye-off" ></i> : <i className=" icon-eye" ></i>} </span>
                            <label>Contraseña</label>
                        </div>
                    </div>
                    <div className="col-8 ">
                        <div className="col-12 ">
                            <span style={{ fontSize: "0.6em" }} className="fw-bold">
                                Olvidé mi contraseña
                            </span>
                        </div>
                    </div>
                    <div className="d-none justify-content-center">
                        <div className="">
                            <div className="px-5">
                                <input className="textbox-25" placeholder="Contraseña" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-6 text-center mt-2">
                        <button
                        style={{
                            width:"120px"
                        }}
                                className="btn blue-gradient text-white rounded-pill  py-25 shadow-2"
                            onClick={Iniciarsession}>
                                Ingresar
                        </button>
                    </div>
                    <div className="col-6 text-center mt-2">
                        <button style={{
                            width:"120px"
                        }}
                            className="btn blue-gradient text-white rounded-pill py-25 shadow-2"
                            onClick={Registro}>
                            Contratar
                        </button>
                    </div>
                    </div>
                    <div className=" mx-auto pt-2 ">
                        <div className="col-12">
                            <div className="form-check form-switch  d-flex justify-content-center align-items-center ">
                                <input className="form-check-input" type="checkbox" role="switch" checked={true} id="flexSwitchCheckDefault" />
                                <label style={{ fontSize: " 0.6em" }} className="form-check-label pt-1 px-1 fw-bold"
                                >Mantener la sesión
                                    activa</label>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
            {/*<!--fin card info-->*/}
            <div className="container-fluid h-10 bg-blue-gradient position-absolute bottom-0">
                <div className="container-fluid btn-group-vertical  h-100">
                    <div className="col-12 text-center text-white fs-13"> COMPUTECNICSNET S.A </div>
                </div>
            </div>
        </div>



    );
}