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
  documentsOutline, documentSharp,
  hammerOutline, hammerSharp, locationOutline,
  location, receiptOutline, receiptSharp
} from 'ionicons/icons';
import './Menu.css';
import logo from "../imagen/logo.png"
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

    <IonMenu contentId="main" type="push" className='col-lg-2 '>
      
      <IonHeader className=''>
        <div className='header px-0 pb-3'>
          <img className='img-fluid' src='https://portal.comnet.ec/admin/images/login-bg/login-bg-9.jpg'

          >
          </img>
          <div className=' info-user'>


            <IonNote className=' text-lowercase'></IonNote>
            <IonListHeader className='text-white text-info '>{nombres.user.nombre}</IonListHeader>

          </div>

        </div>


        <div className='container h-100 pt-5 pb-5'>
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
     
    </IonMenu>


  );
};

export default Menu;
