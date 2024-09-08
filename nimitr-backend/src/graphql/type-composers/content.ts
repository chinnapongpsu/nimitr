import { composeWithMongoose } from 'graphql-compose-mongoose'
import ContentModel from '../../models/content'

import { ProjectTC } from './project'
import { MarkerTC } from './marker'
import { MediaTC } from './media'

export const ContentTC = composeWithMongoose(ContentModel)

ContentTC.addRelation('project', {
	resolver: () => ProjectTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.project,
	},
	projection: { project: true },
})

ContentTC.addRelation('marker', {
	resolver: () => MarkerTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.marker,
	},
	projection: { marker: true },
})

ContentTC.addRelation('media', {
	resolver: () => MediaTC.getResolver('findOne'),
	prepareArgs: {
		filter: (source) => ({ content: source._id }),
	},
	projection: { id: true },
})
