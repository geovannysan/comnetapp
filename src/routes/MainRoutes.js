import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import FacturaDetalle from 'pages/Facturas/Factura';
import Usuario from 'pages/Usuarios/index';
const DetallesView = Loadable(lazy(() => import('pages/solicitud/Detalle')));
const SolicitudView = Loadable(lazy(() => import('pages/solicitud/index')));
const PagosView = Loadable(lazy(() => import('pages/pagos/index')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
//const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
//const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Contractos = Loadable(lazy(() => import('pages/Usuarios/Contratos')));
const FacturasView = Loadable(lazy(() => import('pages/Facturas/index')));
const Conciliacion = Loadable(lazy(()=>import("pages/pagos/concilia") ) );
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'panel',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path:"detalle/:id",
            element: <DetallesView />
        },
        {
            path: '/pagos',
            element: <PagosView />
        },
        {
            path: 'Facturas',
            element: <FacturasView />
        },
        {
            path:'Facturaid',
            element: <FacturaDetalle />
        },
        {
            path: 'Solicitud',
            element: <SolicitudView />
        },
        {
            path: 'usuarios',
            element: <Usuario />
        },
        {
            path: 'Contractos',
            element: <Contractos />
        },
        {
            path: 'page/inicio',
            element: <DashboardDefault />
        },
        {
            path: 'transacion',
            element: <Conciliacion />
        }
    ]
};

export default MainRoutes;
