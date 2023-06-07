import axios from 'axios';
import { token,operador } from './variables';
let Host = "http://45.224.96.50/api/v1/"
let Hostv1 ="https://portalapicon.somee.com"
export const autenticar = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/GetClientsDetails",
            {
                "operador": operador,
                "cedula": parms
            }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const ListarTicket = async (parm) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/ListTicket", {
            //"token": token,
            "idcliente": parm
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}
export const ListarFactura = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/GetInvoices", {
            //"token": token,
            "limit": "1",
            "idcliente": parseInt( parms)
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        if (data.estado === "exito") {

            let id =  data.facturas[0].id 
             console.log(id,parms)
            let datos = await axios.post(Hostv1 + "/PortalApi/GetInvoice",
                {
                   // "token": token,
                    "idfactura": id
                }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            console.log(datos)
            let arr = datos.data.items[0].descrp.split("\r\n")
            return arr

        }

    } catch (error) {
        return error

    }
}
export const MostrarFacturas = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/GetInvoices", {
            //"token": token,

            "idcliente": parms
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        return data

    } catch (error) {
        return error
    }
}
export const MostrarFacturasdeuda = async (parms)=>{
    try {
        let { data } = await axios.post(Hostv1 +"/PortalApi/GetInvoices",{
           // "token":token,
            "estado": "1",
            "idcliente":parseInt( parms)
        })
        return data
    } catch (error) {
        return error
    }
}
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 +"/PortalApi/GetInvoice",
            {
                //"token":token,
                "idfactura": parseInt( parms)
            })           
        return data

    } catch (error) {
        return error
    }


}

