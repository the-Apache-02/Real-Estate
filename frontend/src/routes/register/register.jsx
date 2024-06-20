import { Link, useNavigate } from 'react-router-dom';
import './register.scss'
import axios from "axios";
import {BASE_URL} from '../../lib/constant.js'
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest.js';
function Register() {
    const [error,setError]=useState("")
    const [isLoading,setIsloading]=useState(false)
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true)
        const formData = new FormData(e.target)

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        //console.log(username+email+password);

        //now call the backend api
        
        try {
            // const url=`${BASE_URL}/auth/register`;
            // console.log(url);
            const res = await apiRequest.post("auth/register", {
                username,
                email,
                password
            })
            // const res = await axios.post("http://localhost:8800/api/auth/register", {
            //     username,
            //     email,
            //     password
            // })

            console.log(res.data)
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
        }finally{
            setIsloading(false)
        }
    }
    return (
        <div className="registerPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an account</h1>
                    <input type="text" name='username' placeholder='username' />
                    <input type="email" name='email' placeholder='email' />
                    <input type="password" name='password' placeholder='password' />
                    <button disabled={isLoading}>Register</button>
                    {error && <span>{error}</span>}
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
           
            <div className="imgContainer">
                <img src="bg.png" alt="bgImage" />
            </div>
        </div>
    );
}

export default Register