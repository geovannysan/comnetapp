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

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'Reportes',
            title: 'Reportes',
            type: 'item',
            url: '/reporte',
            icon: icons.FundViewOutlined
        },
        {
            id: 'Solicitudes',
            title: 'Solicitudes',
            type: 'item',
            url: '/Solicitud',
            icon: icons.ReadOutlined,
            target: false
        },
        {
            id: 'Framepage',
            title: 'Framepage',
            type: 'item',
            url: '/pageview',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        }
    ]
};

export default utilities;
