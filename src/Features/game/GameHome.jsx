import { Link, Outlet } from "react-router";
import FishingGame from "./fishingGame";
import TasksHome from "./tasks";
import { useNavigate } from "react-router";
export const GameHome = () => {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-4 bg-orange-50 p-4" >
            <h1 className="text-2xl font-bold text-center">Bienvenue sur la page de jeu !</h1>
            <p className="text-center text-gray-600">Choisissez votre jeu pour commencer !</p>

            <div className="flex flex-row gap-2 items-center justify-center">

                <button className="btn-fishing" onClick={() => navigate("/game/fishingGame", { replace: true })} >
                    Pêche
                </button>

                <button className="btn-tasks" onClick={() => navigate("/game/tasks", { replace: true })}>
                    Tâches
                </button>
            </div>
            <Outlet />
        </div>
    )
};