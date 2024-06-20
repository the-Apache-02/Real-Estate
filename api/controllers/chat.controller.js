import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt";
export const getChats = async (req, res) => {
    const tokenuserId = req.userId
    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenuserId]
                }
            },

        })

        for (const chat of chats) {
            const receiverId = chat.userIDs.find((id) => id !== tokenuserId);

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            })
            chat.receiver=receiver
        }

        res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to found chats" })
    }
}
export const getChat = async (req, res) => {
    const chatId = req.params.id;
    const tokenuserId = req.userId;
    try {
        const chatSingle = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenuserId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })

        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: {
                    push: [tokenuserId]
                }
            }
        })
        res.status(200).json(chatSingle);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed in getting chat" })
    }
}
export const addChat = async (req, res) => {
    const receiverId = req.body.receiverId;
    const tokenuserId = req.userId;

    try {
        const createdChat = await prisma.chat.create({
            data: {
                userIDs: [tokenuserId, receiverId]
            }
        })
        res.status(200).json(createdChat)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed in adding chat" })
    }
}
export const readChat = async (req, res) => {
    const tokenuserId = req.userId;

    try {
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenuserId],
                }
            },
            data: {
                seenBy: {
                    set: [tokenuserId]
                }
            }
        });

        res.status(200).json(chat)
    } catch (error) {
        return res.status(500).json({ message: "Failed in reading chat" })
    }
}
