import axios from 'axios';
import { token } from './variables';
import { userlog } from './User';
let Host = "https://portal.comnet.ec/api/v1/";
//let userlog() = JSON.parse(sessionStorage.getItem("USERLOGIN"))
export const Logearse = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/PortalApi/Login", parms)
        return data
    } catch (error) {
        return error
    }
}
export const autenticar = async (parms) => {
    console.log(userlog())
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/PortalApi/GetClientsDetails", { cedula: parms, operador: userlog().password })
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
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoices/" + parms + "/" + userlog().password)
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
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoices/" + parms + "/" + userlog().password)
        return data

    } catch (error) {
        return error
    }
}
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoice/" + parms + "/" + userlog().password)
        return data

    } catch (error) {
        return error
    }
}
export const CreaLaFacturapor = async (parms, idfacttu) => {
    let datos = {
        "parms": { ...parms }
    }
    try {


        let { data } = await axios.post("https://api.t-ickets.com/mikroti/newdocumento/" + idfacttu + "/" + userlog().Id, datos)


        /* axios({
             method: 'post', url: "https://api.t-ickets.com/mikroti/newdocumento/" + idfacttu + "/" + userlog().Id, data: datos
         })*/
        return data

    } catch (error) {
        console.log(datos, error)
        return error

    }
}
export const Loginadmin = async (parms) => {
    const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/auth_admin", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const Actualizarsolicitud = async (parms, id) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/solicitu/actualiza/" + id, parms, {
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
export const listarSolicitud = async (parms) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/solicitu/lista/" + parms, {
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
export const ListarSolicituID = async (parms) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/solicitu/solicitu/" + parms, {
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