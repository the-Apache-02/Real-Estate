import { useState } from 'react';
import './newPostPage.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/upload/UploadWidget';
function NewPostPage() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        try {
            const res = await apiRequest.post("/post", {
                postData: {
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type,
                    property: inputs.property,
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images,
                },
                postDetail: {
                    desc: value,
                    utilities: inputs.utilities,
                    pet: inputs.pet,
                    income: inputs.income,
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    bus: parseInt(inputs.bus),
                    restaurant: parseInt(inputs.restaurant),
                }
            });
            console.log(res.data)
            navigate("/" + res.data.id)
        } catch (err) {
            console.log(err)
            setError(err)
        }

    }
    return (<div className="newPostPage">
        <div className="formContainer">
            <h1>Add new Post</h1>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' name='title' />
                    </div>
                    <div className="item">
                        <label htmlFor="price">Price</label>
                        <input type="number" id='price' name='price' />
                    </div>
                    <div className="item">
                        <label htmlFor="address">Address</label>
                        <input type="text" id='address' name='address' />
                    </div>
                    <div className="item description">
                        <label htmlFor="desc">Description</label>
                        <ReactQuill theme='snow' onChange={setValue} value={value} />
                    </div>
                    <div className="item">
                        <label htmlFor="city">City</label>
                        <input type="text" id='city' name='city' />
                    </div>
                    <div className="item">
                        <label htmlFor="bedroom">Bedroom Number</label>
                        <input type="number" id='bedroom' name='bedroom' min={1} />
                    </div>
                    <div className="item">
                        <label htmlFor="bathroom">Bathroom</label>
                        <input type="number" id='bathroom' name='bathroom' min={1} />
                    </div>
                    <div className="item">
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id='latitude' name='latitude' />
                    </div>
                    <div className="item">
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id='longitude' name='longitude' />
                    </div>
                    <div className="item">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="">
                            <option value="rent" defaultChecked>Rent</option>
                            <option value="buy">Buy</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="property">Property</label>
                        <select name="property">
                            <option value="apartment">Apartment</option>
                            <option value="house">Houset</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="utilities">Utilities</label>
                        <select name="utilities" id="">
                            <option value="owner">Owner is responsible</option>
                            <option value="tenant">Tenant is responsible</option>
                            <option value="shared">Shared</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="pet">Pet Policy</label>
                        <select name="pet" id="">
                            <option value="allowed">Allowed</option>
                            <option value="not-allowed">Not Allowed</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="income">Income Policy</label>
                        <input type="text" id='income' name='income' placeholder='Income policy' />
                    </div>
                    <div className="item">
                        <label htmlFor="size">Total Size (sqft)</label>
                        <input type="number" id='size' name='size' min={0} />
                    </div>
                    <div className="item">
                        <label htmlFor="school">School</label>
                        <input type="number" id='school' name='school' min={0} />
                    </div>
                    <div className="item">
                        <label htmlFor="bus">Bus</label>
                        <input type="number" id='bus' name='bus' min={0} />
                    </div>
                    <div className="item">
                        <label htmlFor="restaurant">Restaurant</label>
                        <input type="number" id='restaurant' name='restaurant' min={0} />
                    </div>
                    <button className="sendButton">Add</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
        </div>
        <div className="sideContainer">
            {
                images.map((image, index) =>

                    (<img src={image} alt="duumy.png" key={index} />)

                )
            }
            <UploadWidget uwConfig={
                {
                    multiple: true,
                    cloudName: "dovzwygwn",
                    uploadPreset: "estate",
                    folder: "posts"
                }
            } setState={setImages} />
        </div>
    </div>)
}

export default NewPostPage