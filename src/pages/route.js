import ComprovanteViews from "./Comprobantes";
import Inicipage from "./Home/Home";
import InformeViews from "./Informes";
import Soportviews from "./Soporte";
import FacturaViews from "./Comprobantes/Facturas";
import DocuumentosViews from "./Documentos";
import SpeddView from "../components/Spedd";
import { PerfilView } from "./Perfil";
import { OpcionesView } from "./Home/Opciones";
import ProfileView from "./Home/Perfil";
import FacturasView from "./Home/Facturas";
export  function Lugar(){
    return(
        <div className="container"> 
            <div id="content" className="content  card "><title></title>
                <p>Estimado Cliente, Recordamos realizar los pagos en:</p>

                <p>&nbsp;</p>
              
                <ul className="list">
                    <li>Via deposito bancario O Trasferencia a Nuetras Cuentas:</li>
                    <li>Banco Pichincha a Nombre de COMPUTECNICSNET S.A Cuenta Corriente Numero <strong>2100106995 </strong></li>
                    <li>Banco Produbanco Nombre de COMPUTECNICSNET S.A cuenta corriente <strong>1058194005</strong> / Servipagos</li>
                    <li>Recaudación de Banco Vecino con el codigo 44957 + Numero de Cedula &nbsp;del cliente</li>
                    <li>Banco Guayaquil Cuenta Corriente&nbsp;<strong>&nbsp;#18018624</strong>&nbsp;a Nombre de Computecnicsnet S.A.&nbsp;/ Banco Vecino</li>
                    <li>Banco Pacifico Cuenta horros <strong>#1051475596</strong> a Nombre de Carlos Tapia Loor / Tu banco Aquí&nbsp;</li>
                    <li><strong>Con Todas las Targetas de Credito -- Pedir Informacion&nbsp;</strong></li>
                    <li>En nuestras oficinas situado en el km 8 1/2 Via a Daule (Coop. Pancho Jacome Frente al Colegio Victor Hugo Mora)</li>
                </ul>

                <p>&nbsp;</p>
            </div>
        </div>
    )
}
const route = [
    {
        path: "/inicio",
        layout: "/page",
        name: "Inicio",
        collapse: false,
        component: Inicipage,
    },{
        path: "/option",
        layout: "/page",
        name: "Opciones",
        component: OpcionesView,
    },{
        path:"/info",
        layout:"/page",
        name:"Infomracion",
        collapse:false,
        component:ProfileView
    }, {
        path: "/Facturas",
        layout: "/page",
        name: "Infomracion",
        collapse: false,
        component: FacturasView
    },
    {
        path: "/Documentos",
        layout: "/page",
        name: "Documentos",
        collapse: false,
        component: DocuumentosViews,
    },
    {
        path: "/Comprobantes",
        layout: "/page",
        name: "Comprobantes",
        collapse: false,
        component: ComprovanteViews,
    },
    {
        path: "/Informe",
        layout: "/page",
        name: "Informe de Pago",
        collapse: false,
        component: InformeViews,
    },
    {
        path: "/Soporte",
        layout: "/page",
        name: "Soporte",
        collapse: false,
        component: Soportviews,
    },
    {
        path: "/Puntos",
        layout: "/page",
        name: "Puntos",
        collapse: false,
        component: Lugar,
    },
    
    {
        path: "/Factura/:id",
        layout: "/page",
        name: "Puntos",
        collapse: false,
        component: FacturaViews,
    },{
        path:"/Test",
        layout:"/page",
        name:"Test",
        collapse: true,
        component:SpeddView
    },
    {
        path: "/perfil",
        layout: "/page",
        name: "Utilidades",
        collapse: true,
        component: PerfilView,
        
    },

]
export default route