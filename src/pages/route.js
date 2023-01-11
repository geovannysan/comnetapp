import ComprovanteViews from "./Comprobantes";
import Inicipage from "./Home/Home";
import InformeViews from "./Informes";
import Soportviews from "./Soporte";
import TableViews from "../components/Datatable";
import DataTableBos from "../components/Datatablebostrap";
import FacturaViews from "./Comprobantes/Facturas";
const route = [
    {
        path: "/inicio",
        layout: "/page",
        name: "Inicio",
        component: Inicipage,
    },
    {
        path: "/Documentos",
        layout: "/page",
        name: "Documentos",
        component: DataTableBos,
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
        component: FacturaViews,
    },

]
export default route