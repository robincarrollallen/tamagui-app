import { useGameStore } from "app/store"
import { useTranslation } from "react-i18next"

export const useStickyLogic = ({ noHot = false }: { noHot?: boolean } = { noHot: false }) => {
  const { t } = useTranslation()
  const homeList = useGameStore(state => state.homeList)

  const hotTab = {
    id: 'POPULAR',
    code: "ONE_API_HOT",
    name: t('POPULAR'),
    platformList: [{
      id: 'POPULAR',
      code: "ONE_API_HOT",
    }]
  }

  const list = homeList.sort((a, b) => (b.gameTypeSort ?? 0) - (a.gameTypeSort ?? 0)).map((item) => {
    const { gameType } = item
    return {
      ...item,
      id: gameType,
      code: gameType,
      name: t(`${gameType}`),
      platformList: item.platformList.map(platform => {
        return {
          ...platform,
          id: gameType,
          code: gameType,
        }
      })
    }
  })
  if (noHot) {
    return list
  }
  return [hotTab, ...list]
}