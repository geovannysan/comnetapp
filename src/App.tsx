import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import { usuario } from './utils';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import "./css/style.css"
import "./css/animate.css"
import "./css/tablas.css"
/* Theme variables */
import './theme/variables.css';
import { useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  let usedispath = useDispatch()
  let user = useSelector((state: any) => state.usuario)

  useEffect(() => {
    //console.log(usuario())
    //console.log(user.authb)
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        {user.authb ?
          <IonSplitPane contentId="main"
            className=''
          >
            <Menu />
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
