import jwt from "jsonwebtoken"

export const shouldNormalLoggedIn = (req, res) => {
    console.log(req.id)

    res.status(200).json("You are authenticated");
}

export const shouldAdminLoggedIn = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }
        if(!payload.isAdmin){
            return res.status(403).json("Not authorized");
        }
    })

    res.status(200).json("You are authenticated");

}