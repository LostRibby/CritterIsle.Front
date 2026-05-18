import { useNavigate } from "react-router-dom";
export const Home =()=>{
 
    const navigate = useNavigate();

    return(
    <>
    <section className=" flex flex-col gap-4 items-center justify-center text-main-700 items-center bg-orange-100 h-screen">
<h1  className='text-4xl'>
Bienvenue sur <span className="text-coral-400 font-agbalumo">CritterIsle</span>
</h1>
<h2>
    Le site pour t'aider dans ton voyage insulaire!
</h2>

<button className="btn" onClick={()=> navigate('/auth/login')}>Déménager sur ton île</button>
    </section>
    </>
    )
}