import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const authorization = async (req, res, next) => {
    try {
        const { id: resources_id } = req.params
        const { id: user_id, role } = req.user
        const resourcesType = req.baseUrl.split("/").at(1)
        
        let hasAcces = false
        
        switch(resourcesType){
            case "users":
                const user = await prisma.user.findUniqueOrThrow({
                    where: { id: Number(resources_id) },
                })
                
                if(user.id == user_id) hasAcces = true
                break;
                
            case "profiles":
                const profile = await prisma.profile.findUniqueOrThrow({
                    where: { id: Number(resources_id) },
                    include: { user: true }
                })
                
                if(profile.user_id == user_id) hasAcces = true
                break;
        }
        if(role == "admin") hasAcces = true
        
        if(!hasAcces) throw { name: "UnauthorizedError", message: "You are not authorized" }
        next()
    } catch (error) {
        next(error)
    }
}