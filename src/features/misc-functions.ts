export const isDigit = (str:string) => {
  return !isNaN(parseInt(str[str.length-1])) && ( (str[str.length-1] !== '-') || (str[str.length-1] !== ' ') )
}

export const colorFunction = (likes:number) => {
  if (likes >= 255) return '00ff00'
  if (likes <= -255) return 'ff0000'
  else {
    if (likes > 0) {
      let otherColors = (255 - likes).toString(16).padStart(2, '0')
      return `#${otherColors}ff${otherColors}`
    }
    else {
      let otherColors = (255 + likes).toString(16).padStart(2, '0')
      return `#ff${otherColors}${otherColors}`
    }
  }
}