import axios from "axios"
export const Axiosmikroser = axios.create({
    baseURL: "https://api.t-ickets.com/mikroti/"
})
export const Listareportes = async () => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/reportes/" + 0, {
            "startDate": "",
            "endDate": ""
        })
        return data
    } catch (error) {
        return error
    }
}
export const EditarArchivo = async (id, params) => {
    try {
        let { data } = await Axiosmikroser.put(`Comnet/editar/${id}`, params);
        return data;
    } catch (error) {
        return error
    }
}
export const EliminarArchivo = async (id, params) => {
    try {
        let { data } = await Axiosmikroser.delete(`Comnet/eliminar/${id}`, params);
        return data;
    } catch (error) {
        return error
    }
}
export const ListarFacturas = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/listarfactura", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Arreglarerror = async () => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/MovilApi/Facturaserror")
        return data
    } catch (error) {
        return error
    }
}