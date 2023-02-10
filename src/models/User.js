import Sequelize, { Model } from 'sequelize'
import bcryptjs from 'bcryptjs'

export class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            message: 'O campo nome deve ter entre 3 e 255 caracteres.'
          } 
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O e-mail informado já existe.'
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido.'
          } 
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            message: 'A senha deve ter entre 6 e 50 caracteres.'
          } 
        }
      },
    }, {
      sequelize
    })

    this.addHook('beforeSave', async user => { // faz o hash da senha e salva, o hash, no banco de dados.
      if(user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8)
      }
      
    })
    
    return this
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash)
  }
}