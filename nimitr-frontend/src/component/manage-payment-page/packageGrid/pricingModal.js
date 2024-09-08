import React from 'react'
import { Modal, Box, Typography, Grid } from '@mui/material'
import { Check } from '@mui/icons-material'
import PaymentButton from '../buttonPayment/buttonPayment'
import ButtonFree from '../buttonPayment/buttonFree'
import { useTranslation } from 'react-i18next'

const PricingModalDetails = ({
  isDetailsVisible,
  isDetailsVisibleFree,
  isDetailsVisibleStarter,
  isDetailsVisiblePremium,
  isDetailsVisibleEnterprise,
  params,
  openDialog,
  setPrice,
  quser,
  handleCloseModalFree,
  handleCloseModalStarter,
  handleCloseModalPremium,
  handleCloseModalEnterprise,
  textDescriptionBox
}) => {
  const { t } = useTranslation()
  const isXSModal = window.innerWidth <= 899 // You can adjust this value

  // Add a CSS class to control overflow for xs modal
  const modalContentStyle = isXSModal
    ? {
        overflowY: 'auto', // Enable vertical scrolling
        maxHeight: '80vh' // Limit the maximum height for scrolling
      }
    : {}
  return (
    <>
      <Modal
        open={isDetailsVisible}
        onClose={
          handleCloseModalFree ||
          handleCloseModalStarter ||
          handleCloseModalPremium ||
          handleCloseModalEnterprise
        }
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '80%', sm: '80%', md: '70%', lg: '60%', xl: '60%' },
            height: 'auto',
            backgroundColor: '#fff8ba',
            p: { xs: 2, sm: 4 },
            ...modalContentStyle
          }}
        >
          <Grid container direction="row" xs={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box sx={{ p: { xs: 2, sm: 4, md: 4, lg: 4, xl: 4 }, pl: 6 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: '14px',
                      sm: '16px',
                      md: '16px',
                      lg: '16px',
                      xl: '20px'
                    },
                    textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)',
                    maxWidth: {
                      xs: '35%',
                      sm: '25%',
                      md: '40%',
                      lg: '35%',
                      xl: '30%'
                    },
                    textAlign: 'center',
                    width: '100%',
                    height: 'auto',
                    backgroundColor: 'red',
                    borderRadius: 5
                  }}
                >
                  {textDescriptionBox?.discount}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: '28px',
                      sm: '48px',
                      md: '36px',
                      lg: '42px',
                      xl: '60px'
                    },
                    textTransform: 'uppercase'
                  }}
                >
                  {textDescriptionBox?.plan}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: '22px',
                      sm: '44px',
                      md: '36px',
                      lg: '40px',
                      xl: '52px'
                    },
                    color: '#466EFD',
                    pl: 4
                  }}
                >
                  {textDescriptionBox?.price}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '12px', sm: '16px' },
                    color: 'red'
                  }}
                >
                  {textDescriptionBox?.perDay}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      sm: '22px',
                      md: '18px',
                      lg: '20px',
                      xl: '30px'
                    },
                    mt: { xs: 2, sm: 5, md: 5, lg: 5, xl: 5 },
                    textShadow: '1px 0px 1px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {textDescriptionBox?.title1}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      sm: '22px',
                      md: '18px',
                      lg: '20px',
                      xl: '30px'
                    },
                    mt: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                    textShadow: '1px 0px 1px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {textDescriptionBox?.title2}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'auto'
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 209, 2, 0.5)',
                  borderRadius: 3,
                  py: { xs: 1, sm: 5, md: 5, lg: 5, xl: 5 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    display: 'grid',
                    gridTemplateColumns: '35px auto',
                    alignItems: 'center'
                  }}
                >
                  <Check
                    sx={{
                      fontWeight: 700,
                      width: { xs: '25px', sm: '35px' },
                      height: { xs: '25px', sm: '35px' }
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '12px',
                        sm: '16px',
                        md: '14px',
                        lg: '16px',
                        xl: '20px'
                      },
                      my: 1,
                      ml: 1
                    }}
                  >
                    {textDescriptionBox?.subTitle1}
                  </Typography>

                  <Check
                    sx={{
                      fontWeight: 700,
                      width: { xs: '25px', sm: '35px' },
                      height: { xs: '25px', sm: '35px' }
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '12px',
                        sm: '16px',
                        md: '14px',
                        lg: '16px',
                        xl: '20px'
                      },
                      my: 1,
                      ml: 1
                    }}
                  >
                    {textDescriptionBox?.subTitle2}
                  </Typography>

                  <Check
                    sx={{
                      fontWeight: 700,
                      width: { xs: '25px', sm: '35px' },
                      height: { xs: '25px', sm: '35px' }
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '12px',
                        sm: '16px',
                        md: '14px',
                        lg: '16px',
                        xl: '20px'
                      },
                      my: 1,
                      ml: 1
                    }}
                  >
                    {textDescriptionBox?.subTitle3}
                  </Typography>

                  <Check
                    sx={{
                      fontWeight: 700,
                      width: { xs: '25px', sm: '35px' },
                      height: { xs: '25px', sm: '35px' }
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '12px',
                        sm: '16px',
                        md: '14px',
                        lg: '16px',
                        xl: '20px'
                      },
                      my: 1,
                      ml: 1
                    }}
                  >
                    {textDescriptionBox?.subTitle4}
                  </Typography>

                  <Check
                    sx={{
                      fontWeight: 700,
                      width: { xs: '25px', sm: '35px' },
                      height: { xs: '25px', sm: '35px' }
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '12px',
                        sm: '16px',
                        md: '14px',
                        lg: '16px',
                        xl: '20px'
                      },
                      my: 1,
                      ml: 1
                    }}
                  >
                    {textDescriptionBox?.subTitle5}
                  </Typography>

                  <Check
                    sx={{
                      fontWeight: 700,
                      width: { xs: '25px', sm: '35px' },
                      height: { xs: '25px', sm: '35px' }
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '12px',
                        sm: '16px',
                        md: '14px',
                        lg: '16px',
                        xl: '20px'
                      },
                      my: 1,
                      ml: 1
                    }}
                  >
                    {textDescriptionBox?.subTitle6}
                  </Typography>

                  <Check
                    sx={{
                      fontWeight: 700,
                      width: { xs: '25px', sm: '35px' },
                      height: { xs: '25px', sm: '35px' }
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '12px',
                        sm: '16px',
                        md: '14px',
                        lg: '16px',
                        xl: '20px'
                      },
                      my: 1,
                      ml: 1
                    }}
                  >
                    {textDescriptionBox?.subTitle7}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: { xs: 0, sm: 0, md: 0, lg: 0, xl: 15 }
                  }}
                >
                  {isDetailsVisibleFree && <ButtonFree />}
                  {isDetailsVisibleStarter && (
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
                  )}
                  {isDetailsVisiblePremium && (
                    <PaymentButton
                      buttonText={
                        quser === 'PREMIUM'
                          ? t('payment_page.title_p23')
                          : t('payment_page.title_p22')
                      }
                      disabledCondition={
                        quser === 'PREMIUM' || quser === 'ENTERPRISE'
                      }
                      params={params}
                      setPrice={setPrice}
                      openDialog={openDialog}
                      packageName={textDescriptionBox?.plan}
                    />
                  )}
                  {isDetailsVisibleEnterprise && (
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
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default PricingModalDetails
