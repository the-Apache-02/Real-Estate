import express from "express"
import authRoute from "./routes/auth.route.js"
import cookie from "cookie-parser";
import cors from "cors";
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
const app = express();
app.use(express.json()) // for gaining json format data or accepting json format data
app.use(cookie()); //to set the cookie
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use("/api/auth", authRoute);
app.use("/api/test",testRoute);
app.use("/api/users",userRoute);
app.use("/api/post",postRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute)
app.listen(8800, () => {
    console.log("Server is running")
})