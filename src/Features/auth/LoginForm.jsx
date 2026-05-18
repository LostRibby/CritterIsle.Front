import { useId } from "react";
import authService from "../../Services/auth.services";
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from "jotai";
import { tokenAtom } from "../../atoms/auth.atom";

export function LoginForm() {

    const id = useId();
    const navigate = useNavigate();
    const setToken = useSetAtom(tokenAtom);

    const handleLoginSubmit = async (formData) => {
        const data = Object.fromEntries(formData.entries());
        const token = await authService.login(data);

        localStorage.setItem('token', token);
      
        setToken(token);
        
        navigate('/game');
    };

    return (
        <form action={handleLoginSubmit} className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg">
            <div className="flex flex-col gap-2 items-center ">
                <label htmlFor={id + 'email'} className="label-form">Email :</label>
                <input id={id + 'email'} type="email" className="input-form" name='email' />
            </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <label htmlFor={id + 'password'} className='label-form'>Mot de passe :</label>
                <input id={id + 'password'} type='password' className='input-form' name='password' />
            </div>
            <div className="flex justify-center p-4">
                <button type='submit' className="btn">Se connecter 🏝️</button>
            </div>
        </form>
    )
}