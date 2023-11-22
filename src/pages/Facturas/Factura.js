import { useEffect, useState } from "react"
import { ArrowBack, Label } from "../../../node_modules/@mui/icons-material/index"
import { Box, Skeleton, Stack } from "../../../node_modules/@mui/material/index"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index"
import { ObtenerFactura } from "util/Querycontifico"
import { setFacturas } from "store/reducers/menu"

const FacturaDetalle = () => {
    let detalle = useSelector(state => state.menu.facturadetalle)
    let usedispatch = useDispatch()
    let history = useNavigate()
    let [estado, setEstado] = useState(false)
    let [error, setError] = useState(false)
    useEffect(() => {
        //console.log(detalle)
        ObtenerFactura(detalle.id).then(oput => {
            usedispatch(setFacturas({ factura: { ...detalle, ...oput } }))
            console.log(oput)
        }).catch(err => {
            console.log(err)
        })
        setTimeout(function () {
            setEstado(true)
        }, 1000)
    }, [])
    function abrir() {
        if (detalle.autorizacion) {
            window.open(detalle.url_ride, "_blank")
        }
    }

    return (
        <div className="card">
            {estado ? <div className="card-body">
                <div class="dropdown text-end py-2">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Acciones
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item" onClick={() => abrir()} >Ver Rider</button>
                        <a class="dropdown-item" href="#">Editar id Comnet </a>
                    </div>
                </div>
                <div className="col-12  d-flex justify-content-center">
                    <div className=" container-fluid bg-secondary-sm">
                        <div className=" ">
                            <div className="d-flex flex-wrap pt-3 datos px-0 ">
                                <div className="col-12 col-md-4 border-bottom p-3">
                                    <div className="invoice-from">
                                        <small>De</small>
                                        <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">COMNET - SPEED </strong>
                                            <small>
                                                <br></br>
                                                Edificio City Officce Oficina 301 <br></br>
                                                Indentificación: 092782129001<br></br>
                                                Teléfono: 0980850287 / 042599100<br></br>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 border-bottom p-3" >
                                    <div className="invoice-from">
                                        <small>Para</small>
                                        <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">{detalle.persona.nombre_comercial}</strong><br></br>
                                            <small>
                                                {"Email: " + detalle.persona.email}<br></br>
                                                {"Cédula: " + detalle.persona.cedula}<br></br>
                                                {"Teléfono " + detalle.persona.telefonos}<br></br>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 text-md-end border-bottom p-3 ">
                                    <div className="invoice-date">
                                        <small></small>
                                        <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">
                                                Fecha de emisión</strong><br></br>
                                            {detalle.fecha_emision}
                                            <br></br>
                                            #{detalle.documento} <br></br>

                                            {detalle.autorizacion}
                                            <br></br>
                                            <span>Comnet id</span>
                                            <br></br>
                                            {detalle.idfactura}
                                            <br></br>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row invoive-detail">
                    <div className="col-12">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalle.detalles.map((elm, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{elm.producto_nombre}</td>
                                            <td>{elm.cantidad}</td>
                                            <td>{elm.precio}</td>
                                            <td>{elm.precio}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row px-2 justify-content-end text-end">
                    <div className="col-6">
                        <span className="">{"Servicio de Internet \r\nPlan internet : FIBRA-ADVANCE - ANTIGUO 80000K/80000K\r\nfacturacin del 13/08/2023 al 12/09/2023\r\nFecha del corte anterior : 18/08/2023\r\nMes  : Agosto"}</span>

                    </div>
                    <div className="col-6  ">
                        <table className="  w-100 ">
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td className='text-end' >Subtotal:</td>
                                    <td width="15%" className='text-end'>$ {detalle.subtotal_12}</td>
                                </tr>
                                <tr >
                                    <th scope="row"></th>
                                    <td className={" text-end"} >iva</td>
                                    <td className="text-end">${detalle.iva}</td>
                                </tr>

                                <tr>
                                    <th scope="row"></th>
                                    <td className='text-end' >Total </td>
                                    <td className='text-end'>$ {detalle.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=" container d-flex justify-content-end pt-2">
                        <div className="col-12 col-md-6">
                            <table className=" table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Forma de pago</th>
                                        <th>Fecha de pago</th>
                                        <th>Comprobante</th>
                                        <th>Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalle.cobros.map((elm, inde) => {
                                        return (
                                            <tr key={inde}>
                                                <td>{elm.forma_cobro}</td>
                                                <td>{elm.fecha}</td>
                                                <td>{elm.numero_comprobante}</td>
                                                <td>{elm.monto}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> :
                <div className="d-flex  justify-content-center">
                    <div className="col-12 ">
                        <Box
                            sx={{
                                bgcolor: '#121212',
                                p: 8,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Skeleton
                                sx={{ bgcolor: 'grey.900' }}
                                variant="rectangular"
                                width={210}
                                height={218}
                            />
                        </Box>
                    </div>
                </div>
            }
            <div className=" fixed-bottom text-end mt-5 ">
                <button className=" btn rounded-circle btn-success btn-primary mx-2 p-2  text-white"

                    onClick={() => history("/Facturas")}
                >
                    <ArrowBack />
                </button>
            </div>
        </div>
    )
}
export default FacturaDetalle