import { useId } from "react";
import authService from "../../Services/auth.services";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
    const id = useId();
    const navigate = useNavigate();

    const handleRegisterSubmit = async (formData) => {
        console.log('FormData', formData);

        const data = Object.fromEntries(formData.entries());
        console.log('Data', data);
        
        await authService.register(data);

        navigate('/');
    }

    return (
        <form action={handleRegisterSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 items-center ">
                <label htmlFor={id + 'firstname'} className="label-form">Prénom :</label>
                <input id={id + 'firstname'} type="text" className='input-form' name="firstname" />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <label htmlFor={id + 'lastname'} className="label-form">Nom :</label>
                <input id={id + 'lastname'} type="text" className='input-form' name="lastname" />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <label htmlFor={id + 'email'} className="label-form">Email :</label>
                <input id={id + 'email'} type="email" className="input-form" name="email" />
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <label htmlFor={id+'password'} className='label-form'>Mot de passe secret :</label>
                <input id={id+'password'} className="input-form" type="password" name="password"/>
            </div>
            <div className="flex justify-center items-center p-4">
                <button type='submit' className='btn'>Déménager sur l'île 🏝️</button>
            </div>

        </form>
    )
}