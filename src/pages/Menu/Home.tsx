import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';



const Inicipage: React.FC = () => {
    return (

        <div className='container-fluid mt-4 d-flex  justify-content-center'>
            <div className='row col-12 col-md-10 px-0  '>
                <div className=' col-12 col-md-3 py-1 ' onClick={() => console.log("clik")}>
                    <div className='   bg-dark  ms-3 card rounded-4 shadow' style={{
                        width: "70px",
                        height: "70px",

                    }}>
                        <div className='m-auto'>
                            <i className="bi bi-info-circle text-white " style={{
                                fontSize:35
                            }} ></i>
                        </div>


                    </div>
                    <div className="card  mb-3 mt-n5  rounded-4  shadow-xs" style={{
                        position: "relative",
                        zIndex: -1
                    }} >
 
                        <div className=" card-header    border-activo rounded-top-4 px-3 pt-n  text-end fw-bolder text-white  py-3"
                            style={{
                                fontSize: "1.5em",
                               

                            }}
                        >
                           Servicio Activo 
                        </div>

                        <div className=" px-2 py-2 ">

                            <h5 className="card-title ms-3  text-default" style={{
                                fontSize: "15px"
                            }} >  Servicio Activo</h5>
                            <p className="card-text"></p>
                        </div>

                    </div>
                </div>
                <div className=' col-12 col-md-3 py-1 '  onClick={()=>console.log("clik")}>
                    <div className='    bg-success ms-3 card rounded-4 shadow' style={{
                      width:"70px",
                        height: "70px",
                       
                    }}>
                        <div className='m-auto'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill='#fff'  className="bi bi-currency-dollar -white" viewBox="0 0 16 16">
                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                            </svg>
                        </div>
                        

                    </div>
                    <div className="card mb-3 mt-n5  rounded-4  shadow-xs" style={{
                        position:"relative",
                        zIndex:-1   
                    }} >
                        
                        <div className=" card-header success  border rounded-top-4 px-3 pt-n  text-end fw-bolder text-success  py-3"
                        style={{
                            fontSize:"1.5em",
                          
                        }}
                        >                            
                             Reportar pago                            
                        </div>
                        
                        <div className=" px-2 py-2 ">
                            <h5 className="card-title ms-3  text-default" style={{
                                fontSize: "15px"
                            }} >  Pagar Factura</h5>
                            <p className="card-text"></p>
                        </div>

                    </div>
                </div>
                <div className=' col-12 col-md-3 py-1 ' onClick={() => console.log("clik")}>
                    <div className='     ms-3 card rounded-4 shadow' style={{
                        width: "70px",
                        height: "70px",
                        backgroundColor:"#3691ef"

                    }}>
                        <div className='m-auto'>
                            <i className="bi bi-radioactive icon-app "  ></i>
                        </div>


                    </div>
                    <div className="card  mb-3 mt-n5  rounded-4  shadow-xs" style={{
                        position: "relative",
                        zIndex: -1
                    }} >

                        <div className=" card-header  reporte  border rounded-top-4 px-3 pt-n  text-end fw-bolder text-white  py-3"
                            style={{
                                fontSize: "1.5em",
                                backgroundColor:"",
                                borderColor:""
        

                            }}
                        >
                                Soporte Técnico
                        </div>

                        <div className=" px-2 py-2 ">

                           
                            <h5 className="card-title ms-3  text-default" style={{
                                fontSize: "15px"
                            }} >  Reportar inconveniente</h5>
                            <p className="card-text"></p>
                        </div>

                    </div>
                </div>
                <div className=' col-12 col-md-3 py-1 ' onClick={() => console.log("clik")}>
                    <div className='    wifi ms-3 card rounded-4 shadow' style={{
                        width: "70px",
                        height: "70px",

                    }}>
                        <div className='m-auto'>
                            <i className="bi bi-wifi icon-app"></i>
                        </div>


                    </div>
                    <div className="card  mb-3 mt-n5  rounded-4  shadow-xs" style={{
                        position: "relative",
                        zIndex: -1
                    }} >

                        <div className=" card-header wifi-sm  border rounded-top-4 px-3 pt-n  text-end fw-bolder text-success  py-3"
                            style={{
                                fontSize: "1.5em",

                            }}
                        >
                            Opciones Wifi
                        </div>

                        <div className=" px-2 py-2 ">

                            <h5 className="card-title ms-3  text-default" style={{
                                fontSize:"15px"
                            }} >  Cambiar claves, bloqueos</h5>
                            <p className="card-text"></p>
                        </div>

                    </div>
                </div>
            </div>

        </div>


    )
}
export default Inicipage