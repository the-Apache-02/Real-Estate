import { listData } from "../../lib/dummydata.js";
import "./listPage.scss"

import Filter from "../../components/Filter/filter"
import Card from "../../components/card/card";
import Map from "../../components/map/Map.jsx";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import {Audio} from 'react-loader-spinner'
function ListPage() {
    const loaderData = useLoaderData();
    const [loader,setLoader]=useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoader(false)
        },3000)
    },[loader])
    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {
                        loader && 
                        <div className="loader">
                            <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="green"
                        ariaLabel="loading"
                        className="loader"
                      />
                        </div>
                        
                    }
                           { !loader && <Suspense fallback={<p>Loading...</p>}>
                                <Await
                                    resolve={loaderData.postResponse}
                                    errorElement={
                                        <p>Error loading package location!</p>
                                    }
                                >
                                    {(postResponse) =>
                                        postResponse.data.map(post => (
                                            <Card key={post.id} item={post} />
                                        ))
                                    }
                                </Await>

                            </Suspense>
}
                </div>
            </div>
            <div className="mapContainer">
                {/* <Map items={loaderData} /> */}
                <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={loaderData.postResponse}
                        errorElement={
                            <p>Error loading package location!</p>
                        }
                    >
                        {(postResponse) => (
                            <Map items={postResponse.data} />
                        )
                        }
                    </Await>
                </Suspense>
            </div>
        </div>)
}

export default ListPage