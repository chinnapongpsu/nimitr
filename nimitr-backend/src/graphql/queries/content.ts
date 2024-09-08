import { ContentTC } from '../type-composers/content'

const contentQueries = {
	content: ContentTC.getResolver('findOne'),
	contentId: ContentTC.getResolver('findById'),
	contents: ContentTC.getResolver('findMany'),
}

export default contentQueries
