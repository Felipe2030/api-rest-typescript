import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../helpers/api-erros";
import { users_repository } from "../repositories/users-repository";

export class AuthenticationController {
    async create(req: Request, res: Response){
        let email: any = (req.body.email) ? req.body.email : false;
        let password: any = (req.body.password) ? req.body.password : false;
    
        if(!email || !password) throw new NotFoundError("invalid parameters");

        const users: any = await users_repository.findOne({where: { email: email }})
        if(!users) throw new NotFoundError("User does not exist");

        const isValidPassword = await compare(password, users.password)
        if(!isValidPassword) throw new UnauthorizedError("Failed to authenticate token"); 
    
        delete users.password;
        const token = jwt.sign({ id: users.id }, 'secret', { expiresIn: '1d' })

        res.json({ users, token })
    }
}

