// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userlog } from './util/User';
import { setDatosuser, setlogin } from './store/reducers/menu';
import AuthLogin from './pages/authentication/auth-forms/AuthLogin';
import Login from './pages/authentication/Login';
import './themes/themes/bootstrap.css'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    let users = useSelector((state) => state.menu)
    let userdispach = useDispatch()
    useEffect(() => {
        let datos = userlog()
        if (datos != null) {
            userdispach(setlogin({ estado: true }))
            
            userdispach(setDatosuser({ ...datos }))
          
        }
    }, [])
    return (
        <ThemeCustomization>
            <ScrollTop>
                {users.estado?
                <Routes />
            :<Login/>
            }
            </ScrollTop>
        </ThemeCustomization>
    )
};

export default App;
