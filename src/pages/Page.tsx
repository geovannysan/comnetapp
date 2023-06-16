import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton,
  IonProgressBar,
  IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonCardSubtitle, IonMenu, IonFab, IonFabButton, useIonPopover, IonPopover
} from '@ionic/react';
import iconmenu from "../theme/menu.svg";
import { Route, Switch,useHistory,useLocation } from 'react-router';
import {
   close, wifiOutline, ellipsisVertical, arrowBackCircleOutline, arrowBack, arrowBackOutline, chevronBack, chevronBackCircleOutline, exitOutline
} from 'ionicons/icons';
import './Page.css';
import routes from './route.js'
import { useDispatch, useSelector } from 'react-redux';
import { setDatosuser, setlogin, setProg } from '../StoreRedux/Slice/UserSlice';
import { useEffect } from 'react';
import Menu from '../components/Menu';
const PoopoverList: React.FC<{  salir: () => void }> = ({  salir }) => {
  return (
    <div>
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
      <div className=' ion-no-border ion-no-padding'>
        <IonButton expand='full' size='large' fill='clear' >Cerrar</IonButton>
      </div>
    </div>
  )
}
const Page: React.FC = () => {
  let history = useHistory()
  //const { name } = useParams<{ name: string; }>();
  let prog = useSelector((state:any)=>state)
  let location = useLocation()
  let usedispatch:any = useDispatch();
{/*const [present, dismiss] = useIonPopover(PoopoverList, { onHide: () => dismiss(),salir:()=>salir() });*/}
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
      <IonContent fullscreen id="main-content" className='px-0'>

        <IonHeader className="ion-no-border  " >
          <IonToolbar className=' ' >
            
            <IonButtons slot="start">
              <IonMenuButton>
                <img src={iconmenu} 
              />
              </IonMenuButton>
              
              
            </IonButtons>
            <IonTitle className='d-none'>
              <i className="bi bi-person-circle "> </i> 
              <span className=' text-lowercase'
              >{prog.usuario.user.nombre}</span>
            </IonTitle>
            <IonButtons slot='end'
              
            >
              <IonCardSubtitle className='d-none  d-sm-none d-md-block'
                style={{
                  size: 5
                }}
              >
                
              </IonCardSubtitle>
             
              <IonButton 
                id="popover-button"
                
              >
                <IonIcon ios={ellipsisVertical} md={ellipsisVertical} />
              </IonButton>
           
            </IonButtons>
            {prog.usuario.progres ? <IonProgressBar type="indeterminate" ></IonProgressBar> : ''}
          </IonToolbar>
          
         
        </IonHeader>
      
        <IonPopover trigger="popover-button" side='bottom' dismissOnSelect={true}>
          <div>


            <IonList lines='none'>
              <IonItem button  className='d-none'>
                <IonLabel>
                  Actualizar
                </IonLabel>
                <IonIcon md={wifiOutline}></IonIcon>
              </IonItem>

              <IonItem  >
                <IonLabel>
                  Salir
                </IonLabel>
                <IonButton onClick={salir}>
                  <IonIcon ios={exitOutline} md={exitOutline} />
                </IonButton>
               
              </IonItem>
            </IonList>
          </div>

        </IonPopover>
        <div className='pt-1 px-0' >

          <Switch>
            {getRoutes(routes)}
          </Switch>

        </div>
       
      </IonContent>
      
    </>
   
  );
};

export default Page;
