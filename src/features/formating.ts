import { isDigit } from "features/misc-functions"

export const formatReadOnlyPhoneNumber = (phoneNumber:string) => {
  return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)} - ${phoneNumber.substring(6, 10)}`
}

export const formatInputPhoneNumber = (e:any) => {
  let input = e.target.value as string
  const cleanInput = input.replaceAll('-', '').replaceAll(' ', '')
  let output = input
  if ( !isDigit(cleanInput)) {
    output = cleanInput.slice(0, cleanInput.length-1)
  }
  e.target.value = addPhoneNumberDashes(output)
}

export const addPhoneNumberDashes = (phoneNumber:string) => {
  const cleanInput = phoneNumber.replaceAll('-', '').replaceAll(' ', '').slice(0, 10)

    if (cleanInput.length > 3 && cleanInput.length < 6 ) {
      return cleanInput.slice(0, 3) + ' - ' + cleanInput.slice(3)
    }
    else if (cleanInput.length >= 6) {
      return cleanInput.slice(0, 3) + ' - ' + cleanInput.slice(3, 6)+ ' - ' + cleanInput.slice(6)
    }
    if (cleanInput.length >= 10) {
      return cleanInput.slice(0, 3) + ' - ' + cleanInput.slice(3, 6)+ ' - ' + cleanInput.slice(6, 10)
    }
      return cleanInput.slice(0, 10)
}


export const deleteSeperator = (e:React.KeyboardEvent<HTMLInputElement>) => {
  const input = e.target.value as string
  const isSeperator = new RegExp('(\\d+?)? - (\\d+?)?')
  if (e.key === 'Backspace' && e.ctrlKey) {
  }
  if (e.key === 'Backspace' && isSeperator.test(input.substring(input.length - 4)) ) {
    e.preventDefault()
    e.target.value = input.substring(0, input.length - 4)
  }
}

export const snakeCaseToCapital = (snakeCaseValue:string) => {
  const splitValue = snakeCaseValue.replaceAll('_', ' ')
  const wordsList = splitValue.split(' ')
  let hi;
  for (let i = 0; i < wordsList.length; i++) {
    wordsList[i] = wordsList[i].substring(0, 1).toUpperCase() + wordsList[i].substring(1, wordsList[i].length) +' '
  }

  const answer = wordsList
  return answer
}

export const dateFormatter = (iso8601String:string, format:string) => {
  try {
  const adjustedDate = new Date(iso8601String)
  }
  catch {
    return 'Invalid date format'
  }
  const adjustedDate = new Date(iso8601String)
  const locale = navigator.language
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as any
  const timeOptions = { hour: '2-digit', minute: '2-digit' } as any
  switch (format.toLowerCase()) {
    case 'date':
      return adjustedDate.toLocaleDateString(locale, dateOptions)
    case 'time':
      return adjustedDate.toLocaleTimeString(locale, timeOptions)
    case 'date-time':
      return `${adjustedDate.toLocaleDateString(locale, dateOptions)} — ${adjustedDate.toLocaleTimeString(locale, timeOptions)}`
    default:
      return 'Error: Please enter a valid format'
  }
}