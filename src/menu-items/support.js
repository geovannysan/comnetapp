// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

/*
        {
            id: 'collapse-example',
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
            ]
        }
        */
// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Support',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.ChromeOutlined
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis-react/',
            icon: icons.QuestionOutlined,
            external: true,
            target: true
        },
        {
            id: 'auth',
            title: 'Authentications',
            type: 'collapse',
            icon: icons.DashboardOutlined,
            children: [
                {
                    id: 'login-1',
                    title: 'Login',
                    type: 'item',
                    url: '/application/login',
                    target: false
                },
                {
                    id: 'register',
                    title: 'Register',
                    type: 'item',
                    url: '/application/register',
                    target: true
                }
            ]
        }
    ]
};
export default support;
