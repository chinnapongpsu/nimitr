import { ImportContacts } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const PDFDownloadComponent = () => {
  const [loading, setLoading] = React.useState(false)
  const { t } = useTranslation()

  const downloadPDF = () => {
    setLoading(true)

    // Use the relative path to the bundled PDF file
    const pdfUrl = `${process.env.PUBLIC_URL}/Nimitr.pdf`

    const link = document.createElement('a')
    link.href = pdfUrl
    link.setAttribute('download', 'Nimitr.pdf')
    link.click()

    setLoading(false)
  }

  return (
    <Button
      variant="contained"
      sx={{ fontWeight: 700, alignSelf: 'flex-start' }}
      onClick={downloadPDF}
      disabled={loading}
    >
      <ImportContacts />: {t('manage-project-page.title_manual')}
    </Button>
  )
}

export default PDFDownloadComponent
