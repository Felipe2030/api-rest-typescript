import { Request, Response } from 'express';

export class MercadopagoController {
    async pagamentos(req: Request, res: Response){
        return res.status(201).json({"status": true})
    }
}