import React from 'react'
import { Grid, Typography, Box, Link } from '@mui/material'
import { Check, Close } from '@mui/icons-material'

const ImageRecommendation = ({
  theme,
  imageSource,
  altText,
  isRecommended
}) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        p: 3
      }}
    >
      <Box
        alt={altText}
        component="img"
        src={imageSource}
        sx={{
          maxWidth: '500px',
          width: '100%',
          height: 'auto',
          pb: 2
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          width: '5%',
          paddingBottom: '5%',
          borderRadius: '50%',
          position: 'relative',
          bgcolor: isRecommended
            ? theme.palette.primary.green
            : theme.palette.primary.red
        }}
      >
        {isRecommended ? (
          <Check
            sx={{
              fontSize: '2vw',
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ) : (
          <Close
            sx={{
              fontSize: '2vw',
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </Box>
    </Grid>
  )
}

const GoodImageAr = ({ t, theme }) => {
  const recommendations = [
    {
      description: t('goodimageAr_compo.title_p7'),
      recommendedImage: '/recommendimage1.jpg',
      nonRecommendedImage: '/recommendimage2.jpg'
    },
    {
      description: t('goodimageAr_compo.title_p8'),
      recommendedImage: '/recommendimage3.jpg',
      nonRecommendedImage: '/recommendimage4.jpg'
    },
    {
      description: t('goodimageAr_compo.title_p9'),
      recommendedImage: '/recommendimage5.jpg',
      nonRecommendedImage: '/recommendimage6.jpg'
    },
    {
      description: t('goodimageAr_compo.title_p10'),
      recommendedImage: '/recommendimage7.jpeg',
      nonRecommendedImage: '/recommendimage8.jpeg'
    },
    {
      description: t('goodimageAr_compo.title_p11'),
      recommendedImage: '/recommendimage9.jpg',
      nonRecommendedImage: '/recommendimage10.jpg'
    },
    {
      description: t('goodimageAr_compo.title_p12'),
      recommendedImage: '/recommendimage11.jpg',
      nonRecommendedImage: '/recommendimage12.jpg'
    }
    // ...เพิ่ม recommendations อื่น ๆ ตามต้องการ...
  ]
  return (
    <Grid container sx={{ py: 10, display: 'flex', flexDirection: 'column' }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: {
            xs: '34px',
            sm: '38px',
            md: '42px',
            lg: '46px',
            xl: '48px'
          }
        }}
      >
        {t('goodimageAr_compo.title_p1')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: '16px',
              sm: '18px',
              md: '16px',
              lg: '18px',
              xl: '24px'
            },
            backgroundColor: theme.palette.primary.main,
            display: 'inline-block',
            py: 2,
            px: 1,
            borderRadius: { xs: 0, md: 10 }
          }}
        >
          {t('goodimageAr_compo.title_p2')}
        </Typography>
      </Box>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: {
            xs: '16px',
            sm: '18px',
            md: '16px',
            lg: '18px',
            xl: '24px'
          }
        }}
      >
        <span style={{ color: theme.palette.primary.red }}>
          {t('goodimageAr_compo.title_p3')}
        </span>
        : {t('goodimageAr_compo.title_p4')}
        <Link
          href="https://help.scoot.app/how-do-i-enable-my-browsers-hardware-acceleration"
          target="_blank"
          sx={{
            color: theme.palette.primary.black,
            fontWeight: 700,
            textDecoration: 'underline'
          }}
        >
          {t('goodimageAr_compo.title_p5')}
        </Link>
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: {
            xs: '28px',
            sm: '38px',
            md: '42px',
            lg: '46px',
            xl: '48px'
          },
          pt: 10
        }}
      >
        {t('goodimageAr_compo.title_p6')}
      </Typography>

      {recommendations.map((recommendation, index) => (
        <React.Fragment key={index}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 3
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: '16px',
                  sm: '18px',
                  md: '16px',
                  lg: '18px',
                  xl: '24px'
                },
                backgroundColor: theme.palette.primary.main,
                display: 'inline-block',
                py: 2,
                px: { xs: 2, md: 10 },
                borderRadius: { xs: 0, md: 10 }
              }}
            >
              {recommendation.description}
            </Typography>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ pb: { xs: 0, md: 10 } }}
          >
            <ImageRecommendation
              theme={theme}
              imageSource={recommendation.recommendedImage}
              altText="Not Recommended"
              isRecommended={false}
            />
            <ImageRecommendation
              theme={theme}
              imageSource={recommendation.nonRecommendedImage}
              altText="Recommended"
              isRecommended={true}
            />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  )
}

export default GoodImageAr
