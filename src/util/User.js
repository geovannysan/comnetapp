export const userlog = () => {
    try {
        //let datos = JSON.parse( sessionStorage.getItem("USERLOGIN"))
        let datos = {
            Id: 3,
            nombre: "scajape@comnet.ec",
            password: "0999999999",
            permiso: "2",
            telefono: "",
            usuario: "scajape",
        }
        //console.log(datos)
        if (datos === null) return null
        return datos
    } catch (error) {
        return error
    }
}
