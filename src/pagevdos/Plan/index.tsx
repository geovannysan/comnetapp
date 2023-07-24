import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";

export default function PlanView() {
    let history = useHistory()
    return (
        <IonPage>

            <IonContent fullscreen >

                <div className="container-fluid px-0 vh-100">
                    {/*<!--Contenedor General-->*/}

                    <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
                        {/*<!--header welcome-->*/}
                   
                            <IonToolbar className=" ion-no-border">
                                <IonButtons slot="start">
                                    <IonButton onClick={() => history.goBack()}>
                                        <IonIcon icon={arrowBack} />
                                    </IonButton>
                                </IonButtons>
                                <IonButtons slot="end">
                                    <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                                        <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{ height: "50px" }} alt="" />
                                    </div>
                                </IonButtons>
                            </IonToolbar>

                        
                        <div className="container-fluid h-50 bg-welcome-radius px-0">
                            <div className="container  h-100 ">
                                <div className="row h-100 pt-2 justify-content-center">
                                    <div className="col-5 w-20 text-end p-0">
                                        <img src="img/opcion mi plan/icon-mi-plan.png" style={{ height: "8vh" }} className="img-fluid " alt="" />
                                    </div>
                                    <div className="col-auto  text-white pt-2">
                                        <p className="text-uppercase subtitulo " style={{ fontSize: "1.8vh" }}>OPCIÓN</p>
                                        <h5 className="mt-n4 text-uppercase titulo" style={{ fontSize: "2.5vh" }} >MI PLAN</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!--fin header welcome-->*/}



                    <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                        {/*<!--card info-->*/}
                        <div className="container-fluid h-100 btn-group-vertical " >
                            <div className="container-fluid btn-group-vertical h-100">
                                <div className="row flex-row-reverse col-12 shadow-3  rounded-4 mx-auto my-2 h-30 bg-white py-0">
                                    {/*<!--card opcion-->}*/}
                                    <div className="col-7 h-100 border rounded-end-4">
                                        <div className="row w-100 mx-auto h-100">
                                            <div className="col-12 h-100 btn-group-vertical">
                                                <li className="list-unstyled my-md-1" style={{
                                                    width: "100%",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    msTextOverflow: "ellipsis"
                                                }}>
                                                    <span className="" ><img src="img/opcion pagos/icon-plan.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                                    <span className="text-muted text-uppercase" style={{ fontSize: "1.4vh" }}>plan advance-antig</span>
                                                </li>
                                                <li className="list-unstyled my-md-1" style={{
                                                    width: "100%",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis"
                                                }} >
                                                    <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                                    <span className="text-muted" style={{ fontSize: "1.4vh" }}>-23.65 dBm</span>
                                                </li>
                                                <li className="list-unstyled my-md-1" style={{
                                                    width: "100%",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis"
                                                }} >
                                                    <span className="" ><img src="img/opcion soporte/estado-check.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                                    <span className="text-muted text-uppercase" style={{
                                                        fontSize: "1.4vh"
                                                    }}>ESTADO: <span className="fw-bold">Excelente</span></span>
                                                </li>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-5 px-1 d-no h-100 rounded-start-4 bg-green-gradient-180">
                                        <div className="col-12 h-100 w-100 ">
                                            <div className="container h-40 ">
                                                <div className="col-12 pt-3">
                                                    <h4 className="text-white border-start border-3 border-white ps-1" style={{ fontSize: "1.7vh" }}>Detalle del Servicio</h4>
                                                </div>
                                            </div>
                                            <div className="container h-30 text-center btn-group-vertical">
                                                <img src="img/opcion mi plan/mi-plan-detalle.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "9.5vh" }} alt="" />
                                            </div>
                                            <div className="container h-30 btn-group-vertical d-none">
                                                <a className="text-uppercase text-success fw-bold none-style bg-white px-4 py-15 rounded-2 border mx-auto" style={{ fontSize: "3vw" }}>ONLINE</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>{/*<!--cierre card opcion-->}*/}

                                <div className="row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">{/*<!--card opcion-->*/}
                                    <div className="col-8 h-100 border rounded-start-4">
                                        <div className="row w-100 mx-auto h-100">
                                            <div className="col-12 h-100 btn-group-vertical">
                                                <li className="list-unstyled my-md-1" style={{
                                                    width: "100%",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis"
                                                }} >
                                                    <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid" style={{ height: "2vh" }} alt="" /> </span>
                                                    <span className="text-muted" style={{ fontSize: "1.4vh" }}>Señal: <span>-23.65 dBm</span></span>
                                                </li>
                                                <a href="" className="bg-white shadow-1 none-style border px-4 py-1 rounded-pill text-center text-celeste" style={{ fontSize: " 1.6vh" }}>Soporte Técnico</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-green-gradient">
                                        <div className="col-12 h-100 w-100 btn-group-vertical">
                                            <div className="container h-100 text-center btn-group-vertical">
                                                <img src="img/opcion mi plan/wifi-signal-mi-plan.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "8vh" }} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/*<!--cierre card opcion-->*/}

                                <div className="row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">
                                    {/*<!--card opcion-->*/}
                                    <div className="col-8 h-100 border rounded-start-4">
                                        <div className="row w-100 mx-auto h-100">
                                            <div className="col-12 h-100 btn-group-vertical">
                                                <li className="list-unstyled my-md-1" style={{
                                                    width: "100%",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis"
                                                }} >
                                                    <span className="" ><img src="img/opcion soporte/signal-wifi.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                                    <span className="text-muted" style={{ fontSize: "1.4vh" }}>Estado: <span>Excelente</span></span>
                                                </li>
                                                <a href="" className="bg-white shadow-1 none-style  border px-4 py-1 rounded-pill text-center text-celeste" style={{ fontSize: "1.8vh" }}>Realizar Test</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-green-gradient">
                                        <div className="col-12 h-100 w-100 btn-group-vertical">
                                            <div className="container h-100 text-center btn-group-vertical">
                                                <img src="img/opcion mi plan/mi-plan-test-.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: " 8vh" }} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/*<!--cierre card opcion-->*/}

                                <div className="d-none row col-12 shadow-3  rounded-4 mx-auto my-2 h-15 bg-white py-0">
                                    {/*<!--card opcion-->*/}
                                    <div className="col-8 h-100 border rounded-start-4">
                                        <div className="row w-100 mx-auto h-100">
                                            <div className="col-12 h-100 btn-group-vertical">
                                                <li className="list-unstyled my-md-1" style={{
                                                    width: "100%",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipse"
                                                }} >
                                                    <span className="" ><img src="img/opcion pagos/icon-plan.png" className="img-fluid" style={{ height: "2vh" }} alt="" /></span>
                                                    <span className="text-muted text-uppercase" style={{ fontSize: "1.4vh" }}>plan advance-antig</span>
                                                </li>
                                                <a href="" className="bg-white shadow-1 none-style border px-4  rounded-pill text-center text-celeste" style={{ fontSize: " 1.8vh" }}>Speed-Test</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-4 px-1 d-no h-100 rounded-end-4 bg-red-gradient">
                                        <div className="col-12 h-100 w-100 btn-group-vertical">
                                            <div className="container h-100 text-center btn-group-vertical">
                                                <img src="img/opcion soporte/estado-internet.png" className="img-fluid drop-shadow-2 mx-auto" style={{ height: "8vh" }} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>{/*<!--cierre card opcion-->*/}


                            </div>
                        </div>
                    </div>{/*<!--fin card info-->*/}

                    <div className="container-fluid h-7 bg-blue-gradient d-none ">
                        <div className="container h-100 btn-group-vertical">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-auto mx-3 text-center "><a className="none-style fs-22" href="home.html"><span className="icon-home-3  text-white"></span></a></div>
                                    <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href=""><span className="icon-plus-squared text-white"></span></a></div>
                                    <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href="datos.html"><span className="icon-user-4 text-white"></span></a></div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </IonContent>
        </IonPage>
    )
}