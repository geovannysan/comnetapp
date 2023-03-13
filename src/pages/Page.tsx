import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton,
  IonProgressBar,
  IonTitle, IonToolbar, IonItem, IonPopover, IonList, IonLabel, IonCardSubtitle, IonMenu, IonPage
} from '@ionic/react';

import { Route, Switch,useHistory,useLocation } from 'react-router';
import {
   close, wifiOutline, ellipsisVertical
} from 'ionicons/icons';
import './Page.css';
import routes from './route.js'
import { useDispatch, useSelector } from 'react-redux';
import { setDatosuser, setlogin, setProg } from '../StoreRedux/Slice/UserSlice';
import { useEffect } from 'react';
import Menu from '../components/Menu';

const Page: React.FC = () => {
  let history = useHistory()
  //const { name } = useParams<{ name: string; }>();
  let prog = useSelector((state:any)=>state)
  let location = useLocation()
  let usedispatch:any = useDispatch();
  function salir() {
    usedispatch(setlogin({ estado: false }))
    usedispatch(setDatosuser({}))
    sessionStorage.removeItem("USERLOGIN")
    history.push("/page/inicio")
  
  } 
  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      if (prop.layout === "/page") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  function cargar(){
    usedispatch(setProg({ progres: true }))
    setTimeout(function () {
      usedispatch(setProg({ progres: false }))
    }, 1000)
  }
  useEffect(()=>{     
    cargar()  

  },[location.pathname])
  return (
    <>
    
     

        <IonHeader className="ion-no-border  " >
          <IonToolbar className='ion-toolbar-transparent' >
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              <i className="bi bi-person-circle "> </i> Bienvenido
              <span className='d-none d-sm-block text-lowercase  '
              ></span>
            </IonTitle>
            <IonButtons slot='end'>
              <IonCardSubtitle className='d-none  d-sm-none d-md-block'
                style={{
                  size: 5
                }}
              >
                {prog.usuario.user.nombre}
              </IonCardSubtitle>
             
              <IonButton id="popover-button"

              >
                <IonIcon ios={ellipsisVertical} md={ellipsisVertical} />
              </IonButton>
              <IonButton onClick={salir}>
               
              </IonButton>
            </IonButtons>
            {prog.usuario.progres ? <IonProgressBar type="indeterminate" ></IonProgressBar> : ''}
          </IonToolbar>
        </IonHeader>
        <IonPopover trigger="popover-button" dismissOnSelect={true}>
          <IonList lines='none'>
            <IonItem button >
              <IonLabel>
                Actualizar
              </IonLabel>
              <IonIcon md={wifiOutline}></IonIcon>
            </IonItem>
           
            <IonItem button onClick={salir}>
              <IonLabel>
                Salir
              </IonLabel>
              <IonIcon ios={close} md={close} />
            </IonItem>
          </IonList>

        </IonPopover>

        <div className='' >

          <Switch>
            {getRoutes(routes)}
          </Switch>

        </div>
   
    </>
   
  );
};

export default Page;
