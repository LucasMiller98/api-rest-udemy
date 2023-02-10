import { User } from '../models/User'

export class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body)
      const { id, name, email } = newUser
  
      return res.status(201).json({ id, name, email })
      
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      })
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] })

      return res.status(200).json(users)

    } catch (error) {
      return res.status(400).json({ message: 'Tente novamente.' })
    }
  }

  async show(req, res) {
    try {
      
      const user = await User.findByPk(req.params.id)

      const { id, name, email } = user
      
      return res.status(200).json({id, name, email})
    } catch (error) {
      return res.status(401).json({ message: 'Usuário não encontrado.' }) 
    }
  }

  async update(req, res) {
    try {
      
      const user = await User.findByPk(req.userId)

      if(!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.']
        })
      }

      const userUpdate = await user.update(req.body)
      const { id, name, email } = userUpdate

      return res.status(200).json({ id, name, email })
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(error => error.message)
      })
    }
  }

  async delete(req, res) {
    try {
      
      const user = await User.findByPk(req.userId)      

      if(!user) {
        return res.status(400).json({
          errors: ['O usuário informado não existe.']
        })
      }

      await user.destroy()

      return res.status(200).json({ message: 'Usuário deletado com sucesso.' })
      
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(error => error.message)
      })
    }
  } 
}