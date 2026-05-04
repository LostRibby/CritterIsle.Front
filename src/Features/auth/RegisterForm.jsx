import { useId } from "react";
import authService from "../../Services/auth.services";
import { useNavigate } from "react-router";

export function RegisterForm() {
    const id = useid();
    const navigate = useNavigate();

    const handleRegisterSubmit = async (formdata) => {
        console.log('FormData', formdata);

        const data = Object.fromEntries(formdata.entries());
        console.log('Data', data);

        await authService.register(data);

        navigate('/');
    }

    return (
        <form action={handleRegisterSubmit} className="flex flex-col gap-2">
            <div classname="flex flex-row gap-2 items-center">
                <label htmlFor={id + 'firstname'} className="label-form">Prénom :</label>
                <input id={id + 'firstname'} type="text" className='input-form' name="firstname" />
            </div>
            <div classname="flex flex-row gap-2 items-center">
                <label htmlFor={id + 'lastname'} className="label-form">Nom :</label>
                <input id={id + 'lastname'} type="text" className='input-form' name="firstname" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <label htmlFor={id + 'email'} className="label-form">Email :</label>
                <input id={id + 'email'} type="email" className="input-form" name="email" />
            </div>
            <div className='flex flex-rox gap-2 items-center'>
                <label htmlFor={id+'password'} className='label-form'>Mot de passe secret :</label>
                <input id={id+'password'} className="input-form" type="password"/>
            </div>
            <div>
                <button type='submit' className='btn'>Déménager sur l'île 🏝️</button>
            </div>

        </form>
    )
}