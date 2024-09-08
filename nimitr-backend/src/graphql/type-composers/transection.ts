import { composeWithMongoose } from 'graphql-compose-mongoose'
import { TransectionModel } from '../../models'

import { UserTC } from './user'

export const TransectionTC = composeWithMongoose(TransectionModel)

TransectionTC.addRelation('user', {
	resolver: () => UserTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.memberId,
	},
	projection: { memberId: true },
})
