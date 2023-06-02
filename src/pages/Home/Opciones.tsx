import { userlog } from "../../utils/User"

export function OpcionesView() {
    let datos:any = userlog()
    let info: any = [
        {
            lista: "Datos",
            view:[
                {
                    nombres: datos.nombre,
                    icons :"",
                    class:""                  

                },
                {
                    nombres: datos.nombre,
                    icons: "",
                    class: ""

                }
            ]
        }
    ]


    return (<>

        {/*<div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 py-1 ' >
            <div className="cardt cardt-dark ">
                <div className='row'>
                    <div className='col-8'>
                        <h4 style={{ textTransform: "capitalize" }} className={datos.estado === "ACTIVO" ? "text-success" : " text-danger"}>{datos.estado === "ACTIVO" ? " Servicio Activo" : "Servicio cancelado"}!</h4>

                    </div>
                    <div className='col-3  '>
                        <div className='   bg-secondary float-end  ms-3 mb-1 card rounded-3 shadow' style={{
                            width: "48px",
                            height: "48px",
                            zIndex: 2
                        }}>
                            <div className='m-auto'>
                                <i className="bi bi-info-circle text-white " style={{
                                    fontSize: 28
                                }} ></i>
                            </div>
                        </div>
                    </div>
                </div>
                <p className=' text-capitalize'><span className=' fw-bold'>Plan:</span>{datos.servicios ? datos.servicios[0].perfil : "User Tickets"} </p>
                <p className="card__apply">
                    <a className="card__link">Información <i className="card_icon   bi bi-eye"></i></a>
                </p>
            </div>

        </div>*/}
    </>)
}