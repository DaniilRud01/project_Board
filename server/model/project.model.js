import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    minLength: 4
  },
  name: {
    type: String,
    required: true,
    minLength: 4
  },
  startDate: {
    type: String,
    required: true,
    minLength: 4
  },
  endDate: {
    type: String,
    required: true,
    minLength: 4
  },
  supervisor: {
    type: String,
    required: true,
    minLength: 4
  },
  admin: {
    type: String,
    required: true,
    minLength: 4
  }
})

export default mongoose.model('projects', projectSchema)
