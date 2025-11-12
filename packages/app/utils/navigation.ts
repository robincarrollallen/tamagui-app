export type TargetValueType = {
  type: string;
  info?: {
    activityId: number | string;
    activityName: string;
  } | string
}

/**
 * @description 跳转到指定的路由页面
 * @param targetValueType 跳转路由类型和活动id
 */
export function handleInlineNavigation({ type, info }: TargetValueType): string | number {
	const routes: Record<string, string> = {
		recharge: '/main/entrar', // 充值
		withdraw: '/main/withdraw', // 提现
		activity_list: '/main/promo', // 活动页面
		promotion: '/spread', // 推广中心
		vip: '/activity/vip', // vip
		home: '/', // 首页
		redeem_code: '/Redeem', // 兑换码
	}
	return routes[type] || (type === 'activity' ? (info as any)?.activityId : undefined)
}

/**
 * @description 首页侧边栏-valueType类型
 * @param targetValueType 跳转类型
 */
export function handleSideValueType({ info }: TargetValueType): string {
	return (info as any)?.activityId ? 'ACTIVITY' : 'CODE'
}

/**
 * @description 首页侧边栏-转换跳转类型
 * @param targetType 跳转类型
 */
export function handleSidebarJumpType(targetType: string): string {
	const sidebarTypes: Record<string, string> = {
		internal: 'InternalLink', // 自定义
		external: 'Custom', // 外跳
	}
	return sidebarTypes[targetType] || 'Custom'
}