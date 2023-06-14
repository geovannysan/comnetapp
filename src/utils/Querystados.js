import axios from "axios"

export const EstadoOlt = async (parms) => {
    try {
        let { data } = await axios.get("https://portalapicon.somee.com/PortalApi/estdoolt/"+parms)
        return data
    } catch (error) {
        return error
    }
}
export const Estadoluz = async (parms) => {
    try {
        let { data } = await axios.get("https://portalapicon.somee.com/PortalApi/estado/"+parms)
        return data
    } catch (error) {
        return error
    }
}
export const DetalleOlt = async (parms) => {
    try {
        let { data } = await axios.get("https://portalapicon.somee.com/PortalApi/detalleolt/"+parms)
        return data
    } catch (error) {
        return error
    }
}
export const Detalleoltport = async (parms) => {
    try {
        let { data } = await axios.get("https://portalapicon.somee.com/PortalApi/detalleoltport/"+parms)
        return data
    } catch (error) {
        return error
    }
}
export const Deviceslist = async (parms)=>{
    try {
        let { data } = await axios.post("https://portalapicon.somee.com/PortalApi/Devices",parms)
        return data
    } catch (error) {
        return error        
    }
}
export const Nombressi= async (parms)=>{
    try {
        let { data } = await axios.post("https://portalapicon.somee.com/PortalApi/ssi", parms)
        return data
    } catch (error) {
        return error      
    }
}