import React, {createContext, useContext,useEffect,useState} from "react";

const ServerStatusContext = createContext();

export function ServerStatusProvider({ children }) {

    const [serverError, setServerError] = useState(false);

    useEffect(() => {

        const handleServerError = () => {
            setServerError(true);
        };

        const handleServerRecovered = () => {
            setServerError(false);
        };

        window.addEventListener(
            "backend-unavailable",
            handleServerError
        );

        window.addEventListener(
            "backend-recovered",
            handleServerRecovered
        );

        return () => {
            window.removeEventListener(
                "backend-unavailable",
                handleServerError
            );

            window.removeEventListener(
                "backend-recovered",
                handleServerRecovered
            );
        };

    }, []);

    return (
        <ServerStatusContext.Provider
            value={{ serverError, setServerError }}
        >
            {children}
        </ServerStatusContext.Provider>
    );
}

export function useServerStatus() {
    return useContext(ServerStatusContext);
}