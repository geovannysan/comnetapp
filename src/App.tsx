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
import { StatusBar } from '@capacitor/status-bar';
import { setDatosuser, setlogin, setPlan } from './StoreRedux/Slice/UserSlice';
import { ListarFactura } from './utils/Queryuser';
import OneSignal from 'onesignal-cordova-plugin';

// Call this function when your app starts


setupIonicReact();

const App: React.FC = () => {
    let user = useSelector((state: any) => state.usuario)
  let userdispach = useDispatch()
 
 

  

  useEffect(() => {
   // StatusBar.setBackgroundColor({ color: '#0000' });
   // StatusBar.setStyle()
   // StatusBar.setStyle({ Style.dark: 'dark' });
    let datos = userlog()
    console.log(datos)
    if (datos !=null) {
      userdispach(setlogin({ estado: true }))
      userdispach(setDatosuser({ ...datos }))
      // createSingleTaskNotification()
    //  OneSignalInit();
      
    }
  }, [])
 
  /*const createSingleTaskNotification = async () => {
    // Comprobar si la notificación ya existe
    const { notifications } = await LocalNotifications.getPending();
    if (notifications.length > 0) {
      console.log('La notificación ya existe. No se creará una nueva.');
      return;
    }

    // Crear la notificación
    const notifs = [{
      title: 'Título de la notificación',
      body: 'Cuerpo de la notificación',
      id: 1,
      schedule: { at: new Date(Date.now() + 5000) }, // Programar para 5 segundos en el futuro
      smallIcon: 'res://icon',
     
      
    }];

    await LocalNotifications.schedule({ notifications: notifs });

    console.log('Notificación programada creada.');
  };*/
  return (
    <IonApp>
      <IonReactRouter>
        {user.authb ?
          <IonSplitPane contentId="main"
            className=''
          >  
           <Menu/>
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
//(window as any).plugins.OneSignal.setAppId("1b5d9596-a75f-4a2d-b38f-4ae7231e48a3");
export default App;
