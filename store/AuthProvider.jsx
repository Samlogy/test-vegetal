import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider ({children})  {
    const [ auth, setAuth ] = useState({isLogged: false, token: ""});
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}