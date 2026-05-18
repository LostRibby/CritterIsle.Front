import { LoginForm } from "../LoginForm";

export const Login = () =>{
    return(
        <div className="bg-froly-50 min-h-screen flex flex-col">
        <section className="py-6 px-12 flex items-center gap-6 flex-col ">
            <h1 className="flex text-3xl text-main-800 justify-center items-center">
                Se connecter
            </h1>
        </section>
        <section className="flex flex-col px-12 gap-4 pb-12">
            <LoginForm/>
        </section>
        </div>
    )
}