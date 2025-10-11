import { toCamelCase } from "app/utils/format";
import { useTranslation } from "react-i18next"

/**
 * Range time type
 */
export const RANGE_TIME = {
  TODAY: 0,
  YESTERDAY: 1,
  LAST_7_DAYS: 2,
  LAST_30_DAYS: 3,
} as const

/**
 * Range time options
 */
export const useRangeTimeOptions = () => {
  const { t } = useTranslation()

  return Object.entries(RANGE_TIME).map(([key, value]) => ({
    label: t(`activity.${toCamelCase(key)}`),
    value: value
  }));
}