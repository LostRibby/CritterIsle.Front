import { useNavigate } from "react-router"

export const Home =()=>{
    const navigate = UseNavigate(); 
    return(
    <>
    <section className="py-12 px-44 flex flex-col gap-4 items-start text-main-800">
<h1  className='text-4xl'>
Bienvenue sur <span className="text-coral-400">CritterIsle</span>
</h1>
<h2>
    Le site pour t'aider sur ton voyage insulaire!
</h2>

<button className="btn" onClick={()=> navigate('/auth/login')}>Déménager sur ton île</button>
    </section>
    </>
    )
}