export default function DudasView(){
    return(
        <div className="container-fluid px-0 vh-100">{/*<!--Contenedor General-->*/}

            <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">{/*<!--header welcome-->*/}
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
                <div className="container mx-autopt-2 h-50 text-end btn-group-vertical d-none">
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
                                }} >PAGOS</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!--fin header welcome-->*/}



            <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
              
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
    )
}