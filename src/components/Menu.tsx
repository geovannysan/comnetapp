import {
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
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

    <div>
      <IonHeader className='h-100'>
        <div className='header'>
          <img className='img-fluid-sm' src='https://portal.comnet.ec/admin/images/login-bg/login-bg-9.jpg'

          >
          </img>
          <div className=' info-user'>


            <IonNote className=' text-lowercase'></IonNote>
            <IonListHeader className='text-white text-info '>{nombres.user.nombre}</IonListHeader>

          </div>

        </div>


        <div className='container pt-5 pb-5'>
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
    </div>


  );
};

export default Menu;
