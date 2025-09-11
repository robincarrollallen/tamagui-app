import { tabbar_background_25 } from './svg/tabbar/tabbar_background_25';
import { home_active_25 } from './svg/tabbar/home-active-25';
import { activity_25 } from './svg/tabbar/activity-25';
import { deposit_25 } from './svg/tabbar/deposit-25';
import { profile_25 } from './svg/tabbar/profile-25';
import { home_25 } from './svg/tabbar/home-25';

// 导出图片路径常量
export const IMAGES = {
  tabbar_bg_flexible_25: require('./images/tabbar/bg-flexible-25.png').default?.src || require('./images/tabbar/bg-flexible-25.png'),
} as const;

export const ICONS = {
  tabbar_flexible_25: require('./icons/tabbar/flexible-25.png').default?.src || require('./icons/tabbar/flexible-25.png'),
} as const

export const SVG = {
  tabbar_background_25: require('./svg/tabbar/bg-25.svg').default?.src || tabbar_background_25,
  tabbar_home_25: require('./svg/tabbar/home-25.svg').default?.src || home_25,
  tabbar_home_active_25: require('./svg/tabbar/home-active-25.svg').default?.src || home_active_25,
  tabbar_activity_25: require('./svg/tabbar/activity-25.svg').default?.src || activity_25,
  tabbar_activity_active_25: require('./svg/tabbar/activity-active-25.svg').default?.src || require('./svg/tabbar/activity-active-25.svg'),
  tabbar_deposit_25: require('./svg/tabbar/deposit-25.svg').default?.src || deposit_25,
  tabbar_deposit_active_25: require('./svg/tabbar/deposit-active-25.svg').default?.src || require('./svg/tabbar/deposit-active-25.svg'),
  tabbar_profile_25: require('./svg/tabbar/profile-25.svg').default?.src || profile_25,
  tabbar_profile_active_25: require('./svg/tabbar/profile-active-25.svg').default?.src || require('./svg/tabbar/profile-active-25.svg'),
  tabbar_bg_flexible_25: require('./svg/tabbar/bg-flexible-25.svg').default?.src,
  tabbar_ring_inside_25: require('./svg/tabbar/ring-inside-25.svg').default?.src || require('./svg/tabbar/ring-inside-25.svg'),
  tabbar_ring_outside_25: require('./svg/tabbar/ring-outside-25.svg').default?.src || require('./svg/tabbar/ring-outside-25.svg'),
} as const;
