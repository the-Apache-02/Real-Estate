import react, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext";
import apiRequest from '../../lib/apiRequest.js'
import './profileUpdatePage.scss'
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/upload/UploadWidget.jsx";
function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext)
    const [avatar, setAvatar] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            const { username, email, password } = Object.fromEntries(formData);
            const updatedRes = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar:avatar[0]
            })
            console.log(updatedRes.data.avatar)
            updateUser(updatedRes.data)
            navigate('/profile')

        } catch (err) {
            setError(err.response.data.message)
        }
    }
    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="username" defaultValue={currentUser.username} />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="email" defaultValue={currentUser.email} />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="password" />
                    </div>
                    <button>Update</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || "/logo.png"} alt="" className="avatar" />

                <UploadWidget uwConfig={
                    {
                        cloudName: "dovzwygwn",
                        uploadPreset: "estate",
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: "avatars"
                    }
                } setState={setAvatar} />
            </div>
        </div>
    )
}

export default ProfileUpdatePage;
