import App from "./App";
import { ProtectedPage } from "./Features/auth/ProtectedPage";


import {Home } from "./layout/pages/Home";
import TasksHome from "./Features/game/tasks";
import { NotFound } from "./layout/pages/NotFound";
import { Encyclopedia } from "./Features/Encyclopedia/page/EncyclopediaHome";
import FishingGame from "./Features/game/fishingGame";
import { GameHome } from "./Features/game/GameHome";
import BtnInsectes from "./Features/Encyclopedia/component/Btninsectes";
import BtnPoissons from "./Features/Encyclopedia/component/BtnPoissons";
import BtnDSC from "./Features/Encyclopedia/component/BtnDSC";
import { Apropos } from "./Features/apropos/Apropos";
import MemoryGame from "./Features/game/MemoryGame";
import { CGU } from "./Features/CGU/CGU";
import {Register}  from "./Features/auth/pages/register";
import {Login} from "./Features/auth/pages/Login.jsx";



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
                path: 'game',
                element: <ProtectedPage><GameHome/></ProtectedPage>,
        children: [
            {
                path: 'tasks',
                element: <TasksHome /> 
            },
            
            {
                path: 'fishingGame', 
                element:<FishingGame />
            },
            {
                path: 'memoryGame', 
                element: <MemoryGame/>
            }
        ]
        },

            {
                path: 'encyclopedie',
                element: <Encyclopedia />,
                children : [
                    {
                        path : 'insectes',
                        element : <BtnInsectes />
                    }, 
                    {
                        path : 'poissons',
                        element : <BtnPoissons />
                    }, 
                    {
                        path : 'créatures', 
                        element : <BtnDSC/>
                    }
                ]
            },
            {
                path: 'about',
                element: <Apropos />
            },
            {
path: 'cgu', 
element: <CGU/>
            },
            {
                path: '*',
                element: <NotFound />
            }
        ],
    }
]