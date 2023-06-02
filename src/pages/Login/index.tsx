import { useIonToast } from '@ionic/react';
import {  useHistory } from 'react-router';
import logo from "../../imagen/logo.png"

import { useDispatch } from 'react-redux';
import { setDatosuser, setPlan, setlogin } from '../../StoreRedux/Slice/UserSlice';
import { useState } from 'react';
import { ListarFactura, autenticar } from '../../utils/Queryuser';

const Page: React.FC = () => {
    let usedispat = useDispatch()
    let history = useHistory()
    const [present] = useIonToast();
    const [datos, setDatos] = useState({
        cedula: "",
        codigo: ""
    })
    function logearse() {
        if(datos.cedula.trim()!== ""&& datos.codigo.trim()!== ""){
            autenticar(datos.cedula).then(e => {
                console.log(e)
                if (e.estado === "exito") {

                    if (datos.codigo === e.datos[0].codigo) {
                        present({
                            message: 'Bienvenido',
                            cssClass: 'custom-toast',
                            duration: 1500,
                            position: "top"
                        });
                        
                        localStorage.setItem("USERLOGIN", JSON.stringify({...e.datos[0]}))
                        console.log(e.datos)
                        console.log(e.datos[0].id)
                        ListarFactura(e.datos[0].id).then(ouput => {
                            let datos = ouput
                            console.log(datos)
                            if (ouput.length > 1) {
                                localStorage.setItem("INFOUSER", JSON.stringify(datos.length > 1 ? [datos[0], datos[3], datos[4], datos[5]] : datos))
                                usedispat(setPlan(datos.length > 1 ? [datos[0], datos[3], datos[4], datos[5]] : datos))
                                usedispat(setDatosuser(e.datos[0]))
                                usedispat(setlogin({ estado: true }))
                                history.push("/page/inicio")
                            }
                        }).catch(err => {

                        })
                        
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
            })
        }
        else{
        present({
            message: 'Ingrese datos',
            duration: 1500,
            position: "top"
        });}
    }
    function handeChange(e: any) {
        setDatos({
            ...datos,
            [e.name]: e.value
        })
    }


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
                        <button className='btn col-12  btn-primary' onClick={logearse}> Ingrese al Portal </button>

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