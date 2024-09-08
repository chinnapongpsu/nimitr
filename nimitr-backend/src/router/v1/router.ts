import { Request, Response, Router } from 'express'

import { check } from './auth/auth'
import validationEmailSend from './controller/email/validate'
import validationGroup from './controller/group/validate'
import {
  CheckoutCreditCardPayment,
  CheckoutPromptPay,
  Webhook,
} from './controller/payment/controller'
import { markersget, markerspost } from './controller/markers/controller'
import { updateContent } from './controller/updateContent/controller'
import { buildHtmlBarcode, buildHtmlmindAR, checkProjectStatus } from './controller/buildHtml/controller'

// http://localhost:4000/api/v1/message
const routerv1 = Router()

routerv1.route('/').get((req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})
// check
routerv1.route('/checkout-credit-card').post(CheckoutCreditCardPayment)
routerv1.route('/checkout-prompt-pay').post(CheckoutPromptPay)
routerv1.route('/webhooks').post(Webhook)
routerv1.route('/api/v1/markers').post(markerspost).get(markersget)
routerv1.route('/api/updateContent').post(updateContent)
routerv1.route('/api/v1/render/:projectId').get(checkProjectStatus,buildHtmlBarcode)
routerv1.route('/api/v1/render/:projectId/mindar').get(checkProjectStatus,buildHtmlmindAR)



// routerv1
// 	.route('/group/:groupId')
// 	.get(group.getByIdGroup as any)
// 	.put(group.updateGroup as any)
// 	.delete(group.deleteGroup as any)

// router.route('/message/:id')
//   .put(validationCustomer, message.updateCustomer)
//   .delete(message.deleteCustomer)
// router.route('/message/:code')
//   .get(message.getByCodeCustomer)

export default routerv1
