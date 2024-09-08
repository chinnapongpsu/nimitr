import { checkAuth } from '../../auth/auth'
import { UserTC, MemberUserTC, AdminUserTC } from '../type-composers/user'

const userQueries = {
	users: UserTC.getResolver('findMany', [
		checkAuth
	]),
	userId: UserTC.getResolver('findById'),
	adminUser: AdminUserTC.getResolver('findOne'),
	adminUserId: AdminUserTC.getResolver('findById'),
	adminUsers: AdminUserTC.getResolver('findMany'),
	memberUser: MemberUserTC.getResolver('findOne'),
	memberUserId: MemberUserTC.getResolver('findById'),
	memberUsers: MemberUserTC.getResolver('findMany'),
}

export default userQueries
