import { TransectionTC } from "../type-composers/transection"

const transectionQueries = {
	transection: TransectionTC.getResolver('findOne'),
	transectionId: TransectionTC.getResolver('findById'),
	transections: TransectionTC.getResolver('findMany'),
}

export default transectionQueries
