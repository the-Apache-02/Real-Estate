import { useState } from "react";
import "./Searchbar.scss"
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
                <input type="text" placeholder="City location" name="location" />
                <input type="number" placeholder="Min Price" name="minPrice" minLength={0} maxLength={1000000}/>
                <input type="number" placeholder="Max Price" name="maxPrice" minLength={0} maxLength={1000000}/>
                <button>
                    <img src="search.png" alt="" />
                </button>
            </form>
        </div>
    );
}

export default Searchbar

// injected in home page