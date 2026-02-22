import { createContext, useContext, useState } from "react";
import { login, logout } from "./auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    var value = {
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        email,
        setEmail,
        password,
        setPassword,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

