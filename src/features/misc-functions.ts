export const isDigit = (str:string) => {
  return !isNaN(parseInt(str[str.length-1])) && ( (str[str.length-1] !== '-') || (str[str.length-1] !== ' ') )
}
