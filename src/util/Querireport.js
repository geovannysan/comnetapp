import axios from "../../node_modules/axios/index"

export const Listareport = async () => {
    try {
        let { data } = await axios.post("http://localhost:3009/reportes/0", {
            "startDate": "",
            "endDate": ""
        })
        return data
    } catch (error) {
        return error
    }
}