// assets
import { LoginOutlined, ProfileOutlined, ChromeOutlined, FileWordOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    FileWordOutlined, ChromeOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'pagos',
    title: 'Contifico',
    type: 'group',
    children: [
        {
            id: 'Pago',
            title: 'Pagos',
            type: 'item',
            url: '/pagos',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'Facturas',
            title: 'Facturas',
            type: 'item',
            url: '/Facturas',
            icon: icons.FileWordOutlined,
            target: false
        },
        ,
        {
            id: 'Transacion',
            title: 'Transacion',
            type: 'item',
            url: '/transacion',
            icon: icons.FileWordOutlined,
            target: false
        },
        {
            id: 'Facturas_for',
            title: 'Facturas form',
            type: 'item',
            url: '/Facturas_for',
            icon: icons.FileWordOutlined,
            target: false
        }
    ],

   /* id: 'collapse-example',
    title: 'Collapse Example',
    type: 'collapse',
    icon: icons.ChromeOutlined,
    children: [
        {
            id: 'color',
            title: 'Color',
            url: '/color',
            icon: icons.ChromeOutlined
        },
        {
            id: 'dashboard-default',
            title: 'Dashboard Default',
            url: '/dashboard/default',
            icon: icons.ChromeOutlined
        }
    ]*/


};

export default pages;
