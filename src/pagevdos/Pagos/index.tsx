import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";

export default function PAgosViewa() {
    let history = useHistory()
    return (

        <div className="container-fluid px-0 vh-100">{/*<!--Contenedor General-->*/}
            <IonHeader className="d-none">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={()=> history.goBack()}>
                            <IonIcon icon={arrowBack} />

                            <IonBackButton></IonBackButton>
                        </IonButton>
                    </IonButtons>
                   
                </IonToolbar>
            </IonHeader>
            <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">

                {/*<!--header welcome-->*/}
                <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                    <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{
                        height: "50px"
                    }} alt="" />
                </div>
                <div className="container-fluid h-50 bg-welcome-radius px-0">
                    <div className="container  h-100 ">
                        <div className="row h-100 pt-2 justify-content-center">
                            <div className="col-5 w-50 text-end p-0">
                                <img src="img/opcion pagos/pagos-icon.png" style={{
                                    height: "8vh"
                                }} className="img-fluid " alt="" />
                            </div>
                            <div className="col-auto w-50 btn-group-vertical text-white">
                                <p className="text-uppercase subtitulo" style={{
                                    fontSize: "1.8vh"
                                }}>OPCIÓN</p>
                                <h5 className="mt-n4 text-uppercase titulo" style={{
                                    fontSize: "2.7vh"
                                }}>PAGOS</h5>
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
                        <div className="row flex-row-reverse col-12 shadow-3  rounded-4 mx-auto my-2 h-33 bg-white py-0">
                            {/*<!--card opcion-->*/}
                            <div className="col-7 h-100 border rounded-end-4">
                                <div className="row w-100 justify-content-center mx-auto h-100">
                                    <div className="col-12 h-100 btn-group-vertical">
                                        <li className="list-unstyled my-md-1" style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                        }}>
                                            <span className="" ><img src="img/opcion pagos/icon-plan.png" className="img-fluid" style={{
                                                height: "2vh"
                                            }} alt="" /></span>
                                            <span className="text-muted text-uppercase" style={{
                                                fontSize: "1.4vh"
                                            }}>plan advance-antig</span>
                                        </li>
                                        <li className="list-unstyled my-md-1" style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                        }} >
                                            <span className="" ><img src="img/opcion pagos/icon-wifi.png" className="img-fluid" style={{
                                                height: "2vh"
                                            }} alt="" /></span>
                                            <span className="text-muted text-uppercase" style={{
                                                fontSize: "1.4vh"
                                            }}>COMNET_MANCHENO</span>
                                        </li>
                                        <li className="list-unstyled my-md-1" style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                        }} >
                                            <span className="" ><img src="img/opcion pagos/icon-fact.png" className="img-fluid" style={{
                                                height: "2vh"
                                            }} alt="" /></span>
                                            <span className="text-muted text-uppercase" style={{
                                                fontSize: "1.4vh"
                                            }}>FACT. PENDIENTES: <span className="fw-bold">1</span></span>
                                        </li>
                                        <li className="list-unstyled my-md-1" style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                        }}>
                                            <span className="" ><img src="img/opcion pagos/valor-pendiente-de-pago.png" className="img-fluid" style={{
                                                height: "2vh;"
                                            }} alt="" /></span>
                                            <span className="text-muted text-uppercase" style={{
                                                fontSize: "1.4vh"
                                            }}>valores a pagar:</span>
                                        </li>
                                        <h4 className="fw-bold mt-2 mx-auto pt-2" style={{
                                            fontSize: "3vh"
                                        }}>$31.12</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-5 px-1 d-no h-100 rounded-start-4 bg-orange-gradient-180">
                                <div className="col-12 h-100 w-100 btn-group-vertical">
                                    <div className="container h-30">
                                        <div className="col-12 pt-3">
                                            <h4 className="text-white border-start border-3 border-white ps-1" style={{
                                                fontSize: "1.7vh"
                                            }}>Valores Pendientes</h4>
                                        </div>
                                    </div>
                                    <div className="container h-40 text-center btn-group-vertical">
                                        <img src="img/opcion pagos/reportar pago-icon.png" className="img-fluid drop-shadow-2 mx-auto" style={{
                                            height: "9.5vh"
                                        }} alt="" />
                                    </div>
                                    <div className="container h-30 btn-group-vertical ">
                                        <a href="" className="text-uppercase text-orange fw-bold none-style bg-white shadow-1 px-4 py-15 rounded-pill border mx-auto"
                                            style={{
                                                fontSize: "1.8vh"
                                            }}>pagar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<!--cierre card opcion-->*/}

                        <div className="row col-12 mx-auto h-35 mt-3 ">
                            {/*<!--card opciones verticales-->*/}
                            <div className="col-6 h-100 px-1 btn-group-vertical drop-shadow-1">
                                {/*<!--card opcion-->*/}
                                <div className="col-12 h-40 rounded-top-4 bg-orange-gradient btn-group-vertical">
                                    <h4 className="text-white mx-auto" style={{
                                        fontSize: "1.5vh"
                                    }}>Mis Comprobantes</h4>
                                    <img src="img/opcion pagos/comprobantes-icon.png" className="img-fluid p-0 mt-n2 mx-auto drop-shadow-2" style={{
                                        height: "7vh"
                                    }} alt="" />
                                </div>

                                <div className="col-12 h-60  rounded-bottom-4">
                                    <div className="col-12 h-60 bg-white mx-auto btn-group-vertical pt-2">
                                        <div className="row col-12 mx-auto justify-content-center pt-2">
                                            <div className="col-2">
                                                <span><img src="img/opcion pagos/icon-fact.png" style={{
                                                    height: "3vh"
                                                }} alt="" /></span>
                                            </div>
                                            <div className="col-9 ps-3">
                                                <p className="text-muted" style={{
                                                    fontSize: "1.6vh"
                                                }}>Consulta el historial de facturación</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 h-40  btn-group-vertical bg-white rounded-bottom-4">
                                        <a className="mx-auto text-white none-style bg-orange px-3 py-1 rounded-pill shadow-2" style={{
                                            fontSize: "1.7vh"
                                        }} href="">Consultar</a>
                                    </div>
                                </div>
                            </div>
                            {/*<!--ciere card opcion-->*/}

                            <div className="col-6 h-100 px-1 btn-group-vertical drop-shadow-1">
                                {/*<!--card opcion-->*/}
                                <div className="col-12 h-40 rounded-top-4 bg-orange-gradient btn-group-vertical">
                                    <h4 className="text-white mx-auto" style={{
                                        fontSize: "1.5vh"
                                    }}>Dudas de Facturación</h4>
                                    <img src="img/opcion pagos/preguntas-facturacion-icon.png" className="img-fluid p-0 mt-n2 mx-auto drop-shadow-2" style={
                                        { height: "7vh" }} alt="" />
                                </div>

                                <div className="col-12 h-60  rounded-bottom-4">
                                    <div className="col-12 h-60 bg-white mx-auto btn-group-vertical pt-2">
                                        <div className="row col-12 mx-auto justify-content-center pt-2">
                                            <div className="col-2">
                                                <span><img src="img/opcion pagos/dudas-facturacion.png" style={{
                                                    height: "3vh"
                                                }} alt="" /></span>
                                            </div>
                                            <div className="col-9 ps-3">
                                                <p className="text-muted" style={{
                                                    fontSize: "1.6vh"
                                                }}>Ingresa tu consulta de Facturación</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 h-40  btn-group-vertical bg-white rounded-bottom-4">
                                        <a className="mx-auto text-white none-style bg-orange px-3 py-1 rounded-pill shadow-2" style={{
                                            fontSize: "1.7vh"
                                        }} href="">Reportar</a>
                                    </div>
                                </div>
                            </div>
                            {/*<!--ciere card opcion-->*/}
                            <div className="col-6"></div>
                        </div>
                        {/*<!--cierre card opciones verticales-->*/}


                    </div>
                </div>
            </div>
            {/*<!--fin card info-->*/}

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
    )
}