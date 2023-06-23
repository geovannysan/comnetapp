import axios from "axios";
import { token } from "../variables";

/**
 * busca cliente cn contifico
 * @param {*} parms 
 * @returns 
 */
export const BuscaclienteContifico = async (parms) => {
    console.log(parms)
    if (parms.length > 11) {
        console.log("ruc")
        try {
            let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/persona/?ruc=" + parms, {
                headers: {
                    "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
                }
            })
            return data
        } catch (error) {
            return error
        }

    }
    else if (parms.length == 11) {

        parms = parms.substring(0, parms.length - 1);
        console.log("ce", parms)
        try {
            let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/persona/?cedula=" + parms, {
                headers: {
                    "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
                }
            })
            return data
        } catch (error) {
            return error
        }
    } else {
        console.log(parms)
        try {
            let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/persona/?cedula=" + parms, {
                headers: {
                    "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
                }
            })
            return data
        } catch (error) {
            return error
        }
    }
}
/**
 * 
 */
export const Consultarcedula = async (parms) => {
    if(parms.length==11) {
        parms = parms.substring(0, parms.length - 1);
    }
    try {
        let { data } = await axios.get("https://rec.netbot.ec/ms_login/cedula/" + parms)
        return data
    } catch (error) {
        return error
    }
}
/**
 * crea cliente en contifico
 * @param {*} parms 
 * @returns 
 */

//no encuentra por ruc ni crea por ruc
export const CrearClienteContifico = async (parms) => {
    try {
        let { data } = await axios({
            method: 'post', url: 'https://api.contifico.com/sistema/api/v1/persona/?pos=4511aa3d-fce0-4441-a3e1-0961bd3357af', data: parms, headers: {
                'Authorization': 'eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w'
            }
        })
        console.log(data.response.data)
        return data

    } catch (error) {
        console.log(error.response.data);
        return error
    }
}
/**
 * retoran producto por codigo
 * @param {*} parms 
 * @returns 
 */

export const BuscarProductoContific = async (parms) => {
    try {
        let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/producto/?codigo=" + parms, {
            headers: {
                "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
            }
        })
        return data
    } catch (error) {
        return error
    }
}

/**
 * devuelve contador
 * @returns 
 */
export const IncremetoFacturaS = async () => {
    try {
        //https://rec.netbot.ec/mikroti/FactuApi/incrementodos
        let { data } = await axios({
            method: 'post', url: 'https://portalfac.netbot.ec/incrementov.php'
        })
        return data
    } catch (error) {
        return error
    }
}
export const IncremetoCon = async () => {
    try {
        //https://rec.netbot.ec/mikroti/FactuApi/incrementouno
        let { data } = await axios({
            method: 'post', url: 'https://portalfac.netbot.ec/incremento.php'
        })
        return data
    } catch (error) {
        return error
    }
}
/**
 * crea producto producto por diferencia de prwecios
 * {
  "codigo_barra": null,
  "porcentaje_iva": "12",
  "categoria_id": "91qdGvZgXhY6nbN8",
  "pvp1": "{{SALDO_TOTAL}}",
  "tipo": "SER",
  "para_supereasy": false,
  "para_comisariato": false,
  "minimo": "0.0",
  "descripcion": "Servicio de Internet Banda ancha",
  "nombre": "{{PLAN_CONTRATADO}}",
  "codigo": "{{CONTADOR}}{{IDPERFIL}}",
  "estado": "A"
}
 * @param {*} parms 
 * @returns 
 */
export const CreaProducto = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/FactuApi/Crearpro", { ...parms })
        return data
    } catch (error) {
        return error
    }
}

export const PagoFacturacomnet = async (parms) => {
    let nombres = JSON.parse(sessionStorage.getItem("USERLOGIN"))
    try {
        //https://portalfac.netbot.ec/consultas.php
        //http://45.224.96.50/api/v1/PaidInvoice
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/PortalApi/PagosdelPortal/" + nombres.password,
            parms

        )
        return data
    } catch (error) {

    }
}

export const Creafactura = async (parms) => {
    try {
        let { data } = await axios.post("https://api.contifico.com/sistema/api/v1/documento", parms
            , {
                headers: {
                    "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
                }
            })
        return data
    } catch (error) {
        return error
    }
}
export const Verificar = async (parms) => {
    try {
        let { data } = await axios.post("https://api.contifico.com/sistema/api/v1/documento", parms
            , {
                headers: {
                    "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
                }
            })
        return data
    } catch (error) {
        return error

    }
}
export const ObtenerFacturas = async () => {
    let dias = -15
    let fin = new Date()
    fin.setDate(fin.getDate() + dias);
    let fechainicios = new Date(JSON.stringify(fin).replace('"', '').replace('"', '')).toLocaleDateString("en-US")
    let fechafinal = new Date().toLocaleDateString("en-US")
    try {

        let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/documento?tipo=FAC&fecha_inicial=" + fechainicios + "&fecha_final=" + fechafinal,
            {
                headers: {
                    "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
                }
            })
        return data
    } catch (error) {
        return error
    }
}
export const ObtenerFactura = async () => {
    let dias = -7
    let fin = new Date()
    fin.setDate(fin.getDate() + dias);
    let fechainicios = new Date(JSON.stringify(fin).replace('"', '').replace('"', '')).toLocaleDateString("en-GB")
    let fechafinal = new Date().toLocaleDateString("en-GB")
    console.log(fechainicios, fechafinal)
    try {

        let { data } = await axios.get("https://portalfac.netbot.ec/contifico.php")
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
/**
 * 
 * 
 * export const ObtenerFacturas = async () => {
    let dias = -15
    let fin = new Date()
    fin.setDate(fin.getDate() + dias);
    let fechainicios = new Date(JSON.stringify(fin).replace('"', '').replace('"', '')).toLocaleDateString("en-US")
    let fechafinal = new Date().toLocaleDateString("en-US")
    try {

        let { data } = await axios.get("https://portalfac.netbot.ec/consultas.php",
            {
                "url": "contifico",
                "page": "https://api.contifico.com/sistema/api/v1/documento?tipo=FAC&fecha_inicial=" + fechainicios + "&fecha_final=" + fechafinal
            }
        )
        return data
    } catch (error) {
        return error
    }
}
 

 * 
 * 
 * 
{
  "pos": "4511aa3d-fce0-4441-a3e1-0961bd3357af",
  "fecha_emision": "{{CURRENT_DATE}}",
  "tipo_documento": "FAC",
  "documento": "004-004-00000{{NUMEROFACTURA}}",
  "estado": "G",
  "electronico": true,
  "autorizacion": null,
  "caja_id": null,
  "cliente": {
    "ruc": null,
    "cedula": "{{CEDULA}}",
    "razon_social": "{{NOMBRES}}",
    "telefonos": "{{PLATFORM_ID}}",
    "direccion": "{{DIRECCION_CLIENTE}}",
    "tipo": "N",
    "email": "{{MAIL}}",
    "es_extranjero": false
  },
  "vendedor": {
    "ruc": "0992782129001",
    "razon_social": "COMPUTECNICSNET S.A",
    "telefonos": "5104910",
    "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
    "tipo": "J",
    "email": "facturacion@speed.ec",
    "es_extranjero": false
  },
  "descripcion": "{{DATOS_SERVICIO_SRI}}",
  "subtotal_0": 0,
  "subtotal_12": "{{SUBTOTAL}}",
  "iva": "{{IMPUESTO}}",
  "total": "{{TOTAL_FACTURA}}",
  "detalles": [
    {
      "producto_id": "{{IDPRODUCTO}}",
      "cantidad": "{{QTY_FACTURAS}}",
      "precio": "{{SUBTOTAL}}",
      "porcentaje_iva": 12,
      "porcentaje_descuento": 0,
      "base_cero": 0,
      "base_gravable": "{{SUBTOTAL}}",
      "base_no_gravable": 0
    }
  ],
  "cobros": [
    {
      "forma_cobro": "TRA",
      "monto": "{{TOTAL_FACTURA}}",
      "cuenta_bancaria_id": "{{IDCUENTA}}",
      "numero_comprobante": "{{DOCUMENTO}}",
      "fecha": "{{CURRENT_DATE}}"
    }
  ]
}
 */