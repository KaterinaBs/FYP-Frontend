import { useLocation,Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRouter({children}){
    const {loggedInUser} = useAuth();
    const location = useLocation();
    return loggedInUser
    ? children
    :<Navigate to ="/signIn" replace state={{path: location.pathname}}/>
}
