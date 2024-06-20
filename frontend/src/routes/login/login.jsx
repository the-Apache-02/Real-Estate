import { Link, useNavigate } from "react-router-dom";
import './login.scss'
import apiRequest from "../../lib/apiRequest";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
function Login() {
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const [isLoading,setIsloading]=useState(false);
    const {updateUser}=useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true)
        const formData = new FormData(e.target)

        const username = formData.get("username");
        const password = formData.get("password");
        //console.log(username+email+password);

        //now call the backend api

        try {
            
            const res = await apiRequest.post("/auth/login", {
                username,
                password
            })
            // const res = await axios.post("http://localhost:8800/api/auth/register", {
            //     username,
            //     email,
            //     password
            // })

            console.log(res.data)
            //localStorage.setItem("user",JSON.stringify(res.data));
            //use context
            updateUser(res.data)

            navigate("/");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
        }finally{
            setIsloading(false);
        }
    }
    return (
        <div className="loginPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back user</h1>
                    <input type="text" name='username' placeholder='username' />
                    <input type="password" name='password' placeholder='password' />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <Link to="/login">Don't you have an account?</Link>
                </form>
            </div>

            <div className="imgContainer">
                <img src="bg.png" alt="bgImage" />
            </div>
        </div>
    )
}

export default Login;