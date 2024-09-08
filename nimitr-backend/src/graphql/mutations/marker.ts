import { MarkerTC } from '../type-composers/marker'

const markerMutations = {
	createMarker: MarkerTC.getResolver('createOne'),
	updateMarker: MarkerTC.getResolver('updateById'),
	removeMarker: MarkerTC.getResolver('removeById'),
}

export default markerMutations
