import { RegisterForm } from '../RegisterForm'

export const Register = () => {
    return (
        <>
            <section className="py-6 px-12 flex items-center gap-6">
                <h1 className="text-3xl text-main-800 font-chewy">
                    Créer un compte
                </h1>
            </section>

            <section className="flex flex-col px-12 gap-4 pb-12">
                <RegisterForm />
            </section>
        </>
    )
}