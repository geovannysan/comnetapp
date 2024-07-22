export const userlog = () => {
    try {
        let datos = JSON.parse( sessionStorage.getItem("USERLOGIN"))
        
        //console.log(datos)
        if (datos === null) return null
        return datos
    } catch (error) {
        return error
    }
}
export const hostCron ="https://api.t-ickets.com/mikrotiv2/"
export const Mes = {
    0: "ENERO",
    1: "FEBRERO",
    2: "MARZO",
    3: "ABRIL",
    4: "MAYO",
    5: "JUNIO",
    6: "JULIO",
    7: "AGOSTO",
    8: "SEPTIEMBRE",
    9: "OCTUBRE",
    10: "NOVIEMBRE",
    11: "DICIEMBRE"
}
export const Departamento={
    "1":"Soporte técnico",
    "2":"Ventas",
    "4":"Facturas",
    "5":"Retiro",
    "6":"Actualizaciones",
    "7":"Monitoreo",
}