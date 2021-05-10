export const calcElapsedTime = (timestamp: number): string => {
  const currentTimestamp: number = new Date().getTime() / 1000
  console.log('timestamp', timestamp)
  console.log('currentTimestamp', currentTimestamp)
  if (Math.floor(currentTimestamp - timestamp) < 60) return (currentTimestamp - timestamp).toFixed(0) + ' секунд назад'
  else if (Math.floor((currentTimestamp - timestamp) / 60) < 60)
    return ((currentTimestamp - timestamp) / 60).toFixed(0) + ' минут назад'
  else if (Math.floor((currentTimestamp - timestamp) / (60 * 60)) < 24)
    return ((currentTimestamp - timestamp) / (60 * 60)).toFixed(0) + ' часов назад'
  else if (Math.floor((currentTimestamp - timestamp) / (60 * 60 * 24)) < 7)
    return ((currentTimestamp - timestamp) / (60 * 60 * 24)).toFixed(0) + ' дней назад'
  else if (Math.floor((currentTimestamp - timestamp) / (60 * 60 * 24 * 7)) < 4)
    return ((currentTimestamp - timestamp) / (60 * 60 * 24 * 7)).toFixed(0) + ' недель назад'
  else return ((currentTimestamp - timestamp) / (60 * 60 * 24 * 7 * 4)).toFixed(0) + ' месяцев назад'
}
