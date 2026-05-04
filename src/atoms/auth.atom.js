import {atom} from 'jotai'; 

export const tokenAtom = atom(null); 

export const isConnectAtom = atom((get)=>{
    const token = get(tokenAtom); 
    return token !== null});