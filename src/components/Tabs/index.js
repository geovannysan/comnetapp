import { IonFab, IonFabButton, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";

import HomeView from "../../pagevdos/Home";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { home, person, powerOutline, settings, wifi } from "ionicons/icons";
import SoporteView from "../../pagevdos/Soporte";
import WifiView from "../../pagevdos/Wifi";
import PerfilViews from "../../pagevdos/Perfil";

export default function TabsView() {

    return (
        <div>
            

            <IonTabs>

                <IonRouterOutlet>
                    <Switch>
                        <Route path="/home/inicio">
                            <HomeView />
                            
                        </Route>
                        <Route path="/home/soporte">
                            <SoporteView />
                        </Route>
                        <Route path="/home/wifi">
                            <WifiView />
                        </Route>
                        <Route path="/home/perfil">
                            <PerfilViews />
                        </Route>
                        <Route path="/home" >
                            <Redirect to="/home/inicio" />
                        </Route>
                    </Switch>

                </IonRouterOutlet>
                <IonTabBar slot='bottom' className="IonTabBar ta">
                    <IonTabButton tab='tab1' className="tab" href="/home/inicio" >
                        <IonIcon aria-hidden="true" icon={home} />
                    </IonTabButton>
                    <IonTabButton tab='tab2' className="tab" href="/home/soporte" >
                        <IonIcon aria-hidden="true" icon={settings} />
                    </IonTabButton>
                    <IonTabButton tab='tab3' className="tab" href="/home/wifi">
                        <IonIcon aria-hidden="true" icon={wifi} />
                    </IonTabButton>
                    <IonTabButton tab='tab4' className="tab" href="/home/perfil">
                        <IonIcon aria-hidden="true" icon={person} />
                    </IonTabButton>
                </IonTabBar>

            </IonTabs>
        </div>
    )
}