import { ProjectTC } from '../type-composers/project'

const projectQueries = {
	project: ProjectTC.getResolver('findOne'),
	projectId: ProjectTC.getResolver('findById'),
	projects: ProjectTC.getResolver('findMany'),
}

export default projectQueries
