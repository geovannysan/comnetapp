import "./Perfil.css"
export function PerfilView() {
    return (
        <div className=" container">
            <div className="row">

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="m-t-30  text-center">
                                <img width="100" height="100" className="avatarcliente miprofile  "
                                style={{
                                    borderRadius:"50%"
                                }}
                                data-name="MERO MONTALVAN JOSELITO SABINO"  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6IHJnYigyMTUsIDE5MiwgMTM4KTsgd2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4OyBib3JkZXItcmFkaXVzOiAwcHg7Ij48dGV4dCB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB5PSI1MCUiIHg9IjUwJSIgZHk9IjAuMzVlbSIgcG9pbnRlci1ldmVudHM9ImF1dG8iIGZpbGw9IiNmZmZmZmYiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2FOZXVlLUxpZ2h0LEhlbHZldGljYSBOZXVlIExpZ2h0LEhlbHZldGljYSBOZXVlLEhlbHZldGljYSwgQXJpYWwsTHVjaWRhIEdyYW5kZSwgc2Fucy1zZXJpZiIgc3R5bGU9ImZvbnQtd2VpZ2h0OiA2MDA7IGZvbnQtc2l6ZTogNTBweDsiPk1NPC90ZXh0Pjwvc3ZnPg==" />
                                <h4 className="card-title m-t-10">MERO MONTALVAN JOSELITO SABINO</h4>
                                <h6 className="card-subtitle">Administrador</h6>
                                <br />
                                <button type="button" className="btnfb btn btn-xs btn-default d-none"  data-original-title="Avatar desde Facebook"><i className="fab fa-facebook-f"></i>Facebook</button>

                                <button type="button" className="btntwitter btn btn-xs btn-default d-none" title=""  data-original-title="Avatar desde twitter"><i className="fab fa-twitter"></i> Twitter</button>

                                <button type="button" className="btngravatar btn btn-xs btn-default d-none" data-toggle="tooltip" title=""  ><i className="fas fa-camera-retro"></i> Gravatar</button>



                            </div>

                        </div>
                        <div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card">


                        <form id="frm-login" className="form-horizontal form-material" action="ajax/utilidades?action=update" method="post">

                            <ul className="nav nav-tabs profile-tab" role="tablist">
                                <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#datos" role="tab" aria-expanded="true">Mis datos</a> </li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane active" id="datos" role="tabpanel" aria-expanded="true">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="col-md-12 form-label"><i className="far fa-user-o" aria-hidden="true"></i> Nombres Completos</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="Johnathan Doe" className="form-control form-control-line" name="user-nombre" value="MERO MONTALVAN JOSELITO SABINO" readonly="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="far fa-envelope" aria-hidden="true"></i> Dirección Principal</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="Av. Los geranios 3364" className="form-control form-control-line" name="user[direccion_principal]" value="PANCHO JACOME MZ 305 SL 11" required="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="far fa-envelope" aria-hidden="true"></i> Email</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="johnathan@admin.com" className="form-control form-control-line" name="user[correo]" value="josemero616@gmail.com" required="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="fas fa-mobile-alt" aria-hidden="true"></i> Teléfono Móvil</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="1234567890" className="form-control form-control-line" name="user[movil]" value="0958896264" required="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="fas fa-phone-volume"></i> Teléfono Fijo</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="1234567890" className="form-control form-control-line" name="user[telefono]" value="0991550150----0991621050" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-12 p-2">
                                                <button className="btn  btn-default" type="submit">Actualizar datos</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}