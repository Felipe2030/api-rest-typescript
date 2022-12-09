import { Router } from 'express'
import { authenticationMiddleware } from './middlewares/authenticationMiddleware'
import { AuthenticationController } from './controllers/AuthenticationController'
import { UsersController } from './controllers/UsersController'
import { MercadopagoController } from './controllers/MercadopagoController'

const routes = Router()

routes.post('/authentication', new AuthenticationController().create)

routes.post('/users', authenticationMiddleware, new UsersController().create)
routes.get('/users', authenticationMiddleware, new UsersController().read)
routes.put('/users', authenticationMiddleware, new UsersController().update)
routes.delete('/users', authenticationMiddleware, new UsersController().delete)

routes.get('/mercadopago/pagamentos', new MercadopagoController().pagamentos)

export default routes