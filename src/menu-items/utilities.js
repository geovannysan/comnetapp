// assets
import {


    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    FundViewOutlined,
    ReadOutlined,
    FileProtectOutlined,
    ClusterOutlined

} from '@ant-design/icons';
import { userlog } from 'util/User';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    FundViewOutlined,
    ReadOutlined,
    FileProtectOutlined,
    ClusterOutlined
};
let datos = userlog()
// ==============================|| MENU ITEMS - UTILITIES ||============================== //
console.log(datos)
const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        /*  {
              id: 'Reportes',
              title: 'Reportes',
              type: 'item',
              url: '/reporte',
              icon: icons.FundViewOutlined
          },*/
        {
            id: 'Mapas',
            title: 'Cobertura',
            type: 'item',
            url: '/cobertura',
            icon: icons.ClusterOutlined,
            breadcrumbs: true

        },
        {
            id: 'Contrartos',
            title: 'Contratos',
            type: 'item',
            url: '/Contractos',
            icon: icons.FileProtectOutlined,
            target: false
        },
        ,
        (datos != null && datos.respuestatres == 1) ? {
            id: 'Usuarios',
            title: 'Usuarios',
            type: 'item',
            url: '/usuarios',
            icon: icons.AntDesignOutlined,
            breadcrumbs: true
        } : ''
        ,
        {
            id: 'Solicitudes',
            title: 'Solicitudes',
            type: 'item',
            url: '/Solicitud',
            icon: icons.ReadOutlined,
            target: false
        }
    ]
};

export default utilities;
