import { ProjectTC } from '../type-composers/project'

const projectMutations = {
	createProject: ProjectTC.getResolver('createOne'),
	updateProject: ProjectTC.getResolver('updateById'),
	removeProject: ProjectTC.getResolver('removeById'),
}

export default projectMutations
