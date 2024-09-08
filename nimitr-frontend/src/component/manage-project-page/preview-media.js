import { Close } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
  Box,
  Stack
} from '@mui/material'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import GltfModel from './gltf'
import './iframeVideoResponsive.css'

const PreviewMedia = ({
  onClosePreviewMediaDialog,
  url,
  name,
  status,
  type,
  scale = 10,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  waitBeforeShow = 5000
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)
    return () => clearTimeout(timer)
  }, [waitBeforeShow])
  const dracoLoader = new DRACOLoader()
  // dracoLoader.setDecoderConfig({ type: 'js' })
  dracoLoader.setDecoderPath(
    'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
  )

  return (
    <Dialog open={status} keepMounted maxWidth="md">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          {t('content_diglog_create_edit.title_p3')}
        </Typography>
        <IconButton onClick={onClosePreviewMediaDialog}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: { xs: 2, sm: 3, md: 5 },
          width: { xs: '250px', sm: '550px', md: '600px' }
        }}
      >
        <Stack spacing={1} direction="column" sx={{ textAlign: 'center' }}>
          {url && type === 'modal' && (
            <Box
              sx={{
                p: 1,
                width: '100%',
                height: '400px',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              {isShown ? (
                <Canvas>
                  <ambientLight intensity={0.3} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                  />
                  <pointLight position={[-10, -10, -10]} />
                  <Suspense fallback={null}>
                    <GltfModel
                      modelPath={url}
                      scale={scale}
                      position={position}
                      rotation={rotation}
                      dracoLoader={dracoLoader}
                    />
                    <OrbitControls />
                  </Suspense>
                </Canvas>
              ) : (
                <CircularProgress size="10rem" />
              )}
            </Box>
          )}
          {url && type === 'video' && <video src={url} controls />}
          {url && type === 'embedded' && (
            <div
              className="responsive-video"
              dangerouslySetInnerHTML={{ __html: url }}
            ></div>
          )}

          <Typography
            sx={{
              fontWeight: 700,
              backgroundColor: '#FFD102',
              width: { xs: '100%', sm: '60%' },
              borderRadius: 10,
              fontSize: { xs: '12px', sm: '16px' },
              p: 1,
              alignSelf: 'center'
            }}
          >
            {name}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
export default PreviewMedia
