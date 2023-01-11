import axios from 'axios';
import { token } from './variables';
let Host = "https://portal.comnet.ec/api/v1/"

 
export const autenticar =async(parms)=>{
    try {
        let { data } = await axios.post(Host+"GetClientsDetails",
            {
                "token":  token ,
                "cedula": parms
            })
        return data
    } catch (error) {
        return error
    }
}
export const ListarTicket = async(parm)=>{
    try {
        let { data } = await axios.post(Host+"ListTicket", {
            "token": token,
            "idcliente": parm
        })
        return data
    } catch (error) {
        return error
    }
}
export const ListarFactura = async (parms)=>{
    try {
        let { data } = await axios.post(Host + "GetInvoices", {
            "token": token,
            "limit": 1,
            "idcliente": parms
        })
        if (data.estado === "exito"){
        
            let id = await data.facturas[0].id
           // console.log(id,parms)
            let datos = await axios.post(Host +"GetInvoice",
                {
                    "token": "SzFpNm04STlFNkhDRE9mcFBaZWlEdz09",
                    "idfactura": id
                })
            let arr = datos.data.items[0].descrp.split("\r\n")
            return arr

        }
        
    } catch (error) {
        return error
        
    }
}
export const MostrarFacturas = async(parms)=>{
    try {
        let { data } = await axios.post(Host + "GetInvoices", {
            "token": token,
            
            "idcliente": parms
        })
        return data
        
    } catch (error) {
        return error        
    }
    

}