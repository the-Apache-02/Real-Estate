import { Link, useLoaderData, useNavigate, Await } from 'react-router-dom';
import Chat from '../../components/chat/chat';
import List from '../../components/list/list';
import apiRequest from '../../lib/apiRequest';
import './profilePage.scss';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Suspense, } from 'react';
function ProfilePage() {
    const navigate = useNavigate();

    const { updateUser, currentUser } = useContext(AuthContext);
    const loaderData = useLoaderData();
    
    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        (<div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>Avatar:
                            <img src={currentUser.avatar || "/logo.png"} alt="" />
                        </span>
                        <span>Username: <b>{currentUser.username}</b></span>
                        <span>Email: <b>{currentUser.email}</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/add">
                            <button>Create new Post</button>
                        </Link>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={loaderData.postResponse}
                            errorElement={
                                <p>Error loading package location!</p>
                            }
                        >
                            {(postResponse) =>

                                <List posts={postResponse.data.userPost} />

                            }
                        </Await>

                    </Suspense>


                    {/* <List /> */}

                    <div className="title">
                        <h1>Saved List</h1>

                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={loaderData.postResponse}
                            errorElement={
                                <p>Error loading package location!</p>
                            }
                        >
                            {(postResponse) =>

                                <List posts={postResponse.data.finalPost} />

                            }
                        </Await>

                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={loaderData.chatResponse}
                            errorElement={
                                <p>Error chat!</p>
                            }
                        >
                            {(chatResponse) =>

                                <Chat chats={chatResponse.data} />

                            }
                        </Await>

                    </Suspense>
                </div>
            </div>
        </div>)
    )
}

export default ProfilePage;