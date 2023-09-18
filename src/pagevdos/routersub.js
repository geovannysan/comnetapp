import { lazy } from "react";
import Loadable from "../components/Loadable";
const LoginView = Loadable( lazy(()=>import( "./Inicio/login")));
const TabsView =Loadable( lazy(()=> import("../components/Tabs")));
const RegisterViews =Loadable( lazy(()=>import( "./Inicio/register")));
const Tesvel = Loadable(lazy(() => ("../components/Spedd/index.js")))
export const routes={ LoginView,TabsView,RegisterViews,Tesvel}