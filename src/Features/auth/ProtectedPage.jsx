import { useAtomValue } from "jotai";
import { isConnectedAtom } from "../../atoms/auth.atom";
import { Navigate } from "react-router-dom";

export function ProtectedPage({children}){
    const isConnect = useAtomValue(isConnectedAtom);

    if(!isConnect){
        return <Navigate to='/auth/login' replace/>

    }

    return children;
};