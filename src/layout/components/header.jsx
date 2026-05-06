import { useAtomValue } from "jotai";
import { NavLink } from "react-router";
import { isConnectedAtom } from "../../atoms/auth.atom";
import { BtnLogout } from "../../Features/auth/Btnlogout";

export const Header = () => {
    const isConnect = useAtomValue(isConnectedAtom);

    return (
        <header className="flex justify-between items-center py-4 px-8 bg-secondary-200">
            <div className="items-center gap-4 hidden lg:flex">
                <p className="text-secondary-50 text-2xl uppercase font-bold font-chewy tracking-widest">
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
                    <NavLink to='tasks' className="whitespace-nowrap">
                        Tâches
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/game" className='whitespace-nowrap'>Jeu</NavLink>
                </li>
                <li>
                    <NavLink to="/faq" className='whitespace-nowrap'>Faq</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className='whitespace-nowrap'>A propos</NavLink>
                </li>
                </ul>
                <ul>
                    <li>
                        {isConnect ? (
                            <div className="btn-grp">
                            <NavLink><span>Créér une maison</span></NavLink>
                            <NavLink className="btn flex flex-row gap-0.5" to="auth/login"><span>Sortir de sa maison</span> </NavLink>
                            </div>
                        ):(
                            <BtnLogout/>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    )
}