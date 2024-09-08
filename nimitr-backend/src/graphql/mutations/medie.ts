import { MediaTC } from '../type-composers/media'

const mediaMutations = {
	createMedia: MediaTC.getResolver('createOne'),
	updateMedia: MediaTC.getResolver('updateById'),
	removeMedia: MediaTC.getResolver('removeById'),
}

export default mediaMutations
