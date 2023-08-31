import { Label } from "@mui/icons-material";
import { Grid } from "@mui/material"
import { Typography } from 'antd';

const { Title } = Typography
import MainCard from "components/MainCard"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Actualizarsolicitud, EnviaWhast, Solicitudid } from "util/Queryportal";
import moment from "moment/moment";
export default function DetallesView() {
    let { id } = useParams()
    let [solicitud, setSolicitud] = useState({
        "asunto": "",
        "cedula": "",
        "Nombre": "",
        "fecha": "",
        "estado": "",
        "Prioridad": "",
        "Tipo": "",
        "cantiadad": "",
        "observacion": "",
        "Idadmin": ""
    })
    function handelChange(e) {
        setSolicitud({
            ...solicitud,
            [e.name]: e.value
        })
    }
    function validateDateFormat(dateString) {
        var pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        if (!pattern.test(dateString)) {
            return dateString; 
        }
        var parts = moment(dateString).format('MMM-DD-YYYY h:mm a')
        return parts;
    }
    let[number,setNumber]=useState("")
     function formatearNumero(numero) {
        const regex = /^\+?593\d{9}$/;
        let dato = numero.trim()
        // Comprobar si el número coincide con la expresión regular
        if (regex.test(dato)) {
            return dato
        }
        else if (dato.length === 9) {
            return "593" + dato
        } else return undefined;
    }
    function actualizarsolicitud() {
        //setDisable(true)
        let datos = {
            "asunto": solicitud.asunto,
            "cedula": solicitud.cedula,
            "Nombre": solicitud.Nombre,
            "fecha": solicitud.fecha,
            "estado": solicitud.estado,
            "Prioridad": solicitud.Prioridad,
            "Tipo": solicitud.Tipo,
            "cantiadad": solicitud.cantiadad,
            "observacion": solicitud.observacion
        }
        console.log(datos, parseInt(id))
        Actualizarsolicitud(datos, parseInt(id)).then(async oup => {
            console.log(oup)
            if (oup.status) {
                let informa = {
                    "user_id": formatearNumero(number),
                    "message": solicitud.observacion,
                }
                
               if( formatearNumero(number)!=undefined){
                   let inf = await EnviaWhast(informa)
                   window.location.reload()
                   return
                }
               // window.location.reload()
            } else {
                //setDisable(false)
               // usedispatch(setModal({ nombre: "", payloa: "" }))

            }
        }).catch(err => {
          // setDisable(false)
            console.log(err)
        })
    }
    useEffect(() => {
        Solicitudid(id).then(ouut => {
            console.log(ouut)
            if (ouut.success) {
                setSolicitud(ouut.data)
            }
        }).catch(err => {
            console.log(err)
        })

    }, [])
    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>

                <Grid item xs={12} md={7}>
                    <MainCard>

                        <Grid className="mx-auto">
                            <Typography variante="h1" gutterBottom>
                                <Title>Tipo de solicitud: {solicitud.Tipo}  </Title>
                                <Title level={4}>{solicitud.Tipo == "Trabajos" ? "Empleados: " + solicitud.Nombre : ""}
                                    {solicitud.Tipo != "Trabajos" ? "Nombre: " + solicitud.Nombre + " Cédula: " + solicitud.cedula:""}
                                                                  </Title>
                                <Title level={4}>{solicitud.Tipo == "Trabajos" ? "Inicio: " + validateDateFormat(solicitud.cantiadad) + " Cierre: " + validateDateFormat(solicitud.Prioridad) : ""}
                                    {solicitud.Tipo == "Anticipo" ? "Cantidad de: $" + validateDateFormat(solicitud.cantiadad) + " Para el día: " + validateDateFormat(solicitud.Prioridad) : ""}
                                    {solicitud.Tipo == "Permiso" ? "Duracion (días:hora) " + validateDateFormat(solicitud.cantiadad) + " Para el dia: " + validateDateFormat(solicitud.Prioridad) : ""}
                                </Title>
                                <Title level={4}>{"Fecha de notificación: " + moment(solicitud.fecha).format("MMM/DD/YYYY hh:mm")}</Title>

                                <textarea  style={{ height: "200px" }}
                                    value={solicitud.asunto}
                                    className=" form-control">
                                </textarea>
                            </Typography>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12} md={5}>
                    <MainCard>
                        <div className="container row">
                            <div className="col-12">
                                <p className=" form-label">Estado</p>
                                <select className="form-control" name="estado" value={solicitud.estado} onChange={(e) => handelChange(e.target)}>
                                    <option value={"Rechazado"}>Rechazado</option>
                                    <option value={"Pendiente"}>Pendiente</option>
                                    <option value={"Por revisar"}>Por revisar</option>
                                    <option value={"Aprobado"}>Aprobado</option>

                                </select>
                            </div>
                            <div className="col-12">
                                <Label className=" form-label">Observacion</Label>
                                <textarea value={solicitud.observacion} name="observacion" onChange={(e) => handelChange(e.target)} style={{
                                    height: "200px"
                                }} className=" form-control">

                                </textarea>
                            </div>
                            <div className="col-12">
                                <p className=" form-label text-dark col-12 py-2">Número celular a responder (no es obligatorio)</p>
                                <input className=" form-control" value={number} onChange={(e) => setNumber(e.target.value)} type="number" placeholder="593999999999">

                                </input>
                            </div>
                            <div className="col-12 text-center py-2">
                                <button className="btn btn-success" onClick={actualizarsolicitud} >Actualizar </button>
                            </div>
                        </div>
                    </MainCard>

                </Grid>


            </Grid>
        </>
    )
}