import { DateTime } from 'luxon'

export const formatISODateString = (isoDate: string) => {
  const date = DateTime.fromISO(isoDate)
  return date.toLocaleString(DateTime.DATETIME_MED)
}

export const isURLValid = (url: string) => {
  return url.match(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  )
}
