import {
  composeWithMongooseDiscriminators,
} from 'graphql-compose-mongoose'

import { UserModel, AdminUserModel, MemberUserModel } from '../../models'
import { ProjectTC } from './project'

const baseOptions = {
  fields: {
    remove: ['password'],
  },
}

export const UserTC = composeWithMongooseDiscriminators(UserModel, baseOptions)
// export const TeacherUserTC = UserTC.discriminator(TeacherUserModel)
export const AdminUserTC = UserTC.discriminator(AdminUserModel)
export const MemberUserTC = UserTC.discriminator(MemberUserModel)

// export const StudentUserTC = UserTC.discriminator(StudentUserModel)

UserTC.addRelation('createdById', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.createdById,
  },
  projection: { createdById: true },
})

UserTC.addRelation('projects', {
  resolver: () => ProjectTC.getResolver('findMany'),
  prepareArgs: {
    filter: (source) => ({ user: source._id }),
  },
  projection: { id: true },
})

export default UserTC
