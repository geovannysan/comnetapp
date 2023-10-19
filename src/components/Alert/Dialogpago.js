import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogViewapago(props) {
    let { setAlert, alert, header, ComfirmaDepo, subheader, ConfrimaTarje } = props
    return (
        <>
            <Dialog open={alert} TransitionComponent={Transition} onClose={() => setAlert(false)}>
                <DialogTitle>
                    <div className='  justify-content-center'>
                        <div className='text-center'>
                            <img src='img/metodos.png' style={{
                                maxHeight: "50px"
                            }} />
                            <h2 style={{ fontSize: "18px" }} className=' fw-bold '>ESCOGE EL MÉTODO DE PAGO</h2>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent className='px-2'>
                    <div className="row flex-row-reverse col-12 shadow-3   rounded-4 mx-auto my-2 h-30 bg-white py-0">{/*<!--card opcion-->*/}
                        <div className="col-5 px-1 d-no h-100   rounded-end-4 bg-orange-gradient-180">
                            <div className="col-12 h-100 w-100 ">

                                <div className="container h-30  py-4 text-center btn-group-vertical">
                                    <img src="img/reportedeposito.png" className="img-fluid drop-shadow-2 mx-auto"
                                        style={{
                                            height: "9.5vh"
                                            /*"height: 9.5vh;"*/
                                        }} alt="" />
                                </div>
                              
                            </div>
                        </div>
                        <div className="col-7 border py-0 rounded-start-4 pl-0">
                            <div className="row w-100 mx-auto h-100 px-0">
                                <div className="col-12 h-100 btn-group-vertical px-0">
                                    <div className="col-12 pt-3">
                                        <h4 className="  border-white px-0" style={{
                                            fontSize: "1.6vh"
                                            /*"font-size: 1.7vh;"*/
                                        }}>Reporta tu comprobante de déposito.</h4>
                                    </div>
                                    <div onClick={() => ComfirmaDepo()} className='px-0 bg-orange-gradient shadow-1 px-2 py-15 rounded-pill d-flex py-1 mx-2  align-items-center'>
                                        <a  className="    fw-bold none-style  text-black  mx-auto"
                                            style={{
                                                fontSize: "1.4vh"
                                                /*"font-size: 1.8vh;"*/
                                            }}>Reportar Déposito</a>                                        
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                    <div className="row flex-row-reverse col-12 shadow-3  rounded-4 mx-auto my-2 h-30 bg-white py-0">{/*<!--card opcion-->*/}
                        <div className="col-5 px-1 d-no h-100 py-0 rounded-end-4 bg-orange-gradient-180">
                            <div className="col-12 h-100 w-100 ">

                                <div className="container h-30 py-4 text-center btn-group-vertical">
                                    <img src="img/linkpago.png" className="img-fluid drop-shadow-2 mx-auto"
                                        style={{
                                            height: "9.5vh"
                                            /*"height: 9.5vh;"*/
                                        }} alt="" />
                                </div>
                                <div className="container h-30 btn-group-vertical d-none">
                                    <a className="text-uppercase text-success fw-bold none-style bg-white px-4 py-15 rounded-2 border mx-auto"
                                        style={{
                                            fontSize: "3vw"
                                            /*"font-size: 3vw;"*/
                                        }}>ONLINE</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-7    border py-0 rounded-start-4">
                            <div className="row w-100 mx-auto h-100 px-0 py-0">
                                <div className="col-12 h-100 btn-group-vertical py-0 px-0">
                                    <div className="col-12 py-0">
                                        <h4 className="  border-white px-0" style={{
                                            fontSize: "1.6vh"
                                            /*"font-size: 1.7vh;"*/
                                        }}>Generar link de pago con Tarjeta.</h4>
                                              </div>
                                    <p style={{
                                        fontSize: "0.6em",
                                        lineHeight: "1"
                                    }}>* Recuerda que los pagos con tarjeta generan recargos adicionales</p>

                                    <div onClick={() => ConfrimaTarje()} className='px-0 bg-orange-gradient shadow-1 px-2 py-15 rounded-pill d-flex py-1 mx-2  align-items-center'>
                                        <a className="  px-2  fw-bold none-style  text-black  mx-auto"
                                            style={{
                                                fontSize: "1.4vh"
                                                /*"font-size: 1.8vh;"*/
                                            }}>Generar Link</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}