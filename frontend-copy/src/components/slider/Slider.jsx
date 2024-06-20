import { useState } from 'react';
import './slider.scss'

function Slider({images}){
    const [imageIndex,setImageIndex]=useState(null);

    // handleClick=(index)=>{
    //     setImageIndex(index);
    // }
    return (
        <div className="slider">
            {imageIndex!==null &&(
                <div className="fullSlider">
                <div className="arrow">
                    <img src="/arrow.png" alt="" onClick={()=>{
                        setImageIndex((prev)=>(prev-1)!==-1?prev-1:images.length-1)
                    }}/>
                </div>
                <div className="imgContainer">
                    <img src={images[imageIndex]} alt="" />
                </div>
                <div className="arrow">
                    <img src="/arrow.png" alt="" className='right' 
                    onClick={()=>{
                        setImageIndex((prev)=>(prev+1)!==images.length?prev+1:0)
                    }}/>
                </div>
                <div className="close" onClick={()=>setImageIndex(null)}>
                    X
                </div>
            </div>
            )}
            
            <div className="bigImage">
                <img src={images[0]} alt="" onClick={()=>setImageIndex(0)}/>
            </div>
            <div className="smallImage">
                {
                    images.slice(1).map((image,index)=>{
                        return (
                            <img src={image} key={index} alt='image' 
                            onClick={()=>setImageIndex(index+1)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Slider;