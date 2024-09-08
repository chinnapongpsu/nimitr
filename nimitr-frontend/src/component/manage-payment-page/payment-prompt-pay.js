import { useQuery } from '@apollo/client'
import { QrCode } from '@mui/icons-material'
import { Button, FormControl } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

import { useParams } from 'react-router-dom'

import transections from '../../graphql/queries/transections'

const PromptPay = ({
  t,
  member,
  memberId,
  closeDialog,
  price,
  setLoadingPromptPay,
  onDownloadUriChange
}) => {
  // console.log(
  //   '🚀 ~ file: payment-prompt-pay.js:4 ~ PromptPay ~ projectId:',
  //   memberId,
  // )
  // console.log(
  //   '🚀 ~ file: payment-prompt-pay.js:4 ~ PromptPay ~ member:',
  //   member,
  // )

  const params = useParams()
  const { data: transectionDataFilter } = useQuery(transections, {
    variables: {
      memberId: params?.memberId
    }
  })
  // console.log(
  //   '🚀 ~ file: payment-prompt-pay.js:22 ~ PromptPay ~ transectionDataFilter:',
  //   transectionDataFilter
  // )

  const [downloadUri, setDownloadUri] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const BACKEND = process.env.REACT_APP_DOMAIN

  const PUBLICKEY = process.env.REACT_APP_OMISE_PUBLIC_KEY

  const PROMPTPAYURL = BACKEND + '/checkout-prompt-pay'

  const ICON = BACKEND + '/assets/favicon.ico'

  OmiseCard = window.OmiseCard
  OmiseCard.configure({
    publicKey: PUBLICKEY,
    currency: 'thb',
    image: ICON,
    frameLabel: 'Nimitr',
    buttonLabel: 'Pay with Omise'
  })

  const promptpayConfigure = () => {
    window.OmiseCard.configure({
      defaultPaymentMethod: 'promptpay',
      otherPaymentMethod: []
    })
    window.OmiseCard.configureButton('#prompt-pay')
    window.OmiseCard.attach()
  }

  const omiseCardHandlerPromptPay = () => {
    const createPromptPayCharge = async (token, amount) => {
      setLoadingPromptPay(true)
      try {
        const res = await axios({
          method: 'post',
          url: PROMPTPAYURL,
          data: {
            token,
            amount,
            memberId
          }
        })
        setDownloadUri(res?.data?.downloadUri)
        setOpenDialog(true)

        onDownloadUriChange(res?.data?.downloadUri)

        // console.log(
        //   '😍 ~ file: payment-prompt-pay.js:55 ~ createPromptPayCharge ~ res.data.downloadUri:',
        //   res?.data?.downloadUri
        // )
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingPromptPay(false)
      }
    }

    const amount = price * 100

    OmiseCard.open({
      // frameDescription: 'Invoice #3847',
      amount,
      onCreateTokenSuccess: (token) => {
        // console.log(token)
        createPromptPayCharge(token, amount, memberId)
        closeDialog()
      },
      onFormClosed: () => {}
    })
  }

  const handleOnClickPromptPay = async (e) => {
    promptpayConfigure()
    omiseCardHandlerPromptPay()
  }

  return (
    <form
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Button
        sx={{
          borderRadius: '5px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
          fontWeight: 700,
          width: { xs: '100%', sm: '70%' },
          fontSize: '18px',
          alignSelf: 'center'
        }}
        variant="contained"
        id="prompt-pay"
        type="button"
        onClick={handleOnClickPromptPay}
      >
        <QrCode sx={{ mr: 1 }} />
        {t('payment_page.title_p38')}
      </Button>
    </form>
  )
}

export default PromptPay
