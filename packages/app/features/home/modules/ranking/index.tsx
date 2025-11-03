import { SVG } from '@my/assets'
import { YStack } from 'tamagui'
import { useRem } from 'app/store'
import { SvgXml } from 'react-native-svg'
import { useEffect, useState } from 'react'
import { maskMiddle } from 'app/utils/format/string'
import { formatMoney as formatMoneyUtil } from 'app/utils/format/number'
import { HomeRankingList, HomeRankingTitle, HomeRankingHeader } from './modules'
import rankData from 'app/data/rank.json'

const rankType = {
  'bet': 'homeRank.000004',
  'profit': 'homeRank.000007',
  'bonus': 'homeRank.000006',
  'commission': 'homeRank.000005',
}

export function Ranking() {
  const [rankType, setRankType] = useState('commission')
  const [topThreeList, setTopThreeList] = useState<Recordable[]>([])
  const [rankingList, setRankingList] = useState<Recordable[]>([])
  const rem = useRem()

  /** 获取随机数 */
  const getRandomNumber = (min: number = 1, max: number = 20): number => {
    if (min >= max) throw new Error('Min must be less than max');
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** 获取随机头像 */
  const getRandomAvatar = () => {
    const list = ['male', 'female']
    const avatarIndex = getRandomNumber(0, list.length - 1)
  
    const prefix = 'first_'

    return `${prefix}${list[avatarIndex]}_${getRandomNumber()}.jpg`
  }

  /** 格式化排行榜项 */
  const formatRankItem = (rankItem: Recordable, formatMoney = true) => {
    const url = 'https://upload-dev.b83.xyz/avatar/'
    return {
      ...rankItem,
      userId: maskMiddle(rankItem.userId),
      rankValue: formatMoney ? formatMoneyUtil(rankItem.rankValue) : rankItem.rankValue,
      avatar: `${url}${rankItem.avatar || getRandomAvatar()}`
    }
  }

  /** 获取用户排行榜列表 */
  const getUserTopList = () => {
    const userRankList = rankData.userRankList.sort((a, b) => b.rankValue - a.rankValue)

    // 获取前三名
    const rawTopThreeList= [
      { ...formatRankItem(userRankList[1]), rank: 2 },
      { ...formatRankItem(userRankList[0]), rank: 1 },
      { ...formatRankItem(userRankList[2]), rank: 3 },
    ]
    setTopThreeList(rawTopThreeList)

    // 获取其他用户
    const rawRankingList = userRankList.slice(3).map((item: Recordable, index: number) =>
      formatRankItem({ ...item, rank: index + 4 >= 10 ? index + 4 : `0${index + 4}` })
    )
    setRankingList(rawRankingList)
  }

  useEffect(() => {
    setRankType(rankData.rankType)
    getUserTopList()
  }, [])

  return (
    <YStack p={rem(12)}>
      <YStack overflow='hidden' borderTopLeftRadius={rem(12)} borderTopRightRadius={rem(12)} bg="$surfaceRaisedL1">
        <SvgXml xml={SVG.bg_rank_header_25} width="100%" height={rem(120)} style={{ position: 'absolute', top: 0 }} />
        <HomeRankingTitle />
        <HomeRankingHeader list={topThreeList} />
        <HomeRankingList list={rankingList} />
      </YStack>
    </YStack>
  )
}
