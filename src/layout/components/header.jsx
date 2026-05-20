import { useAtomValue } from "jotai";
import { NavLink } from "react-router";
import { isConnectedAtom } from "../../atoms/auth.atom";
import { BtnLogout } from "../../Features/auth/Btnlogout";
import logo from "../../../public/images/island.svg"
import { useNavigate } from "react-router";
export const Header = () => {
    const isConnect = useAtomValue(isConnectedAtom);
    const navigate = useNavigate()
    return (
        <header className="flex justify-between items-center py-4 px-8 bg-teal-50">
            <div className="items-center gap-4 hidden lg:flex">
                <button onClick={()=> navigate('/')}><img src={logo} alt="logo de CritterIsle" className="h-12"/></button>
                <p className="text-secondary-50 text-2xl font-bold font-agbalumo">
                    Critter<span className="text-main-300">Isle</span>
                </p>
            </div>
            <nav className="flex flex-row justify-between gap-10 w-full lg:w-auto">
                <ul className="flex items-center gap-6 text-lg font-bold">
                <li>
                    <NavLink to='/' className="whitespace-nowrap">
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/game" className='whitespace-nowrap'>Jeux</NavLink>
                </li>
                <li>
                    <NavLink to="/encyclopedie" className='whitespace-nowrap'>Encyclopédie</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className='whitespace-nowrap'>A propos</NavLink>
                </li>
                </ul>
                <ul>
                    <li>
                        {isConnect ? (
                            <NavLink className="btn" to="auth/login"><span>Se connecter 🏝️</span></NavLink>
                        ):(
                            <BtnLogout/>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    )
}