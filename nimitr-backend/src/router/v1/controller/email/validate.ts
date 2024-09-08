const validationEmailSend = (req: { body: { templateId: any, sender: any, groupId: any, uid: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: number; code: string; message: string }): void; new(): any } } }, next: () => void) => {
  try {
    const { templateId, sender, groupId, uid } = req.body
    console.log("groupId.length === 0", Array.isArray(groupId));
    if (!templateId || templateId.trim() === '') {
      res.status(400).json({
        status: 400,
        code: 'ERROR_TEMPLATEID_REQUIRED',
        message: 'Subject is required',
      })
    } else if (!sender || sender.trim() === '') {
      res.status(400).json({
        status: 400,
        code: 'ERROR_SENDER_REQUIRED',
        message: 'Body is required',
      })
    } else if (!groupId && !uid) {
      res.status(400).json({
        status: 400,
        code: 'ERROR_RECIEVER[groupId_or_uid]_REQUIRED',
        message: 'Body is required',
      })
    }
    // else if (groupId) {
    //   if (!Array.isArray(groupId)) {
    //     res.status(400).json({
    //       status: 400,
    //       code: 'ERROR_GROUPID_IS_NOT_AN_ARRAY',
    //       message: 'Groupid is not an array ',
    //     })
    //   }
    // } else if (uid) {
    //   if (!Array.isArray(uid)) {
    //     res.status(400).json({
    //       status: 400,
    //       code: 'ERROR_UID_IS_NOT_AN_ARRAY',
    //       message: 'Uid is not an array ',
    //     })
    //   }
    // } 
    else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      code: 'ERROR_INTERNAL_SERVER',
      message: 'Unknown Internal Server Error.',
    })
  }
}
export default validationEmailSend

