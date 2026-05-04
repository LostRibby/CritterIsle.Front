import { useSetAtom } from "jotai";
import { tokenAtom } from "../../atoms/auth.atom";

export function BtnLogout() {

    const setToken = useSetAtom(tokenAtom); 

    const handleLogout = () =>{
        setToken(null); 
    }

    return(
        <button className='btn flex flex-row' onClick={handleLogout}>
            <span >😴</span>
            <span className='whitespace-nowrap hidden lg:block'>Se déconnecter</span>
        </button>
    )
}