import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
const prisma = new PrismaClient()

export const authentication = async (req, res, next) => {
    try {
        const { acces_token } = req.headers
                
        const payload = jsonwebtoken.verify(acces_token, process.env.JWT_SECRET)
                
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: payload.id },
            include: { role: true }
        })
                
        req.user = { id: payload.id, role: user.role.name}     
        next();
    } catch (error) {
        next(error)
    }
}