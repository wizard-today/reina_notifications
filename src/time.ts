export const hour = () => new Date().getUTCHours()

export const startNotifyHour = 6 // +3 = 9 GTM

export const nextRepeatHour = () => {
  if (hour() < startNotifyHour) {
    return startNotifyHour
  }

  if (hour() < startNotifyHour + 6) {
    return startNotifyHour + 6
  }

  if (hour() < startNotifyHour + 12) {
    return startNotifyHour + 12
  }

  return startNotifyHour
}
