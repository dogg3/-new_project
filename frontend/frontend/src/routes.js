import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, NotAutherized,Plain } from "./layouts";


// Route Views
import Errors from "./views/Errors";
import Start from "./views/Start"
import Login from "./views/Auth/Login"
import PivotTable from "./views/PivotTable"
import PlayerList from "./views/PlayerList"
import PlayerProfile from "./views/PlayerProfile"
import Settings from "./views/Settings"
import ComparePlayers from "./views/ComparePlayers"
import Admin from "./views/Admin"
import Main from './views/Main'
import Signup from "./views/Auth/Signup";
import ForgotPassword from "./views/Auth/ForgotPassword";


export default [
    {
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: () => <Redirect to="/Main" />
    },
    {
        path: "/main",
        layout: Plain,
        component: Main
    },
    {
        path: "/reset-password",
        layout: NotAutherized,
        component: ForgotPassword
    },
    {
        path: "/start",
        layout: DefaultLayout,
        component: Start
    },
    {
        path: "/login",
        layout: NotAutherized,
        component: Login
    },
    {
        path:"/signup",
        layout: NotAutherized,
        component:Signup
    },
    {
        path: "/admin",
        layout: DefaultLayout,
        component: Admin
    },
    {
        path: "/pivot-table",
        layout: DefaultLayout,
        component: PivotTable
    },
    {
        path: "/player-list",
        layout: DefaultLayout,
        component: PlayerList
    },
    {
        path: "/player-profile",
        layout: DefaultLayout,
        component: PlayerProfile
    },
    {
        path: "/settings",
        layout: DefaultLayout,
        component: Settings
    },
    {
        path: "/compare-players",
        layout: DefaultLayout,
        component: ComparePlayers
    },

    {
        path: "/errors",
        layout: DefaultLayout,
        component: Errors
    },

];
