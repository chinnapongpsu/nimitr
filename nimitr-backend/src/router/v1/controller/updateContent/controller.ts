import { ContentModel, UserModel, ProjectModel } from '../../../../models'
import { Request, Response } from 'express'

export const updateContent = async (req: Request, res: Response) => {
  try {
    // Extract the content ID and the 'nowuse' field from the request body
    const { id, nowuse } = req.body

    // Ensure that 'nowuse' is a number
    const newNowUse = parseInt(nowuse)

    // Check if 'newNowUse' is a valid number
    if (isNaN(newNowUse)) {
      return res.status(400).json({ error: 'Invalid value for nowuse' })
    }

    // Perform the update operation on the ContentModel
    const updatedContent = await ContentModel.findByIdAndUpdate(
      id, // Use the received ID for updating the specific content
      { $inc: { nowuse: 1 } }, // Increment the 'nowuse' field by 1
      { new: true } // Return the updated document
    )

    // Check if the content was updated successfully
    if (!updatedContent) {
      return res.status(404).json({ error: 'Content not found' })
    }

    const projectbyContent = await ProjectModel.findById(updatedContent.project)
    if (!projectbyContent) {
      return res.status(404).json({ error: 'Project not found' })
    }

    const userByproject = await UserModel.findById(projectbyContent.user)
    if (!userByproject) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if 'nowuse' is greater than or equal to 'maxperuse'
    if (updatedContent.nowuse >= userByproject.maxperuse) {
      updatedContent.contentStatus = 'CONTENT_MAXIMUM'
    }

    // Save the updated content with the new 'contentStatus'
    await updatedContent.save()

    // Respond with a success message and the updated content
    res.json({
      message: 'Content updated successfully',
      updatedContent,
      contentStatus: updatedContent.contentStatus,
    })
  } catch (error) {
    // Handle any errors that occur during the update
    console.error('Error updating content', error)
    res.status(500).json({ error: 'An internal server error occurred' })
  }
}
