
/** Activity name type */
export const ZNameType = {
	enum: {
		DEFAULT: 'DEFAULT',
		CUSTOM: 'CUSTOM',
	}
} as const

export type NameType = keyof typeof ZNameType.enum

/** Activity type */
export const ZActivityType = {
	enum: {
		RedPacket: 'RedPacket',
		Agency: 'Agency',
		AssistanceCash: 'AssistanceCash',
		SignIn: 'SignIn',
		Recharge: 'Recharge',
		Rebate: 'Rebate',
		LuckyWheel: 'LuckyWheel',
		Assistance: 'Assistance',
		Custom: 'Custom',
		RechargeReward: 'RechargeReward',
		MysteryReward: 'MysteryReward',
		CommissionReward: 'CommissionReward',
		googleDomainReward: 'googleDomainReward',
	}
} as const

export type ActivityType = keyof typeof ZActivityType.enum

/** Reset type */
export const ZResetType = {
	enum: {
		NONE: 'NONE',
		DAILY: 'DAILY',
		WEEKLY: 'WEEKLY',
		WEEKLY_DAY: 'WEEKLY_DAY',
		MONTHLY_DAY: 'MONTHLY_DAY',
		PERIODIC: 'PERIODIC',
	}
} as const

export type ResetType = keyof typeof ZResetType.enum

/** Recharge type */
export const ZRechargeType = {
	enum: {
		FIRST: 'FIRST',
		SINGLE: 'SINGLE',
		SUM: 'SUM',
	}
} as const

export type RechargeType = keyof typeof ZRechargeType.enum

/** Activity status */
export const ZActivityStatus = {
	enum: {
		DRAFT: 'DRAFT',
		PENDING: 'PENDING',
		PROCESSING: 'PROCESSING',
		FINISHED: 'FINISHED',
		CLOSED: 'CLOSED',
	}
} as const

export type ActivityStatus = keyof typeof ZActivityStatus.enum
