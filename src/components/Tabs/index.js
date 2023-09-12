import { IonFab, IonFabButton, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, createAnimation } from "@ionic/react";

//import HomeView ;

import { Redirect, Route, Switch, useHistory } from "react-router";
import { home, person, powerOutline, settings, wifi } from "ionicons/icons";
import SoporteView from "../../pagevdos/Soporte";
import WifiView from "../../pagevdos/Wifi";
import PerfilViews from "../../pagevdos/Perfil";
import { lazy } from "react";
import Loadable from "../Loadable";
const HomeView = Loadable( lazy(() => import('../../pagevdos/Home')))
export default function TabsView() {
    const animationBuilder = (baseEl, opts) => {
        const enteringAnimation = createAnimation()
            .addElement(opts.enteringEl)
            .fromTo('transform', 'translateY(100px)', 'translateY(0px)')
            .fromTo('opacity', 0, 1)
            .duration(350);

        const leavingAnimation = createAnimation()
            .addElement(opts.leavingEl)
            .fromTo('transform', 'translateY(0px)', 'translateY(100px)')

            .duration(350);

        const animation = createAnimation()
            .addAnimation(enteringAnimation)
            .addAnimation(leavingAnimation);

        return animation;
    };
    return (
        <div>
            

            <IonTabs>

                <IonRouterOutlet >
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
                            <Redirect from="/home" to="/home/inicio" />
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