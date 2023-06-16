import {
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonContent,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {
  archiveOutline, archiveSharp,
  homeSharp,
  homeOutline,
} from 'ionicons/icons';
import logo from "../imagen/logo.png"
import im from "../imagen/icono.jpg"
import { useSelector } from 'react-redux';
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/page/Inicio',
    iosIcon: homeSharp,
    mdIcon: homeOutline
  },
  {
    title: 'Documentos',
    url: '/page/Documentos',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  }
/*  {
    title: 'Mis comprobantes',
    url: '/page/Comprobantes',
    iosIcon: documentsOutline,
    mdIcon: documentSharp
  },
  {
    title: 'Soporte técnico',
    url: '/page/Soporte',
    iosIcon: hammerOutline,
    mdIcon: hammerSharp
  },
  {
    title: 'Documentos',
    url: '/page/Documentos',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  }, {
    title: 'Informe de pago',
    url: '/page/Informe',
    iosIcon: receiptOutline,
    mdIcon: receiptSharp
  },
  {
    title: 'Puntos de Pago',
    url: '/page/Puntos',
    iosIcon: locationOutline,
    mdIcon: location
  }*/
];


//const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  let nombres = useSelector((state: any) => state.usuario)


  return (

    <IonMenu contentId="main" type="push" className='col-12 col-lg-2 '>
    <IonContent  >
      <IonHeader className=''>
        <div className='header px-0 pb-3'>
          <img 
          width={"100%"}

           src={im}

          >
          </img>
          

        </div>
          <div className='  text-dark p-2'>


            <IonNote className=' text-lowercase'></IonNote>
            <IonListHeader className='text-dark text-info '>{nombres.user.nombre}</IonListHeader>

          </div>

        <div className=' h-100 pb-5'>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : '' + " nav-item"} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </div>
        <div>

        </div>
      
     
              
               </IonHeader>
      </IonContent>
    </IonMenu>


  );
};

export default Menu;
