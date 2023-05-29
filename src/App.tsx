import { IonApp, IonButton, IonButtons, IonCardSubtitle, IonHeader, IonMenuButton, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Menu from './components/Menu';
import Page from './pages/Page';
import Inicio from './pages/Login/index'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/animate.css';
import "./theme/style.css";
import "./theme/tablas.css";
import "./theme/rizes.css";
import { useEffect } from 'react';
import { userlog } from './utils/User';
import { setDatosuser, setlogin, setPlan } from './StoreRedux/Slice/UserSlice';

setupIonicReact();

const App: React.FC = () => {
    let user = useSelector((state: any) => state.usuario)
  let userdispach = useDispatch()
  useEffect(() => {
    let datos = userlog()
    console.log(datos)
    if (datos !=null) {
      userdispach(setlogin({ estado: true }))
      userdispach(setDatosuser({ ...datos }))
    }
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        {user.authb ?
          <IonSplitPane contentId="main"
            className=''
          >  
           
            <IonRouterOutlet id="main">
            
           
              <Switch>
                <Route path="/page"
                >
                  <Page />
                </Route>
                <Route path="/" >
                  <Redirect to="/page/Inicio" />
                </Route>
              </Switch>
            </IonRouterOutlet>
          </IonSplitPane> :
          <IonRouterOutlet id="main">
            <Route path="/" >
              <Inicio />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
            <Route path="/">
              <Inicio />
            </Route>
          </IonRouterOutlet>
        }
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
