import { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalProvider ({children})  {
    const [profile, setProfile] = useState({fetch:false, data: {}, error: null, isFetching: true})
    const [articles, setArticles] = useState({fetch:false, data: [], error: null, isFetching: true})
    
    return (
        <GlobalContext.Provider value={{ articles, setArticles, profile, setProfile }}>
            {children}
        </GlobalContext.Provider>
    )
}