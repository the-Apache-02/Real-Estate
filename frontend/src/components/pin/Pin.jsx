import { Marker, Popup } from 'react-leaflet';
import './pin.scss'
import { Link } from 'react-router-dom';

function Pin({item}){
    return (
        <Marker position={[item.latitude, item.longitude]}>
                <Popup>
                   <div className="popupContainer">
                        <img src={item.img} alt="" />
                        <div className="textContainer">
                            <Link to={`/${item.img}`}>
                                {item.title}
                            </Link>
                            <span className="bed">{item.bedroom} bedrooms</span>
                            <b>$ {item.price}</b>
                        </div>
                   </div>
                </Popup>
            </Marker>
    );
}

export default Pin;