import Searchbar from "../../components/Searchbar/Searchbar";
import "./homePage.scss"

function homePage(){
    return (
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Find Real Estate & Get your dream place.</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est qui vero laboriosam sit ut delectus illum et deserunt repudiandae, 
                        unde quam! Enim quos maiores molestias delectus consequuntur quis molestiae quas.</p>
                        <Searchbar/>
                        <div className="boxes">
                            <div className="box">
                                <h1>16+</h1>
                                <h2>Years of Experience</h2>
                            </div>
                            <div className="box">
                                <h1>200+</h1>
                                <h2>Awards Gained</h2>
                            </div>
                            <div className="box">
                                <h1>1200+</h1>
                                <h2>Property Ready</h2>
                            </div>
                        </div>
                </div>
                
            </div>
            <div className="imgContainer">
                <img src="bg.png" alt="" />
            </div>
        </div>
    );
}

export default homePage
