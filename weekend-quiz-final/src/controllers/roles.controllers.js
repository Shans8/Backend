import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class RoleController {
    addRole = async (req, res, next) => {
        try {
            const { name } = req.body;
            const role = await prisma.role.create({
                data: { name }
            })
            
            res.status(201).send(role);
        } catch (error) {
            next(error);
        }
    }
    getRole = async (req, res, next) => {
        try {
            const roles = await prisma.role.findMany();

            res.status(200).send(roles);
        } catch (error) {
            next(error);
        }
    }
    getRoleById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const roleById = await prisma.role.findUniqueOrThrow({
                where: { id: Number(id)}
            })

            res.status(200).send(roleById);
        } catch (error) {
            next(error);
        }
    }
    updateRole = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedRole = await prisma.role.update({
                where: { id: Number(id) },
                data: { name }
            })

            res.status(200).send(updatedRole)
        } catch (error) {
            next(error);
        }
    }
    deleteRole = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedPost = await prisma.role.delete({
                where: { id: Number(id) }
            })

            res.status(200).send(deletedPost);
        } catch (error) {
            next(error);
        }
    }
}

export const roleController = new RoleController();