import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken";
export const getAllPost = async (req, res) => {
    const query = req.query;
    console.log(query)
    try {
        const posts = await prisma.post.findMany(
            {
                where: {
                    city: query.city || undefined,
                    property: query.property || undefined,
                    type: query.type || undefined,
                    bedroom: parseInt(query.bedroom) || undefined,
                    price: {
                        gte: parseInt(query.minPrice) || 0,
                        lte: parseInt(query.maxPrice) || 100000
                    }
                }
            }
        );
        // setTimeout(() => {
        //     res.status(200).json(posts);
        // }, 3000);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error occured in gettting all posts" })
    }
}

export const getSinglePost = async (req, res) => {
    const id = req.params.id;
    //const tokenId=req.
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            }
        });
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
                if (!err) {
                    const saved = await prisma.savedPost.findUnique({
                        where: {
                            userId_postId: {
                                userId:payload.id,
                                postId:id,
                            }
                        }
                    });
                    res.status(200).json({ ...post, isSaved: saved ? true : false })
                }
            })
        }else{
            res.status(200).json({ ...post, isSaved: false })
        }
        
    } catch (error) {
        res.status(500).json({ message: "Errror in getting single post" });
    }
}

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenId = req.userId
    console.log(tokenId)
    try {
        const createdPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenId,
                postDetail: {
                    create: body.postDetail
                }
            }
        })

        res.status(201).json(createdPost)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro in creating post" })
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const tokenId = req.usedId;
    const body = req.body;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });

        if (tokenId !== post.userId) {
            res.status(401).json({ message: "Unauthorised user" })
        }

        const updatedPost = await prisma.post.update({
            where: {
                id
            },
            data: {
                ...body
            }
        })

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: "Erro in updating post" })
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenId = req.userId;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });

        if (tokenId !== post.userId) {
            res.status(401).json({ message: "Unauthorised user" })
        }

        await prisma.post.delete({
            where: {
                id
            }
        })

        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Erro in deleting post" })
    }
}

