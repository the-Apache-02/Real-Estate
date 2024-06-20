import "./filter.scss"

function Filter() {
    return (
        <div className="filter">
            <h1>Searcg results for <b>London</b></h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city">Location</label>
                    <input type="text" id="city" name="city" placeholder="city Location" />
                </div>
            </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type">
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select name="property" id="property">
                        <option value="">any</option>
                        <option value="apartment">Apartment</option>
                        <option value="Land">Land</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input name="minPrice" id="minPrice" type="number" minLength={0} maxLength={1000000} placeholder="any"/>    
                </div>
                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input name="maxPrice" id="maxPrice" type="number" minLength={0} maxLength={1000000} placeholder="any"/>    
                </div>
                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input type="text" id="bedroom" name="bedroom" placeholder="any" />
                </div>
                <button>
                    <img src="/search.png" alt="search Image" />
                </button>
            </div>
        </div>
    )
}

export default Filter;