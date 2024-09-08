import { schemaComposer } from 'graphql-compose'
import { MarkerTC } from '../type-composers/marker'
import { MarkerModel } from '../../models'
import mongoose from 'mongoose'

const markerOnlyProject = schemaComposer.createResolver({
    name: 'markerOnlyProject',
    type: [MarkerTC],
    args: {
      projectId: 'String!',
    },
    resolve: async ({ args }) => {
      const { projectId } = args
// if(!projectId){

//     throw new Error('Project ID not found')
// }
//       var project_id =new mongoose.Types.ObjectId(${projectId});

      const result = await MarkerModel.aggregate([
        { $addFields:{ projectId: { $toString: '$project' } }},
        { $match:{
                markerStatus:"MARKER_ALIVE"
                }
},
        { $match: {
            $or:[
                {markerType:"barcode"},
                {$and:[
                 { markerType:'nft'},
                 { projectId:projectId},
                  ]},

                ]
          } },
      ])
      console.log(result)
      return result
    },
  })

const markerQueries = {
    marker: MarkerTC.getResolver('findOne'),
    markerId: MarkerTC.getResolver('findById'),
    markers: MarkerTC.getResolver('findMany'),
    markerOnlyProject
}

export default markerQueries