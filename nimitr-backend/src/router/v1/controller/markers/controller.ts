import { Request, Response } from 'express'
import { MarkerModel } from '../../../../models'

export const markersget = async (
  res: Response,
) => {
  try {
    const data = await MarkerModel.find({
      markerStatus: 'MARKER_ALIVE',
    })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(400).send(JSON.stringify(error))
  }
}

export const markerspost = async (
  req: Request,
  res: Response,
) => {
  try {
    const { projectId } = req.body
    if (!projectId) {
      res.status(400).json({
        message: 'Project not found',
      })
      return
    }

    const markerStatusArray = ['MARKER_ALIVE', 'MARKER_LOCK']

    const data = await MarkerModel.aggregate([
      { $addFields: { projectId: { $toString: '$project' } } },
      {
        $match: {
          markerStatus: { $in: markerStatusArray },
        },
      },
      {
        $match: {
          $or: [
            { markerType: 'barcode' },
            {
              $and: [{ markerType: 'nft' }, { projectId: projectId }],
            },
            {
              $and: [{ markerType: 'mindar' }, { projectId: projectId }],
            },
          ],
        },
      },
    ])

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(400).send(JSON.stringify(error))
  }
}
