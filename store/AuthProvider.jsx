import { createContext } from "react";
import useLocalStorage from "use-local-storage";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage("auth", {
    isLogged: false,
    token: "",
    data: {}
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
