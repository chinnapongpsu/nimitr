import { composeWithMongoose } from 'graphql-compose-mongoose'
import MediaModel from '../../models/media'

import { ContentTC } from './content'
import { ProjectTC } from './project'

export const MediaTC = composeWithMongoose(MediaModel)

MediaTC.addRelation('media', {
	resolver: () => ContentTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.media,
	},
	projection: { media: true },
})

MediaTC.addRelation('project', {
	resolver: () => ProjectTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.project,
	},
	projection: { project: true },
})
