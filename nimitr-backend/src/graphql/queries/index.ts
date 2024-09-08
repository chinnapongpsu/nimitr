import userQueries from './user'
import projectQueries from './project'
import markerQueries from './marker'
import mediaQueries from './media'
import contentQueries from './content'
import transectionQueries from './transection'
export default {
	...userQueries,
	...mediaQueries,
	...markerQueries,
	...contentQueries,
	...projectQueries,
	...transectionQueries
}
