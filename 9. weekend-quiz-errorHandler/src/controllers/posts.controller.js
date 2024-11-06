import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PostController {
    addPost = async (req, res, next) => {
        try {
            const { title, content, user_id } = req.body;
            
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    user_id: Number(user_id)
                }
            })
            res.status(200).send(newPost);
        } catch (error) {
            next(error);
        }
    }
    getPost = async (req, res, next) => {
        try {
            const posts = await prisma.post.findMany();

            res.status(200).send(posts);
        } catch (error) {
            next(error);
        }
    }
    findPost = async (req, res, next) => {
        try {
            const { id } = req.params;
            const posts = await prisma.post.findUniqueOrThrow({
                where: { id: Number(id) },
                include: {
                    author: true,
                    comments: true
                }
            });

            res.status(200).send(posts);
        } catch (error) {
            next(error);
        }
    }
    updatePost = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, content, user_id } = req.body;
            await prisma.post.findUnique({
                where: { id: Number(id) }
            });
            
            const post = await prisma.post.update({
                where: { id: Number(id) },
                data: {
                    title,
                    content,
                    user_id
                }
            });
            res.status(200).send(post);
        } catch (error) {
            next(error);
        }
    }
    deletePost = async (req, res, next) => {
        try {
            const { id } = req.params;
            await prisma.post.findUniqueOrThrow({
                where: { id: Number(id) }
            });

            const deletedPost = await prisma.post.delete({
                where: { id: Number(id) }
            })

            res.status(200).send(deletedPost);
        } catch (error) {
            next(error);
        }
    }
}
export const postController = new PostController();