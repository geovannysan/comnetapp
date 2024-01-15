import { IonContent } from "@ionic/react"
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { setPosision } from "../../StoreRedux/Slice/UserSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
function Paginas() {
    let dispatch= useDispatch()
    let history = useHistory()
    function Abrirlocation(){
        window.open("https://play.google.com/store/apps/details?id=com.bancodeguayaquil", "_blank")
    }
    function ObtenerLocatio() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(position)
                    dispatch(setPosision([latitude, longitude]))
                    history.push("/home/mapas")
                    // setUserLocation([-2.129304, -79.936441,]);
                },
                (error) => {
                    history.push("/home/mapas")
                    console.error('Error getting user location:', error.message);
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
        }
    }
    return (
        <IonContent>
            <div>
                <div id="planes"
                    className=" container-fluid bg-pagos  text-center   mx-auto  d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 py-2 d-flex  justify-content-center">
                        <div className="text-center pt-2">
                            <h2 style={{
                                fontSize: "3rem", lineHeight: "0.8; "
                            }}>
                                <span className="  fw-bold"
                                    style={{
                                        color: "#1a245B", fontFamily: "Asap, sans-serif"
                                    }}>PAGAS DESDE</span>
                                <span className="fw-bold"
                                    style={{ color: " #0081c7",  }}>BANCO GUAYAQUIL</span></h2>
                            <h4 style={{
                                fontSize: "15px", fontFamily: "Asap"
                            }} className="fw-bold text-black text-uppercase ">Realiza el pago de
                                tu factura a tiempo </h4>
                        </div>
                    </div>
                    <Swiper
                        effect={'fade'}
                        slidesPerView={1}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        loop={true}
                        autoplay={{
                            delay: 1500
                        }}
                        modules={[EffectFade, Navigation, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img onClick={Abrirlocation} className="  planes" src="https://speed.com.ec/imgepagos/bancauno.png" style={{ height: "350px" }} alt="Plan 80 megas"
                                 />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img onClick={Abrirlocation} className=" planes" src="imgepagos/bancatres.png" style={{ height: "350px" }} loading="lazy"
                                alt="Plan 170 megas" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img onClick={Abrirlocation}
                                alt="Plan 220 megas" className=" planes" src="imgepagos/banca.png" style={{ height: "350px" }}
                                loading="lazy" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img onClick={Abrirlocation}
                                alt="Plan 130 megas" className="  planes"  src="imgepagos/bancados.png" style={{ height: "350px" }}
                                loading="lazy" />

                        </SwiperSlide>
                    </Swiper>
                    <div className="slick-carousel container d-none ">
                        <div className="d-flex justify-content-center align-items-center" style={{ position: "relative" }}>
                            

                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ position: "relative" }}>
                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ position: "relative" }}>
                            

                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ position: "relative" }}>
                            <img
                            alt="Plan 220 megas" className=" planes" data-src="" src="imgepagos/banca.png" style={{ height: "350px" }}
                            loading="lazy" />

                        </div>
                    </div>
                </div>
                <div id="puntos" className="container-fluid p-5 text-center row d-flex justify-content-around mx-auto py-3 ">
                    <p style={{ fontSize: "15px", fontFamily: "Asap" }} className=" fw-bold text-black text-uppercase">
                        SI REALIZAS EL PAGO POR ESTE MEDIO, RECIBES LOS SIGUENTES BENEFICIOS </p>
                    <div className="col-12 col-lg-3 ">
                        <div className=" text-center">
                            <img style={{ height: "100px" }} className="img-fluid" alt="asesore disponible" data-src="" src="imgepagos/rapido.png"
                                loading="lazy" />
                            <h3 className=" fw-bold p-3" style={{ fontFamily: "Asap sans-serif;", color: "#0f1431;" }}>RÁPIDO Y SEGURO</h3>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 ">
                        <div className=" text-center">
                            <img style={{ height: "100px" }} className="img-fluid" alt="asesore disponible" data-src="" src="imgepagos/activacion.png"
                                loading="lazy" />
                            <h3 className=" fw-bold p-3" style={{ fontFamily: "Asap sans-serif;", color: "#0f1431;" }}>ACTIVACIÓN AUTOMÁTICA</h3>
                        </div>
                    </div>
                    <div className="col-12  col-lg-3  ">
                        <div className=" text-center">
                            <img style={{ height: "100px" }} className="img-fluid" alt="asesore disponible" data-src=""
                                src="imgepagos/pagosseguros.png" loading="lazy" />
                            <h3 className=" fw-bold p-3" style={{ fontFamily: " 'Asap', sans-serif;", color: "#0f1431;" }}>PAGO DIRECTO</h3>
                        </div>
                    </div>
                    <div className="col-12  col-lg-3  ">
                        <div className=" text-center">
                            <img style={{ height: "100px" }} className="img-fluid" alt="asesore disponible" data-src="" src="imgepagos/reporte.png"
                                loading="lazy" />
                            <h3 className=" fw-bold p-3" style={{ fontFamily: "'Asap', sans-serif;", color: "#0f1431;" }}>NO NECESITAS REPORTAR TU PAGO</h3>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 shadow m-2 p-3 d-none">
                        <div className=" text-center">
                            <img style={{ height: "130px;" }} className="img-fluid" alt="Consulta de Facturas" data-src=""
                                src="imagen/INTERNET-SPEED_ CONSULTA TU FACTURA-02.png" loading="lazy" />
                            <h2 className=" fw-bold" style={{ color: "#1a245B" }}>Consulta</h2>
                            <p className="text-info fw-bold" style={{ fontSize: "1.5rem;", color: "#0081c7;" }}>tu
                                factura</p>
                            <span className="fw-bold w-100" style={{ fontSize: "0.8rem;" }}>Revisa el valor de tu
                                factura</span>
                            <label className="numero form-label  form-label-lg" >titular del
                                servicio</label>
                            <input className="numero form-control " type="" id="numberce" placeholder="Nª cédula" />
                            <div className="pt-2">
                                <button className="btn text-white   " id="btn-consulta"
                                    style={{ backgroundColor: "#1a245B" }}>
                                    Consultar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 shadow m-2 p-3 d-none">
                        <div className=" text-center">
                            <img style={{ height: "130px" }} className="img-fluid" data-src=""
                                src="imagen/INTERNET-SPEED_ CONSULTA TU PLAN IDEAL-02.png" loading="lazy" />
                            <h2 className=" fw-bold" >Calcula</h2>
                            <p className="text-INFO fw-bold" style={{ fontSize: "1.5rem;" }}>TU PLAN IDEAL</p>
                            <span className="fw-bold w-50 " style={{ fontSize: "0.8rem" }}>Necesitas conocer Cuales son
                                los
                                megas ideale para tu HOGAR</span>
                            <div className="pt-4 mt-2">
                                <button className="calcular btn text-white  " style={{ backgroundColor: "#1a245B" }}>
                                    Calcular</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-info  ">
                    <div className=" row justify-content-center">
                        <div className="w-100 py-2 d-flex  container-fluid justify-content-center align-items-center">
                            <div className="text-center row justify-content-center align-items-center pt-2">
                                <div className="px-3">
                                    <h2 style={{ fontSize: "2rem", lineHeight: " 0.8" }}><span className=" fw-bold"
                                        style={{ color: "#1a245B" }}>PAGA MEDIANTE</span>
                                    </h2>
                                    <h2 style={{ fontSize: "2rem", lineHeight: " 0.8; " }}><span className=" fw-bold"
                                        style={{ color: "#ffffff" }}>DEPÓSITO O TRANSFERENCIA</span>
                                    </h2>
                                </div>
                                <div className="col-8 col-lg-6 m-3 border border-light text-light">
                                    <h3>TRANSFERENCIAS</h3>
                                    <p style={{ fontSize: "15px" }} className=" fw-bold  text-uppercase">
                                        RUC - 0992702129001 - Computendnicsnet S.A.</p>
                                </div>

                            </div>
                        </div>
                        <div className="row col-12 col-lg-10">
                            <div className="col-12 col-md-4 pt-2">
                                <img src="imgepagos/pichincha.png" className=" img-fluid" alt="" />
                            </div>
                            <div className="col-12 col-md-4 pt-2">
                                <img src="imgepagos/pacifico.png" className=" img-fluid" alt="" />
                            </div>
                            <div className="col-12 col-md-4 pt-2">
                                <img src="imgepagos/produbanco.png" className=" img-fluid" alt="" />
                            </div>
                        </div>
                        <div className="row col-12 col-lg-9" >
                            <div className=" col-12 col-lg-8 d-flex align-items-center ">
                                <h2 style={{ fontSize: "15px" }} className=" fw-bold text-light px-5">
                                    Recuerda que si realizas el pago por este medio
                                    debes REPORTAR TU PAGO
                                </h2>
                            </div>
                            <div className="col-12 col-lg-4">
                                <img src="imgepagos/speedman.png" className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" container-fluid row text-center  justify-content-center">
                    <div className="col-12">
                        <h2 style={{ fontSize: "20px" }} className=" fw-bold text-dark p-3">
                            Ahora puedes pagar tu factura en los siguientes lugares
                        </h2>
                    </div>
                    <div className="col-12 col-lg-9">
                        <img src="imgepagos/puntos.png" className="img-fluid d-none d-sm-none d-md-block" alt="" />
                        <img src="imgepagos/PUNTOSPAGOS.png" className="img-fluid d-block d-sm-block d-md-none" alt="" />
                    </div>
                </div>
                <div className="d-none d-sm-none d-md-block justify-content-center align-items-center"
                    style={{ position: "relative", marginBottom: "15px" }}>
                    <div className="  container-fluid d-flex flex-row justify-content-center align-items-center w-100 px-0">
                        <div className="row px-0 bg-pagos">
                            <div className="px-0 bg-pagos">
                                <img src="imgepagos/bgpuntos.png" className=" bg-pagos " style={{
                                    backgroundPosition: "center",
                                    backgroundSize: "contain",
                                    backgroundRepeat: " no-repeat;"
                                }} alt="" />
                            </div>
                            <div className="col-5"></div>
                            <div className="col-6 px-3">
                                <img style={{ position: "absolute", zIndex: "10", top: "60px", right: "5px", height: "180px" }} src="imgepagos/direcciones.png" className=" img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={ObtenerLocatio} className="d-block d-sm-block d-md-none  my-3 justify-content-center w-100">
                    <div style={{ position: "relative" }}>

                        <img src="imgepagos/puntomovil.png" className="img-fluid" alt="" />
                        <div className="col-5" style={{ position: "absolute", zIndex: "10", top: "60px", right: "5px" }}>
                            <img src="imgepagos/puntomovilrec.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </IonContent>
    )
}
export default Paginas