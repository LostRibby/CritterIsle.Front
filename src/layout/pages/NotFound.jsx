export const NotFound = () =>{

    return( 
        <section className="flex flex-col items-center justify-center gap-6 py-4 grow">
            <h1 className="text-9xl text-main-500 drop-shadow-sm font-extrabold font-chewy">
                404
            </h1>
            <h2 className="text-lg text-main-800">La page que vous cherchez n'existe pas</h2>

            <img className="h-56" src="/images/error-page-svgrepo-com.svg" alt="Erreur 404" />
        </section>
    )
}