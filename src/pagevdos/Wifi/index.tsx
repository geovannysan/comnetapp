export default function WifiView(){
    return(
        <>
            <div className="container-fluid px-0 vh-100">
                {/*<!--Contenedor General-->*/}

                <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
                    {/*<!--header welcome-->*/}
                    <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                        <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{height:"50px"}} alt=""/>
                    </div>
                    <div className="container-fluid h-50 bg-welcome-radius px-0">
                        <div className="container  h-100 ">
                            <div className="row h-100 pt-2 justify-content-center">
                                <div className="col-5 w-50 text-end p-0">
                                    <img src="img/opcion wifi/mi wifi.png" style={{height:"8vh"}} className="img-fluid " alt=""/>
                                </div>
                                <div className="col-auto w-50 btn-group-vertical text-white">
                                    <p className="text-uppercase subtitulo" style={{fontSize:"1.8vh"}}>OPCIÓN</p>
                                    <h5 className="mt-n4 text-uppercase titulo" style={{fontSize:"2.7vh"}} >Mi Wifi</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!--fin header welcome-->*/}



                <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                    {/*<!--card info-->*/}
                    <div className="container-fluid h-100 btn-group-vertical" >
                        <div className="container-fluid btn-group-vertical h-100  ">
                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">   
                                        {/*<!--card texto-->*/}
                                            <div className="col-12 text-muted" style={{fontSize:"1.6vh"}}>Nombre de Red</div>
                                            <div className="col-12 mt-1 text-celeste" style={{fontSize:"1.6vh"}}><span id="nombre_de_red">SPEED_MANCHENO_PERALTA</span></div>
                                        </div>
                                        {/* <!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a href="" className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " style={{fontSize:"1.4vh"}}>Cambiar</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/wifi signal.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}

                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">  
                                        {/* <!--card texto-->*/}
                                            <div className="col-12 text-muted" 
                                            style={{fontSize:"1.6vh"}}>Clave WIFI</div>
                                            <div className="col-12 mt-1 text-celeste" 
                                            style={{fontSize:"1.8vh"}}><span id="nombre_de_red">*****************</span></div>
                                        </div>
                                        {/* <!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a href="" className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " 
                                            style={{fontSize:"1.4vh"}}>Cambiar</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/wifi pass.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}


                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">   
                                        {/*<!--card texto-->*/}
                                            <div className="col-12 text-muted" style={{fontSize:"1.6vh"}}>Estado RED WIFI</div>
                                            <div className="col-12 mt-1 text-celeste" style={{fontSize:"1.6vh"}}><span id="nombre_de_red">VISIBLE</span></div>
                                        </div>
                                        {/* <!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a href="" className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " style={{fontSize:"1.4vh"}}>Ocultar Red</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/ocultar wifi.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}


                            <div className="row col-11 shadow-3  rounded-4 mx-auto my-2 h-20 bg-white ">
                                {/*<!--card opcion-->*/}
                                <div className="col-8 h-100 border rounded-start-4">
                                    <div className="row w-80 h-100">
                                        <div className="container h-50 pt-2">   
                                        {/*<!--card texto-->*/}
                                            <div className="col-12 text-muted" 
                                            style={{fontSize:"1.6vh"}}>Ver Dispositivos</div>
                                            <div className="col-12 mt-1 text-celeste" 
                                            style={{fontSize:"1.6vh"}}><span id="nombre_de_red">CONECTADOS</span></div>
                                        </div>                                         
                                        {/*<!--cierre card texto-->*/}
                                        <div className="container h-50 btn-group-vertical ">
                                            {/*<!--card btn-->*/}
                                            <div className="col-12 "><a href="" className="text-purple py-2 none-style shadow-3 border rounded-pill px-4 " style={{fontSize:"1.4vh"}}>Ver Lista</a></div>
                                        </div>
                                        {/*<!--cierre card btn-->*/}
                                    </div>
                                </div>

                                <div className="col-4 d-no h-100 rounded-end-4 bg-purpura-gradient">
                                    <div className="col-12 h-100 w-100 btn-group-vertical">
                                        <img src="img/opcion wifi/ver dispositivos.png" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/*<!--cierre card opcion-->*/}
                        </div>
                    </div>
                </div>
                {/*<!--fin card info-->*/}

                <div className="container-fluid h-7 bg-blue-gradient d-none ">
                    <div className="container h-100 btn-group-vertical">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-auto mx-3 text-center "><a className="none-style fs-22" href="home.html"><span className="icon-home-3 text-white"></span></a></div>
                                <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href=""><span className="icon-plus-squared text-white"></span></a></div>
                                <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href="datos.html"><span className="icon-user-4 text-white"></span></a></div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </>
    )
}