import mongoose, { Schema } from 'mongoose'

const enumMediaType = {
  modal: 'modal',
  video: 'video',
  embedded: 'embedded',
}

const MediaSchema = new Schema({
  content: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  name: {
    type: String,
  },
  type: {
    type: String,
    default: 'modal',
    enum: Object.keys(enumMediaType),
  },
  mediaUrl: {
    type: String,
  },
  soundURL: {
    type: String,
  },
  still: {
    type: Boolean,
    default: false,
  },
})

export const MediaModel = mongoose.model('Media', MediaSchema)

export default MediaModel
