import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PEOPLES_IMAGES from './avatars';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const cookies = new Cookies();
    const { setClient, setUser } = useUser();
    const navigate = useNavigate();

    const server_route = import.meta.env.VITE_APP_SERVER;

    const schema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required")
            .matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username"),
        name: Yup.string().required("Name is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const submitThis = async (data) => {
        const { username, name } = data;
        try {
            const response = await axios.post(`${server_route}/auth/createUser`, {
                username,
                name,
                image: PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)],
            });

            if (!response.data) {
                alert('Failed to fetch token');
                return;
            }

            const responseData = response.data;
            console.log(responseData);

            const user = {
                id: username,
                name,
            };

            // Imp part
            const myClient = new StreamVideoClient({
                apiKey: import.meta.env.VITE_STREAM_API_KEY,
                user,
                token: responseData.token,
            })

            setClient(myClient);
            setUser({ username, name });




            const expires = new Date();
            expires.setDate(expires.getDate() + 1);
            cookies.set("token", responseData.token, { expires });
            cookies.set("username", responseData.username, { expires });
            cookies.set("name", responseData.name, { expires });
            navigate("/");
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    };

    return (
        <div className='sign-in'>
            <h1>Welcome To PulseTalk Audio Chats</h1>
            <form onSubmit={handleSubmit(submitThis)}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" {...register("username")} name='username' />
                    {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" {...register("name")} name='name' />
                    {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                </div>
                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
