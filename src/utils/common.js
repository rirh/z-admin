/**
   *  日期格式化
   * @param {*} iDate
   */
export function getDateStr(iDate) {
  if (!iDate) {
    return ''
  }
  const date = new Date(iDate)
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return Y + '-' + M + '-' + D
}

/**
   *  日期时间格式化
   * @param {*} iDate
   */
export function getDatetimeStr(iDate) {
  if (!iDate) {
    return ''
  }
  const date = new Date(iDate)
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const MI = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + '-' + M + '-' + D + ' ' + H + ':' + MI + ':' + S
}
