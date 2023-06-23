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
  location, receiptOutline, receiptSharp, settingsOutline, headsetSharp, arrowDown, arrowForward, chevronDown, chevronUp, cogOutline, speedometerOutline, peopleOutline
} from 'ionicons/icons';
import './Menu.css';
import logo from "../imagen/logo.png"
import { useSelector } from 'react-redux';
import { useState } from 'react';
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  collapse: boolean;
}

const appPages: any = [
  {
    title: 'Inicio',
    url: '/page/Inicio',
    iosIcon: homeSharp,
    mdIcon: homeOutline,
    collapse: false,
  },
  {
    title: 'Mis comprobantes',
    url: '/page/Comprobantes',
    iosIcon: documentsOutline,
    mdIcon: documentSharp,
    collapse: false,
  },
  {
    title: 'Soporte técnico',
    url: '/page/Soporte',
    iosIcon: hammerOutline,
    mdIcon: hammerSharp,
    collapse: false,
  },
  {
    title: 'Documentos',
    url: '/page/Documentos',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
    , collapse: false,
  }, {
    title: 'Informe de pago',
    url: '/page/Informe',
    iosIcon: receiptOutline,
    mdIcon: receiptSharp,
    collapse: false,
  },
  {
    title: 'Puntos de Pago',
    url: '/page/Puntos',
    iosIcon: locationOutline,
    mdIcon: location
    , collapse: false,
  },
  {
    title: 'Utilidades',
    iosIcon: cogOutline,
    mdIcon: cogOutline,
    name: "utilidades",
    collapse: true,
    view: [
      {
        title: 'Test de velocidad',
        url: '/page/Test',
        iosIcon: speedometerOutline,
        mdIcon: speedometerOutline
      },
      {
        title: 'Datos',
        url: '/page/perfil',
        iosIcon: peopleOutline,
        mdIcon: peopleOutline

      }

    ]
  }
];


//const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  let nombres = useSelector((state: any) => state.usuario)
  const [isVisible, setIsVisible] = useState("");

  return (
    <IonMenu contentId='main' type='overlay' className='col-12 col-lg-2 px-0'>

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
          <IonList>
        {appPages.map((appPage: any, index: number) => {

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
            return (
              <div key={index}>
                <IonItem button lines='none'
                  onClick={() => {
                    setIsVisible("utilidades");
                    if (isVisible === "utilidades") {
                      setIsVisible("");
                    }
                  }}
                >
                  <IonIcon slot='start' ios={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                  <IonIcon slot='end' md={isVisible === "utilidades" ? chevronUp : chevronDown}></IonIcon>

                </IonItem>
                <IonMenuToggle className={!(isVisible === "utilidades") ? "d-none" : ""} autoHide={!(isVisible === "utilidades")}>
                {appPage.view.map((cont:any,numero:number)=>{
                  return(
                   
                    <IonItem key={"sub"+numero} className={location.pathname === cont.url ? 'selected' : '' + " nav-item"} routerLink={cont.url} routerDirection="none" lines="none" detail={false}>
                        <IonIcon slot="start" ios={cont.iosIcon} md={cont.mdIcon} />
                        <IonLabel>{cont.title}</IonLabel>
                      </IonItem>
                   
                  )
                })}
                </IonMenuToggle>
              </div>
            )
          }




        })}
        </IonList>
       { /*<IonItem button lines='none'
          onClick={() => {
            setIsVisible(true);
            if (isVisible === true) {
              setIsVisible(false);
            }
          }}
        >
          <IonIcon slot='start' md={headsetSharp} />
          Utilidades
          <IonIcon slot='end' md={isVisible ? chevronUp : chevronDown}></IonIcon>

        </IonItem>
        <IonMenuToggle className={!isVisible ? "d-none" : ""} autoHide={!isVisible}>
          <IonList>

            <IonItem lines='none' >
              <IonIcon slot="start" icon={homeOutline} />
              <IonLabel>Inicio</IonLabel>
            </IonItem>



            <IonItem button lines='none'>
              <IonIcon slot="start" icon={settingsOutline} />
              <IonLabel>Ajustes</IonLabel>
            </IonItem>

          </IonList>
        </IonMenuToggle>*/}
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
