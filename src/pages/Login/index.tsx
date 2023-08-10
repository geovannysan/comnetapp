import { useIonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import logo from "../../imagen/logo.png"

import { useDispatch } from 'react-redux';
import { setDatosuser, setlogin } from '../../StoreRedux/Slice/UserSlice';
import { useState } from 'react';
import { autenticar, Logearse, Loginadmin } from '../../utils/Queryuser';
import { usuarioTocken } from '../../utils/variables';
import axios from 'axios';

const Page: React.FC = () => {
    let usedispat = useDispatch()
    let history = useHistory()
    const [present] = useIonToast();
    const [datos, setDatos] = useState({
        cedula: "",
        codigo: ""
    })
    function iniciarsecion() {
        let info = {
            username: datos.cedula.trim(),
            password: datos.codigo.trim()
        }
        Logearse(info).then(oupt => {
            if(oupt.estado&&oupt.estado!="error"){
                sessionStorage.setItem("USERLOGIN", JSON.stringify({ ...oupt.user}))
                usedispat(setDatosuser({...oupt.user}))
                usedispat(setlogin({ estado: true }))
                history.push("/page/inicio")
            }
            console.log(oupt)
        }).catch(err => {
            console.log(err)
        })
    }
    function logearse() {
        if (datos.cedula.trim() !== "" && datos.codigo.trim() !== "") {
            let usuario = usuarioTocken.some(e => e.usuario == datos.cedula.trim())
            let pass = usuarioTocken.some(e => e.password == datos.codigo.trim())
            console.log(usuario, pass)
            if (usuario && pass) {
                sessionStorage.setItem("USERLOGIN", JSON.stringify({ ...usuarioTocken.find(e => e.usuario === datos.cedula) }))
                usedispat(setDatosuser(usuarioTocken.find(e => e.usuario === datos.cedula)))
                usedispat(setlogin({ estado: true }))
                history.push("/page/inicio")
            } else if (!usuario) {
                present({
                    message: 'Usuario incorrecto',
                    cssClass: 'custom-toast',
                    duration: 1500,
                    position: "top",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",

                        }
                    ]
                });
            } else if (!pass) {
                present({
                    message: 'Contraseña incorrecto',
                    cssClass: 'custom-toast',
                    duration: 1500,
                    position: "top",
                    buttons: [
                        {
                            text: "cerrar",
                            role: "cancel",

                        }
                    ]
                });
            }
            /* autenticar(datos.cedula).then(e => {
                 if (e.estado === "exito") {
                     if (datos.codigo === e.datos[0].codigo) {
                         present({
                             message: 'Bienvenido',
                             cssClass: 'custom-toast',
                             duration: 1500,
                             position: "bottom"
                         });
                         sessionStorage.setItem("USERLOGIN", JSON.stringify({...e.datos[0]}))
                         usedispat(setDatosuser(e.datos[0]))
                         usedispat(setlogin({ estado: true }))
                         history.push("/page/inicio")
                     }
                     else {
                         present({
                             message: 'Contraseña erronea',
                             cssClass: 'custom-toast',
                             duration: 1500,
                             position: "bottom"
                         });
                     }
                 }
                 else {
                     present({
                         message: 'Solo usuarios del portal pueden ingresar',
                         cssClass: 'custom-toast',
                         duration: 1500,
                         position: "bottom"
                     });
                 }
             }).catch(err => {
                 console.error(err)
             })*/
        }
        else {
            present({
                message: 'Ingrese datos',
                duration: 1500,
                position: "top"
            });
        }
    }
    function handeChange(e: any) {
        setDatos({
            ...datos,
            [e.name]: e.value
        })
    }
    const [credenciales, setnombre] = useState({
        username: '',
        password: '',
    });
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (credenciales.username.trim() !== '' && credenciales.password.trim() !== '') {
            try {
                const data = await Loginadmin({ username: credenciales.username.trim(), password: credenciales.password.trim() })
                const { success, token } = data
                if (success) {
                    //console.log("success-->",data)
                    // setDatosUser(token)
                    //  setShow(true)
                    // setmessage("Inicio de session exitoso")
                    history.push('/admin/inicio')
                }
                else {
                    // setShow(true)
                    // setmessage("Usuario o contraeña incorrecta")
                    console.log("mensage de alvertencia", data)
                }
            } catch (error) {
                //setmessage("Hubo un error intente de nuevo o verifique mas tarde")
                console.log("error Logincredet-->", error)
            }
            //setShow(true)
        }
        // setShow(true)
    };


    return (

        <div className='container-fluid  h-100  d-flex justify-content-center align-items-center'

            style={{
                backgroundColor: "#10063e"
            }}
        >


            <div className='container  d-flex justify-content-center '>
                <div className=' col-12 col-md-4 justify-content-center'>
                    <div className='col-12'>
                        <img src={logo} />
                    </div>
                    <div className="  col-sm-12">
                        <label className="form-label"></label>
                        <input type="text"
                            placeholder='Cédula' className="form-control" name="cedula"
                            value={datos.cedula}
                            onChange={(e) => handeChange(e.target)}
                            required />

                    </div>
                    <div className="col-sm-12 ">
                        <label className="form-label"></label>
                        <input type="text"
                            placeholder='Contraseña' className="form-control"
                            value={datos.codigo}
                            onChange={(e) => handeChange(e.target)}
                            name="codigo" required />
                    </div>
                    <div className='col-12 d-flex justify-content-center pt-3'>
                        <button className='btn col-12  btn-primary' onClick={iniciarsecion}> Ingrese al Portal </button>

                    </div>
                    <div className='mt-2 d-flex justify-content-center'>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label text-white" > Mantener activa la sesión </label>                       </div>
                    </div>
                </div>
            </div>




        </div>



    );
};

export default Page;