import { lazy } from "react";
import Loadable from "../components/Loadable";
const PAgosViewa  =  Loadable( lazy(()=> import( "./Pagos/index")));
const PlanView = Loadable( lazy(()=>import ("./Plan")));
const LoginView = Loadable( lazy(()=>import( "./Inicio/login")));
const TabsView =Loadable( lazy(()=> import("../components/Tabs")));
const RegisterViews =Loadable( lazy(()=>import( "./Inicio/register")));
export const routes={ PAgosViewa,PlanView,LoginView,TabsView,RegisterViews}