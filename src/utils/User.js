export const userlog =()=>{
    try {
        let datos = JSON.parse( sessionStorage.getItem("USERLOGIN"))
        //console.log(datos)
        if(datos ===null) return null
        return datos
    } catch (error) {
        return error
    }
}
