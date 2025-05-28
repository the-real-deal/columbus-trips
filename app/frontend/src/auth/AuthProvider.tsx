import { useState, useEffect, type PropsWithChildren } from "react"
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser)
        }
    }, [user]);

    const login = (isAdmin: boolean, username: string) => {
        localStorage.setItem("user", username);
        setUser(username);
        return true
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>
        { children }
    </AuthContext.Provider>
}