import { PrismaClient } from "@prisma/client";
import bcrypt, { hash } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
const prisma = new PrismaClient();

class UserController {
    register = async (req, res, next) => {
        try {
            const { email, password, role_id } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const addUser = await prisma.user.create({
                data: {email, password: hashedPassword, role_id: Number(role_id)}
            })

            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    }
    login = async (req, res ,next) => {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUniqueOrThrow({
                where: { email }
            })
            const comparePassword = await bcrypt.compare(password, user.password)
            if(!comparePassword) throw { name: 'InvalidPassword', message: 'Login Credentials is Invalid'}

            const payload = { id: user.id };
            const acces_token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);

            res.status(200).send(acces_token)
        } catch (error) {
            next(error);
        }
    }
    getUser = async (req, res, next) => {
        try {
            const users = await prisma.user.findMany();

            res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    }
    getUserId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUniqueOrThrow({
                where: { id: Number(id) }
            })

            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    }
    updateUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { email } = req.body;
            const updatedUser = await prisma.user.update({
                where: { id: Number(id) },
                data: { email }
            })

            res.status(200).send(updatedUser);
        } catch (error) {
            next(error);
        }
    }
    deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await prisma.user.delete({
                where: { id: Number(id) }
            })

            res.status(200).send(deletedUser);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();