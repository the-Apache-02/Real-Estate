import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({ message: "Failed to found users" })
    }
}
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: "Failed to found single user" })
    }
}
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { password, avatar, ...input } = req.body;

    if (id !== req.userId) {
        return res.status(401).json({ message: "Unauthorised user" })
    }
    let updatedPassword = null;
    if (password) {
        updatedPassword = await bcrypt.hash(password, 10);
    }
    try {
        const user = await prisma.user.update(
            {
                where: {
                    id
                },
                data: {
                    ...input,
                    ...(updatedPassword && { password: updatedPassword }),
                    ...(avatar && { avatar })
                }

            }
        );
        const { password: userPassword, ...resUser } = user;
        return res.status(200).json(resUser);

    } catch (error) {
        return res.status(500).json({ message: "Failed to found user" })
    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id
    if (id !== req.userId) {
        return res.status(401).json({ message: "Unauthorised user" });
    }
    try {
        await prisma.user.delete({
            where: {
                id
            }
        })
        return res.status(200).json({ message: "user deleted Succesfully" });

    } catch (error) {
        return res.status(500).json({ message: "Failed to delete user" })
    }
}
export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenId = req.userId;

    try {
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenId,
                    postId
                }

            }
        })

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id
                }
            })
            res.status(200).json({ message: "Post removed Successfully" });
        } else {
            const savingPost = await prisma.savedPost.create({
                data: {
                    userId: tokenId,
                    postId
                }
            })
            res.status(200).json("Post saved")
        }
    } catch (error) {
        res.status(500).json("Error in saving post from controller")
    }
}
export const profilePost = async (req, res) => {
    const tokenId = req.userId;
    try {
        const userPost = await prisma.post.findMany({
            where: {
                userId: tokenId
            }
        })

        const savedPost = await prisma.savedPost.findMany({
            where: {
                userId: tokenId
            },
            include: {
                post: true
            }
        })

        const finalPost = savedPost.map((item) => item.post)
        res.status(200).json({ userPost, finalPost })
    } catch (error) {
        res.status(500).json({ message: "errror in fetching userProfile" })
    }
}
export const getNotification = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const number = await prisma.chat.count({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                },
                NOT: {
                    seenBy: {
                        hasSome: [tokenUserId]
                    }
                }
            },
            
        })


        res.status(200).json(number)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "errror in fetching userProfile" })
    }
}