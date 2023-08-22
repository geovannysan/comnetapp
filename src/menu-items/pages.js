// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
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
            id: 'register1',
            title: 'Register',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: true
        }
    ]
};

export default pages;
