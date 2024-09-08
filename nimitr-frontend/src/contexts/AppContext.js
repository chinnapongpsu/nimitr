import PropTypes from 'prop-types'
import React, {
  createContext, useContext, useCallback,
} from 'react'
import { useTranslation } from 'react-i18next'
import createPersistedState from 'use-persisted-state'
//   import { usePrevious } from '../lib/hooks'

const AppContext = createContext()

//   const useTokenState = createPersistedState('token')
//   const useDarkModeState = createPersistedState('darkMode')
const useLangState = createPersistedState('lang')

//   const useToken = () => {
//     const [token, setToken] = useTokenState(null)
//     const prevToken = usePrevious(token)
//     const {
//       loading, error, data: user, get,
//     } = useFetch({ path: '/me' })
//     const logout = useCallback(
//       () => {
//         setToken(null)
//       },
//       [setToken],
//     )
//     useEffect(
//       () => {
//         if (!!token !== !!prevToken) {
//           get()
//         }
//       },
//       [get, token, prevToken],
//     )
//     return {
//       loading,
//       error,
//       user,
//       token,
//       setToken,
//       logout,
//     }
//   }

//   const useDarkMode = () => {
//     const [darkMode, setDarkMode] = useDarkModeState(true)
//     const toggleTheme = useCallback(
//       () => setDarkMode(state => !state),
//       [setDarkMode],
//     )
//     return {
//       darkMode,
//       toggleTheme,
//     }
//   }

const useLang = () => {
  const [lang, setLang] = useLangState('th')
  const { i18n } = useTranslation()
  const switchLang = useCallback(
    (newLang) => {
      setLang(newLang)
      i18n.changeLanguage(newLang)
    },
    [setLang, i18n],
  )
  return {
    lang,
    switchLang,
  }
}

export const AppProvider = ({ children }) => {
  // const token = useToken()
  // const darkMode = useDarkMode()
  const lang = useLang()
  return (
    <AppContext.Provider value={{
      ...lang,
    }}
    // <AppContext.Provider value={{
    //    ...token,
    //    ...darkMode,
    //   ...lang,
    // }}
    >
      {children}
    </AppContext.Provider>
  )
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const AppCunsumer = AppContext.Consumer

export const useApp = () => useContext(AppContext)

export default AppContext
