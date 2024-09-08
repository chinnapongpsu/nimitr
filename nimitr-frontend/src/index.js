import { ApolloProvider } from '@apollo/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import client from './Client'
import { AppProvider } from './contexts/AppContext'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import i18n from './lib/i18n'
import reportWebVitals from './reportWebVitals'
import { theme } from './theme'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </ThemeProvider>
          </ApolloProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
