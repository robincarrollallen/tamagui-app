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

/**
 * Time formats
 */
export const TIME_FORMATS = {
	/** YYYY-MM-DDTHH:mm:ss.SSSZ */
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
	/** YYYY-MM-DD HH:mm:ss */
  FULL: 'YYYY-MM-DD HH:mm:ss',
	/** MM/DD HH:mm */
  DATE_TIME: 'MM/DD HH:mm',
	/** YYYY-MM-DD */
  DATE_ONLY: 'YYYY-MM-DD',
	/** HH:mm:ss */
  TIME_ONLY: 'HH:mm:ss',
};