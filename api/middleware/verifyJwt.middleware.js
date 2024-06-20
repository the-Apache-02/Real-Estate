import jwt from "jsonwebtoken"

export const verifyToken=(req,res,next)=>{
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }
        req.userId=payload.id;
    })
    next();
}