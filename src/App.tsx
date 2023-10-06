import { IonApp, IonItem, IonLabel, IonList, IonListHeader, IonRouterOutlet, IonSkeletonText, IonThumbnail, createAnimation, setupIonicReact, useIonToast } from '@ionic/react';
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
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';
import Pagoslist from './pagevdos/Pagos/Pagoslist';
import CargarComprobante from './pagevdos/Pagos/Pagarfactura';
import FacturaslisView from './pagevdos/Pagos/Faturalist';
import axios from 'axios';

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
const APPv1: React.FC = () => {
  return (<>
    <div>
      <IonListHeader>
        <IonSkeletonText animated={true} style={{ width: '80px' }}></IonSkeletonText>
      </IonListHeader>
      <IonItem>
        <IonThumbnail slot="start">
          <IonSkeletonText animated={true}></IonSkeletonText>
        </IonThumbnail>
        <IonLabel>

          <h3>
            <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
          </h3>
          <p>
            <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
          </p>
          <p>
            <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
          </p>
        </IonLabel>
      </IonItem>
      <div className="col-12 col-md-8 col-xl-2 mx-auto h-73 ">
        {/*<!--card info-->*/}
        <div className="container-fluid h-100 btn-group-vertical" >
          <div className="container-fluid mt-n5">
            <div id="menu-servicios">

              <div className="row mt-n3  " id="menu-servicios">
                <div className="col-12 pb-4 text-center estado" ><b className="me-1">Servicio: </b> </div>
                <div className="col-4 p-0 my-4 ">
                  <div className="container p-1">
                    <a className='m-2'>
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5 ">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5 block">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5 block">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5 ">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5 block d-none">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
                <div className="col-4 p-0 my-5">
                  <div className="container p-1">
                    <a  >
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true} style={{ width: '104px', height: "108px" }}></IonSkeletonText>
                      </IonThumbnail>

                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
const App: React.FC = () => {
  let user = useSelector((state: any) => state.usuario)
  let userdispach = useDispatch()
  const [present] = useIonToast();
  const [initialized, setInitialized] = useState(true);

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
  Network.addListener('networkStatusChange', status => {
    if (!initialized) {
      console.log("nuevos")
      
      window.location.href = "/"
    }
    setInitialized(status.connected)
    present({
      message: status.connected ? "Teléfono conectador a red" : "No hay conexión a Internet",
      duration: 1500,
    });
    console.log('Network status changed', status);
  });
  async function NuevosDatos() {
    const status = await Network.getStatus();
    const info = await Device.getInfo();
    const networkInfo:any = await Network.getStatus();
    const connectionType = networkInfo.connectionType;


    setInitialized(status.connected)
    console.log(info,'Network status:', status);
    //if (connectionType === 'wifi') {
    //const ipAddresses = await Network.getIpAddresses();

      // Si la conexión es Wi-Fi, puedes obtener la dirección IP
    //console.log(networkInfo.getIpAddresses());
    await getIpAddress()
   // }
  }
  const getIpAddress = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      if (response.data && response.data.ip) {
        console.log(response,response.data.ip);
      } else {
        console.log('No se pudo obtener la dirección IP');
      }
    } catch (error) {
      console.error(error);
      console.log('Error al obtener la dirección IP');
    }
  };
  useEffect(() => {
    // StatusBar.setBackgroundColor({ color: '#0000' });
    // StatusBar.setStyle()
    // StatusBar.setStyle({ Style.dark: 'dark' });
    NuevosDatos()


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
  return (
    <IonApp>
      {user.authb ?
        <IonReactRouter>
          <IonRouterOutlet animation={animationBuilder}
          >
            <Route path="/Deposito">
              <Pagoslist />
            </Route>
            <Route path="/Facturas">
              <FacturaslisView />
            </Route>
            <Route path="/Comprobante">
              <CargarComprobante />
            </Route>
            
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
              {!initialized ? <APPv1 /> : <TabsView />}
            </Route>
            <Route path="/test">
              <SpeddView />
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
