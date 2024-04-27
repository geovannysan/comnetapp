import axios from "axios"
export const Axiosmikroser = axios.create({
    baseURL: "https://api.t-ickets.com/mikroti/"
})
export const Axiosmikroserdos = axios.create({
    baseURL: "https://api.t-ickets.com/mikrotiv2/"
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
export const ConsultarFactura = async (params) => {
    try {
        let { data } = await Axiosmikroser.delete('api/select', params)
        return data
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
export const Cargar_factura = async (params) => {
    try {
        let { data } = await Axiosmikroserdos.post("api/select", params)
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const Genera_Factura = async (params) => {
    try {
        
        let {data} = await Axiosmikroserdos.post("api/emite", params )
        return data
    } catch (error) {
        return error
    }
}