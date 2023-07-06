import axios from "axios"

export const Get_onu_signal = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/api/SmartApi/get_onu_signal/" + parms)
        return data
    } catch (error) {
        return error
    }
}
/* Detaslle de la onu */
export const Gt_onu_status = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/api/SmartApi/get_onu_status/" + parms)
        return data
    } catch (error) {
        return error
    }
}
/* detalle de la olt */
export const DetalleOlt = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/api/SmartApi/get_onu_details/" + parms)
        return data
    } catch (error) {
        return error
    }
}
/* detalle del port olt */
export const Detalleoltport = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/api/SmartApi/get_olt_pon_ports_details/" + parms)
        return data
    } catch (error) {
        return error
    }
}
/* lista de conectados  */
export const Deviceslist = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/MovilApi/Devices", parms)
        return data
    } catch (error) {
        return error
    }
}
/* nombre de la red  */
export const Nombressi = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/MovilApi/ssi", parms)
        return data
    } catch (error) {
        return error
    }
}
/** obtiene el estado ssi */
export const Estadossi = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/MovilApi/hide", parms)
        return data
    } catch (error) {
        return error
    }
}
/* visivilidad de la red  */
export const Changessihide = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/MovilApi/changessi", parms)
        return data
    } catch (error) {
        return error
    }
}
/** Refrescando cambias del router */
export const Refresssi = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/MovilApi/refres", parms)
        return data
    } catch (error) {
        return error
    }
}
//* obtiene nombre de perfil de velocidad */
export const Get_onu_profile_speed = async (parms) => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/api/SmartApi/get_onu_speed_profiles/" + parms)
        return data
    } catch (error) {
        return error
    }
}
/** lista todos los perfiles profile */
export const Get_speed_profiles = async ()=>{
    try {
        let { data } = await axios.get("https://rec.netbot.ec/mikroti/api/SmartApi/get_speed_profiles")
        return data
    } catch (error) {
        return error
    }
}