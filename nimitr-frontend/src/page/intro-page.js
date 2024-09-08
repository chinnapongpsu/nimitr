import { Redeem } from '@mui/icons-material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import {
  Box,
  Divider,
  Typography,
  useTheme,
  Stack,
  Container,
  Grid,
  Button
} from '@mui/material'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouteLink, useNavigate } from 'react-router-dom'
import VideoCoverGrid from '../component/ui/introPage/videoDisplay'
import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import FooterBox from '../component/ui/introPage/footer'

export const IntroPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()
  const { user } = useContext(AuthContext)

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ minHeight: { xs: '400px', lg: '500px' } }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              color={theme.palette.primary.main}
              sx={{
                mt: {
                  lg: 10,
                  md: 10,
                  xs: 10
                },
                fontWeight: 'bold',
                fontSize: {
                  lg: '12.5rem',
                  md: '10rem',
                  sm: '10rem',
                  xs: '6.5rem'
                },
                textShadow:
                  '2px 2px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)'
              }}
            >
              Nimitr
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  lg: '3rem',
                  md: '2rem',
                  xs: '1.5rem'
                }
              }}
              gutterBottom
            >
              AR Web Application
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box
            alt="nimitr-webar"
            component="img"
            src="/title.gif"
            sx={{
              width: { lg: '600px', md: '400px', sm: '400px', xs: '100%' },
              height: { lg: '400px', md: '300px', sm: '300px', xs: 'px' },
              margin: '5px'
            }}
          />
        </Grid>
      </Grid>

      <Container maxWidth="lg">
        <Grid sx={{ textAlign: 'center', mt: { lg: 2, xs: 4 } }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ textAlign: 'center' }}
          >
            <Grid item xs={12} md={6} lg={6} sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ textAlign: { lg: 'start', md: 'start', xs: 'center' } }}
              >
                {t('intro_page.title_p-3')}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: { lg: 'start', md: 'start', xs: 'center' } }}
              >
                {t('intro_page.title_p-2')}
                <br />
                {t('intro_page.title_p-1')}
                <br />
                {t('intro_page.title_p0')}
              </Typography>
              {/* <Button variant="contained" sx={{ margin: "20px" }} >ลองเลย!!</Button> */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  mt: 2,
                  mb: 1,
                  textAlign: { xs: 'center' }
                }}
              >
                {t('intro_page.title_p1')}
              </Typography>
              <Stack
                direction={{ xs: 'column' }}
                sx={{ alignItems: { xs: 'center' } }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    component={RouteLink}
                    to="/login"
                    variant="contained"
                    color="primary"
                    sx={{ color: 'black', fontWeight: 700, m: 2 }}
                    startIcon={<ArrowCircleRightIcon />}
                  >
                    {t('title_login')}
                  </Button>
                  <Button
                    component={RouteLink}
                    to="/register"
                    startIcon={<ArrowCircleRightIcon />}
                    variant="contained"
                    color="primary"
                    sx={{ color: 'black', fontWeight: 700 }}
                  >
                    {t('title_subscribe')}
                  </Button>
                </Box>
              </Stack>
              <Stack
                direction={{ xs: 'column' }}
                sx={{ alignItems: { xs: 'center' } }}
              >
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  {!user && (
                    <Button
                      component={RouteLink}
                      to="/payment"
                      variant="contained"
                      color="primary"
                      sx={{ color: 'black', fontWeight: 700 }}
                      startIcon={<Redeem />}
                    >
                      {t('intro_page.title_p32')}
                    </Button>
                  )}
                  {user && (
                    <Button
                      onClick={() => {
                        navigate(`/payment/${user?._id}`)
                      }}
                      variant="contained"
                      color="primary"
                      sx={{ color: 'black', fontWeight: 700 }}
                      startIcon={<Redeem />}
                    >
                      {t('intro_page.title_p32')}
                    </Button>
                  )}
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6} lg={6} sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ textAlign: { lg: 'start', md: 'start', xs: 'center' } }}
              >
                {t('intro_page.title_p2')}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: { lg: 'start', md: 'start', xs: 'center' } }}
              >
                {t('intro_page.title_p3')}
                <br />
                {t('intro_page.title_p4')}
                <br />
              </Typography>
              {/* <Button variant="contained" sx={{ margin: "20px" }} >ลองเลย!!</Button> */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  mt: 2,
                  mb: 2,
                  textAlign: { lg: 'start', md: 'start', xs: 'center' }
                }}
              >
                {t('intro_page.title_p5')}
              </Typography>
              <Stack
                direction={{ lg: 'row', md: 'row', xs: 'column' }}
                sx={{
                  alignItems: {
                    xs: 'center',
                    md: 'flex-start',
                    lg: 'flex-start'
                  }
                }}
              >
                <Box
                  component="img"
                  src="/qr_new.png"
                  sx={{
                    width: '150px',
                    height: '150px',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '10px',
                    mr: { xs: 0, md: 2, lg: 2 },
                    mb: { xs: 2, md: 0, lg: 0 }
                  }}
                />
                <Box
                  component="img"
                  src="/marker.png"
                  sx={{
                    width: '150px',
                    height: '150px',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '10px'
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid>
            <Divider
              variant="middle"
              sx={{ borderTop: '1px solid #bbb', borderRadius: '5px' }}
            />

            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography
                variant="h2"
                fontWeight={700}
                sx={{
                  mt: 5,
                  p: 2,
                  color: theme.palette.primary.main,
                  // เพิ่มการตกแต่งเพื่อเน้นข้อความ
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' // เงาในข้อความ
                }}
              >
                3 STEP
              </Typography>
              <Typography
                variant="body"
                fontWeight={700}
                sx={{
                  mt: 5,
                  p: 2,
                  fontSize: { xs: '22px', sm: '30px', md: '44px' }
                }}
              >
                {t('intro_page.title_p6')}
              </Typography>
            </Stack>
            <Typography variant="body">{t('intro_page.title_p7')}</Typography>
            <Grid container direction="row" sx={{ mt: 5 }}>
              {/* step1 */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box component="img" src="/step1Crop.png" />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  p: { lg: 6, xs: 2, sm: 4 },
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '1px',
                  bgcolor: theme.palette.primary.main
                }}
                container
                direction="row"
              >
                <Typography variant="h5">01 Choose Marker</Typography>
                <Typography variant="body" sx={{ mt: 2 }}>
                  {t('intro_page.title_p8')}
                </Typography>
              </Grid>
              {/* step2 */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  justifyContent: 'center'
                }}
              >
                <Box component="img" src="/step2Crop.png" />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  p: { lg: 6, xs: 2, sm: 4 },
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '1px',
                  bgcolor: theme.palette.primary.main,
                  display: { xs: 'flex', sm: 'none' },
                  justifyContent: 'center'
                }}
                container
                direction="row"
              >
                <Typography variant="h5">02 Upload Media</Typography>
                <Typography variant="body" sx={{ mt: 2 }}>
                  {t('intro_page.title_p9')}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  p: { lg: 6, xs: 2, sm: 4 },
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '1px',
                  bgcolor: theme.palette.primary.main,
                  display: { xs: 'none', sm: 'flex' }
                }}
                container
                direction="row"
              >
                <Typography variant="h5">02 Upload Media</Typography>
                <Typography variant="body" sx={{ mt: 2 }}>
                  {t('intro_page.title_p9')}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  justifyContent: 'center'
                }}
              >
                <Box component="img" src="/step2Crop.png" />
              </Grid>

              {/* step3 */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box component="img" src="/step3Crop.png" margin="10px" />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  p: { lg: 6, xs: 2, sm: 4 },
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '1px',
                  bgcolor: theme.palette.primary.main
                }}
                container
                direction="row"
              >
                <Typography variant="h5">03 Enjoy!</Typography>
                <Typography variant="body" sx={{ mt: 2 }}>
                  {t('intro_page.title_p10')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Grid container sx={{ mt: 10, bgcolor: '#2A2B2A' }}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            sx={{
              textAlign: 'left',
              mt: 5,
              alignItems: 'top',
              justifyContent: 'center'
            }}
            paddingBottom="50px"
          >
            <Grid
              item
              xs={12}
              lg={12}
              sm={12}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Stack direction="row" sx={{ justifyContent: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{ color: 'white', textAlign: 'center', mr: 1 }}
                  fontWeight={700}
                >
                  {t('intro_page.title_p11')}{' '}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFE374', textAlign: 'center' }}
                  fontWeight={700}
                >
                  {' '}
                  NIMITR
                </Typography>
              </Stack>
            </Grid>
            <Grid
              container
              item
              xs={12}
              lg={3}
              sm={12}
              sx={{
                mt: 10,
                bgcolor: '#FFE374',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              paddingRight="30px"
            >
              <Grid item margin="20px">
                <img src="why1.png" height="auto" alt="nimitr-ar-why1" />
              </Grid>
              <Grid item padding="10px">
                <Divider
                  variant="middle"
                  sx={{ borderTop: '8px solid #2A2B2A', borderRadius: '5px' }}
                />
                <Typography variant="h5" sx={{ mt: 5 }} fontWeight={700}>
                  {t('intro_page.title_p12')}
                </Typography>
                <Typography variant="body">
                  {t('intro_page.title_p13')}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              lg={3}
              sm={12}
              sx={{
                mt: 10,
                bgcolor: '#FFF',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              paddingRight="30px"
            >
              <Grid item margin="20px">
                <img src="why2.png" height="auto" alt="nimitr-ar-why2" />
              </Grid>
              <Grid item padding="10px">
                <Divider
                  variant="middle"
                  sx={{ borderTop: '8px solid #2A2B2A', borderRadius: '5px' }}
                />
                <Typography variant="h5" sx={{ mt: 5 }} fontWeight={700}>
                  {t('intro_page.title_p14')}
                </Typography>
                <Typography variant="body">
                  {t('intro_page.title_p15')}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              lg={3}
              sm={12}
              sx={{
                mt: 10,
                bgcolor: '#FFE374',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              paddingRight="30px"
            >
              <Grid item margin="20px">
                <img src="why3.png" height="auto" alt="nimitr-ar-why3" />
              </Grid>
              <Grid item padding="10px">
                <Divider
                  variant="middle"
                  sx={{ borderTop: '8px solid #2A2B2A', borderRadius: '5px' }}
                />
                <Typography variant="h5" sx={{ mt: 5 }} fontWeight={700}>
                  {t('intro_page.title_p16')}
                </Typography>
                <Typography variant="body">
                  {t('intro_page.title_p17')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <VideoCoverGrid />

      <FooterBox />
    </Box>
  )
}
