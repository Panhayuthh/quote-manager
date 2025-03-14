import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    async function fetchUser(token) {
        try {
            const response = await axios.get('api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log('User:', response.data);
            setUser(response.data);
        } catch (error) {
            console.log('Error:', error.message);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            // console.log('Fetching user...');
            fetchUser(token);
        } else {
            setIsLoading(false);
        }
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <AppContext.Provider value={{ user, token, setToken, setUser, fetchUser }}>
            {children}
        </AppContext.Provider>
    );
}