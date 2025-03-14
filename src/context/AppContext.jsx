import { createContext } from 'react';

export const AppContext = createContext({
    user: null,
    token: null,
    setToken: () => {},
    setUser: () => {},
    isLoading: false,
});