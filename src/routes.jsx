import App from "./App";
import { ProtectedPage } from "./Features/auth/ProtectedPage";
import { Login } from "./Features/auth/pages/Login";
import { Register } from "./Features/auth/pages/Register";
import {Home } from "./layout/pages/Home";
import TasksHome from "./Features/tasks/tasks";
import { NotFound } from "./layout/pages/NotFound";
import { Encyclopedia } from "./Features/Encyclopedia/page/EncyclopediaHome";


/**
 * @type {import("react-router").RouteObject}
 */
export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: < Home/>
            },
             {
                path: 'auth',
                children: [
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    },
                ]
            },
            {
                path: 'tasks',
                element: <ProtectedPage><TasksHome /></ProtectedPage>
            },
             {
                path: 'encyclopedie',
                element: <ProtectedPage><Encyclopedia /></ProtectedPage>,
            },
           
            {
                path: '*',
                element: <NotFound />
            }
        ],
    }
]