import { IonContent } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ObtenerFactura, ObtenerFacturas } from "../../utils/Contifico";
import TablasViwe from "./Tablasdoc";
import { listarSolicitud } from "../../utils/Queryuser";

export default function DocuumentosViews(){
    const [datos,setDatos]=useState<any>([])
    async function abreir(){
       
        try {
           let datos = await ObtenerFactura()
          
               setDatos(datos)
               console.log(datos)
           
        } catch (error) {
            console.log(error)
            
        }
     
            
    }
    useEffect(()=>{
        listarSolicitud(2).then(sali=>{
            console.log(sali)
        }).catch(errr=>{
            console.log(errr)
        })
        /*ObtenerFactura().then((salida) =>{
            console.log(salida.status)
            if (salida.length == 0) return
            setDatos([...salida])
            console.log(salida)
        }).catch(err=>{
            console.log(err)
        })*/
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
                    <th >Nombre</th>
                    <th >Valor</th>
                    <th >Imprimer fact. </th>
                   

                </tr>
            </thead>
        )

    }
    const showDatos = () => {
        try {
                  console.log(datos)      
            return datos.map((item:any, index:number) => {
               // console.log(item)
                return (
                    <tr key={index}>
                        <td className="dtr-hidde">
                        </td>

                        <td className="text-xs font-weight-bold">{item.documento}</td>
                        <td className="text-xs font-weight-bold">{item.persona.cedula}</td>
                        <td className="text-xs font-weight-bold">{item.fecha_emision}</td>

                        <td className="text-xs font-weight-bold">{item.persona.nombre_comercial}</td>
                        <td className="text-xs font-weight-bold">
                            {item.detalles[0].precio}</td>
                        <td className="text-xs font-weight-bold">
                            <a className="btn  btn-default" href={item.url_ride.replace("api", "0992782129001") +"/?imprimir=1" } target="_blank">
                                <i className="bi bi-printer"></i> 
                                 </a> 
                           
                             </td>
                        

                    </tr>
                )
            });
        } catch (error) { }
    }
    useEffect(()=>{

    },[])
    return(
        <IonContent fullscreen={true}>
        <div className="container-fluid">
            <h5 className="">Documentos</h5>

            {datos.length>0? <TablasViwe
            number={3}
                thead={thead}
                showDatos={showDatos}
                datos={datos}
                Titel={"Facturas emitidas"}
                /> : <div className=""
                    style={{

                        position: 'fixed',
                        height: "100%",
                        left: '0',
                        bottom: '0',
                        width: '100%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: '3'
                    }}
                >
                    <div className="spinner-border" >
                        <span className="sr-only"></span>
                    </div>
                </div>}

        </div>
        </IonContent>
    )
}