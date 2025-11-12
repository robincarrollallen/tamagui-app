import { SidebarBanner } from './modules/banner'
import { SidebarHeader } from './modules/header'
import { SidebarActivity } from './modules/activity'
import { SidebarCategories } from './modules/categories'
import { IOScrollView } from 'react-native-intersection-observer'

export const SidebarWidget = () => {
  
  return (
    <>
      {/* 头部(Logo/关闭按钮) */}
      <SidebarHeader />
      <IOScrollView
        scrollEventThrottle={16}
      >
        {/* 模块 - 顶部内容 */}
        <SidebarBanner autoPlay/>
        {/* 模块 - 活动内容 */}
        <SidebarActivity />
        {/* 模块 - 分类内容 */}
        <SidebarCategories />
      </IOScrollView>
    </>
  )
}