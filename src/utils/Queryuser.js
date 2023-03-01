import axios from 'axios';
import { token } from './variables';
let Host = "http://45.224.96.50/api/v1/"
export const autenticar = async (parms) => {
    try {
        let { data } = await axios.post(Host + "GetClientsDetails",
            {
                "token": token,
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
        let { data } = await axios.post(Host + "ListTicket", {
            "token": token,
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
        let { data } = await axios.post(Host + "GetInvoices", {
            "token": token,
            "limit": 1,
            "idcliente": parms
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        if (data.estado === "exito") {

            let id = await data.facturas[0].id
            // console.log(id,parms)
            let datos = await axios.post(Host + "GetInvoice",
                {
                    "token": token,
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
        let { data } = await axios.post(Host + "GetInvoices", {
            "token": token,
            "estado": 1,
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
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.post(Host + "GetInvoice",
            {
                "token": token,
                "idfactura": parms
            }
            
            )
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