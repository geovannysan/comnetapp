import axios from "axios";
import { Axiosroot } from "./User";

export const Obtenerlinkimagen = async (parm) => {
    try {
        const fordata = new FormData();
        fordata.append('image', parm);
        console.log(parm)
        const { data } = await axios.post("https://api.ticketsecuador.ec/store/api/img/", fordata,
            {
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                }
            })
        if (!data.success) return null
        console.log(data)
        return data.link

    } catch (error) {
        console.log(error)
        return null

    }

}
export const OCRApi = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ocr/api/v1/ocr_space", parms)
        return data
    } catch (error) {
        return error
    }
}

export const PAgosViewaapp = async (parms) => {
    try {
        let { data } = await Axiosroot.post("MovilApi/Registro", parms)
        return data
    } catch (error) {
        return error
    }
}
export const Generalinkpago = async (parms) => {
    try {
        let { data } = await Axiosroot.post("MovilApi/linkpago", parms)
        return data
    } catch (error) {
        return error
    }
}