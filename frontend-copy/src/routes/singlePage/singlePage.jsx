import Slider from "../../components/slider/Slider";
import "./singlePage.scss";

import { singlePostData, userData } from '../../lib/dummydata.js'
import Map from "../../components/map/Map.jsx";
function SinglePage() {
    const data = singlePostData;
    return (<div className="single">
        <div className="details">
            <div className="wrapper">
                <Slider images={data.images} />
                <div className="info">
                    <div className="top">
                        <div className="post">
                            <h1 className="title">
                                {data.title}
                            </h1>
                            <div className="address">
                                <img src="/pin.png" alt="" />
                                <span>{data.address}</span>
                            </div>
                            <div className="price">
                                $ {data.price}
                            </div>
                        </div>
                        <div className="user">
                            <img src={userData.img} alt="userImage" />
                            <span>{userData.name}</span>
                        </div>
                    </div>
                    <div className="bottom">
                        {data.description}
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
                            <p>Renter is Possible</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/pet.png" alt="" />
                        <div className="featureText">
                            <span>Pet Policy</span>
                            <p>Pets Allowed</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/fee.png" alt="" />
                        <div className="featureText">
                            <span>Property Fees</span>
                            <p>Must have 3x the rent in Total Household income</p>
                        </div>
                    </div>
                </div>
                <p className="title">Sizes</p>
                <div className="size">
                    <div className="room">
                        <img src="/size.png" alt="" />
                        <span>({singlePostData.size}sqft)</span>
                    </div>
                    <div className="room">
                        <img src="/bed.png" alt="" />
                        <span>{singlePostData.bedRooms} bed</span>
                    </div>
                    <div className="room">
                        <img src="/bath.png" alt="" />
                        <span>{singlePostData.bathroom} bathrooms</span>
                    </div>
                </div>
                <p className="title">Nearby Places</p>
                <div className="listHorizontal">
                    <div className="feature">
                        <img src="/school.png" alt="" />
                        <div className="featureText">
                            <span>School</span>
                            <p>{singlePostData.school} away</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/bus.png" alt="" />
                        <div className="featureText">
                            <span>Bus Stop</span>
                            <p>{singlePostData.bus} away</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/restaurant.png" alt="" />
                        <div className="featureText">
                            <span>Restaurant</span>
                            <p>{singlePostData.restaurant} away</p>
                        </div>
                    </div>
                </div>
                <p className="title">Location</p>
                <div className="mapContainer">
                    <Map items={[singlePostData]}/>
                </div>
                <div className="buttons">
                    <button>
                        <img src="/chat.png" alt="" />
                        Send a message
                    </button>
                    <button>
                        <img src="/save.png" alt="" />
                        Save the place
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default SinglePage;