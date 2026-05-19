import BtnInsectes from "../component/Btninsectes"
import { Outlet, useNavigate, } from "react-router"
import { useState } from "react"
export const Encyclopedia = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("");
    return (
        <div className="flex items-center justify-center flex-col gap-4 p-4">
            <h1 className="text-xl font-bold text-froly-800 underline">Encyclopédie de l'île</h1>

            <div className="btn-group gap-2 ">
                <button className={`btn-fishing ${active === "insectes" ? "btn-inactive" : ""}`} onClick={() => {setActive("insectes");
                                                                                                               navigate("/encyclopedie/insectes", { replace: true })}} >
                    Insectes
                </button>
                <button className={`btn-fishing ${active === "poissons" ? "btn-inactive" : ""}`} onClick={() => {setActive("poissons");
                                                                                                               navigate("/encyclopedie/poissons", { replace: true })}} >
                    Poissons
                </button>
                <button className={`btn-fishing ${active === "créatures" ? "btn-inactive" : ""}`} onClick={() => {setActive("créatures");
                                                                                                                 navigate("/encyclopedie/créatures", { replace: true })}} >
                    Créatures marines
                </button>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}