import { createContext,useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider= ({children})=>{
    const [loggedInUser,setLoggedInUser]=useState(null);

    const logIn = (userObj) => setLoggedInUser(userObj);
    const logOut =()=> setLoggedInUser(null);

    return (
        <AuthContext.Provider value = {{ loggedInUser,logIn,logOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);