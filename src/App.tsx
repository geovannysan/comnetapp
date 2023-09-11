import { IonApp, IonRouterOutlet, createAnimation, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import "./theme/style.css";
import "./theme/tablas.css";
import "./theme/rizes.css";
import { useEffect, useState } from 'react';
import { userlog } from './utils/User';
import { StatusBar, Style } from '@capacitor/status-bar';
import { setDatosuser, setlogin } from './StoreRedux/Slice/UserSlice';
import { autenticar } from './utils/Queryuser';
import OneSignal from 'onesignal-cordova-plugin';
import { initializeOneSignal } from './Onesignajs'
import { getPlatforms } from '@ionic/react';
import PlanView from './pagevdos/Plan';
import { MapsVies } from './pagevdos/Mapa';
import { routes } from './pagevdos/routersub';
let { LoginView, RegisterViews, PAgosViewa, TabsView } = routes

function OneSignalInit(user: any): void {
  OneSignal.setLogLevel(0, 0);
  OneSignal.setAppId("1b5d9596-a75f-4a2d-b38f-4ae7231e48a3");
  OneSignal.setNotificationOpenedHandler(function (jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    console.log("User accepted notifications: " + accepted);
  });
  const externalUserId = "ID_EXTERNO";

  OneSignal.setExternalUserId(user.id, (results: any) => {
    console.log('Results of setting external user id');
    console.log(results);
    if (results.push && results.push.success) {
      console.log('Results of setting external user id push status:');
      console.log(results.push.success);
    }
    if (results.email && results.email.success) {
      console.log('Results of setting external user id email status:');
      console.log(results.email.success);
    }
    if (results.sms && results.sms.success) {
      console.log('Results of setting external user id sms status:');
      console.log(results.sms.success);
    }
  })
}
const customEnterAnimation = (baseEl: any) => {
  const animation = createAnimation()
    .addElement(baseEl)
    .duration(500)
    .fromTo('opacity', '0', '1');
  return animation;
};

const customLeaveAnimation = (baseEl: any) => {
  const animation = createAnimation()
    .addElement(baseEl)
    .duration(500)
    .fromTo('opacity', '1', '0');
  return animation;
};
setupIonicReact();
const gradientBackground = 'linear-gradient(90deg, rgba(0, 129, 199, 1) 0%, rgba(26, 36, 91, 1) 100%)';

const setStatusBarStyleLight = async () => {
  await StatusBar.setBackgroundColor({ color: gradientBackground })
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
        } else {

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
      {user.authb ?
        <IonReactRouter>
          <IonRouterOutlet 
          >

              <Route path="/pagos" >
                <PAgosViewa />
              </Route>
              <Route path="/plan">
                <PlanView />
              </Route>
              <Route path="/mapas">
                <MapsVies />
              </Route>
              
              <Route path="/home">
                <TabsView />
              </Route>

          </IonRouterOutlet>
        </IonReactRouter>
        :
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/">
              <LoginView />
            </Route>
            <Route path="/registro">
              <LoginView />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>


      }
    </IonApp >

  );
};
//(window as any).plugins.OneSignal.setAppId("1b5d9596-a75f-4a2d-b38f-4ae7231e48a3");
export default App;
