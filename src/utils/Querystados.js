import axios from "axios"

export const Get_onu_signal = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/PortalApi/estdoolt/" + parms)
        return data
    } catch (error) {
        return error
    }
}
export const Gt_onu_status = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/PortalApi/estado/" + parms)
        return data
    } catch (error) {
        return error
    }
}
export const DetalleOlt = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/PortalApi/detalleolt/" + parms)
        return data
    } catch (error) {
        return error
    }
}
export const Detalleoltport = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/PortalApi/detalleoltport/" + parms)
        return data
    } catch (error) {
        return error
    }
}
export const Deviceslist = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/PortalApi/Devices", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Nombressi = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/PortalApi/ssi", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Estadossi = async (parms) => {
    try {
        let { data } = await axios.post("http://localhost:5200/MovilApi/hide", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Changessihide = async (parms) => {
    try {
        let { data } = await axios.post("http://localhost:5200/MovilApi/changessi", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Refresssi = async (parms) => {
    try {
        let { data } = await axios.post("http://localhost:5200/MovilApi/refres", parms)
        return data
    } catch (error) {
        return error
    }
}