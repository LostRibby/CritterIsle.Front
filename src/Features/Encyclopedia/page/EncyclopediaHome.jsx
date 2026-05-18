import BtnInsectes from "../component/Btninsectes"
import { Outlet, useNavigate } from "react-router"
export const Encyclopedia = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Encyclopédie de l'île</h1>

            <div className="btn-group gap-2">
                <button className="btn-fishing" onClick={() => navigate("/encyclopedie/insectes", { replace: true })} >
                    Insectes
                </button>
                <button className="btn-fishing" onClick={() => navigate("/encyclopedie/poissons", { replace: true })} >
                    Poissons
                </button>
                <button className="btn-fishing" onClick={() => navigate("/encyclopedie/créatures", { replace: true })} >
                    Créatures
                </button>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}