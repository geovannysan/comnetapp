
import { useHistory } from 'react-router';
import logo from "../../imagen/logo.png"
import { IonItem, IonList, IonSelect, IonSelectOption, IonToggle, useIonToast } from '@ionic/react';

export default function RegisterViews() {
    return (
        <div className="container-fluid px-0 vh-100">

            <div className="container-fluid h-10 bg-welcome bg-welcome-radius ">
                {/*<!--header welcome-->*/}
                <div className="container-fluid btn-group-vertical h-100 text-center px-0 ">
                    <div className="col-4 col-md-3 mx-auto"><img style={{
                        height:"50px"
                    }} src="img/btn speed welcome.png" className="img-fluid" alt="" /></div>
                    <div className="col-5 col-md-4 mx-auto mt-n3 d-none"><img src="img/speed logo name.png" className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
            {/*!--fin header welcome-->*/}



            <div className="container-fluid h-50  ">
                <div className="d-flex justify-content-center align-items-end h-20  pb-3">
                    <div className="">
                        <h4 style={{ fontSize: "2em" }} className="fw-bold">Preregistro de servicio!</h4>
                    </div>

                </div>
                <div className="container-fluid btn-group-vertical  d-flex  align-items-center ">
                    <div className="col-8">
                        <div className="group">
                            <input type="text"
                                name="nombre"

                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Apellidos y Nombres</label>
                        </div>
                    </div>
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
                    <div className="col-8">
                        <div className="group">
                            <input type="text"
                                name="telefono-1"

                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Télefono 1</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="group">
                            <input type="text"
                                name="telefono-2"

                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Télefono 2</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="group">
                            <input type="text"
                                name="email"

                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Correo electrónico</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="group">
                            <input type="text"
                                name="direccion"

                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Dirección del domicilio. Mz. Solar</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="group">
                            <textarea
                                name="nombre"

                                className="textbox" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Indícanos brevemente cómo llegar a tu domicilio. (Un punto de referencia)</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="group">
                            <IonSelect  placeholder="Select plan" >
                                <IonSelectOption value="apple">Apple</IonSelectOption>
                                <IonSelectOption value="banana">Banana</IonSelectOption>
                                <IonSelectOption value="orange">Orange</IonSelectOption>
                            </IonSelect>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            
                        </div>
                    </div>
                    <div className="col-12 text-center mt-2">
                        <button
                            className="btn blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2">
                            Registrar
                        </button>
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