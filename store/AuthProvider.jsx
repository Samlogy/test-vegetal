import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLogged: false,
    token:
      "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      setAuth(data);
      return;
    }
    localStorage.setItem("auth", JSON.stringify(auth));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
