import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserController {
    addUser = async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) throw new Error("Bad requst");
            
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password
                }
            })
            res.status(201).send(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    getUser = async (req, res) => {
        try {
            const users = await prisma.user.findMany();

            res.status(200).send(users);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    findUser = async (req, res) => {
        try {
            const { id } = req.params;
            const users = await prisma.user.findUnique({
                where: { id: Number(id) }
            });

            if (!users) throw new Error('User not Found')

            res.status(200).send(users);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    getUserPost = async (req, res) => {
        try {
            const { id } = req.params;
            const users = await prisma.user.findUnique({
                where: { id: Number(id) }
            });

            if (!users) throw new Error('User not found');

            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: { posts: true }
            })

            res.status(200).send(user.posts);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export const userController = new UserController();