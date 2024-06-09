

import axios from "axios";
import { userlog } from "./User";
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
export const Descargar = async()=>{
    try {
        let { data } = await axios.get("http://localhost:3008/api/descargar")
        return data
    } catch (error) {
        return error
    }
}
export const autenticar = async (parms) => {
    console.log(userlog())
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/PortalApi/GetClientsDetails", { cedula: parms, operador: userlog().cedula })
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
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoices/" + parms + "/" + userlog().cedula)
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
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoices/" + parms + "/" + userlog().cedula)
        return data

    } catch (error) {
        return error
    }
}
export const Facturaid = async (parms) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoice/" + parms + "/" + userlog().cedula)
        return data

    } catch (error) {
        return error
    }
}
export const CreaLaFacturapor = async (parms, idfacttu) => {
    let inpuestoconsult = parseInt(sessionStorage.getItem("imp"))
    let descrip = sessionStorage.getItem("descripcion")
    try {

        let valoresfact = valoresdeivacondecimal(parms.total, inpuestoconsult)
        let parametros = {
            ...parms,
            "descripcion": parms.cliente.cedula.trim() + " " + descrip +" " +idfacttu ,

            subtotal_12: (inpuestoconsult == 0) ? 0 : valoresfact.subtotal_12,
            iva: valoresfact.iva,
            total: valoresfact.total,
            detalles:
                [
                    {
                        ...parms.detalles[0],
                        precio: valoresfact.subtotal_12,
                        porcentaje_iva: inpuestoconsult,
                        base_gravable: (inpuestoconsult == 0) ? 0 : valoresfact.subtotal_12,
                        base_cero: 0,
                        "base_no_gravable": (inpuestoconsult == 0) ? valoresfact.total : 0,
                    }
                ],
            cobros: [
                {
                    ...parms.cobros[0],
                    monto: valoresfact.total
                }
            ]
        }
        console.log(parametros)
        /*  let { data } = await axios({
              method: 'post', url: 'https://api.contifico.com/sistema/api/v1/documento/', data: parms, headers: {
                  'Authorization': 'eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w'
              }
          })*/
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/newdocumento/" + idfacttu + "/" + userlog().Id, { "parms": { ...parametros } })
        return data

    } catch (error) {
        console.log(parms, error)
        return error

    }
}
function formatNumber(num) {
    const thirdDecimal = Math.floor(num * 1000) % 10;
    if (thirdDecimal > 5) {
        return num.toFixed(2);
    } else {
        return Math.trunc(num * 100) / 100;
    }
}
function valoresdeivacondecimal(total, IVA) {
    try {
        /* if (IVA == 12) {
             let montoTotal = total
             const tasaIVA = Number(IVA);
             //const ivas = montoTotal - (montoTotal / (1 + tasaIVA
             const ivas = (montoTotal - (montoTotal / (1 + tasaIVA / 100))).toFixed(3);
             const subtotals = (parseFloat(montoTotal) / (1 + tasaIVA / 100));
             let parametrosivas = String(String(ivas).split(".")[1]).substring(2, 3)
             let parametrossubto = String(String(subtotals).split(".")[1]).substring(2, 3)
     
             let suma = parseInt(parametrossubto) + parseInt(parametrosivas)
             // console.log("d", parametrosivas, parametrossubto)
             if (parseInt(parametrosivas) < 6 && parseInt(parametrossubto) < 6) {
     
                 let sumas = (Math.trunc(parseFloat(ivas) * 100) / 100) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
                 let valores = {
                     "iva": Math.trunc(parseFloat(ivas) * 100) / 100,
                     "subtotal_12": Math.trunc(subtotals * 100) / 100,
                     "total": formatNumber(sumas),
                     "op": 1
                 }
                 console.log(valores, total)
                 return valores
             }
             if (parseInt(parametrosivas) > 6) {
     
                 let sumas = parseFloat(formatNumber(parseFloat(ivas))) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
                 let valores = {
                     "iva": formatNumber(parseFloat(ivas)),
                     "subtotal_12": Math.trunc(subtotals * 100) / 100,
                     "total": formatNumber(sumas),
                     "op": 2
                 }
                 console.log(valores, total)
                 return valores
             }
             if (suma > 6 && suma <= 9) {
                 let sumas = parseFloat("" + subtotals) + parseFloat(ivas)
                 //let sumas = parseFloat(formatNumber(parseFloat(ivas))) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
                 let valores = {
                     "iva": formatNumber(ivas),
                     "subtotal_12": formatNumber(subtotals),
                     "total": formatNumber(sumas),
                     "op": 3
                 }
                 // console.log(valores, total)
                 return valores
             }
             else if (suma > 10) {
                 console.log("mayora10")
                 let sumas = parseFloat("" + subtotals) + parseFloat(ivas)
                 let valores = {
                     "iva": formatNumber(ivas),
                     "subtotal_12": formatNumber(subtotals),
                     "total": formatNumber(total),
                     "op": 4
                 }
                 console.log(valores, total)
                 return valores
             }
             else {
                 console.log("igual a 10")
                 let sumas = parseFloat("" + subtotals) + parseFloat(ivas)
                 let valores = {
                     "iva": parseFloat(ivas),
                     "subtotal_12": formatNumber(subtotals),
                     "total": formatNumber(sumas),
                     "op": 4
                 }
                 console.log(valores, total)
                 return valores
             }
         }
         else {*/

        let montoTotal = total
        console.log("entro ->" + montoTotal);
        const tasaIVA = Number(IVA);
        //const ivas = montoTotal - (montoTotal / (1 + tasaIVA
        const ivas = (montoTotal - (montoTotal / (1 + tasaIVA / 100))).toFixed(3);
        const subtotals = (parseFloat(montoTotal) / (1 + tasaIVA / 100));
        let parametrosivas = String(String(ivas).split(".")[1]).substring(2, 3)
        let parametrossubto = String(String(subtotals).split(".")[1]).substring(2, 3)

        let suma = parseInt(parametrossubto) + parseInt(parametrosivas)
        //console.log("d", parametrosivas, parametrossubto)
        if (parseInt(parametrosivas) <= 5 && parseInt(parametrossubto) <= 5) {

            let sumas = (Math.trunc(parseFloat(ivas) * 100) / 100) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
            let valores = {
                "iva": Math.trunc(parseFloat(ivas) * 100) / 100,
                "subtotal_12": Math.trunc(subtotals * 100) / 100,
                "total": formatNumber(sumas),
                "op": 1
            }
            console.log(valores, total)
            return valores
        }
        console.log(suma, parametrossubto + "," + parametrosivas)
        if (parseInt(suma) > 8) {
            console.log("mayora10")
            let sumas = parseFloat("" + subtotals) + parseFloat(ivas);
            let valores = {
                "iva": formatNumber(parseFloat(ivas)),
                "subtotal_12": formatNumber(subtotals),
                "total": formatNumber(sumas),
                "op": 4.5
            }
            console.log(valores, total)
            return valores
            //return valores
        }
        if (parseInt(parametrossubto) < 4) {
            if (parseInt(parametrosivas) <= 6) {
                let sumas = (Math.trunc(parseFloat(ivas) * 100) / 100) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
                let valores = {
                    "iva": Math.trunc(parseFloat(ivas) * 100) / 100,
                    "subtotal_12": Math.trunc(subtotals * 100) / 100,
                    "total": formatNumber(montoTotal),
                    "op": 1.5
                }
                console.log(valores, total)
                return valores
            }
        }
        if (parseInt(parametrosivas) >= 6) {

            let sumas = parseFloat(formatNumber(parseFloat(ivas))) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
            let valores = {
                "iva": formatNumber(parseFloat(ivas)),
                "subtotal_12": Math.trunc(subtotals * 100) / 100,
                "total": formatNumber(sumas),
                "op": 2
            }
            console.log(valores, total)
            return valores
        }
        if (suma > 6 && suma <= 9) {

            let sumas = parseFloat(formatNumber(parseFloat(ivas))) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
            let valores = {
                "iva": formatNumber(ivas),
                "subtotal_12": formatNumber(subtotals),
                "total": formatNumber(sumas), //formatNumber(parseFloat(ivas) + parseFloat(subtotals)),
                "op": 3
            }
            console.log(valores, total)
            return valores
        }

        else {
            console.log("igual a 10")
            let sumas = (Math.trunc(parseFloat(ivas) * 100) / 100) + parseFloat("" + Math.trunc(subtotals * 100) / 100)
            let sum = parseFloat(formatNumber(ivas)) + parseFloat(formatNumber(subtotals))
            let valores = {
                "iva": formatNumber(ivas),
                "subtotal_12": formatNumber(subtotals),
                "total": total,
                "op": 5
            }
            console.log(valores, total)
            return valores
        }
    } catch (err) {
        console.error(`Error en la función calcularIVA: ${err}`);
    }
    //  }
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
export const Crear_Usuario_Portal = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/FactuApi/Users", parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
export const Lista_Usuario_Portal = async (parms) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/FactuApi/Users", parms, {
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
export const Lista_Contratos = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/Comnet/listar", parms, {
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
export const Lista_archivo = async () => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/Comnet/Lista")
        return data
    } catch (error) {
        return error
    }
}
export const Actualiza_Usuario_Portal = async (id, parms) => {
    try {
        let { data } = await axios.put("https://api.t-ickets.com/mikroti/FactuApi/Users/" + id, parms, {
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
export const Solicitudid = async (id) => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/solicitu/solicitu/" + id, {
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
export const EliminarSolict = async (id) => {
    try {
        let { data } = await axios.delete("https://api.t-ickets.com/mikroti/Eliminarsolicitud/" + id, {
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