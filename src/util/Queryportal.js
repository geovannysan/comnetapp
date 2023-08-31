

import axios from "axios";
import { userlog } from "./User";
let Host = "https://portal.comnet.ec/api/v1/";
//let userlog() = JSON.parse(sessionStorage.getItem("USERLOGIN"))
export const Logearse = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/mikroti/PortalApi/Login", parms)
        return data
    } catch (error) {
        return error
    }
}
export const autenticar = async (parms) => {
    console.log(userlog())
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/mikroti/PortalApi/GetClientsDetails", { cedula: parms, operador: userlog().password })
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const ListarTicket = async (parm) => {
    try {
        let { data } = await axios.post("https://portalfac.netbot.ec/consultas.php", {
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
        let { data } = await axios.get("https://api.ticketsecuador.ec/mikroti/PortalApi/GetInvoices/" + parms + "/" + userlog().password)
        if (JSON.parse(data).estado === "exito") {

            let id = await JSON.parse(data).facturas[0].id
            // console.log(id,parms)
            let datos = await axios.post("https://portalfac.netbot.ec/consultas.php",
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
        let { data } = await axios.get("https://api.ticketsecuador.ec/mikroti/PortalApi/GetInvoices/" + parms + "/" + userlog().password)
        return data

    } catch (error) {
        return error
    }
}
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.get("https://api.ticketsecuador.ec/mikroti/PortalApi/GetInvoice/" + parms + "/" + userlog().password)
        return data

    } catch (error) {
        return error
    }
}
export const CreaLaFacturapor = async (parms) => {
    try {

        let { data } = await axios({
            method: 'post', url: 'https://api.contifico.com/sistema/api/v1/documento/', data: parms, headers: {
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
    const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/auth_admin", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}

export const listarSolicitud = async (parms) => {
    try {
        let { data } = await axios.get("https://api.ticketsecuador.ec/mikroti/solicitu/lista/" + parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const Solicitudid = async (id) => {
    try {
        let { data } = await axios.get("https://api.ticketsecuador.ec/mikroti/solicitu/solicitu/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const Actualizarsolicitud = async (parms, id) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/mikroti/solicitu/actualiza/" + id, parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const EliminarSolict = async(id)=>{
    try {
        let { data } = await axios.delete("https://api.ticketsecuador.ec/mikroti/Eliminarsolicitud/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const EnviaWhast = async (parms) => {
    /*
    {
    "user_ids":["593993713942"],
    "message":"Hola buenas tardes",
     "link":"Hola"
    }
    */
    try {
        let { data } = await axios.post("https://core.xfiv.chat/whatsapp_qr_ticket/api/v1/send", parms)
        return data
    } catch (error) {
        return error
    }
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