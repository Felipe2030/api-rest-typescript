import { hash } from "bcrypt";
import { Request, Response } from "express";
import { NotFoundError } from "../helpers/api-erros";
import { users_repository } from "../repositories/users-repository";

export class UsersController {
    async create(req: Request, res: Response){
        let email: any = (req.body.email) ? req.body.email : false;
        let password: any = (req.body.password) ? req.body.password : false;
   
        if(!email || !password) throw new NotFoundError("invalid parameters");
        
        const hashPassword = await hash(password, 10)
        const newUser = users_repository.create({email: email, password: hashPassword })

        await users_repository.save(newUser)

        return res.status(201).json(newUser)
    }

    async read(req: Request, res: Response){
        let users: any;
        let id: any = (req.query.id) ? req.query.id : false;
        let email: any = (req.query.email) ? req.query.email : false;
    
        if(id) users = await users_repository.findBy({id: id});
        else if(email) users = await users_repository.findBy({email: email});
        else users = await users_repository.find();
        
        return res.json(users)
    }

    async update(req: Request, res: Response){
        let id: any = (req.query.id) ? req.query.id : false;
        let email: any = (req.body.email) ? req.body.email : false;
        let password: any = (req.body.password) ? req.body.password : false;
    
        if(!id || !email || !password) throw new NotFoundError("invalid parameters");

        const users = await users_repository.findOneBy({ id: Number(id) })

        if(!users)  throw new NotFoundError("User does not exist"); 

        const hashPassword = await hash(password, 10)
        users.password = hashPassword
        users.email = email
        
        await users_repository.save({...users})
        return res.status(201).json(users)
    }

    async delete(req: Request, res: Response){
        let id: any = (req.query.id) ? req.query.id : false;

        if(!id) throw new NotFoundError("invalid parameters");
        
        await users_repository.delete(id);
        return res.status(201).json({ message: 'successfully deleted' })
    }
}