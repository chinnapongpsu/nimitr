import React from 'react'
import { Typography, Grid, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Check } from '@mui/icons-material'
import { styled } from '@mui/system'
import PaymentButton from '../buttonPayment/buttonPayment'
import ButtonFree from '../buttonPayment/buttonFree'

const StyledBox = styled(Box)`
  background-color: #fff8ba;
  border-radius: 10px;
  padding: 60px 40px;
  transition: all 0.3s ease;
  cursor: pointer; /* เพิ่ม cursor เป็น pointer เพื่อแสดงว่าเป็นสิ่งที่คลิกได้ */

  &:hover {
    background-color: #ffe77a;
    transform: scale(1.1);
  }
`

const PackageBox = ({
  params,
  setPrice,
  openDialog,
  isDetailsVisible,
  setIsDetailsVisible,
  quser,
  textDescriptionBox
}) => {
  const { t } = useTranslation()

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible)
  }
  return (
    <Grid item xs={12} sm={8} md={6} lg={6} xl={2.5}>
      <StyledBox onClick={toggleDetailsVisibility}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: '40px',
                sm: '56px',
                md: '52px',
                lg: '52px',
                xl: '50px'
              }
            }}
          >
            {textDescriptionBox?.plan}
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: '14px', sm: '16px' },
              mb: 1,
              color: '#000000'
            }}
          >
            {textDescriptionBox?.title1}
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: '14px', sm: '16px' },
              mb: 1,
              color: '#000000'
            }}
          >
            {textDescriptionBox?.title2}
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: '32px',
                sm: '40px',
                md: '40px',
                lg: '36px',
                xl: '34px'
              },
              color: '#466EFD',
              mt: 2
            }}
          >
            {textDescriptionBox?.price}
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: '12px',
                sm: '14px'
              },
              color: 'red'
            }}
          >
            {textDescriptionBox?.perDay}
          </Typography>

          <Box
            sx={{
              my: 2,
              display: 'grid',
              gridTemplateColumns: '40px auto',
              alignItems: 'center'
            }}
          >
            <Check sx={{ mr: 0.5 }} />
            <Typography sx={{ fontWeight: 700, fontSize: '16px', my: 1 }}>
              {textDescriptionBox?.subTitle1}
            </Typography>

            <Check sx={{ mr: 0.5 }} />
            <Typography sx={{ fontWeight: 700, fontSize: '16px', my: 1 }}>
              {textDescriptionBox?.subTitle2}
            </Typography>

            <Check sx={{ mr: 0.5 }} />
            <Typography sx={{ fontWeight: 700, fontSize: '16px', my: 1 }}>
              {textDescriptionBox?.subTitle3}
            </Typography>

            <Check sx={{ mr: 0.5 }} />
            <Typography sx={{ fontWeight: 700, fontSize: '16px', my: 1 }}>
              {textDescriptionBox?.subTitle4}
            </Typography>
          </Box>
        </Grid>

        {textDescriptionBox?.plan === 'Free' ? (
          <ButtonFree />
        ) : textDescriptionBox?.plan === 'Starter' ? (
          <PaymentButton
            buttonText={
              quser === 'STARTER'
                ? t('payment_page.title_p23')
                : t('payment_page.title_p22')
            }
            disabledCondition={
              quser === 'STARTER' ||
              quser === 'PREMIUM' ||
              quser === 'ENTERPRISE'
            }
            params={params}
            setPrice={setPrice}
            openDialog={openDialog}
            packageName={textDescriptionBox?.plan}
          />
        ) : textDescriptionBox?.plan === 'Premium' ? (
          <PaymentButton
            buttonText={
              quser === 'PREMIUM'
                ? t('payment_page.title_p23')
                : t('payment_page.title_p22')
            }
            disabledCondition={quser === 'PREMIUM' || quser === 'ENTERPRISE'}
            params={params}
            setPrice={setPrice}
            openDialog={openDialog}
            packageName={textDescriptionBox?.plan}
          />
        ) : textDescriptionBox?.plan === 'Enterprise' ? (
          <PaymentButton
            buttonText={
              quser === 'ENTERPRISE'
                ? t('payment_page.title_p23')
                : t('payment_page.title_p22')
            }
            disabledCondition={quser === 'ENTERPRISE'}
            params={params}
            setPrice={setPrice}
            openDialog={openDialog}
            packageName={textDescriptionBox?.plan}
          />
        ) : null}
      </StyledBox>
    </Grid>
  )
}

export default PackageBox
