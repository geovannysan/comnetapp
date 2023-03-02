import axios from "axios";
import { token } from "../variables";

/**
 * busca cliente cn contifico
 * @param {*} parms 
 * @returns 
 */
export const BuscaclienteContifico= async (parms)=>{
try {
    let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/persona/?cedula="+parms,{
        headers:{
            "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
        }
    })
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
export const CrearClienteContifico=async(parms)=>{
    try {
        let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/persona/?pos=4511aa3d-fce0-4441-a3e1-0961bd3357af",parms, parms, {
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
 * retoran producto por codigo
 * @param {*} parms 
 * @returns 
 */

export const BuscarProductoContific = async(parms)=>{
    try {
        let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/producto/?codigo="+parms,{
            headers:{
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
export const IncremetoFactura = async()=>{
    try {
        let { data } = await axios.get("https://brisana.netbot.ec/js/numerofactura.php")
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
export const CreaProducto = async(parms)=>{
    try {
        let { data } = await axios.get("https://0992782129001.contifico.com/sistema/api/v1/producto/"+parms,{
            headers:{
                "Authorization": "eYxkPDD5SDLv0nRB7CIKsDCL6dwHppHwHmHMXIHqH8w"
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export const PagoFacturacomnet=async(parms)=>{
    try {
        let { data } = await axios.get("http://45.224.96.50/api/v1/PaidInvoice",parms,
        {
            headers:token

        })
        return data
    } catch (error) {
        
    }
}

export const  Creafactura = async(parms)=>{
    try {
        let { data } = await axios.get("https://api.contifico.com/sistema/api/v1/documento/")
        return data
    } catch (error) {
        return error
    }
}