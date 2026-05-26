export const Footer = () =>{
    return(
        <footer className='bg-sky-200 py-4 px-8 flex justify-between items-center'>
        <p className="text-froly-800">&copy; CritterIsle - 2026 - Tous droits réservés</p>
        <div className="flex flex-col">
            <p className="text-froly-800 font-semibold flex justify-center items-center">contact :</p>
            <ul>
                <li>
                    <a className="text-sky-600 transition-duration-100 no-underline hover:text-main-700 flex justify-center items-center" href="mailto:m.baudot@interface3.be">m.baudot@interface3.be</a>
                </li>
                <li>
                    <a className="text-sky-600 transition-duration-100 no-underline hover:text-main-700 flex justify-center items-center" href="tel:+55555555">+555-555-5555</a>
                </li>
            </ul>
        </div>
        <div>
            <a className="text-sky-600 transition-duration-100 hover:text-main-700 underline" href="">Conditions générales</a>
        </div>
        </footer>
    )
}