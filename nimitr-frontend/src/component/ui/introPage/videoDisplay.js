import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Stack
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const videoData = {
  title: 'Nimitr',
  // thumbnailUrl: 'https://example.com/video1-thumbnail.jpg',
  videoFilePath: '/public_nimitr.mp4' // Update the path according to your directory structure
}

const VideoCoverGrid = () => {
  const { t } = useTranslation()

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <Card elevation={3} style={{ width: '100%', height: '100%' }}>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'black',
                textAlign: 'center',
                mr: 1,
                fontSize: {
                  xs: '18px',
                  sm: '24px',
                  md: '34px',
                  lg: '36px'
                }
              }}
              fontWeight={700}
            >
              {t('title_nameVideo1')}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: '#FFE374',
                textAlign: 'center',
                fontSize: {
                  xs: '18px',
                  sm: '24px',
                  md: '34px',
                  lg: '36px'
                }
              }}
              fontWeight={700}
            >
              {t('title_nameVideo2')}
            </Typography>
          </Stack>
        </CardContent>
        <CardMedia
          component="video"
          controls
          style={{
            objectFit: 'cover'
          }}
          sx={{
            width: { xs: '100%', sm: '80%' },
            margin: '0 auto',
            height: '100%',
            pb: { xs: 0, sm: 5 }
          }}
          src={videoData.videoFilePath}
          title={videoData.title}
        />
      </Card>
    </Grid>
  )
}

export default VideoCoverGrid
