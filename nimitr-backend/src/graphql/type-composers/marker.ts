import { composeWithMongoose } from 'graphql-compose-mongoose'
import MarkerModel from '../../models/marker'

import { ContentTC } from './content'
import { ProjectTC } from './project'

export const MarkerTC = composeWithMongoose(MarkerModel)

MarkerTC.addRelation('marker', {
	resolver: () => ContentTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.content,
	},
	projection: { content: true },
})

MarkerTC.addRelation('project', {
	resolver: () => ProjectTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.project,
	},
	projection: { project: true },
})
