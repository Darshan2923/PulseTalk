import { StreamVideoClient } from "@stream-io/video-react-sdk";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState();

    return (
        <UserContext.Provider value={{ user, setUser, client, setClient }}>
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
