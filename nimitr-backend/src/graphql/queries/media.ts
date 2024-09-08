import { MediaTC } from '../type-composers/media'

const mediaQueries = {
	media: MediaTC.getResolver('findOne'),
	mediaId: MediaTC.getResolver('findById'),
	medias: MediaTC.getResolver('findMany'),
}

export default mediaQueries
