import React, { useEffect, useState } from "react";
import { ObtenerFactura, ObtenerFacturas } from "../../utils/Contifico";
import TablasViwe from "./Tablasdoc";

export default function DocuumentosViews(){
    const [datos,setDatos]=useState([])
    async function abreir(){
       
        var settings :any = {
            "url": "https://api.contifico.com/sistema/api/v1/documento?tipo=FAC&fecha_inicial=13/03/2023&fecha_final=13/03/2023",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
           
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
     
            
    }
    useEffect(()=>{
        ObtenerFactura().then(salida =>{
            console.log(salida)
        }).catch(err=>{
            console.log(err)
        })
      
        abreir()
  
    },[])
    const thead =()=>{
        return(
            <thead className="">
                <tr className="border ">
                    <th className=" text-center" ></th>
                    <th className="sorting" >No</th>
                    <th >Cédula</th>
                    <th >Fecha</th>
                    <th >Telefóno</th>
                    <th >Vendedor</th>
                    <th ></th>

                </tr>
            </thead>
        )

    }
    const showDatos = () => {
        try {
            return datos.map((item:any, index:number) => {

                return (
                    <tr key={index}>
                        <td className="dtr-hidde">
                        </td>

                        <td className="text-xs font-weight-bold">{item.documento}</td>
                        <td className="text-xs font-weight-bold">{item.persona["cedula"]}</td>
                        <td className="text-xs font-weight-bold">{item.fecha_emision}</td>

                        <td className="text-xs font-weight-bold">{item.person["telefonos"]}</td>
                        <td className="text-xs font-weight-bold">
                            {item.vendedor["razon_social"]}</td>
                        <td className="text-xs font-weight-bold">
                            <a className="btn btn-default btn-sm"> <i className=" bi bi-pencil"> </i></a>
                        </td>

                    </tr>
                )
            });
        } catch (error) { }
    }
    useEffect(()=>{

    })
    return(
        <div className="container">
            <h5 className="">Documentos</h5>

            <TablasViwe
            number={6}
                thead={thead}
                showDatos={showDatos}
                Titel={"nuevo"}
            />

        </div>
    )
}