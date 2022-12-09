import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-erros";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    
    if(!authorization) throw new UnauthorizedError("Failed to authenticate token"); 

    const token = authorization.replace('Bearer','').trim();
    const data = jwt.verify(token, 'secret');
    const { id } = data as TokenPayload;
    req.userId = id;
    return next();
}

