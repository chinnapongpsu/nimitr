import mongoose from 'mongoose'
import { enumUserRank } from './user'

const { Schema } = mongoose

const enumTransectionStatus = {
  successful: 'successful',
  pending: 'pending',
  failed: 'failed',
}

const TransectionSchema = new Schema(
  {
    token: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.keys(enumTransectionStatus),
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['credit-card', 'promptpay'],
    },
    description: { type: String, enum: Object.keys(enumUserRank) },
  },
  { timestamps: true }
)

export const TransectionModel = mongoose.model('Transection', TransectionSchema)

export default TransectionModel
