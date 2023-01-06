import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, 
    IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { Route, Switch } from 'react-router';
import {
  settingsOutline,close
} from 'ionicons/icons';
import './Page.css';
import routes from './route.js'
import { useDispatch } from 'react-redux';
import { setlogin } from '../StoreRedux/Slice/UserSlice';
const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  let usedispatch = useDispatch();
  function salir() {
    usedispatch(setlogin({ estado: false }))
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
  return (
    <IonContent fullscreen>
      <IonHeader className="ion-no-border " >
        <IonToolbar className='ion-toolbar-transparent' >
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <i className="bi bi-person-circle"> </i> Bienvenido
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon ios={settingsOutline} md={settingsOutline} />
            </IonButton>
            <IonButton onClick={salir}>
              <IonIcon ios={close} md={close} />
            </IonButton>
          </IonButtons>
         
        </IonToolbar>
      </IonHeader>

      <div >

        <Switch>
          {getRoutes(routes)}
        </Switch>

      </div>
    </IonContent>
  );
};

export default Page;
