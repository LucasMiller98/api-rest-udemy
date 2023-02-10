import { Student }  from '../models/Student'
import { Photo } from '../models/Photo'

export class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['filename', 'url']
      }
    })

    res.status(200).json(students)
  }

  async show(req, res) {
    try {

      if(!req.params.id) {
        return res.status(400).json({
          errors: ['Missing ID']
        })
      }
      
      const student = await Student.findByPk(req.params.id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['filename', 'url']
        }
      })

      if(!student) {
        return res.status(404).json({
          errors: ['O aluno não existe.']
        })
      }

      return res.status(200).json(student)
      
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      })
    }

  }

  async create(req, res) {
    try {
      const student = await Student.create(req.body)
      const { 
        id, 
        name, 
        surname, 
        email, 
        age, 
        weight, 
        height 
      } = student

      
      return res.status(201).json({ 
        id, 
        name, 
        surname, 
        email, 
        age, 
        weight, 
        height
      })
      
    } catch (error) {
      return res.status(401).json({
        errors: error.errors.map(error => error.message)
      })
    }
  }

  async update(req, res) {
    try {

      if(!req.params.id) {
        return res.status(400).json({
          errors: ['Missing ID']
        })
      }

      const student = await Student.findByPk(req.params.id)

      if(!student) {
        return res.status(404).json({
          errors: ['O aluno não existe.']
        })
      }

      const updatedStudent = await student.update(req.body)

      const { 
        id, 
        name, 
        surname, 
        email, 
        age, 
        weight, 
        height 
      } = updatedStudent
      
      return res.status(200).json({
        id, 
        name, 
        surname, 
        email, 
        age, 
        weight, 
        height 
      })
      
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(error => error.message)
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      if(!id) {
        return res.status(400).json({
          errors: ['Missing ID']
        })
      }

      const student = await Student.findByPk(id)

      if(!student) {
        return res.status(404).json({
          errors: ['O aluno não existe.']
        })
      }

      await student.destroy()

      return res.status(200).json({ message: 'Aluno deletado com sucesso.' })
      
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(error => error.message)
      })   
    }
  }
}