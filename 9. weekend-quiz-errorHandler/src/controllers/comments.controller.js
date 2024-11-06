import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CommentController {
    addComment = async (req, res) => {
        try {
            const { content, user_id, post_id } = req.body;

            const newPost = await prisma.comment.create({
                data: {
                    content,
                    user_id: Number(user_id),
                    post_id: Number(post_id)
                }
            });
            res.status(201).send(newPost);
        } catch (error) {
            next(error);
        }
    }
    getComment = async (req, res) => {
        try {
            const comments = await prisma.comment.findMany();

            res.status(200).send(comments);
        } catch (error) {
            next(error);
        }
    }
}

export const commentController = new CommentController();