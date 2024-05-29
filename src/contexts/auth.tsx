import React, { useEffect, useState, ReactNode } from "react";

interface AuthState {
  login: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (data: { username: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({ login: false });

  useEffect(() => {
    if (localStorage.getItem("login")) {
      const userLogin = window.localStorage.getItem("login")
      console.log(userLogin)
      setState({ login: true });
    } else {
      setState({ login: false });
    }
  },[]);

  const login = (data: { username: string; password: string }) => {
    if (data.username === "aa@bb.cc" && data.password === "12345678") {
      localStorage.setItem("login", "true");
      setState({ login: true });
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("login");
    setState({ login: false });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the AuthContext
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
