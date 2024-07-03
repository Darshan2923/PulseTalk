import { StreamVideo } from '@stream-io/video-react-sdk';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from './UserContext';
import CryptoJS from 'crypto-js';

const Main = () => {
    const { client, user, setCall, isLoadingClient } = useUser();
    const [newRoom, setNewRoom] = useState({ name: "", description: "" });
    const [availableCalls, setAvailbleCalls] = useState([]);
    const navigate = useNavigate();

    const joinRoom = async (roomId) => {
        const call = client?.call("audio_room", roomId);
        await call?.join();
        setCall(call);
        navigate("/room/" + roomId);
    };
    useEffect(() => {
        console.log("Client:", client);
        console.log("User:", user);
        console.log("isLoadingClient:", isLoadingClient);
    }, [client, user, isLoadingClient]);

    useEffect(() => {
        if (client) fetchListOfCalls();
    }, [client])


    const hashRoomName = (roomName) => {
        const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
        return hash.replace(/[^a-zA-Z0-9_-]/g, "");
    };

    if (isLoadingClient) return <h1>Loading...</h1>;
    if (!user || !client) return <Navigate to="/sign-in" />;

    const createRoom = async () => {
        const { name, description } = newRoom;
        if (!client || !user || !name || !description) return;

        const call = client.call("audio_room", hashRoomName(name));
        await call.join({
            create: true,
            data: {
                members: [{ user_id: user.username }],
                custom: {
                    title: name,
                    description,
                }
            }
        });
        setCall(call);
        navigate("/room");
    };

    const fetchListOfCalls = async () => {
        const callsQueryResponse = await client?.queryCalls({
            filter_conditions: { ongoing: true },
            limit: 25,
            watch: true,
        });

        if (!callsQueryResponse) {
            console.log("Error fetching calls");
        } else {
            const getCallInfo = async (call) => {
                const callInfo = await call.get();
                const customData = callInfo.call.custom || {};
                const { title, description } = customData;
                const participantsLength = callInfo.members.length ?? 0;
                const createdBy = callInfo.call.created_by.name ?? "";
                const id = callInfo.call.id ?? "";
                return {
                    id,
                    title: title ?? "",
                    description: description ?? "",
                    participantsLength,
                    createdBy,
                };
            };
            const roomPromises = callsQueryResponse.calls.map((call) => getCallInfo(call));
            const rooms = await Promise.all(roomPromises);
            setRooms(rooms);
        }
    };

    return (
        <StreamVideo client={client}>
            <div className='home'>Welcome, {user?.name}
                <div className="form">
                    <h2>Create Your Own Room</h2>
                    <input type="text" placeholder='Room name...' onChange={(e) => setNewRoom((prev) => ({ ...prev, name: e.target.value }))} />
                    <input type="text" placeholder='Room Description...' onChange={(e) => setNewRoom((prev) => ({ ...prev, description: e.target.value }))} />
                    <button onClick={createRoom} style={{ backgroundColor: "rgb(125,7,236)" }}>Create Room</button>
                    <h2>Available Rooms</h2>
                </div>
                <div className="grid">
                    {rooms.map((room) => (
                        <div
                            className="card"
                            key={room.id}
                            onClick={() => joinRoom(room.id)}
                        >
                            <h4>{room.title}</h4>
                            <p>{room.description}</p>
                            <p> {room.participantsLength} Participants</p>
                            <p> Created By: {room.createdBy}</p>
                            <div className="shine"></div>
                        </div>
                    ))}
                </div>
            </div>
        </StreamVideo>
    );
};

export default Main;
