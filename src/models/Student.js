import Sequelize, { Model } from 'sequelize'

export class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome precisa ter entre 3 e 255 caracteres.'
          }
        }
      },
      surname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O sobrenome precisa ter entre 3 e 255 caracteres.'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O email informado já existe.'
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido.'
          }
        }
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'A idade precisa ser um número inteiro.'
          }
        }
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Informe um número.'
          }
        }
      },
      height: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Informe um número.'
          }
        }
      },  
    }, {
      sequelize
    })
    return this
  } 

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'aluno_id' })
  }
}