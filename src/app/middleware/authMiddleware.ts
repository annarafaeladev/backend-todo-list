
import { NextFunction, Request, Response } from 'express'; // Renomeie o Request para ExpressRequest

import { UnauthorizedError } from '../helpers/api-errors'
import { userRepository } from '../repositories/UserRepository'
import jwt from 'jsonwebtoken';
import { IUserDTO } from '../interfaces/IUser'

type JwtPayload = {
    id: number
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers

    if (!authorization) {
        throw new UnauthorizedError('Não autorizado')
    }

    try {
        const token = authorization.split(' ')[1]
        const { id } = jwt.verify(token, `${process.env.JWT_PASS}` ?? '') as JwtPayload

        const user = await userRepository.findOneBy({ id })

        if (!user) {
            throw new UnauthorizedError('Não autorizado')
        }

        const { password, ...userResponse } = user

        req.user = userResponse
    } catch (error) {
        console.log("ERROR: Token Expirado")
        throw new UnauthorizedError('Não autorizado');
    }

    next()
}