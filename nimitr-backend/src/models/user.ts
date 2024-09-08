import mongoose from 'mongoose'

const { Schema } = mongoose

const DKey = 'Lv'

const enumUserType = {
  ADMIN: 'Admin',
  MEMBER: 'Member',
}

export const enumUserRank = {
  NOMAL: 'Nomal',
  STARTER: 'Starter',
  ENTERPRISE: 'Enterprise',
  PREMIUM: 'Premium',
  ADMIN: 'Admin',
}

const UserSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      enum: Object.keys(enumUserType),
    },
    rank: {
      type: String,
      required: true,
      enum: Object.keys(enumUserRank),
    },
    username: { type: String, required: true },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    mobile: { type: String },
    userExpirationTime: { type: Date },
    maxprojects: { type: Number, default: 1 },
    maxcontents: { type: Number, default: 5 },
    maxmarkers: { type: Number, default: 2 },
    maxsizemodel: { type: Number, default: 10 },
    maxsizevideo: { type: Number, default: 30 },
    maxsizeaudio: { type: Number, default: 5 },
    maxperuse: {
      type: Number,
      default: 500,
    },
  },
  { timestamps: true }
)

const AdminUserSchema = new Schema({})
const MemberUserSchema = new Schema({})

UserSchema.set('discriminatorKey', DKey)

let maxperuse: number,
  maxprojects: number,
  setmaxcontents: number,
  maxmarkers: number,
  maxsizemodel: number,
  maxsizevideo: number,
  maxsizeaudio: number

export const updateValuesBasedOnRank = (newRank: string) => {
  switch (newRank) {
    case 'ADMIN':
      maxperuse = Number.MAX_SAFE_INTEGER
      maxprojects = Number.MAX_SAFE_INTEGER
      setmaxcontents = Number.MAX_SAFE_INTEGER
      maxmarkers = Number.MAX_SAFE_INTEGER
      maxsizemodel = Number.MAX_SAFE_INTEGER
      maxsizevideo = Number.MAX_SAFE_INTEGER
      maxsizeaudio = Number.MAX_SAFE_INTEGER
      break
    case 'ENTERPRISE':
      maxperuse = Number.MAX_SAFE_INTEGER
      maxprojects = 15
      setmaxcontents = 63
      maxmarkers = 30
      maxsizemodel = 50
      maxsizevideo = 1024
      maxsizeaudio = 30
      break
    case 'PREMIUM':
      maxperuse = 1000
      maxprojects = 6
      setmaxcontents = 35
      maxmarkers = 15
      maxsizemodel = 35
      maxsizevideo = 500
      maxsizeaudio = 20
      break
    case 'STARTER':
      maxperuse = 500
      maxprojects = 2
      setmaxcontents = 10
      maxmarkers = 5
      maxsizemodel = 20
      maxsizevideo = 100
      maxsizeaudio = 10
      break
    default:
      maxperuse = 100
      maxprojects = 1
      setmaxcontents = 5
      maxmarkers = 2
      maxsizemodel = 10
      maxsizevideo = 30
      maxsizeaudio = 5
      break
  }
  return {
    maxperuse,
    maxprojects,
    setmaxcontents,
    maxmarkers,
    maxsizemodel,
    maxsizevideo,
    maxsizeaudio
  }
}

const updateUserContentDocs = async function (userId: any, newRank: string) {
  updateValuesBasedOnRank(newRank)
  const updateFields = {
    maxcontents: setmaxcontents,
    maxmarkers: maxmarkers,
    maxperuse: maxperuse,
    maxprojects: maxprojects,
    maxsizemodel: maxsizemodel,
    maxsizevideo: maxsizevideo,
    maxsizeaudio: maxsizeaudio,
  }
  await mongoose
    .model('User')
    .updateOne({ _id: userId }, { $set: updateFields })

  const projects = await mongoose
    .model('Project')
    .find({ user: userId, projectStatus: { $ne: 'PROJECT_DELETE' } })
  if (projects) {
    for (const project of projects) {
      await project.save()
      if (project) {
        const markers = await mongoose
          .model('Marker')
          .find({ project: project, markerStatus: { $ne: 'MARKER_DELETE' } })
        if (markers) {
          for (const marker of markers) {
            await marker.save()
          }
        }
        const contents = await mongoose
          .model('Content')
          .find({ project: project, contentStatus: { $ne: 'CONTENT_DELETE' } })
        if (contents) {
          for (const content of contents) {
            await content.save()
          }
        }
      }
    }
  }
}

export async function checkMaxMarker(
  user: { maxmarkers: number },
  markers: any[]
) {
  try {
    const aliveMarkers = markers.filter(
      (marker) => marker.markerStatus !== 'MARKER_DELETE'
    )
    let aliveMarkersCount = Math.min(aliveMarkers.length, user.maxmarkers)

    const updatePromises = aliveMarkers.map(async (marker) => {
      const updateQuery = {
        _id: marker._id,
      }

      const content = await mongoose.model('Content').findOne({
        marker: marker._id,
        contentStatus: { $ne: 'CONTENT_DELETE' },
      })

      const updateFields = {
        markerStatus: aliveMarkersCount > 0 ? 'MARKER_ALIVE' : 'MARKER_LOCK',
      }
      aliveMarkersCount--

      await mongoose
        .model('Marker')
        .updateOne(updateQuery, { $set: updateFields })

      if (content && updateFields.markerStatus === 'MARKER_LOCK') {
        await mongoose.model('Content').updateOne(
          {
            _id: content._id,
            contentStatus: { $ne: 'CONTENT_DELETE' },
          },
          {
            $set: { contentStatus: 'CONTENT_LOCK' },
          }
        )
      }
    })

    await Promise.all(updatePromises)
  } catch (error) {
    console.error('Error in checkMaxMarker:', error)
  }
}

export async function checkMaxContents(
  user: { maxcontents: number; maxperuse: number },
  contents: any[]
) {
  try {
    const aliveContents = contents.filter(
      (content) => content.contentStatus !== 'CONTENT_DELETE'
    )

    let aliveContentsCount = Math.min(aliveContents.length, user.maxcontents)

    const updatePromises = aliveContents.map(async (content) => {
      const updateQuery = {
        _id: content._id,
      }

      const updateFields = {
        contentStatus:
          aliveContentsCount > 0
            ? content.nowuse >= user.maxperuse
              ? 'CONTENT_MAXIMUM'
              : 'CONTENT_ALIVE'
            : content.nowuse >= user.maxperuse
            ? 'CONTENT_MAXIMUM'
            : 'CONTENT_LOCK',
      }
      aliveContentsCount--

      await mongoose
        .model('Content')
        .updateOne(updateQuery, { $set: updateFields })
    })

    await Promise.all(updatePromises)
  } catch (error) {
    console.error('Error in checkMaxContents:', error)
  }
}

export async function checkMaxProjects(
  user: { maxprojects: number },
  projects: any[]
) {
  try {
    const aliveProjects = projects.filter(
      (project) => project.projectStatus !== 'PROJECT_DELETE'
    )
    let aliveProjectsCount = Math.min(aliveProjects.length, user.maxprojects)

    const updatePromises = aliveProjects.map(async (project) => {
      const updateQuery = {
        _id: project._id,
      }

      const updateFields = {
        projectStatus:
          aliveProjectsCount > 0 ? 'PROJECT_ALIVE' : 'PROJECT_LOCK',
      }
      aliveProjectsCount--

      await mongoose
        .model('Project')
        .updateOne(updateQuery, { $set: updateFields })
    })

    await Promise.all(updatePromises)
  } catch (error) {
    console.error('Error in checkMaxProjects:', error)
  }
}

UserSchema.pre('findOneAndUpdate', async function (this: any, next) {
  // Determine if the rank field is being updated
  const updatedFields = this.getUpdate() // Use this.getUpdate()
  const newRank =
    updatedFields?.rank || this.getUpdate()?.$set?.rank || this.rank // Use optional chaining here

  // Check if 'rank' field is being updated
  if (newRank) {
    // Get the user's ID
    const userId = this.getQuery()?._id // Use optional chaining here
    try {
      // Set the 'rank' field and wait for it to complete
      await mongoose
        .model('User')
        .updateOne({ _id: userId }, { $set: { rank: newRank } })

      // Call the custom logic to update content docs based on rank
      await updateUserContentDocs(userId, newRank)
    } catch (error) {
      // Handle any errors that occurred during the update
      console.error('Error updating rank:', error)
    }
  }
  next()
})

UserSchema.pre('save', async function (next) {
  try {
    // Set the 'rank' field and wait for it to complete
    await this.updateOne({ $set: { rank: this.rank } })

    // Call the custom logic to update content docs based on rank
    await updateUserContentDocs(this._id, this.rank)
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error('Error updating rank:', error)
  }

  next()
})

export const UserModel = mongoose.model('User', UserSchema)
export const MemberUserModel = UserModel.discriminator(
  enumUserType.MEMBER,
  MemberUserSchema
)
export const AdminUserModel = UserModel.discriminator(
  enumUserType.ADMIN,
  AdminUserSchema
)

export default UserModel
