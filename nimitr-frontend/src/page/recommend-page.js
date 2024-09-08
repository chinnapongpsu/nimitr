import GoodImageAr from '../component/recommend-page/GoodImageAr'
import HeaderText from '../component/recommend-page/HeaderText'
import LimitBody from '../component/recommend-page/LimitBody/LimitBody'
import FooterBox from '../component/ui/introPage/footer'
import { theme } from '../theme'
import { useTranslation } from 'react-i18next'
export const RecommendPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <HeaderText t={t} />
      <LimitBody theme={theme} t={t} />
      <GoodImageAr theme={theme} t={t} />
      <FooterBox t={t} />
    </>
  )
}
