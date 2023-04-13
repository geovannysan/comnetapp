import axios from 'axios';
import { token } from './variables';
import { userlog } from './User';
let Host = "http://portal.comnet.ec/api/v1/";
//let userlog() = JSON.parse(sessionStorage.getItem("USERLOGIN"))

export const autenticar = async (parms) => {
    console.log(userlog())
    try {
        let { data } = await axios.get("http://portapi.somee.com/PortalApi/GetClientsDetails/" + parms + "/" + userlog().password)
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const ListarTicket = async (parm) => {
    try {
        let { data } = await axios.post("http://portalfac.netbot.ec/consultas.php", {
            "url": Host + "ListTicket",
            "idcliente": parm
        })
        console.log("Listar ricketsaqi")
        return JSON.parse(data)
    } catch (error) {
        return error
    }
}
export const ListarFactura = async (parms) => {
    try {
        let { data } = await axios.get("http://portapi.somee.com/PortalApi/GetInvoices/"+parms+"/"+userlog().password)
        if (JSON.parse(data).estado === "exito") {

            let id = await JSON.parse(data).facturas[0].id
            // console.log(id,parms)
            let datos = await axios.post("http://portalfac.netbot.ec/consultas.php",
                {
                    "url": Host + "GetInvoice",
                    "idfactura": id
                })
            let arr = JSON.parse(datos).data.items[0].descrp.split("\r\n")
            return arr

        }

    } catch (error) {
        return error

    }
}
export const MostrarFacturas = async (parms) => {
   
    try {
        let { data } = await axios.get("http://portapi.somee.com/PortalApi/GetInvoices/" + parms + "/" + userlog().password)
        return data

    } catch (error) {
        return error
    }
}
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.get("http://portapi.somee.com/PortalApi/GetInvoice/"+parms+"/"+userlog().password)
        return data

    } catch (error) {
        return error
    }
}
export const CreaLaFacturapor = async (parms) => {
    try {

        let { data } = await axios({
            method: 'post', url: 'http://api.contifico.com/sistema/api/v1/documento/', data: parms, headers: {
                'Authorization': 'eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w'
            }
        })
        return data

    } catch (error) {
        console.log(parms, error)
        return error

    }
}
export const Loginadmin = async (parms) => {
    const { data } = await axios.post("http://rec.netbot.ec/ms_login/api/v1/auth_admin", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}

/**
 * 
 *  mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
 */