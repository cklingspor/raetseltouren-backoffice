// pages
import Home from "./pages/Home";
import TestApi from "./pages/TestApi";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'test-route',
        title: 'TestApi',
        path: '/testapi',
        enabled: true,
        component: TestApi
    }
]