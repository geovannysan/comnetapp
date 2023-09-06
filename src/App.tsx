import { IonApp, IonButton, IonButtons, IonCardSubtitle, IonHeader, IonIcon, IonMenuButton, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, createAnimation, isPlatform, setupIonicReact } from '@ionic/react';
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
//import './theme/boostrap.css';
//import './theme/animate.css';
import "./theme/style.css";
import "./theme/tablas.css";
import "./theme/rizes.css";
//import "./theme/anima.css";
import { useEffect, useState } from 'react';

import { userlog } from './utils/User';
import { StatusBar, Style } from '@capacitor/status-bar';
import { setDatosuser, setlogin, setPlan } from './StoreRedux/Slice/UserSlice';
import { ListarFactura, autenticar } from './utils/Queryuser';
import OneSignal from 'onesignal-cordova-plugin';
import { initializeOneSignal } from './Onesignajs'
import { getPlatforms } from '@ionic/react';
import { add, home, person, pulse } from 'ionicons/icons';
import LoginView from './pagevdos/Inicio/login';
import RegistroView from './pages/Login/Register';
import RegisterViews from './pagevdos/Inicio/register';
import TabsView from './components/Tabs';
import PAgosViewa from './pagevdos/Pagos';
import PlanView from './pagevdos/Plan';
import { MapsVies } from './pagevdos/Mapa';

function OneSignalInit(user: any): void {
  OneSignal.setLogLevel(0, 0);
  OneSignal.setAppId("1b5d9596-a75f-4a2d-b38f-4ae7231e48a3");
  OneSignal.setNotificationOpenedHandler(function (jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    console.log("User accepted notifications: " + accepted);
  });
  const externalUserId = "ID_EXTERNO"; // Reemplaza con tu ID externo único

  OneSignal.setExternalUserId(user.id, (results: any) => {
    console.log('Results of setting external user id');
    console.log(results);

    // Push can be expected in almost every situation with a success status, but
    // as a pre-caution its good to verify it exists
    if (results.push && results.push.success) {
      console.log('Results of setting external user id push status:');
      console.log(results.push.success);
    }

    // Verify the email is set or check that the results have an email success status
    if (results.email && results.email.success) {
      console.log('Results of setting external user id email status:');
      console.log(results.email.success);
    }

    // Verify the number is set or check that the results have an sms success status
    if (results.sms && results.sms.success) {
      console.log('Results of setting external user id sms status:');
      console.log(results.sms.success);
    }
  })

}
const animationBuilder = (baseEl: any, opts?: any) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
    .fromTo('opacity', 0, 1)
    .duration(350);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')

    .duration(350);

  const animation = createAnimation()
    .addAnimation(enteringAnimation)
    .addAnimation(leavingAnimation);

  return animation;
};
setupIonicReact();
const setStatusBarStyleLight = async () => {
  await StatusBar.setBackgroundColor({ color:"#3880ff"})
  await StatusBar.setStyle({ style: Style.Light });
};
const App: React.FC = () => {
  let user = useSelector((state: any) => state.usuario)
  let userdispach = useDispatch()
  const [initialized, setInitialized] = useState(false);




  useEffect(() => {
    // StatusBar.setBackgroundColor({ color: '#0000' });
    // StatusBar.setStyle()
    // StatusBar.setStyle({ Style.dark: 'dark' });


    let datos = userlog()
    console.log(datos)
    setStatusBarStyleLight()
    if (datos != null) {

      //console.log(salida)
      userdispach(setlogin({ estado: true }))
      //userdispach(setDatosuser({ ...datos }))
      // createSingleTaskNotification()
      //console.log(datos)
      autenticar(datos.cedula).then(salida => {
        if (salida.estado == "exito") {
         // console.log(salida.datos)
         // userdispach(setlogin({ estado: true }))
          userdispach(setDatosuser({ ...salida.datos[0] }))
        }else{
          
        }

      }).catch(err => {

      })
      console.log(getPlatforms().length == 1, getPlatforms().some(e => e != "mobileweb"), getPlatforms())
      if (getPlatforms().some(e => e == "android") && getPlatforms().length == 1) {
        OneSignalInit(datos)

        //OneSignal.startInit('TU_APP_ID')


        /*  OneSignal.setNotificationOpenedHandler((openedResult) => {
            // Aquí puedes manejar la apertura de la notificación
            console.log('Notificación abierta:', openedResult);
          });/*/
      } else {

        // initializeOneSignal();
        /* ReactOnesigna.setNotificationOpenedHandler((notification:any) => {
           // Aquí puedes manejar la apertura de la notificación
           console.log('Notificación abierta:', notification);
         });*/
      }
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
          <IonReactRouter>
            <IonRouterOutlet animation={animationBuilder}>
              <Switch>

                <Route path="/home">
                  <TabsView />
                </Route>
                <Route path="/pagos">
                  <PAgosViewa />
                </Route>
                <Route path="/plan">
                  <PlanView />
                </Route>
                <Route path="/cambios">
                </Route>
                <Route path="/termino">
                </Route>
                <Route path="/mapas">
                  <MapsVies />
                </Route>
                <Route path="/" >
                  <Redirect to="/home/inicio" />
                </Route>

              </Switch>

            </IonRouterOutlet>
          </IonReactRouter>
          :

          <IonRouterOutlet>
            <Route path="/">
              <LoginView />
            </Route>
            <Route path="registro">
              <RegisterViews />
            </Route>
          </IonRouterOutlet>


        }
      </IonReactRouter>
    </IonApp >

  );
};
//(window as any).plugins.OneSignal.setAppId("1b5d9596-a75f-4a2d-b38f-4ae7231e48a3");
export default App;
