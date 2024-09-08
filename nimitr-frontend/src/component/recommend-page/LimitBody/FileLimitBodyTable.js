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
  useMediaQuery
} from '@mui/material'
import React from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.black,
    fontSize: 28,
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const FileLimitBodyTable = ({ theme, t }) => {
  const rowsSmallScreen = [
    {
      package: t('filelimitbody_compo.title_p1'),
      limitStorage: {
        title: ['PNG, JPG(JPEG)'],
        size: 'JPG(JPNG)'
      }
    },
    {
      package: t('filelimitbody_compo.title_p2'),
      limitStorage: {
        title: 'MP4, MOV'
      }
    },
    {
      package: t('filelimitbody_compo.title_p3'),
      limitStorage: {
        title: 'MP3'
      }
    },
    {
      package: t('filelimitbody_compo.title_p4'),
      limitStorage: {
        title: 'GLB'
      }
    }
  ]

  const rows = [
    {
      LimitTypes: t('filelimitbody_compo.title_p1'),
      Types: 'PNG, JPG(JPEG)'
    },
    {
      LimitTypes: t('filelimitbody_compo.title_p2'),
      Types: 'MP4, MOV'
    },
    {
      LimitTypes: t('filelimitbody_compo.title_p3'),
      Types: 'MP3'
    },
    {
      LimitTypes: t('filelimitbody_compo.title_p4'),
      Types: 'GLB'
    }
  ]

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {!isSmallScreen ? (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <>
                  {rows?.map((rows, index) => (
                    <StyledTableCell key={index}>
                      {rows?.LimitTypes}
                    </StyledTableCell>
                  ))}
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                {rows?.map((rows, index) => (
                  <StyledTableCell key={index}>{rows?.Types}</StyledTableCell>
                ))}
              </StyledTableRow>
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
                    key={index}
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
                  <TableRow key={row?.limitStorage?.title}>
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{ fontWeight: 700 }}
                    >
                      {row?.limitStorage?.title}
                    </TableCell>
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

export default FileLimitBodyTable
