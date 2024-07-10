export function timeAgo (timestamp){
  const now = Date.now()
  const secondsAgo = Math.floor((now - timestamp) / 1000)

  if (secondsAgo < 60) {
    return `hace ${secondsAgo} seg`
  } else if (secondsAgo < 3600) {
    return `hace ${Math.floor(secondsAgo / 60)} min`
  } else if (secondsAgo < 86400) {
    return `hace ${Math.floor(secondsAgo / 3600)} hor`
  } else if (secondsAgo < 604800) {
    const daysAgo = Math.floor(secondsAgo / 86400)
    return `hace ${daysAgo} días`
  } else {
    const weeksAgo = Math.floor(secondsAgo / 604800)
    return `hace ${weeksAgo} sem`
  }

}