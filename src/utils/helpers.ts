import { DateTime } from 'luxon'

export const formatISODateString = (isoDate: string) => {
  const date = DateTime.fromISO(isoDate)
  return date.toLocaleString(DateTime.DATETIME_MED)
}
