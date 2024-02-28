// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    FundViewOutlined,
    ReadOutlined
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
    ReadOutlined
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
            id: 'Solicitudes',
            title: 'Solicitudes',
            type: 'item',
            url: '/Solicitud',
            icon: icons.ReadOutlined,
            target: false
        },
        (datos!=null && datos.respuestatres==1)?{
            id: 'Usuarios',
            title: 'Usuarios',
            type: 'item',
            url: '/usuarios',
            icon: icons.AntDesignOutlined,
            breadcrumbs: true
        }:""
    ]
};

export default utilities;
