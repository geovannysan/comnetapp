import { IonApp, IonRouterOutlet, createAnimation, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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
import PAgosViewa from './pagevdos/Pagos';
import SpeddView from './components/Spedd';
let { LoginView, TabsView, Tesvel } = routes

function OneSignalInit(user: any): void {
  OneSignal.setLogLevel(0, 0);
  OneSignal.setAppId("1b5d9596-a75f-4a2d-b38f-4ae7231e48a3");
  OneSignal.setNotificationOpenedHandler(function (jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    console.log("User accepted notifications: " + accepted);
  });

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

setupIonicReact();
const gradientBackground = 'linear-gradient(90deg, rgba(0, 129, 199, 1) 0%, rgba(26, 36, 91, 1) 100%)';

const setStatusBarStyleLight = async () => {
  await StatusBar.setBackgroundColor({ color: '#0081c7' })
  await StatusBar.show()
  await StatusBar.setStyle({ style: Style.Default });
};
const App: React.FC = () => {
  let user = useSelector((state: any) => state.usuario)
  let userdispach = useDispatch()
  const [initialized, setInitialized] = useState(false);

  var usehistory = useHistory()
  function entrar() {
    usehistory.push("/")
  }
  const animationBuilder = (baseEl: any, opts?: any) => {
    const enteringAnimation = createAnimation()
      .addElement(opts.enteringEl)
      .fromTo('transform', 'translateY(100px)', 'translateY(0px)')
      .fromTo('opacity', 0, 0.3)
      .duration(350);

    const leavingAnimation = createAnimation()
      .addElement(opts.leavingEl)
      .fromTo('transform', 'translateY(0px)', 'translateY(100px)')
      .fromTo('opacity', 0.3, 0)
      .duration(350);

    const animation = createAnimation()
      .addAnimation(enteringAnimation)
      .addAnimation(leavingAnimation);

    return animation;
  };
  //history.push("/home")
  useEffect(() => {
    // StatusBar.setBackgroundColor({ color: '#0000' });
    // StatusBar.setStyle()
    // StatusBar.setStyle({ Style.dark: 'dark' });


    let datos = userlog()
    console.log(datos)
    setStatusBarStyleLight()
    if (datos != null) {
      userdispach(setlogin({ estado: true }))
      autenticar(datos.cedula).then(salida => {
        if (salida.estado == "exito") {
          userdispach(setDatosuser({ ...salida.datos[0] }))
        } else {
        }

      }).catch(() => {

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
  console.log(user.authb)
  return (
    <IonApp>
      {user.authb ?
        <IonReactRouter>
          <IonRouterOutlet animation={animationBuilder}
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
            <Route path="/test">
              <SpeddView/>
            </Route>
            <Route exact path="/">
              <Redirect from='*' to="/home" />
            </Route>


          </IonRouterOutlet>
        </IonReactRouter>
        :

        <LoginView />



      }
    </IonApp >

  );
};
//(window as any).plugins.OneSignal.setAppId("1b5d9596-a75f-4a2d-b38f-4ae7231e48a3");
export default App;
