import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProfileController {
    addProfile = async (req, res, next) => {
        try {
            const { first_name, last_name, bio } = req.body;
            const { id: user_id } = req.user;
            const profile = await prisma.profile.create({
                data: {
                    first_name,
                    last_name,
                    bio,
                    user_id: Number(user_id)
                }
            })

            res.status(201).send(profile);
        } catch (error) {
            next(error);
        }
    }
    getProfile = async (req , res, next) => {
        try {
            const profiles = await prisma.profile.findMany()

            res.status(200).send(profiles);
        } catch (error) {
            next(error);
        }
    }
    getProfileId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const profile = await prisma.profile.findUniqueOrThrow({
                where: { id: Number(id)}
            })

            res.status(200).send(profile);
        } catch (error) {
            next(error);
        }
    }
    updateProfile = async (req, res, next) => {
        try {
            const { first_name, last_name, bio } = req.body;
            const { id } = req.params;
            const updatedProfile = await prisma.profile.update({
                where: { id: Number(id) },
                data: { first_name, last_name, bio }
            })

            res.status(200).send(updatedProfile);
        } catch (error) {
            next(error);
        }
    }
    deleteProfile = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedProfile = await prisma.profile.delete({
                where: { id: Number(id) }
            })

            res.status(200).send(deletedProfile);
        } catch (error) {
            next(error);
        }
    }
    
}

export const profileController = new ProfileController();