import jwt from "jsonwebtoken"
import { User } from "../models/User"

export const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers

  if(!authorization) {
    return res.status(401).json({
      errors: ['Login required!']
    })
  }

  const [_, token] = authorization.split(' ')

  try {
    
    const data = jwt.verify(token, process.env.TOKEN_SECRET)

    const { id, email } = data

    const foundUser = await User.findOne({
      where: {
        id,
        email
      }
    })

    if(!foundUser) {
      return res.status(401).json({
        errors: ['Usuário inválido.']
      })
    }

    req.userId = id
    req.email = email

    return next()
    
  } catch (error) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.']
    })
  }
}