import App from "./App";
import { ProtectedPage } from "./Features/auth/ProtectedPage";
import { Login } from "./Features/auth/pages/login";
import { Register } from "./Features/auth/pages/register";
import {Home } from "./layout/pages/Home";
import TasksHome from "./Features/tasks/tasks";
import { NotFound } from "./layout/pages/NotFound";


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
                path: 'tasks',
                element: <ProtectedPage><TasksHome /></ProtectedPage>
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
                path: '*',
                element: <NotFound />
            }
        ],
    }
]