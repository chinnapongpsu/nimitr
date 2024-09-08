import { TransectionTC } from '../type-composers/transection'

const transectionMutations = {
	createTransection: TransectionTC.getResolver('createOne'),
	updateTransection: TransectionTC.getResolver('updateById'),
	removeTransection: TransectionTC.getResolver('removeById'),
}

export default transectionMutations
