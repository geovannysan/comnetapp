import axios from 'axios';
import { token } from './variables';
let Host = "https://portal.comnet.ec/api/v1/"
export const autenticar = async (parms) => {
    try {
        let { data } = await axios.post("http://portalfac.netbot.ec/consultas.php",
            {
                "cedula": parms,
                "url": "https://portal.comnet.ec/api/v1/GetClientsDetails"
            }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        console.log(JSON.parse(data))
        return JSON.parse(data)
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
        return JSON.parse( data)
    } catch (error) {
        return error
    }
}
export const ListarFactura = async (parms) => {
    try {
        let { data } = await axios.post("http://portalfac.netbot.ec/consultas.php", {
            "url": Host + "GetInvoices",
            "limit": 1,
            "idcliente": parms
        })
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
        let { data } = await axios.post("http://portalfac.netbot.ec/consultas.php", {
            "url": Host + "GetInvoices",
            "estado": 1,
            "idcliente": parms
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        return JSON.parse(data)

    } catch (error) {
        return error
    }
}
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.post("http://portalfac.netbot.ec/consultas.php",
            {
                "url": Host + "GetInvoice",
                "idfactura": parms
            }

        )
        return JSON.parse(data)

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