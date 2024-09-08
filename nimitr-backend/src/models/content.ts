import mongoose, { Schema, Document } from 'mongoose'
import ProjectModel from './project'
import MarkerModel from './marker'
import UserModel, { checkMaxContents, checkMaxMarker } from './user'

export const enumContentStatus = {
  CONTENT_ALIVE: 'CONTENT_ALIVE',
  CONTENT_DELETE: 'CONTENT_DELETE',
  CONTENT_MAXIMUM: 'CONTENT_MAXIMUM',
  CONTENT_LOCK: 'CONTENT_LOCK',
}

const ContentSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
    },
    rotationX: {
      type: Number,
    },
    rotationY: {
      type: Number,
    },
    rotationZ: {
      type: Number,
    },
    marker: {
      type: Schema.Types.ObjectId,
      ref: 'Marker',
    },
    media: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
    nowuse: {
      type: Number,
      default: 0,
    },
    contentStatus: {
      type: String,
      enum: Object.keys(enumContentStatus),
      default: enumContentStatus.CONTENT_ALIVE,
    },
  },
  { timestamps: true }
)

ContentSchema.post('save', async function () {
  try {
    const project = await ProjectModel.findById(this.project._id)
    const contents = await ContentModel.find({ project: this.project })
    const markers = await MarkerModel.find({ project: this.project })
    if (project) {
      const user = await UserModel.findById(project.user)
      if (user) {
        await checkMaxContents(user, contents)
        await checkMaxMarker(user, markers)
      }
    }
  } catch (error) {
    throw error
  }
})

export const ContentModel = mongoose.model('Content', ContentSchema)

export default ContentModel
