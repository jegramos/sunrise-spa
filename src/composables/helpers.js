import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'

export const useGetGlobalStringMaxLength = () => import.meta.env.VITE_GLOBAL_STRING_MAX_LENGTH

/** Hard delay for X seconds */
export const useSleep = () => {
  return (seconds) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true)
      }, seconds * 1000)
    })
  }
}

export const useIsValidMobileNumber = () => (value) => {
  let phone

  // The library throws a NOT_A_NUMBER error if it can't parse
  // the value properly
  try {
    phone = parsePhoneNumber(value, 'PH')
  } catch (err) {
    return false
  }

  if (!phone) return false

  return isValidPhoneNumber(value, 'PH')
}

export const usePrependOrAppendOnce = (affix, type = 'append') => {
  if (!['append', 'prepend'].includes(type)) {
    throw new Error('Valid values are `prepend` and `append`')
  }
  return (value) => {
    return type === 'append' ? `${value}-${affix}` : `${affix}-${value}`
  }
}
