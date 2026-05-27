import { useNavigate } from "react-router-dom";
import island from '../../../public/images/island.svg'
export const Home =()=>{
 
    const navigate = useNavigate();

    return(
    <>
    <section className=" flex flex-col gap-4 items-center justify-center text-main-700 h-screen bg-gradient-to-l from-[#38bdf8] via-[#fb7185] to-[#84cc16]">
        <img src={island} alt="île" />
<h1  className='text-4xl'>
Bienvenue sur <span className="text-coral-400 font-agbalumo">CritterIsle</span>
</h1>
<h2>
    Le site pour t'aider dans ton voyage insulaire!
</h2>

<button className="btn-home" onClick={()=> navigate('/auth/register')}>Déménager sur ton île</button>
    </section>
    </>
    )
}