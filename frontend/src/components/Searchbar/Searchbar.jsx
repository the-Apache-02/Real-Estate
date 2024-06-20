import { useState } from "react";
import "./Searchbar.scss"
import { Link } from "react-router-dom";
const types = ["buy", "rent"];

function Searchbar() {
    const [query, setQuery] = useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0
    });

    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }));
    }

    const handleSubmit=(e)=>{
        setQuery((prev)=>({...prev,[e.target.name]:[e.target.value]}))
    }
    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type) => {
                    return (
                        <button key={type} onClick={() => switchType(type)}
                            className={query.type === type ? "active" : ""}
                        >{type}</button>
                    )
                })}
            </div>

            <form action="">
                <input type="text" placeholder="City" name="city" onChange={handleSubmit} />
                <input type="number" placeholder="Min Price" name="minPrice" minLength={0} maxLength={1000000} onChange={handleSubmit} />
                <input type="number" placeholder="Max Price" name="maxPrice" minLength={0} maxLength={1000000} onChange={handleSubmit} />
                <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
                    <button>
                        <img src="search.png" alt="" />
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default Searchbar

// injected in home page