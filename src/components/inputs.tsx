import { addPhoneNumberDashes, deleteSeperator } from "features/formating"
import { isDigit } from "../features/misc-functions"

export function PhoneNumberInput() {

  const formatNumber = (e:any) => {
    let input = e.target.value as string
    const cleanInput = input.replaceAll('-', '').replaceAll(' ', '')
    let output = input
    if ( !isDigit(cleanInput)) {
      output = cleanInput.slice(0, cleanInput.length-1)
    }
    e.target.value = addPhoneNumberDashes(output)
  }

  return (
    <>
        <input type="tel" name="phone" id="phone" className='textbox' placeholder='123 - 456 - 7890' onChange={formatNumber} onKeyDown={deleteSeperator} onPaste={(e) => {if (!isDigit(e.clipboardData.getData('Text'))) {e.preventDefault()}}} />
         
    </>
  )
}