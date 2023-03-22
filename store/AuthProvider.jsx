import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLogged: false,
    token: "",
    data: {}
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      setAuth(JSON.parse(data));
      return;
    }
  }, []);

  useEffect(() => {
   localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth.isLogged]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
