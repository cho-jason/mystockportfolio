export const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i)
  }
}

export const getDate = dateObj => {
  // Converts Date object to string in the following format:
  // "MM/DD/YY - HH:MM AM/PM"
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  const day = dateObj.getDate()
  const hour = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  return `${month}/${day}/${year} - ${hour % 12}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${Math.floor(hour / 12) ? 'PM' : 'AM'}`
}
