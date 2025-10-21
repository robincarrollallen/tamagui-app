import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TIME_FORMATS } from 'app/enums';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);


/** 格式化时间为日期 */
export function formatTimeByDay(time: string | number | Date | Dayjs, format = TIME_FORMATS.DATE_TIME) {
  const date = dayjs(time);
  
  return date.format(format);
}