import { StreamVideoClient } from "@stream-io/video-react-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

const UserContext = createContext(undefined);

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState();
    const [call, setCall] = useState();
    const [isLoadingClient, setLoadingClient] = useState(true);

    const cookies = new Cookies();
    useEffect(() => {
        const token = cookies.get("token");
        const username = cookies.get("username");
        const name = cookies.get("name");

        if (!token || !username || !name) {
            setLoadingClient(false);
            return;
        }
        const user = {
            id: username,
            name,
        };

        const myClient = new StreamVideoClient({
            apiKey: import.meta.env.VITE_STREAM_API_KEY,
            user,
            token,
        });

        setClient(myClient);
        setUser({ username, name });
        setLoadingClient(false);

        return () => {
            myClient.disconnectUser();
            setClient(undefined);
            setUser(null);
        }

    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, client, setClient, call, setCall }}>
            {props.children}
        </UserContext.Provider>
    );
}

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be within a UserProvider");
    return context;
}

export { UserProvider, useUser };
