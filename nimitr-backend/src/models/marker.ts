import mongoose from 'mongoose'
import ProjectModel from './project'
import UserModel, { checkMaxContents, checkMaxMarker } from './user'
import ContentModel from './content'

const { Schema } = mongoose

const MarkerSchema = new Schema(
  {
    content: {
      type: Schema.Types.ObjectId,
      ref: 'Content',
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },

    name: {
      type: String,
    },

    type: {
      type: String,
    },

    markerStatus: {
      type: String,
      enum: ['MARKER_ALIVE', 'MARKER_DELETE', 'MARKER_LOCK'],
      default: 'MARKER_ALIVE',
    },

    markerType: {
      type: String,
      enum: ['barcode', 'mindar'],
      default: 'barcode',
    },

    markerNo: { type: String },

    markerPattern: {
      type: String,
    },

    markerUrl: {
      type: String,
    },
  },
  { timestamps: true }
)

MarkerSchema.post('save', async function () {
  try {
    const project = await ProjectModel.findById(this.project?._id)
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
    console.error('Error querying Project:', error)
  }
})

export const MarkerModel = mongoose.model('Marker', MarkerSchema)

export default MarkerModel
