import ComprovanteViews from "./Comprobantes";
import Inicipage from "./Home/Home";
import InformeViews from "./Informes";
import Soportviews from "./Soporte";
import FacturaViews from "./Comprobantes/Facturas";
import DocuumentosViews from "./Documentos";
/*    {
        path: "/inicio",
        layout: "/page",
        name: "Inicio",
        component: Inicipage,
    },*/
const route = [
    {
        path: "/inicio",
        layout: "/page",
        name: "Inicio",
        component: InformeViews,
    },
    {
        path: "/Solicitudes",
        layout: "/page",
        name: "Solicitudes",
        component: DocuumentosViews,
    }
    /*{
        path: "/Documentos",
        layout: "/page",
        name: "Documentos",
        component: DocuumentosViews,
    },
    {
        path: "/Comprobantes",
        layout: "/page",
        name: "Comprobantes",
        component: ComprovanteViews,
    },
    {
        path: "/Informe",
        layout: "/page",
        name: "Informe de Pago",
        component: InformeViews,
    },
    {
        path: "/Soporte",
        layout: "/page",
        name: "Soporte",
        component: Soportviews,
    },
    {
        path: "/Puntos",
        layout: "/page",
        name: "Puntos",
        component: Soportviews,
    },
    {
        path: "/Factura/:id",
        layout: "/page",
        name: "Puntos",
        component: FacturaViews,
    },*/

]
export default route