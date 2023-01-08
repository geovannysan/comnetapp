import {
  IonContent,
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
import {
  archiveOutline, archiveSharp, locateOutline, locateSharp,
  homeSharp,
  homeOutline,
  documentsOutline, documentSharp,
  hammerOutline, hammerSharp, locationOutline,
  location, receiptOutline, receiptSharp
} from 'ionicons/icons';
import './Menu.css';
import logo from "../imagen/logo.png"
import { useDispatch } from 'react-redux';
import { setlogin } from '../StoreRedux/Slice/UserSlice';
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
  }
];


const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();


  return (
    <IonMenu contentId="main" type="push" className='col-lg-2 '>
      <div className=''>
        <IonHeader className=' py-3 ion-no-border info-user bg-dark'>
          <img className='py-2  px-2' src={logo}
            style={{
              height: "70px",
              width: "auto"
            }}
          ></img>
          <IonListHeader className='text-white'>Usuario logeado</IonListHeader>
          <IonNote>hi@comnet.com</IonNote>
        </IonHeader>

        <div className='container pt-3'>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}


          <IonList id="labels-list">
            <IonListHeader>Utilidades</IonListHeader>


          </IonList>
        </div>
      </div>
    </IonMenu>
  );
};

export default Menu;
