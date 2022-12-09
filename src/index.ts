import 'express-async-errors'
import express from 'express'
import routes from './routes'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/errorMiddleware'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())
	app.use(routes)
	app.use(errorMiddleware)

	return app.listen(process.env.PORT)
})