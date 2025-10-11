import { initialDate, initialRecordList, setInitialDate, setInitialRecordList } from './data'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useGlobalLoading } from 'app/provider/LoadingProvider'
import { useRem } from 'app/hooks/ResponsiveSize'
import { useCallback, useState } from 'react'
import { useStyleStore } from 'app/store'
import { delay } from 'app/utils/time'

export const useUnclaimedLogic = () => {
  const [date, updateDate] = useState(initialDate) // 日期
  const [recordList, updateRecordList] = useState(initialRecordList) // 记录列表
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar 布局
  const loading = useGlobalLoading() // 全局加载状态
  const safeArea = useSafeArea() // 安全区域
  const rem = useRem() // 响应式尺寸

  /** 设置日期(缓存) */
  const setDate = (value: number) => {
    setInitialDate(value)
    updateDate(value)
  }

  /** 设置记录列表(缓存) */
  const setRecordList = (list: any[]) => {
    setInitialRecordList(list)
    updateRecordList(list)
  }

  /** 选择回调事件 */
  const onChange = useCallback(async (value: number) => {
    loading.show()
    setDate(value)
    await delay(1500)
    loading.hide()
  }, [])

  /** 到达底部回调事件 */
  const onEndReached = useCallback(() => {
    console.log('即将到达底部，可以加载更多')
  }, [])

  return {
    date,
    loading,
    safeArea,
    recordList,
    tabbarLayout,
    setRecordList,
    onEndReached,
    onChange,
    setDate,
    rem
  }
}