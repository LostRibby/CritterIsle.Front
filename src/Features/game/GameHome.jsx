import { Link } from "react-router";
import FishingGame from "./fishingGame";
import TasksHome from "./tasks";

export const GameHome = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center">Bienvenue sur la page de jeu !</h1>
            <p className="text-center text-gray-600">Choisissez votre jeu pour commencer !</p>
            <div className="flex flex-col gap-2 items-center">

                <Link to="/game/fishingGame" ><button className="btn-fishing"><FishingGame /></button></Link>

                <Link to="/game/tasks"><button className="btn-tasks"><TasksHome /></button></Link>
            </div>
        </div>
    )
};