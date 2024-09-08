import passwordHash from 'password-hash'

import { PubSub } from 'graphql-subscriptions'
import { Resolver, schemaComposer } from 'graphql-compose'

import { UserModel } from '../../models'
import { UserTC, AdminUserTC, MemberUserTC } from '../type-composers/user'
import { hashPassword } from '../../libs/hash-password'

export const pubsub = new PubSub()
interface Args {
	_id: string
	password: string
}
const setPassword = new Resolver<any, any, Args, any>(
	{
		name: 'setPassword',
		type: UserTC.getType(),
		args: {
			_id: 'String!',
			password: 'String!',
		},
		resolve: async ({ args, context }) => {
			console.log(context);

			const { _id, password } = args
			const hashedPassword = await hashPassword(password)
			const user = await UserModel.findOneAndUpdate(
				{ _id },
				{ password: hashedPassword },
				{ new: true }
			)
			if (!user) {
				throw new Error('User not found')
			}
			await user.save()
			return user
		},
	},
	schemaComposer
)

const userMutations = {
	createAdminUser: AdminUserTC.getResolver('createOne', [
		async (next, s, a, c, i) => {
			const username = a?.record?.username
			const user = await UserModel.findOne({ username })
			if (username === user?.username) {
				throw new Error('User already Exist')
			} else if (username !== user?.username) {
				return next(s, a, c, i)
			}
		},
	]),
	updateAdminUser: AdminUserTC.getResolver('updateById'),
	removeAdminUser: AdminUserTC.getResolver('removeById'),

	createMemberUser: MemberUserTC.getResolver('createOne', [
		async (next, s, a, c, i) => {
			const username = a?.record?.username
			const user = await UserModel.findOne({ username })
			if (username === user?.username) {
				throw new Error('User already Exist')
			} else if (username !== user?.username) {
				return next(s, a, c, i)
			}
		},
	]),
	updateMemberUser: MemberUserTC.getResolver('updateById'),
	removeMemberUser: MemberUserTC.getResolver('removeById'),

	updateUser: UserTC.getResolver('updateById'),
	removeUser: UserTC.getResolver('removeById'),
	setPassword,
}

export default userMutations
