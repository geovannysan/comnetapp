import { Label } from "@mui/icons-material";
import { Grid } from "@mui/material"
import { Typography } from 'antd';

const { Title } = Typography
import MainCard from "components/MainCard"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Solicitudid } from "util/Queryportal";
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
    function handelChange(e){
        setSolicitud({
            ...solicitud,
            [e.name]:e.value
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
                        <Grid xs={6}></Grid>
                        <Grid className="mx-auto">
                            <Typography variante="h1" gutterBottom>
                                <Title>h1. Ant Design</Title>
                                <Title level={2}>h2. Ant Design</Title>
                                <Title level={3}>h3. Ant Design</Title>
                                <Title level={4}>h4. Ant Design</Title>
                                <Title level={5}>h5. Ant Design</Title> </Typography>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12} md={5}>
                    <MainCard>
                        <div className="container row">
                            <div className="col-12">
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
                        </div>
                    </MainCard>

                </Grid>


            </Grid>
        </>
    )
}