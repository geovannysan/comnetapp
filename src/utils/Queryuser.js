import axios from 'axios';
import { Axiosroot } from './User';
//let Host = "http://45.224.96.50/api/v1/"
let Hostv1 = "https://api.t-ickets.com/mikroti"
//let Hostv1 = "https://api.t-ickets.com/mikroti/mikroti"
export const autenticar = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/GetClientsDetails",
            {
                "operador": "appspeed",
                "cedula": parms
            }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        //    localStorage.setItem("nuevos",JSON.stringify( data))
        // console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const GeneraTocken = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/generador/token/generate", {
            "cedula": parms,
        })
        return data
    } catch (error) {
        return error
    }
}

export const verificaTocken = async (params) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/generador/token/verify", {
            "token": params
        })
        return data

    } catch (error) {
        return error
    }
}
export const getAppVersion = async () => {
    try {
        let { data } = await Axiosroot.get("MovilApi/app")
        return data
    } catch (error) {
        return error
    }
}
export const Logearusar = async (parms) => {
    try {

        let { data } = await axios.post(Hostv1 + "/Login", parms)
        return data
    } catch (error) {
        return error
    }
}
export const ListarTicket = async (parm) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/ListTicket", {
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
            "limit": "1",
            "idcliente": parseInt(parms)
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        if (data.estado === "exito") {

            let id = data.facturas[0].id
            console.log(id, parms)
            let datos = await axios.post(Hostv1 + "/PortalApi/GetInvoice",
                {
                    "idfactura": id
                }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            let arr = datos.data.items[0].descrp.split("\r\n")
            return arr
        }
    } catch (error) {
        return error
    }
}
export const MostrarFacturas = async (parms) => {

    try {
        let { data } = await axios.get(Hostv1 + "/PortalApi/GetInvoices/" + parms + "/appspeed")
        return data
    } catch (error) {
        return error
    }
}

export const FacturasAtorizada = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/MovilApi/Facturas", {
            "cedula": parms
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
export const MostrarFacturasdeuda = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/GetInvoices", {
            // "token":token,
            "estado": "1",
            "idcliente": parseInt(parms)
        })
        return data
    } catch (error) {
        return error
    }
}
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.get(Hostv1 + "/PortalApi/GetInvoice/" + parms + "/appspeed")
        return data
    } catch (error) {
        return error
    }
}
export const Equipos = async (parms) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/Listequipo/" + parms)
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const OLTcardDETA = async (parms) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/api/SmartApi/get_olt_cards_details/" + parms)
        return data
    } catch (error) {
        return error
    }
}
export const Cambiarclave = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/MovilApi/passwordssi", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Cambiarname = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/MovilApi/namessi", parms)
        return data
    } catch (error) {
        return error
    }
}
export const UserUpdate = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/UpdateUser", parms)
        return data
    } catch (error) {
        return error
    }
}
export const UserUpdatePassword = async (parms) => {
    try {
        let { data } = await axios.post(Hostv1 + "/PortalApi/UpdatePassword", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Newtickte = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/PortalApi/CreaTicket", parms)
        return data
    } catch (error) {
        return error
    }
}
export const TokenOnesigna = async (parms) => {
    try {
        let { data } = await Axiosroot.put("MovilApi/token", parms)
        return data
    } catch (error) {
        return error
    }
}