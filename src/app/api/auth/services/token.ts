import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { IPayload } from './dto/user'



class tokenService {
    generateTokens (payload: IPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
            expiresIn: '30m'
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
            expiresIn: '30d'
        })

        return {
            accessToken, 
            refreshToken
        }
    }

    async saveToken (user_id: string, refresh: string) {
        const tokenDate = await prisma.token.findUnique({where: {user_id}})
        if(tokenDate){
            await prisma.token.update({data: {refresh_token: refresh, user_id}, where: {user_id}})
            return
        }
        const token = await prisma.token.create({data: {refresh_token: refresh, user_id}})
        return token
    }

    async remove(user_id: string) {
        const tokenData = await prisma.token.delete({where: {user_id}})
        return tokenData
    }

    async find(refreshToken: string) {
        const tokenData = await prisma.token.findFirst({where: {refresh_token: refreshToken}})
        return tokenData
    }

    validateAccessToken (accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken (refreshToken: string) {
        try {
            const userData= jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
            return userData
        } catch (error) {
            return null
        }
    }
}

export default new tokenService()