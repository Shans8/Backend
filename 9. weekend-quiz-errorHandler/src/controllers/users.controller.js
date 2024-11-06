import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserController {
    addUser = async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password
                }
            })
            res.status(201).send(newUser);
        } catch (error) {
            next(error);
        }
    }

    getUser = async (req, res) => {
        try {
            const users = await prisma.user.findMany();

            res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    }

    findUser = async (req, res) => {
        try {
            const { id } = req.params;
            const users = await prisma.user.findUnique({
                where: { id: Number(id) }
            });

            res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    }

    getUserPost = async (req, res) => {
        try {
            const { id } = req.params;
            await prisma.user.findUnique({
                where: { id: Number(id) }
            });


            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: { posts: true }
            })

            res.status(200).send(user.posts);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();