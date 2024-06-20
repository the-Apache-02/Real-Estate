
import apiRequest from "./apiRequest.js"
import { defer } from "react-router-dom";

export const singleLoaderPage = async ({ request, params }) => {
    const res = await apiRequest("/post/" + params.id);
    return res.data;
}

export const listLoaderPage = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    console.log(query)
    const promiseResponse = await apiRequest("/post?" + query)
    return defer({
        postResponse: promiseResponse
    });
}

export const profileLoaderPage = async () => {
    const postPromise = await apiRequest("/users/profilePost");
    const chatPromise = await apiRequest("/chats");
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise
    })
}