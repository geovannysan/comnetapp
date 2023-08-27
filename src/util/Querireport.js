import axios from "axios"
export const Listareportes = async () => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/mikroti/reportes/" + 0, {
            "startDate": "",
            "endDate": ""
        })
        return data
    } catch (error) {
        return error
    }
}
export const ListarFacturas = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/mikroti/listarfactura", parms)
        return data
    } catch (error) {
        return error
    }
}