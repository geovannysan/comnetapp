import { IonFab, IonFabButton, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, createAnimation } from "@ionic/react";

//import HomeView ;

import { Redirect, Route, Switch, useHistory } from "react-router";
import { home, person, powerOutline, settings, wifi } from "ionicons/icons";
import SoporteView from "../../pagevdos/Soporte";
import WifiView from "../../pagevdos/Wifi";
import PerfilViews from "../../pagevdos/Perfil";
import { lazy } from "react";
import Loadable from "../Loadable";
import { useSelector } from "react-redux";
import PAgosViewa from "../../pagevdos/Pagos";
import PlanView from "../../pagevdos/Plan";
import FacturaslisView from "../../pagevdos/Pagos/Faturalist";
import Paginas from "../../pagevdos/Mapa/pagos";
import { MapsVies } from "../../pagevdos/Mapa";
import RegisterViews from "../../pagevdos/Inicio/register";
const HomeView = Loadable(lazy(() => import('../../pagevdos/Home')))
export default function TabsView() {

    const datos = useSelector((state) => state.usuario.user)

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
                        <Route path="/home/pagos" >
                            <PAgosViewa />
                        </Route>
                        <Route path="/home/plan">
                            <PlanView />
                        </Route>
                        <Route path="/home/Facturas">
                            <FacturaslisView />
                        </Route>
                        <Route path="/home/puntos">
                            <Paginas/>
                        </Route>
                        <Route path="/home/mapas">
                            <MapsVies/>
                        </Route>
                        <Route path="/home/registro">
                            <RegisterViews/>
                        </Route>
                        <Route path="/home" >
                            <Redirect from="/home" to="/home/inicio" />
                        </Route>
                    </Switch>

                </IonRouterOutlet>
                <IonTabBar slot='bottom' className={datos.estado == "SUSPENDIDO" ? "IonTabBar ta suspendido" : "IonTabBar ta"}>
                    <IonTabButton tab='tab1' className="tab " href="/home/inicio" >
                        <IonIcon aria-hidden="true" icon={home} />
                    </IonTabButton>
                    <IonTabButton tab='tab2' className="tab block" href="/home/soporte" >
                        <IonIcon aria-hidden="true" icon={settings} />
                    </IonTabButton>
                    <IonTabButton tab='tab3' className="tab block" href="/home/wifi">
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