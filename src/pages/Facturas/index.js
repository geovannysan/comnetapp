import { useEffect, useState } from "react"
import { ListarFacturas } from "util/Querireport"

const FacturasView = () => {
    const [factura, setFactura] = useState([])
    async function getFactura() {
        try {
            let datos = await ListarFacturas({
                "estado": "1",
                "idfactura": ""
              })
            let fact =  await ListarFacturas({
                "estado": "0",
                "idfactura": ""
              })
              console.log("", fact)
            if (datos.estado) setFactura(...factura,...datos.data)
            if (fact.estado) setFactura(...factura,...fact.data)
        } catch (error) {
            return error
        }
    }

    useEffect(() => { 
        getFactura()

    }, [])
    return (
        <div>

        </div>)
}
export default FacturasView