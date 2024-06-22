import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const SignIn = () => {

    const schema = Yup.object().shape({
        username: Yup.string().required("Username is Required").matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username"),
        name: Yup.string().required("Name is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const submitthis = (data, e) => {
        e.preventDefault();
        const { username, name } = data;
        console.log(username, name)
    }


    return (
        <div className='sign-in'>
            {" "}
            <h1>WelCome To PulseTalk Audio Chats</h1>
            <form action="" onSubmit={submitthis}>
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
                <button type='submit'>SignIn</button>
            </form>
        </div>
    )
}

export default SignIn