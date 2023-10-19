import axios from "axios"

export const userlog =()=>{
    try {
        let datos = JSON.parse( localStorage.getItem("USERLOGIN"))
        //console.log(datos)
        if(datos ===null) return null
        return datos
    } catch (error) {
        return error
    }
}

export const Axiosroot = axios.create({
    baseURL:"https://api.t-ickets.com/mikroti/"
})