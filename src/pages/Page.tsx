import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton,
  IonProgressBar,
  IonTitle, IonToolbar, IonItem, IonPopover, IonList, IonLabel, IonCardSubtitle, IonMenu, IonFab, IonFabButton
} from '@ionic/react';

import { Route, Switch,useHistory,useLocation } from 'react-router';
import {
   close, wifiOutline, ellipsisVertical, arrowBackCircleOutline, arrowBack, arrowBackOutline, chevronBack, chevronBackCircleOutline
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
    localStorage.removeItem("USERLOGIN")
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
   {/*   <IonMenu type="overlay" contentId="main-content" className='col-12 col-lg-2 '>
        <Menu/>
      </IonMenu>*/}
      <IonFab className='d-none' vertical="bottom" horizontal="end">
        <IonFabButton size="small">
          <IonIcon icon={chevronBackCircleOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonContent fullscreen id="main-content">

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
             
              <IonButton id="dropdownMenuLink"  
                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              >
                <IonIcon ios={ellipsisVertical} md={ellipsisVertical} />
              </IonButton>

            </IonButtons>
            {prog.usuario.progres ? <IonProgressBar type="indeterminate" ></IonProgressBar> : ''}
          </IonToolbar>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
          <IonPopover trigger="popover-button" dismissOnSelect={true} className='col-6'>
            <IonContent className="ion-padding">
            <IonList lines='none' >
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
</IonContent>
          </IonPopover>
        </IonHeader>
        

        <div className='pt-1' >

          <Switch>
            {getRoutes(routes)}
          </Switch>

        </div>
       
      </IonContent>
      
    </>
   
  );
};

export default Page;
