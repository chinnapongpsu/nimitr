import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  TableCell,
  TableBody,
  tableCellClasses,
  useMediaQuery,
  Typography
} from '@mui/material'
import React from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.black,
    fontSize: 24,
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(6n)': {
    backgroundColor: theme.palette.primary.main
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const PackageFileLimitTable = ({ theme, t }) => {
  const rowsSmallScreen = [
    {
      package: 'Free',
      limitStorage: {
        title: t('filelimitbody_compo.title_p6'),
        size: '10GB'
      },
      limitVideo: {
        title: t('filelimitbody_compo.title_p7'),
        size: '30MB'
      },
      limitAudio: {
        title: t('filelimitbody_compo.title_p8'),
        size: '5MB'
      },
      limitModel: {
        title: t('filelimitbody_compo.title_p9'),
        size: '10MB'
      }
    },
    {
      package: 'Starter',
      limitStorage: {
        title: t('filelimitbody_compo.title_p6'),
        size: '50GB'
      },
      limitVideo: {
        title: t('filelimitbody_compo.title_p7'),
        size: '100MB'
      },
      limitAudio: {
        title: t('filelimitbody_compo.title_p8'),
        size: '10MB'
      },
      limitModel: {
        title: t('filelimitbody_compo.title_p9'),
        size: '20MB'
      }
    },
    {
      package: 'Premium',
      limitStorage: {
        title: t('filelimitbody_compo.title_p6'),
        size: '500GB'
      },
      limitVideo: {
        title: t('filelimitbody_compo.title_p7'),
        size: '500MB'
      },
      limitAudio: {
        title: t('filelimitbody_compo.title_p8'),
        size: '20MB'
      },
      limitModel: {
        title: t('filelimitbody_compo.title_p9'),
        size: '35MB'
      }
    },
    {
      package: 'Enterprise',
      limitStorage: {
        title: t('filelimitbody_compo.title_p6'),
        size: '3TB'
      },
      limitVideo: {
        title: t('filelimitbody_compo.title_p7'),
        size: '1GB'
      },
      limitAudio: {
        title: t('filelimitbody_compo.title_p8'),
        size: '30MB'
      },
      limitModel: {
        title: t('filelimitbody_compo.title_p9'),
        size: '50MB'
      }
    }
  ]

  const rowsLargeScreen = [
    {
      LimitTypes: t('filelimitbody_compo.title_p6'),
      Free: '10GB',
      Starter: '50GB',
      Premium: '500GB',
      Enterprise: '3TB'
    },
    {
      LimitTypes: t('filelimitbody_compo.title_p7'),
      Free: '30MB',
      Starter: '100MB',
      Premium: '500MB',
      Enterprise: '1GB'
    },
    {
      LimitTypes: t('filelimitbody_compo.title_p8'),
      Free: '5MB',
      Starter: '10MB',
      Premium: '20MB',
      Enterprise: '30MB'
    },
    {
      LimitTypes: t('filelimitbody_compo.title_p9'),
      Free: '10MB',
      Starter: '20MB',
      Premium: '35MB',
      Enterprise: '50MB'
    }
  ]

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {!isSmallScreen ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <>
                  <StyledTableCell></StyledTableCell>
                  <>
                    <StyledTableCell>Free</StyledTableCell>
                    <StyledTableCell>Starter</StyledTableCell>
                    <StyledTableCell>Premium</StyledTableCell>
                    <StyledTableCell>Enterprise</StyledTableCell>
                  </>
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsLargeScreen.map((row, index) => (
                <StyledTableRow sx={{ fontWeight: 700 }} key={index}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '18px' }}>
                    {row?.LimitTypes}
                  </TableCell>
                  <StyledTableCell>{row?.Free}</StyledTableCell>
                  <StyledTableCell>{row?.Starter}</StyledTableCell>
                  <StyledTableCell>{row?.Premium}</StyledTableCell>
                  <StyledTableCell>{row?.Enterprise}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          {rowsSmallScreen?.map((row, index) => (
            <TableContainer key={index} sx={{ my: 1 }} component={Paper}>
              <Table sx={{ minWidth: 280 }} aria-label="spanning table">
                <TableHead>
                  <TableRow
                    key={row.package}
                    sx={{ backgroundColor: theme.palette.primary.main }}
                  >
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{
                        fontWeight: 700,
                        fontSize: '18px'
                      }}
                    >
                      {row?.package}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {row?.limitStorage?.title}
                    </TableCell>
                    <TableCell>{row?.limitStorage?.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {row?.limitAudio?.title}
                    </TableCell>
                    <TableCell>{row?.limitAudio?.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {row?.limitVideo?.title}
                    </TableCell>
                    <TableCell>{row?.limitVideo?.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {row?.limitModel?.title}
                    </TableCell>
                    <TableCell>{row?.limitModel?.size}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </>
      )}
    </>
  )
}

export default PackageFileLimitTable
