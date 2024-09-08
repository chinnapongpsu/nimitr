import { useQuery } from '@apollo/client'
import { Typography, Box, Paper, useTheme, Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import BackdropCircle from '../component/manage-payment-page/backDropCirularProgress'
import { SkeletonCheckTranscriptPage } from '../component/manage-payment-page/skeleton/skeleton-checkTranscript'
import transections from '../graphql/queries/transections'

export const CheckTranscript = () => {
  const params = useParams()
  const { t } = useTranslation()
  const {
    data: transectionDataFilter,
    loading,
    refetch
  } = useQuery(transections, {
    fetchPolicy: 'network-only',
    variables: {
      memberId: params?.memberId
    }
  })
  const theme = useTheme()
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('Asia/Bangkok')

  const columns = [
    { field: 'index', headerName: '#', width: 50 },
    {
      field: 'updatedAt',
      headerName: t('checkTranscript_page.title_p1'),
      width: 250,
      renderCell: (params) => {
        // ตรวจสอบสถานะ
        if (params.row.status === 'successful') {
          // หากสถานะเป็น 'successful' ให้แสดงวันที่
          const updatedAt = params.value

          const formattedDateTime = dayjs(updatedAt)
            .tz('Asia/Bangkok') // ตั้ง timezone ใหม่เป็น GMT+7
            .format('DD/MM/YYYY, HH:mm') // รวม <br /> ในรูปแบบ

          return <Typography>{formattedDateTime}</Typography>
        }
        if (params.row.status === 'failed') {
          return (
            <Typography sx={{ fontWeight: 700, color: 'red' }}>
              {t('checkTranscript_page.title_p2')}
            </Typography>
          )
        }
        // ถ้าสถานะไม่ใช่ 'successful' ให้แสดงข้อความว่าไม่มีการชำระเงิน
        return <Typography>{t('checkTranscript_page.title_p3')}</Typography>
      }
    },
    {
      field: 'type',
      headerName: t('checkTranscript_page.title_p4'),
      width: 250,
      renderCell: (params) => <Typography>{params.value}</Typography>
    },

    {
      field: 'amount',
      headerName: t('checkTranscript_page.title_p5'),
      width: 150,
      renderCell: (params) => (
        <Typography>
          ฿
          {params.value > 1000
            ? (params.value / 100).toLocaleString()
            : params.value / 100}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: t('checkTranscript_page.title_p6'),
      width: 150,
      renderCell: (params) => {
        let color
        if (params.value === 'successful') {
          color = 'green' // สีเขียวสำหรับสถานะ successful
        } else if (params.value === 'pending') {
          color = '#FFD102' // สีเหลืองสำหรับสถานะ pending
        } else if (params.value === 'failed') {
          color = 'red' // สีแดงสำหรับสถานะ failed
        }

        return (
          <Typography style={{ color, fontWeight: 700 }}>
            {params.value}
          </Typography>
        )
      }
    },
    {
      field: 'description',
      headerName: t('checkTranscript_page.title_p7'),
      width: 250,
      renderCell: (params) => {
        let descriptionText = ''

        if (params.value[1] === 'pending') {
          descriptionText = t('checkTranscript_page.title_p8')
        } else if (params.value[1] === 'failed') {
          descriptionText = t('checkTranscript_page.title_p9')
        } else if (params.value[1] === 'successful') {
          descriptionText = `${t('checkTranscript_page.title_p10')} ${
            params.value[0]
          }`
        }

        return <Typography>{descriptionText}</Typography>
      }
    }
  ]
  const reversedRows = transectionDataFilter
    ? transectionDataFilter?.transections
        ?.map((transection, index) => ({
          id: transection?._id,
          updatedAt: transection?.updatedAt,
          type: transection?.type,
          amount: transection?.amount,
          status: transection?.status,
          description: [transection?.description, transection?.status],
          index: transectionDataFilter.transections.length - index // เปลี่ยนลำดับของ index
        }))
        .reverse() // เรียงข้อมูลใหม่จากสุดท้ายไปยังแรก
    : []

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {loading ? (
        <SkeletonCheckTranscriptPage />
      ) : (
        <>
          <BackdropCircle refetch={refetch} t={t} />
          <Box component={Paper} sx={{ mt: 2, boxShadow: 2 }}>
            {reversedRows.length > 0 ? (
              <DataGrid
                rows={reversedRows}
                columns={columns}
                sx={{
                  '& .MuiTableCell-head': {
                    backgroundColor: theme.palette.primary.main
                  }
                }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10
                    }
                  }
                }}
                pageSizeOptions={[5]}
              />
            ) : (
              <Paper
                elevation={3}
                sx={{
                  mt: 5,
                  bgcolor: theme?.palette?.primary?.main,
                  width: '100%',
                  height: { xs: '250px', sm: '450px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '20px'
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ textAlign: 'center' }}
                >
                  {t('checkTranscript_page.title_p12')}
                </Typography>
              </Paper>
            )}
          </Box>
        </>
      )}
    </Container>
  )
}
