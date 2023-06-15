import { useEffect, useState } from "react"
import "./Perfil.css"
import { userlog } from "../../utils/User"
import { UserUpdate } from "../../utils/Queryuser"
import { IonAvatar, useIonLoading, useIonToast } from "@ionic/react";
export function PerfilView() {
    const [present] = useIonToast();
    const [buton, setButon] = useState(false)
    let [presentlo, dismiss] = useIonLoading()
    const [datos, setDatos] = useState({

        "nombre": "",
        "correo": "",
        "telefono": "",
        "movil": "",
        "cedula": "",
        "codigo": "",
        "direccion_principal": ""
    })
    function handle(e) {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    let dtos = userlog()
    function Onsubmit() {
       // console.log(Object.values(datos).every(e => e), datos)
        if (Object.values(datos).every(e => e)/*datos.correo.trim()!=""&& datos.telefono.trim()!=""&& datos.movil.trim()!=""*/) {
            setButon(true)
            presentlo({
                message: 'Actualizando datos',
                cssClass: 'custom-loading'
            })
            UserUpdate({ "idcliente": dtos.id, ...datos }).then(e => {
            if(e.estado="exito"){

                dismiss()
                present({
                    message: e.mensaje,
                    duration: 1500,
                    position: "bottom"
                });
                setButon(false)
            }
            else{
                dismiss()
                present({
                    message: e.mensaje,
                    duration: 1500,
                    position: "bottom"
                });
                setButon(false)
            }
                console.log(e)
            }).catch(erro => {
                console.log(erro)
            })
        }
        else {
            present({
                message: 'Complete toda la imformación ',
                duration: 1500,
                position: "bottom"
            });

        }
    }
    useEffect(() => {
        setDatos({

            "nombre": dtos.nombre,
            "correo": dtos.correo,
            "telefono": dtos.telefono,
            "movil": dtos.movil,
            "cedula": dtos.cedula,
            "codigo": dtos.codigo,
            "direccion_principal": dtos.direccion_principal
        })


    }, [])
    return (
        <div className=" container">
            <div className="row">

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="m-t-30  text-center">
                                <IonAvatar />
                                <img width="100" height="100" className="d-none avatarcliente miprofile  "
                                    style={{
                                        borderRadius: "50%"
                                    }}
                                    data-name={dtos.nombre} />
                                <h4 className="card-title m-t-10">{dtos.nombre}</h4>
                                <h6 className="card-subtitle"></h6>
                                <br />
                                <button type="button" className="btnfb btn btn-xs btn-default d-none" data-original-title="Avatar desde Facebook"><i className="fab fa-facebook-f"></i>Facebook</button>

                                <button type="button" className="btntwitter btn btn-xs btn-default d-none" title="" data-original-title="Avatar desde twitter"><i className="fab fa-twitter"></i> Twitter</button>

                                <button type="button" className="btngravatar btn btn-xs btn-default d-none" data-toggle="tooltip" title=""  ><i className="fas fa-camera-retro"></i> Gravatar</button>



                            </div>

                        </div>
                        <div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card">


                        <form id="frm-login" className="form-horizontal form-material" method="post">

                            <ul className="nav nav-tabs profile-tab" role="tablist">
                                <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#datos" role="tab" aria-expanded="true">Mis datos</a> </li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane active" id="datos" role="tabpanel" aria-expanded="true">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="col-md-12 form-label"><i className="far fa-user-o" aria-hidden="true"></i> Nombres Completos</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="Johnathan Doe" className="form-control form-control-line" name="nombre" value={datos.nombre}
                                                    onChange={(e) => handle(e)}
                                                    readonly="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="far fa-envelope" aria-hidden="true"></i> Dirección Principal</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="Av. Los geranios 3364" className="form-control form-control-line"
                                                    name="direccion_principal"
                                                    value={datos.direccion_principal}
                                                    onChange={(e) => handle(e)}
                                                    required="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="far fa-envelope" aria-hidden="true"></i> Email</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="johnathan@admin.com" className="form-control form-control-line"
                                                    name="correo" value={datos.correo}

                                                    required="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="fas fa-mobile-alt" aria-hidden="true"></i> Teléfono Móvil</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="1234567890" className="form-control form-control-line"
                                                    name="movil" value={datos.movil}
                                                    onChange={(e) => handle(e)}
                                                    required="" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12"><i className="fas fa-phone-volume"></i> Teléfono Fijo</label>
                                            <div className="col-md-12">
                                                <input type="number" placeholder="1234567890" className="form-control form-control-line"
                                                    name="telefono" value={datos.telefono}

                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-12 p-2">
                                                <button className="btn  btn-default"
                                                    disabled={buton}
                                                    type="button" onClick={Onsubmit}>Actualizar datos</button>
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