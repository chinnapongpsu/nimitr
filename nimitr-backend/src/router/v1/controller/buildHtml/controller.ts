import express, { Request, Response, NextFunction } from 'express'
import { ContentModel, ProjectModel } from '../../../../models'
import mongoose from 'mongoose'
import config from 'config'
import { buildHtmlMindAR } from '../../components/html/htmlFormMindAR'
import { buildHtml } from '../../components/html/htmlForm'

const frontend = config.get('frontend.frontend_app_domain')
export const checkProjectStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params
    const ProjectConvert = new mongoose.Types.ObjectId(`${projectId}`)
    const project = await ProjectModel.findById(ProjectConvert)
    if (!project || project.projectStatus !== 'PROJECT_ALIVE') {
      return res.redirect(frontend + '/payment')
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(400).send(JSON.stringify(error))
  }
}

export const buildHtmlBarcode = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params
    const ProjectConvert = new mongoose.Types.ObjectId(`${projectId}`)
    const dataContent = await ContentModel.aggregate([
      {
        $match: {
          project: ProjectConvert,
          contentStatus: 'CONTENT_ALIVE',
        },
      },
      {
        $addFields: {
          markerId: {
            $toString: '$marker',
          },
        },
      },
      {
        $lookup: {
          from: 'markers',
          localField: 'marker',
          foreignField: '_id',
          as: 'markerdata',
        },
      },
      {
        $unwind: '$markerdata',
      },
      {
        $lookup: {
          from: 'media',
          localField: '_id',
          foreignField: 'content',
          as: 'mediadata',
        },
      },
      {
        $unwind: '$mediadata',
      },
    ])

    const html = buildHtml(dataContent)
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      Expires: new Date().toUTCString(),
    })
    res.end(html)
  } catch (error) {
    console.log(error)
    res.status(400).send(JSON.stringify(error))
  }
}

export const buildHtmlmindAR = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params
    const ProjectConvert = new mongoose.Types.ObjectId(`${projectId}`)
    const dataContent = await ContentModel.aggregate([
      {
        $match: {
          project: ProjectConvert,
          contentStatus: 'CONTENT_ALIVE',
        },
      },
      {
        $addFields: {
          markerId: {
            $toString: '$marker',
          },
        },
      },
      {
        $lookup: {
          from: 'markers',
          localField: 'marker',
          foreignField: '_id',
          as: 'markerdata',
        },
      },
      {
        $unwind: '$markerdata',
      },
      {
        $lookup: {
          from: 'media',
          localField: '_id',
          foreignField: 'content',
          as: 'mediadata',
        },
      },
      {
        $unwind: '$mediadata',
      },
    ])
    const html = buildHtmlMindAR(dataContent)
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      Expires: new Date().toUTCString(),
    })
    res.end(html)
  } catch (error) {
    console.log(error)
    res.status(400).send(JSON.stringify(error))
  }
}
