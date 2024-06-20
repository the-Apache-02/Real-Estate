import Slider from "../../components/slider/Slider";
import "./singlePage.scss";
import DOMPurify from 'dompurify'

import Map from "../../components/map/Map.jsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
function SinglePage() {
    const post=useLoaderData();
    console.log(post)
    
    const {currentUser}=useContext(AuthContext)
    const [saved,setSaved]=useState(post.isSaved)
    const navigate=useNavigate();

    const savedPost=async()=>{

        if(!currentUser){
            navigate("/login")
        }
        setSaved((prev)=>!prev)
        try {
            const a=await apiRequest.post("/users/save",{postId:post.id});
            console.log(a);
        } catch (err) {
            console.error("Error from frontend in save the place",err)
            setSaved((prev)=>!prev)
        }
    }
    return (<div className="single">
        <div className="details">
            <div className="wrapper">
                <Slider images={post.images} />
                <div className="info">
                    <div className="top">
                        <div className="post">
                            <h1 className="title">
                                {post.title}
                            </h1>
                            <div className="address">
                                <img src="/pin.png" alt="" />
                                <span>{post.address}</span>
                            </div>
                            <div className="price">
                                $ {post.price}
                            </div>
                        </div>
                        <div className="user">
                            <img src={post.user.avatar} alt="userImage" />
                            <span>{post.user.username}</span>
                        </div>
                    </div>
                    <div className="bottom"
                    dangerouslySetInnerHTML={{
                        __html:DOMPurify.sanitize(post.postDetail.desc)
                    }}
                    >
                    </div>
                </div>
            </div>
        </div>
        <div className="features">
            <div className="wrapper">
                <p className="title">General</p>
                <div className="listVertical">
                    <div className="feature">
                        <img src="/utility.png" alt="" />
                        <div className="featureText">
                            <span>Utilities</span>
                            {post.postDetail.utilities==="owner"?<p>Owner is Responsible</p>:<p>Tenant is responsible</p>}
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/pet.png" alt="" />
                        <div className="featureText">
                            <span>Pet Policy</span>
                            {post.postDetail.pet=="allowed" ?<p>Pet Allowed</p>:<p>Pet Not Allowed</p>}
                            
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/fee.png" alt="" />
                        <div className="featureText">
                            <span>Property Fees</span>
                            <p>{post.postDetail.income}</p>
                        </div>
                    </div>
                </div>
                <p className="title">Sizes</p>
                <div className="size">
                    <div className="room">
                        <img src="/size.png" alt="" />
                        <span>({post.postDetail.size}sqft)</span>
                    </div>
                    <div className="room">
                        <img src="/bed.png" alt="" />
                        <span>{post.bedRooms} bed</span>
                    </div>
                    <div className="room">
                        <img src="/bath.png" alt="" />
                        <span>{post.bathroom} bathrooms</span>
                    </div>
                </div>
                <p className="title">Nearby Places</p>
                <div className="listHorizontal">
                    <div className="feature">
                        <img src="/school.png" alt="" />
                        <div className="featureText">
                            <span>School</span>
                            {post.postDetail.school>1000?<p>{post.postDetail.school/1000} km away</p>:<p>{post.postDetail.school} m away</p>}
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/bus.png" alt="" />
                        <div className="featureText">
                            <span>Bus Stop</span>
                            {post.postDetail.bus>1000?<p>{post.postDetail.bus/1000} km away</p>:<p>{post.postDetail.bus} m away</p>}
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/restaurant.png" alt="" />
                        <div className="featureText">
                            <span>Restaurant</span>
                            {post.postDetail.restaurant>1000?<p>{post.postDetail.restaurant/1000} km away</p>:<p>{post.postDetail.restaurant} m away</p>}
                        </div>
                    </div>
                </div>
                <p className="title">Location</p>
                <div className="mapContainer">
                    <Map items={[post]}/>
                </div>
                <div className="buttons">
                    <button>
                        <img src={"/chat.png"} alt="" />
                        Send a message
                    </button>
                    <button onClick={savedPost} style={{backgroundColor:saved? "#fece51":"white"}}>
                        <img src="/save.png" alt="" />
                        {saved?"Place saved":"Save the place"}
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default SinglePage;