import { User }  from '../models/User'
import jwt from 'jsonwebtoken'

export class TokenController {
  async create(req, res) {

    try {
      const { email = '', password = '' } = req.body
  
      if(!email || !password) {
        return res.status(401).json({
          errors: ['Informe suas credenciais.']
        })
      }
  
      const user = await User.findOne({
        where: { email }
      })    

      if(!user) {
        return res.status(401).json({
          errors: ['O usuário não existe.']
        })
      }

      const isPasswordValid = await user.passwordIsValid(password)
      
      if(!isPasswordValid) {
        return res.status(401).json({
          errors: ['Senha inválida.']
        })
      }
      
      const { id } = user
      
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
      })
      
      return res.json({ token })
      
    } catch (error) {
      return res.status(400).json({ message: 'Informe um valor válido.' })
    }
    
  }
}