import { useSetAtom } from "jotai";
import { tokenAtom } from "../../atoms/auth.atom";

export function BtnLogout() {

    const setToken = useSetAtom(tokenAtom); 

    const handleLogout = () => {
        setToken(null); 
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
    }

    return(
        <button className='btn flex flex-row' onClick={handleLogout}>
            <span className='whitespace-nowrap hidden lg:block'>Se déconnecter</span>
        </button>
    )
}