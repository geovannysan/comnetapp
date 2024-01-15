import { IonIcon, IonInput, IonItem, IonLabel, IonToggle, useIonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import logo from "../../imagen/logo.png"

import { useDispatch } from 'react-redux';
import { setDatosuser, setPlan, setlogin } from '../../StoreRedux/Slice/UserSlice';
import { useState } from 'react';
import { ListarFactura, Logearusar, autenticar } from '../../utils/Queryuser';
import { eye, eyeOff } from 'ionicons/icons';
export default function RegisterViews() {
    return (
        <div className="container-fluid px-0 vh-100">

            <div className="container-fluid h-40 bg-welcome bg-welcome-radius ">
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

                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Cédula</label>
                        </div>
                    </div>
                    <div className="col-8  text-center">
                        <div className="group ">
                            <input


                                name="codigo"
                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <span className=" float-end mt-n5"> </span>


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
                    <div className="col-12 text-center mt-2">
                        <button
                            className="btn blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2">
                            Ingresar
                        </button>
                    </div>
                    <div className=" mx-auto pt-2 ">
                        <div className="col-12">
                            <div className="form-check form-switch  d-flex justify-content-center align-items-center ">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label style={{ fontSize: " 0.6em" }} className="form-check-label pt-1 px-1 fw-bold">
                                    Mantener la sesión activa
                                </label>
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
    )
}