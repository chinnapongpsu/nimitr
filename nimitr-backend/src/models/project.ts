import mongoose from 'mongoose'
import { checkMaxProjects } from './user'
const { Schema } = mongoose

export const enumProjectStatus = {
  PROJECT_ALIVE: 'PROJECT_ALIVE',
  PROJECT_DELETE: 'PROJECT_DELETE',
  PROJECT_LOCK: 'PROJECT_LOCK',
}

const ProjectSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    contents: { type: Array },
    type: { type: String, enum: ['barcode', 'image'], default: 'barcode' },
    projectStatus: {
      type: String,
      enum: Object.keys(enumProjectStatus),
      default: enumProjectStatus.PROJECT_ALIVE,
    },
  },
  { timestamps: true }
)

ProjectSchema.post('save', async function () {
  try {
    const projects = (await ProjectModel.find({ user: this.user })).filter(
      (project) => project.projectStatus !== 'PROJECT_DELETE'
    )
    const user = await mongoose.model('User').findById(this.user)
    if (user && projects) {
      await checkMaxProjects(user, projects)
    }
  } catch (error: any) {
    throw error
  }
})

export const ProjectModel = mongoose.model('Project', ProjectSchema)

export default ProjectModel
