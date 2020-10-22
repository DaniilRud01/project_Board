import mongoose from 'mongoose'
import bcrypt from 'bcrypt-node'

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: [String],
    default: ['user']
  }
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password)
  return next()
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('no email')
    }
    if (!password) {
      throw new Error('No password')
    }
    const user = await this.findOne({ email })
    if (!user) {
      throw new Error('No User')
    }
    const isPasswordOk = await user.passwordMatches(password)
    if (!isPasswordOk) {
      throw new Error('Incorrect password')
    }
    return user
  }
}

export default mongoose.model('users', userSchema)
