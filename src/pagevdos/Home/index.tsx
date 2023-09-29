import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { setPosision } from "../../StoreRedux/Slice/UserSlice"

export default function HomeView() {
    const datos = useSelector((state: any) => state.usuario.user)
    let history = useHistory()
    let dispatch = useDispatch()
    useEffect(()=>{
        console.log(datos)
    },[])
    function soportes(){
        history.push("/home/soporte")
    }
    function ObtenerLocatio(){
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(position)
                    dispatch(setPosision([latitude,longitude]))
                    history.push("/mapas")
                   // setUserLocation([-2.129304, -79.936441,]);
                },
                (error) => {
                    history.push("/mapas")
                    console.error('Error getting user location:', error.message);
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
        }
    }

    return (
        <div className="container-fluid px-0 vh-100">
            {/*<!--Contenedor General-->*/}
            <div className="container-fluid h-20 pb-5 bg-welcome bg-welcome-radius px-0">
                {/*<!--header welcome-->*/}
                <div className="container mx-autopt-2 h-50 text-end btn-group-vertical">
                    <img src="img/speed logo name.png" className="img-fluid ms-auto " style={{height:" 50px"}} alt=""/>
                </div>
                <div className="container-fluid h-50 bg-welcome-radius px-0">
                    <div className="container  h-100 ">
                        <div className="row h-100  ">
                            <div className="col-5 text-end p-0">
                                <img src="img/user-avatar.png" style={{height:"8vh"}} className="img-fluid " alt=""/>
                            </div>
                            <div className="col-auto w-50 ps-1 btn-group-vertical text-white">
                                <p className="subtitulo" style={{fontSize:"1.8vh"}}>Hola,</p>
                                <h5 className="mt-n4 titulo " style={{ fontSize: "2.7vh" }}>{datos.nombre.substring(0, 10)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!--fin header welcome-->*/}
            <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
                {/*<!--card info-->*/}
                <div className="container-fluid h-100 btn-group-vertical" >
                    <div className="container-fluid mt-n5">
                        <div className={datos.estado == "SUSPENDIDO" ? "row mt-n3 suspendido":"row mt-n3  "} id="menu-servicios">
                            <div className="col-12 pb-4 text-center estado" ><b className="me-1">Servicio: </b>{datos.estado == "ACTIVO" ? <span className="icon-circle border p-1 pe-2 rounded-pill color ">{datos.estado}</span> : <span className="icon-circle border p-1 pe-2 rounded-pill  ">{datos.estado}</span>} </div>
                            <div className="col-4 p-0 my-2 ">
                                <div className="container p-1">
                                    <a onClick={() => history.push("/home/perfil")} ><img src="img/botones-home/mis-datos-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2 block">
                                <div className="container p-1">
                                    <a onClick={() => history.push("/plan") }><img src="img/botones-home/mi-plan-boton-wifi.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2 block">
                                <div className="container p-1">
                                    <a onClick={soportes}><img src="img/botones-home/soporte-tecnico-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2 block">
                                <div className="container p-1">
                                    <a onClick={() => history.push("/home/wifi")} ><img src="img/botones-home/mi-wifi-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2">
                                <div className="container p-1">
                                    <a onClick={() => history.push("/pagos")}><img src="img/botones-home/reportar-pago-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2 ">
                                <div className="container p-1">
                                    <a
                                    onClick={ObtenerLocatio}
                                    ><img src="img/botones-home/puntos-de-pago-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2 block d-none">
                                <div className="container p-1">
                                    <a onClick={() => history.push("/plan")} ><img src="img/botones-home/cambio-de-plan-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2">
                                <div className="container p-1">
                                    <a href="/home"><img src="img/botones-home/terminos-y-condiciones-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-4 p-0 my-2">
                                <div className="container p-1">
                                    <a href="/home"><img src="img/botones-home/contactanos-boton.png" className="img-fluid drop-shadow-1" alt=""/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!--fin card info-->*/}
            <div className="container-fluid h-7 bg-blue-gradient d-none ">
                <div className="container h-100 btn-group-vertical">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto mx-3 text-center "><a className="none-style fs-22" href="home.html"><span className="icon-home-3 btn-active"></span></a></div>
                            <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href=""><span className="icon-plus-squared text-white"></span></a></div>
                            <div className="col-auto mx-3 text-center"><a className="none-style fs-22" href="datos.html"><span className="icon-user-4 text-white"></span></a></div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}