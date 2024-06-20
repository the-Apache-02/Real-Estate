import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    console.log("first")
    console.log(req.body)
    try {

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        //console.log(hashedPassword);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        console.log(newUser)

        res.status(201).json({ message: "User created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to create User" });
    }
}

export const login = async (req, res) => {
    try {

        const { username, password } = req.body
        const userExist = await prisma.user.findUnique({
            where: {
                username
            }
        })

        //if user is not exist
        if (!userExist) return res.status(401).json({ message: "Invalid credential username is not found" })

        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        //if password is wrong
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials password is wrong" })

        //all things are good
        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")

        //set the age of session or when the session is expire
        const age = 1000 * 60 * 60 * 24 * 7;        //this is for one week

        //remove the password field from the respoonse data
        const {password:userPassword,...userInfo}=userExist;
        //generate jsonwebtoken
        const token =  jwt.sign({
            id: userExist.id,
            isAdmin: true
            },
            process.env.SECRET_KEY,
            {
                expiresIn: age
            }
        )
        //set the cookie
        res.cookie("token", token, {
            httpOnly: true,         //for the client site browser doesn't access our cookie
            // secure:true      //this is only for production level when we use https only but in dev we use localhost or http
            maxAge: age
        }).status(200).json(userInfo)

    } catch (error) {
        res.status(500).json("failed");
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json("Logout Successfully");
}