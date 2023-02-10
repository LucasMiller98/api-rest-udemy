import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import { Student } from '../models/Student'
import { User } from '../models/User'
import { Photo } from '../models/Photo'

const models = [Student, User, Photo]

const connection = new Sequelize(databaseConfig)

for(const model of models) {
  model.init(connection)
}

models.forEach(model => model.associate && model.associate(connection.models))