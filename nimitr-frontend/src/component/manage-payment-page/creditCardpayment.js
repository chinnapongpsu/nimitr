import { useQuery } from '@apollo/client'
import { CreditCard } from '@mui/icons-material'
import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import memberUserId from '../../graphql/queries/memberUser'

const CreditPayment = ({
  t,
  price,
  setLoadingCreditCard,
  setCharge,
  closeDialog
}) => {
  // console.log(
  //   '🚀 ~ file: creditCardpayment.js:21 ~ CreditPayment ~ price:',
  //   price,
  // )
  const params = useParams()
  const { data: memberUsersIdData } = useQuery(memberUserId, {
    variables: {
      id: params?.memberUserId
    }
  })
  // console.log(
  //   '🚀 ~ file: payment-test.js:72 ~ PaymentPage ~ memberUsersIdData:',
  //   memberUsersIdData,
  // )
  // console.log(
  //   '🚀 ~ file: payment-test.js:68 ~ PaymentPage ~ params?.memberUserId:',
  //   params?.memberUserId,
  // )

  const BACKEND = process.env.REACT_APP_DOMAIN

  const PUBLICKEY = process.env.REACT_APP_OMISE_PUBLIC_KEY

  const CREDITCARDURL = BACKEND + '/checkout-credit-card'
  // console.log("🚀 ~ file: creditCardpayment.js:41 ~ CREDITCARDURL:", CREDITCARDURL)

  const ICON = BACKEND + '/assets/favicon.ico'

  OmiseCard = window.OmiseCard
  OmiseCard.configure({
    publicKey: PUBLICKEY,
    currency: 'thb',
    image: ICON,
    frameLabel: 'Nimitr',
    submitLabel: 'PAY NOW',
    buttonLabel: 'Pay with Omise'
  })

  const creditCardConfigure = () => {
    window.OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethod: []
    })
    window.OmiseCard.configureButton('#credit-card')
    window.OmiseCard.attach()
  }

  const omiseCardHandlerCreditCard = () => {
    const createCreditCardCharge = async (
      token,
      memberId,
      amount,
      email,
      username
    ) => {
      setLoadingCreditCard(true)
      try {
        const res = await axios({
          method: 'post',
          url: CREDITCARDURL,
          data: {
            token,
            memberId,
            amount,
            email,
            username
          }
        })
        const resData = res.data
        setCharge(resData)
      } catch (error) {
      } finally {
        setLoadingCreditCard(false)
      }
    }
    if (memberUsersIdData && memberUsersIdData.memberUserId) {
      const { email } = memberUsersIdData.memberUserId
      const { username } = memberUsersIdData.memberUserId
      const amount = price * 100
      const memberId = params?.memberUserId // ดึงค่า memberId จาก params

      OmiseCard.open({
        // frameDescription: 'Invoice #3847',
        amount,
        onCreateTokenSuccess: (token) => {
          // console.log(token)
          createCreditCardCharge(token, memberId, amount, email, username) // ส่ง memberId แทนที่ memberUsersIdData
          closeDialog()
        },
        onFormClosed: () => {}
      })
    }
  }

  const handleOnClickCreditCard = (e) => {
    e.preventDefault()
    creditCardConfigure() // Call the creditCardConfigure function
    omiseCardHandlerCreditCard()
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
          mb: 1,
          fontWeight: 700,
          width: { xs: '100%', sm: '70%' },
          fontSize: '18px',
          alignSelf: 'center'
        }}
        variant="contained"
        id="credit-card"
        type="button"
        onClick={handleOnClickCreditCard}
      >
        <CreditCard sx={{ mr: 1 }} />
        {t('payment_page.title_p35')}
      </Button>
    </form>
  )
}
export default CreditPayment
