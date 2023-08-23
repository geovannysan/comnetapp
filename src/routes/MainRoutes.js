import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
const SolicitudView = Loadable(lazy(() => import('pages/solicitud/index')));
const PagosView = Loadable(lazy(() => import('pages/pagos/index')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
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
                    path: 'home',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: '/pagos',
            element: <PagosView />
        },
        {
            path: 'Facturas',
            element: <SamplePage />
        },
        {
            path: 'Solicitud',
            element: <SolicitudView />
        },
        {
            path: 'reporte',
            element: <SamplePage />
        },
        {
            path: 'pageview',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
