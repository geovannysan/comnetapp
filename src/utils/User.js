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
