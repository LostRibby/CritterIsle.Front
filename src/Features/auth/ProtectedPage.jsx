import { useAtomValue } from "jotai";
import { isConnectedAtom } from "../../atoms/auth.atom";
import { Navigate } from "react-router-dom";

export function ProtectedPage({children}){
    const isConnected = useAtomValue(isConnectedAtom);

    if(!isConnected){
        return <Navigate to='/auth/login' replace/>

    }

    return children;
};