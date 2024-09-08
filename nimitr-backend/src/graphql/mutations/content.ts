import { ContentTC } from '../type-composers/content'

const ContentMutations = {
	createContent: ContentTC.getResolver('createOne'),
	updateContent: ContentTC.getResolver('updateById'),
	removeContent: ContentTC.getResolver('removeById'),
}

export default ContentMutations
