/**
 * Expiration time constants
 */
export const EXPIRATION_TIME = {
	/** 60 seconds */
	MINUTE: 60 * 1000,
	/** 1 hour */
	HOUR: 60 * 60 * 1000,
	/** 24 hours */
	DAY: 24 * 60 * 60 * 1000,
	/** 7 days */
	WEEK: 7 * 24 * 60 * 60 * 1000,
	/** 30 days */
	MONTH: 30 * 24 * 60 * 60 * 1000
} as const