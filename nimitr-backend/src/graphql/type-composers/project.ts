import { composeWithMongoose } from 'graphql-compose-mongoose'
import ProjectModel from '../../models/project'
import { ContentTC } from './content'
import { MediaTC } from './media'
import { UserTC } from './user'
import { MarkerTC } from './marker'

export const ProjectTC = composeWithMongoose(ProjectModel)

ProjectTC.addRelation('user', {
	resolver: () => UserTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.user,
	},
	projection: { user: true },
})

ProjectTC.addRelation('contents', {
	resolver: () => ContentTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source) => ({ project: source._id }),
	},
	projection: { id: true },
})

ProjectTC.addRelation('markers', {
	resolver: () => MarkerTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source) => ({ project: source._id }),
	},
	projection: { id: true },
})

ProjectTC.addRelation('medias', {
	resolver: () => MediaTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source) => ({ project: source._id }),
	},
	projection: { id: true },
})
