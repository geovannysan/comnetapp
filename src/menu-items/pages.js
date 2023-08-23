// assets
import { LoginOutlined, ProfileOutlined, FileWordOutlined} from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined, 
    FileWordOutlined
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
        }
    ]
};

export default pages;
