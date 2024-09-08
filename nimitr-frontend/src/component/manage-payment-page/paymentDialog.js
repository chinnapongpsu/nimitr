import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'
import CreditPayment from './creditCardpayment'
import PromptPay from './payment-prompt-pay'
import CreditCardSuccessfulDialog from './creditCardSuccessfulDialog'
import DownloadUriDialog from './qrPromptPayDialog'
import LoadingCreditCardProgress from './loadingProgressCreditCard'
import LoadingPromptPayProgress from './loadingProgressPromptPay'

const PaymentDialog = ({
  t,
  isOpen,
  onClose,
  memberUsersIdData,
  params,
  price,
  memberId,
  quser
}) => {
  // console.log('🚀 ~ file: paymentDialog.js:19 ~ quser:', quser)
  // console.log('🚀 ~ file: paymentDialog.js:24 ~ memberId:', memberId)
  const [loadingCreditCard, setLoadingCreditCard] = useState(false)
  const [loadingPromptPay, setLoadingPromptPay] = useState(false)
  const [charge, setCharge] = useState(undefined)
  const [downloadUri, setDownloadUri] = useState(null)

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>
          {t('payment_page.title_p36')}
        </DialogTitle>
        <DialogContent>
          <>
            <CreditPayment
              t={t}
              memberUsersIdData={memberUsersIdData}
              params={params}
              closeDialog={onClose}
              price={price}
              setLoadingCreditCard={setLoadingCreditCard}
              setCharge={setCharge}
            />
            <PromptPay
              t={t}
              member={memberUsersIdData?.memberUserId}
              memberId={params?.memberUserId}
              closeDialog={onClose}
              price={price}
              setLoadingPromptPay={setLoadingPromptPay}
              onDownloadUriChange={(newDownloadUri) =>
                setDownloadUri(newDownloadUri)
              }
            />
            {quser !== 'NOMAL' && (
              <Typography
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                  justifyContent: 'center',
                  mt: 2,
                  color: 'red'
                }}
              >
                {t('payment_page.title_p0')} "{quser}"
                {t('payment_page.title_p37')}
              </Typography>
            )}
            <Typography
              sx={{
                color: 'red',
                fontWeight: 700,
                textAlign: 'center',
                fontSize: '14px',
                pt: 2
              }}
            >
              {t('payment_page.title_p45')}
            </Typography>
          </>
        </DialogContent>
      </Dialog>
      {loadingCreditCard && <LoadingCreditCardProgress />}
      <CreditCardSuccessfulDialog charge={charge} t={t} />

      {loadingPromptPay && <LoadingPromptPayProgress />}
      <DownloadUriDialog t={t} downloadUri={downloadUri} _id={memberId} />
    </>
  )
}

export default PaymentDialog
