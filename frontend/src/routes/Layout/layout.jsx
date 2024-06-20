import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./layout.scss"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout(){
    return(
        <div className="layout">
            <div className="nav">
                <Navbar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
}

function RequireAuth(){
    const {currentUser}=useContext(AuthContext);

    return(
        !currentUser? <Navigate to={"/login"} />:
        (<div className="layout">
            <div className="nav">
                <Navbar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>)
    );
}
export {Layout,RequireAuth}