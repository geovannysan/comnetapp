export default function PerfilViews() {
    return (<div>
        <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
            {/* <!--header welcome-->*/}
            <div className="container-fluid pt-2 h-50 text-end btn-group-vertical">
                <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{ height: "65px" }} alt="" />
            </div>
            <div className="container-fluid bg- h-50 bg-welcome-radius px-0">
                <div className="container w-75 h-100 ">
                    <div className="row h-100  ">
                        <div className="col-5  text-end p-0">
                            <img src="img/user-avatar.png" style={{ height: "80px" }} className="img-fluid " alt="" />
                        </div>
                        <div className="col-4 w-50 btn-group-vertical text-white">
                            <p></p>
                            <h5 className="mt-n3">Mis datos</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*<!--fin header welcome-->*/}



        <div className="container-fluid h-73  btn-group-vertical  p-4">
            {/* <!--card info-->*/}
            <div className="card h-100 col-12 col-md-8 mx-auto border pb-3  ver border-primary shadow-lg  ">
                <div className="px-4 my-auto">

                    <div className="row">
                        <div className="col-5 btn-group-vertical  text-center">
                            <img src="img/user-avatar.png" className="img-fluid text-center" style={{ height: "90px" }} alt="" />
                            <div className="col-sm">
                                <button
                                    className="btn bg-white border border-1 border-dark-subtle text-dark  rounded-pill  shadow-3">
                                    <div style={{ fontSize: "0.4em" }} className="span">Actualizar Foto de perfil</div>
                                </button>
                            </div>

                        </div>
                        <div className=" col-7 
                        d-flex justify-content-center flex-column py-2
                        ">
                            <h6 style={{ fontSize: "0.7em" }}>Estado: <span>ACTIVO</span> </h6>
                            <h6 style={{ fontSize: "0.7em" }}>Saldo pendiente: <span>$19.99</span> </h6>
                            <h6 style={{ fontSize: "0.7em" }}>Plan actual: <span>PLAN HOME</span> </h6>
                            <h6 style={{ fontSize: "0.7em" }}>Contrato #: <span>MONTE-24-HOG</span> </h6>
                        </div>
                    </div>
                    <div className="pt-3 ">
                        <div className="group ">
                            <input type="text" className="textbox" value="Rafael olivera marquez ortiz" required />
                            <span className="highlight"></span>
                            <span className=" bar"> </span>
                            <label>Nombre completo</label>
                        </div>
                        <div className="group ">
                            <input type="text" className="textbox" value="099999999" required />
                            <span className="highlight"></span>
                            <span className=" bar"> </span>
                            <label>Número de identidad</label>
                        </div>
                        <div className="group ">
                            <input type="text" className="textbox" value="Primera etapa villa 2 " required />
                            <span className="highlight"></span>
                            <span className=" bar"> </span>
                            <label>Direcion principal</label>
                        </div>
                        <div className="group ">
                            <input type="text" className="textbox" value="correo@gmail.com" required />
                            <span className="highlight"></span>
                            <span className=" bar"> </span>
                            <label>Email</label>
                        </div>
                        <div className="group ">
                            <input type="text" className="textbox" value="09999999" required />
                            <span className="highlight"></span>
                            <span className=" bar"> </span>
                            <label>Telefono</label>
                        </div>
                        <div className=" text-center">
                            <button className="btn btn-sm  bg-blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2">

                                Actualizar</button>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    </div>)
}