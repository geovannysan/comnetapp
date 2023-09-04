import { useEffect, useState } from "react"
import { userlog } from "../../utils/User"
import { UserUpdate, autenticar } from "../../utils/Queryuser"
import AlerModal from "../../components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "../../StoreRedux/Slice/UserSlice"

export default function PerfilViews() {
    let dtos = userlog()
    let aler = useSelector((state:any)=>state.usuario)
    let dispatch = useDispatch()
    const [datos, setDatos] = useState({
        nombre: "",
        cedula: "",
        correo: "",
        direccion_principal: "",
        telefono: ""
    })
    function handelChange(e: any) {
        setDatos({
            ...datos,
            [e.name]: e.value
        })
    }
    function Actualizardatos(){
        let dtos = userlog()
       // console.log(Object.values(datos))
        //console.log(datos)
        //console.log(Object.values(datos).every((e: any) => e))
        if(!Object.values(datos).every((e:any)=>e ))return
        
       // if(true) return
        dispatch(setModal({ nombre: "Alerta", payloa: "Actualizando datos del perfil" }))
        UserUpdate({ "idcliente": dtos.id, ...datos }).then(e=>{
            if (e.estado = "exito") {
                console.log(e)
                autenticar(dtos.cedula).then(e=>{

                })
                dispatch(setModal({ nombre: "", payloa: "" }))
            }else{
            }
        })
    }

    useEffect(() => {
       // console.log(dtos)
        setDatos(
            {
                nombre: dtos.nombre,
                cedula: dtos.cedula,
                correo: dtos.correo,
                direccion_principal: dtos.direccion_principal,
                telefono: dtos.telefono
            }

        )

    }, [])
    return (
        <div>
            <AlerModal/>
            <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
                {/* <!--header welcome-->*/}
                <div className="container-fluid pt-2 h-40 text-end btn-group-vertical">
                    <img src="img/speed logo name.png" className="img-fluid ms-auto" style={{ height: "40px" }} alt="" />
                </div>
                <div className="container-fluid bg- h-45 bg-welcome-radius px-0">
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
                                        className="btn bg-white border d-none border-1 border-dark-subtle text-dark  rounded-pill  shadow-3">
                                        <div style={{ fontSize: "0.4em" }} className="span">Actualizar Foto de perfil</div>
                                    </button>
                                </div>

                            </div>
                            <div className=" col-7 d-flex justify-content-center flex-column py-1  ">
                                <h6 style={{ fontSize: "0.7em" }}>Estado: <span>{dtos.estado}</span> </h6>
                                <h6 style={{ fontSize: "0.7em" }}>Saldo pendiente: <span>${dtos.facturacion.total_facturas}</span> </h6>
                                <h6 style={{ fontSize: "0.7em" }}>Plan actual: <span>{dtos.servicios[0].perfil}</span> </h6>
                                <h6 className="d-none" style={{ fontSize: "0.7em" }}>Contrato #: <span>MONTE-24-HOG</span> </h6>
                            </div>
                        </div>
                        <div className="pt-3 ">
                            <div className="group ">
                                <input type="text" className="textbox"
                                    name="nombre"
                                    onChange={(e: any) => handelChange(e.target)}
                                    value={datos.nombre} required />
                                <span className="highlight"></span>
                                <span className=" bar"> </span>
                                <label>Nombre completo</label>
                            </div>
                            <div className="group ">
                                <input type="text" className="textbox"
                                    name="cedula"
                                    value={datos.cedula} required />
                                <span className="highlight"></span>
                                <span className=" bar"> </span>
                                <label>Número de identidad</label>
                            </div>
                            <div className="group ">
                                <input type="text" className="textbox"
                                    name="ddireccion_principali"
                                    value={datos.direccion_principal} required />
                                <span className="highlight"></span>
                                <span className=" bar"> </span>
                                <label>Direcion principal</label>
                            </div>
                            <div className="group ">
                                <input type="text" className="textbox disabled"
                                    name="correo"
                                    value={datos.correo} required />
                                <span className="highlight"></span>
                                <span className=" bar"> </span>
                                <label>Email</label>
                            </div>
                            <div className="group ">
                                <input type="text" className="textbox"
                                    name="telefono"
                                    onChange={(e:any)=> handelChange(e.target)}
                                    value={datos.telefono} required />
                                <span className="highlight"></span>
                                <span className=" bar"> </span>
                                <label>Telefono</label>
                            </div>
                            <div className=" text-center">
                                <button 
                                    onClick={Actualizardatos} className="btn btn-sm  bg-blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2">

                                    Actualizar</button>
                            </div>

                        </div>
                    </div>

                </div>


            </div>
        </div>)
}