import { AppDataSource } from '../data-source'
import { Users } from '../entities/Users'

export const users_repository = AppDataSource.getRepository(Users)