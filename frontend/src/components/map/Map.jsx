import './map.scss'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet';
// import {BaseLayer} from 'react-leaflet'
import Pin from '../pin/Pin';
function Map({ items }) {
    return (
        <MapContainer center={items.length == 1 ? [items[0].latitude, items[0].longitude] : [51.505, -0.09]} zoom={7} scrollWheelZoom={false} className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        {
            items.map(item=>(
                <Pin item={item} key={item.id}/>
            ))
        }
            {/* <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">SatelliteMap</a> contributors'
                    //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    maxZoom={20}
                    subdomains={['mt1', 'mt2', 'mt3']}
                />
                {
                    items.map(item => (
                        <Pin item={item} key={item.id} />
                    ))
                }
            </BaseLayer>

            <BaseLayer name="Satellite View">
                <TileLayer
                    url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    maxZoom={20}
                />

            </BaseLayer> */}
        </MapContainer>
    );
}

export default Map;