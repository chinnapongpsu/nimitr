import { useQuery } from '@apollo/client'
import { Grid, Typography, Box } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import PaymentDialog from '../component/manage-payment-page/paymentDialog'
import StartProject from '../component/manage-payment-page/startProject'
import AuthContext from '../contexts/AuthContext'
import memberUserId from '../graphql/queries/memberUser'
import userinfo from '../graphql/queries/userinfo'
import PricingModalDetails from '../component/manage-payment-page/packageGrid/pricingModal'
import PackageBox from '../component/manage-payment-page/packageGrid/PackageBox'
import FooterBox from '../component/ui/introPage/footer'
import { SkeletonPaymentPage } from '../component/manage-payment-page/skeleton/skeleton-payment-page'

export const PaymentPage = () => {
  const [isDetailsVisibleFree, setIsDetailsVisibleFree] = useState(false)

  const [isDetailsVisibleStarter, setIsDetailsVisibleStarter] = useState(false)

  const [isDetailsVisiblePremium, setIsDetailsVisiblePremium] = useState(false)

  const [isDetailsVisibleEnterprise, setIsDetailsVisibleEnterprise] =
    useState(false)

  const [isDialogOpen, setDialogOpenPay] = useState(false)
  const { t } = useTranslation()
  const params = useParams()
  const { data: memberUsersIdData, loading } = useQuery(memberUserId, {
    fetchPolicy: 'network-only',
    variables: {
      id: params?.memberUserId
    }
  })
  const { user } = useContext(AuthContext)
  const [quser, setQuser] = useState(null)
  // console.log(
  //   '🚀 ~ file: manage-payment-page.js:34 ~ PaymentPage ~ quser:',
  //   quser
  // )
  const { data } = useQuery(userinfo, {
    variables: {
      id: user && user._id ? user._id : 'default_id'
    }
  })
  useEffect(() => {
    if (data && data.userId && data.userId.rank) {
      setQuser(data.userId)
    }
  }, [data])

  const openDialog = () => {
    setDialogOpenPay(true)
  }
  const closeDialog = () => {
    setDialogOpenPay(false)
  }
  const [price, setPrice] = useState(0)

  return (
    <Box>
      {loading ? (
        <SkeletonPaymentPage />
      ) : (
        <>
          <Box>
            <Typography
              sx={{
                mt: 10,
                mb: 7,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: {
                  xs: '28px',
                  sm: '48px',
                  md: '48px',
                  lg: '48px'
                }
              }}
            >
              {t('payment_page.title_p4')}
              <br />
            </Typography>
            <Typography sx={{ textAlign: 'center', fontWeight: 700, mb: 10 }}>
              {t('payment_page.title_p5')}
              <br />
              {t('payment_page.title_p6')}
            </Typography>
          </Box>
          <Box
            sx={{
              py: { xs: 2, sm: 4 },
              px: { xs: 2, sm: 5, md: 10, lg: 15, xl: 4 },
              bgcolor: '#FFD102',
              borderRadius: '10px'
            }}
          >
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {/* กล่องที่ 1 ฟรี */}
              <PackageBox
                setIsDetailsVisible={setIsDetailsVisibleFree}
                textDescriptionBox={{
                  plan: 'Free',
                  price: '฿0',
                  title1: t('payment_page.title_p7'),
                  title2: t('payment_page.title_p8'),
                  subTitle1: t('payment_page.title_p11'),
                  subTitle2: (
                    <>
                      {t('payment_page.title_p9')}
                      <span style={{ color: '#4030FF' }}> 1 </span>
                      {t('payment_page.title_p10')}
                    </>
                  ),
                  subTitle3: (
                    <>
                      <span style={{ color: '#4030FF' }}>1 </span>
                      {t('payment_page.title_p12')}
                    </>
                  ),
                  subTitle4: (
                    <>
                      {t('payment_page.title_p13')}
                      <span style={{ color: '#4030FF' }}> 100 </span>
                      {t('payment_page.title_p14')}
                    </>
                  )
                }}
              />
              {/* กล่องที่ 1 ฟรี */}

              {/* กล่องที่ 2 */}
              <PackageBox
                params={params}
                setPrice={setPrice}
                openDialog={openDialog}
                isDetailsVisible={isDetailsVisibleStarter}
                setIsDetailsVisible={setIsDetailsVisibleStarter}
                quser={quser?.rank}
                textDescriptionBox={{
                  plan: 'Starter',
                  title1: t('payment_page.title_p7'),
                  title2: t('payment_page.title_p18'),
                  price: '฿300/' + t('payment_page.title_p21'),
                  perDay: t('payment_page.title_p42'),
                  subTitle1: t('payment_page.title_p11'),
                  subTitle2: (
                    <>
                      {t('payment_page.title_p9')}
                      <span style={{ color: '#4030FF' }}> 2 </span>
                      {t('payment_page.title_p10')}
                    </>
                  ),
                  subTitle3: (
                    <>
                      <span style={{ color: '#4030FF' }}>2 </span>
                      {t('payment_page.title_p15')}
                    </>
                  ),
                  subTitle4: (
                    <>
                      {t('payment_page.title_p13')}
                      <span style={{ color: '#4030FF' }}> 500 </span>
                      {t('payment_page.title_p14')}
                    </>
                  )
                }}
              />
              {/* กล่องที่ 2 */}

              {/* กล่องที่ 3 */}
              <PackageBox
                params={params}
                setPrice={setPrice}
                openDialog={openDialog}
                isDetailsVisible={isDetailsVisiblePremium}
                setIsDetailsVisible={setIsDetailsVisiblePremium}
                quser={quser?.rank}
                textDescriptionBox={{
                  plan: 'Premium',
                  title1: t('payment_page.title_p7'),
                  title2: t('payment_page.title_p19'),
                  price: '฿800/' + t('payment_page.title_p21'),
                  perDay: t('payment_page.title_p43'),
                  subTitle1: t('payment_page.title_p11'),
                  subTitle2: (
                    <>
                      {t('payment_page.title_p9')}
                      <span style={{ color: '#4030FF' }}> 6 </span>
                      {t('payment_page.title_p10')}
                    </>
                  ),
                  subTitle3: (
                    <>
                      <span style={{ color: '#4030FF' }}>6 </span>
                      {t('payment_page.title_p15')}
                    </>
                  ),
                  subTitle4: (
                    <>
                      {t('payment_page.title_p13')}
                      <span style={{ color: '#4030FF' }}> 1,000 </span>
                      {t('payment_page.title_p14')}
                    </>
                  )
                }}
              />

              {/* กล่องที่ 3 */}

              {/* กล่องที่ 4 */}
              <PackageBox
                params={params}
                setPrice={setPrice}
                openDialog={openDialog}
                isDetailsVisible={isDetailsVisibleEnterprise}
                setIsDetailsVisible={setIsDetailsVisibleEnterprise}
                quser={quser?.rank}
                textDescriptionBox={{
                  plan: 'Enterprise',
                  title1: t('payment_page.title_p7'),
                  title2: t('payment_page.title_p20'),
                  price: '฿2,000/' + t('payment_page.title_p21'),
                  perDay: t('payment_page.title_p44'),
                  subTitle1: t('payment_page.title_p11'),
                  subTitle2: (
                    <>
                      {t('payment_page.title_p9')}
                      <span style={{ color: '#4030FF' }}> 15 </span>
                      {t('payment_page.title_p10')}
                    </>
                  ),
                  subTitle3: (
                    <>
                      <span style={{ color: '#4030FF' }}>15 </span>
                      {t('payment_page.title_p15')}
                    </>
                  ),
                  subTitle4: (
                    <>
                      {t('payment_page.title_p16')}
                      <span style={{ color: '#4030FF' }}>
                        {t('payment_page.title_p17')}
                      </span>
                    </>
                  )
                }}
              />
              {/* กล่องที่ 4 */}
            </Grid>

            {/*Modal Free */}
            <PricingModalDetails
              isDetailsVisible={isDetailsVisibleFree}
              isDetailsVisibleFree={isDetailsVisibleFree}
              handleCloseModalFree={() => {
                setIsDetailsVisibleFree(false)
              }}
              params={params}
              openDialog={openDialog}
              memberId={params?.memberUserId}
              quser={quser?.rank}
              textDescriptionBox={{
                plan: 'FREE',
                price: '฿0',
                title1: t('payment_page.title_p33'),
                title2: t('payment_page.title_p34'),
                subTitle1: t('payment_page.title_p26'),
                subTitle2: (
                  <>
                    {t('payment_page.title_p9')}
                    <span style={{ color: '#4030FF' }}> 1 </span>
                    {t('payment_page.title_p10')}
                  </>
                ),
                subTitle3: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Barcode </span>
                    {t('payment_page.title_p28')}
                    <span style={{ color: '#4030FF' }}> 5 </span>
                    {t('payment_page.title_p29')}
                  </>
                ),
                subTitle4: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Marker Image </span>
                    {t('payment_page.title_p30')}
                    <span style={{ color: '#4030FF' }}> 2 </span>
                    {t('payment_page.title_p31')}
                  </>
                ),
                subTitle5: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p47')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 10</span>
                    MB.
                  </>
                ),
                subTitle6: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p48')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 30</span>
                    MB.
                  </>
                ),
                subTitle7: (
                  <>
                    {t('payment_page.title_p13')}
                    <span style={{ color: '#4030FF' }}> 100 </span>
                    {t('payment_page.title_p14')}
                  </>
                )
              }}
            />
            {/*Modal Free */}

            {/*Modal Starter */}
            <PricingModalDetails
              isDetailsVisible={isDetailsVisibleStarter}
              isDetailsVisibleStarter={isDetailsVisibleStarter}
              handleCloseModalStarter={() => {
                setIsDetailsVisibleStarter(false)
              }}
              params={params}
              openDialog={openDialog}
              memberId={params?.memberUserId}
              setPrice={setPrice}
              quser={quser?.rank}
              textDescriptionBox={{
                discount: '25% OFF',
                plan: 'Starter',
                price: '฿300/' + t('payment_page.title_p21'),
                perDay: t('payment_page.title_p42'),
                title1: t('payment_page.title_p32'),
                title2: t('payment_page.title_p18'),
                subTitle1: t('payment_page.title_p26'),
                subTitle2: (
                  <>
                    {t('payment_page.title_p9')}
                    <span style={{ color: '#4030FF' }}> 2 </span>
                    {t('payment_page.title_p10')}
                  </>
                ),
                subTitle3: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Barcode </span>
                    {t('payment_page.title_p28')}
                    <span style={{ color: '#4030FF' }}> 10 </span>
                    {t('payment_page.title_p29')}
                  </>
                ),
                subTitle4: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Marker Image </span>
                    {t('payment_page.title_p30')}
                    <span style={{ color: '#4030FF' }}> 5 </span>
                    {t('payment_page.title_p31')}
                  </>
                ),
                subTitle5: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p47')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 20</span>
                    MB.
                  </>
                ),
                subTitle6: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p48')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 100</span>
                    MB.
                  </>
                ),
                subTitle7: (
                  <>
                    {t('payment_page.title_p13')}
                    <span style={{ color: '#4030FF' }}> 500 </span>
                    {t('payment_page.title_p14')}
                  </>
                )
              }}
            />
            {/*Modal Starter */}

            {/*Modal Premium */}
            <PricingModalDetails
              isDetailsVisible={isDetailsVisiblePremium}
              isDetailsVisiblePremium={isDetailsVisiblePremium}
              handleCloseModalPremium={() => {
                setIsDetailsVisiblePremium(false)
              }}
              params={params}
              openDialog={openDialog}
              memberId={params?.memberUserId}
              setPrice={setPrice}
              quser={quser?.rank}
              textDescriptionBox={{
                discount: '25% OFF',
                plan: 'Premium',
                perDay: t('payment_page.title_p43'),
                price: '฿800/' + t('payment_page.title_p21'),
                title1: t('payment_page.title_p32'),
                title2: t('payment_page.title_p19'),
                subTitle1: t('payment_page.title_p26'),
                subTitle2: (
                  <>
                    {t('payment_page.title_p9')}
                    <span style={{ color: '#4030FF' }}> 6 </span>
                    {t('payment_page.title_p10')}
                  </>
                ),
                subTitle3: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Barcode </span>
                    {t('payment_page.title_p28')}
                    <span style={{ color: '#4030FF' }}> 35 </span>
                    {t('payment_page.title_p29')}
                  </>
                ),
                subTitle4: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Marker Image </span>
                    {t('payment_page.title_p30')}
                    <span style={{ color: '#4030FF' }}> 15 </span>
                    {t('payment_page.title_p31')}
                  </>
                ),
                subTitle5: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p47')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 35</span>
                    MB.
                  </>
                ),
                subTitle6: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p48')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 500</span>
                    MB.
                  </>
                ),
                subTitle7: (
                  <>
                    {t('payment_page.title_p13')}
                    <span style={{ color: '#4030FF' }}> 1,000 </span>
                    {t('payment_page.title_p14')}
                  </>
                )
              }}
            />
            {/*Modal Premium */}

            {/*Modal Enterprise */}
            <PricingModalDetails
              isDetailsVisible={isDetailsVisibleEnterprise}
              isDetailsVisibleEnterprise={isDetailsVisibleEnterprise}
              handleCloseModalEnterprise={() => {
                setIsDetailsVisibleEnterprise(false)
              }}
              params={params}
              openDialog={openDialog}
              memberId={params?.memberUserId}
              setPrice={setPrice}
              quser={quser?.rank}
              textDescriptionBox={{
                discount: '25% OFF',
                plan: 'Enterprise',
                price: '฿2,000/' + t('payment_page.title_p21'),
                perDay: t('payment_page.title_p44'),
                title1: t('payment_page.title_p32'),
                title2: t('payment_page.title_p20'),
                subTitle1: t('payment_page.title_p26'),
                subTitle2: (
                  <>
                    {t('payment_page.title_p9')}
                    <span style={{ color: '#4030FF' }}> 15 </span>
                    {t('payment_page.title_p10')}
                  </>
                ),
                subTitle3: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Barcode </span>
                    {t('payment_page.title_p28')}
                    <span style={{ color: '#4030FF' }}> 63 </span>
                    {t('payment_page.title_p29')}
                  </>
                ),
                subTitle4: (
                  <>
                    <span style={{ color: '#4030FF' }}>1 </span>
                    {t('payment_page.title_p27')}
                    <span style={{ color: '#4030FF' }}> Marker Image </span>
                    {t('payment_page.title_p30')}
                    <span style={{ color: '#4030FF' }}> 30 </span>
                    {t('payment_page.title_p31')}
                  </>
                ),
                subTitle5: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p47')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 50</span>
                    MB.
                  </>
                ),
                subTitle6: (
                  <>
                    {t('payment_page.title_p46')}
                    <span style={{ color: '#4030FF' }}>
                      {t('payment_page.title_p48')}
                    </span>
                    {t('payment_page.title_p49')}
                    <span style={{ color: '#4030FF' }}> 1</span>
                    GB.
                  </>
                ),
                subTitle7: (
                  <>
                    {t('payment_page.title_p16')}
                    <span style={{ color: '#4030FF' }}>
                      {' '}
                      {t('payment_page.title_p17')}{' '}
                    </span>
                    {t('payment_page.title_p14')}
                  </>
                )
              }}
            />
            {/*Modal Enterprise */}

            {/* เริ่มต้น โปรเจกต์ ของคุณ */}
            <StartProject />
            {/* เริ่มต้น โปรเจกต์ ของคุณ */}
          </Box>
          <PaymentDialog
            t={t}
            isOpen={isDialogOpen}
            onClose={closeDialog}
            memberUsersIdData={memberUsersIdData}
            params={params}
            price={price}
            memberId={params?.memberUserId}
            quser={quser?.rank}
          />
          <FooterBox />
        </>
      )}
    </Box>
  )
}
