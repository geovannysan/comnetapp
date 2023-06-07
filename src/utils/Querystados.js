import axios from "axios"

export const EstadoOlt = async (parms) => {
    try {
        let { data } = await axios.get("http://localhost:5200/PortalApi/estdoolt/"+parms)
        return data
    } catch (error) {
        return error
    }
}
export const Estadoluz = async (parms) => {
    try {
        let { data } = await axios.get("http://localhost:5200/PortalApi/estado/"+parms)
        return data
    } catch (error) {
        return error
    }
}
export const DetalleOlt = async (parms) => {
    try {
        let { data } = await axios.get("http://localhost:5200/PortalApi/detalleolt/"+parms)
        return data
    } catch (error) {
        return error
    }
}
export const Detalleoltport = async (parms) => {
    try {
        let { data } = await axios.get("http://localhost:5200/PortalApi/detalleoltport/"+parms)
        return data
    } catch (error) {
        return error
    }
}