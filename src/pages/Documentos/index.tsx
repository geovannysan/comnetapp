import React, { useEffect, useState } from "react";
import TablasViwe from "./Tablasdoc";

export default function DocuumentosViews(){
    const [datos,setDatos]=useState([])
    const thead =()=>{
        return(
            <thead className="">
                <tr className="border ">
                    <th className=" text-center" ></th>
                    <th className="sorting" >No</th>
                    <th >Asunto</th>
                    <th >Fecha</th>
                    <th >Estado</th>
                    <th >Última Rspta.</th>
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

                        <td className="text-xs font-weight-bold">{item.id}</td>
                        <td className="text-xs font-weight-bold">{item.asunto}</td>
                        <td className="text-xs font-weight-bold">{item.fecha_soporte}</td>

                        <td className="text-xs font-weight-bold">{item.estado}</td>
                        <td className="text-xs font-weight-bold">
                          { item.lastdate}</td>
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
        <div className="container-fluid">
            <h5 className="">Documentos</h5>

            <TablasViwe
            number={6}
                thead={thead}
                showDatos={showDatos}
                Titel={""}
            />

        </div>
    )
}