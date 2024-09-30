export const formatTimeAgo = (date: string) => {
  const now = new Date()
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 1000,
  )

  // Define the time intervals in seconds
  const minute = 60
  const hour = 60 * minute
  const day = 24 * hour

  if (diffInSeconds < minute) {
    return `Just now` // less than a minute ago
  } else if (diffInSeconds < hour) {
    const minutesAgo = Math.floor(diffInSeconds / minute)
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago` // less than 60 minutes
  } else if (diffInSeconds < day) {
    const hoursAgo = Math.floor(diffInSeconds / hour)
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago` // less than 24 hours
  } else {
    const daysAgo = Math.floor(diffInSeconds / day)
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago` // more than 24 hours
  }
}
