import {
  IonAccordion,
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
  IonPage,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {
  archiveOutline, archiveSharp,
  homeSharp,
  homeOutline,
  documentsOutline, documentSharp,
  hammerOutline, hammerSharp, locationOutline,
  location, receiptOutline, receiptSharp, settingsOutline
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


//const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  let nombres = useSelector((state: any) => state.usuario)


  return (
    <IonMenu contentId='main' type='push' className='col-12 col-lg-2 px-0'>

      <IonHeader className=''>
        <div className=' px-0'>
          <img src='https://portal.comnet.ec/admin/images/login-bg/login-bg-9.jpg'

          >
          </img>
          <div className='' style={{
            marginTop: "-100px"
          }} >


            <IonNote className=' text-lowercase'></IonNote>
            <IonListHeader className='text-white text-info '>{nombres.user.nombre}</IonListHeader>
          </div>
        </div>
        <div>
        </div>

      </IonHeader>
      <div className='h-100 px-0 pt-3'>

        {appPages.map((appPage: any, index) => {

          if (!appPage.collapse) {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : '' + " nav-item"} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>)
          }
           if (appPage.collapse) {
            return(
              <IonList>
                <IonMenuToggle autoHide={false}>
                  <IonItem button>
                    <IonIcon slot="start" icon={homeOutline} />
                    <IonLabel>Inicio</IonLabel>
                  </IonItem>
                </IonMenuToggle>

                <IonMenuToggle autoHide={false}>
                  <IonItem button>
                    <IonIcon slot="start" icon={settingsOutline} />
                    <IonLabel>Ajustes</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>)

          }


        })}
        <IonList>
          <IonMenuToggle>

          </IonMenuToggle>
        </IonList>
        {/*<li className="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item"><a className="menu__link menu__link--sublist" href="#">Radio</a>
        <ul className="menu__list">
          <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a className="menu__link"  href="/docs/api/radio">ion-radio</a></li>
          <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item"><a className="menu__link" 
      href="/docs/api/radio-group">ion-radio-group</a></li></ul></li>*/}
      </div>


    </IonMenu>

  );
};

export default Menu;
