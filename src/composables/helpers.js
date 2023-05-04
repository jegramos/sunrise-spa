import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js/max'

/**
 * Max length for strings, we typically mirror this to the DB's max length
 *
 * @returns {any}
 */
export const useGetGlobalStringMaxLength = () => () => import.meta.env.VITE_GLOBAL_STRING_MAX_LENGTH

/**
 * Hard delay for x seconds
 *
 * @returns {function(*): Promise<unknown>}
 */
export const useSleep = () => {
  return (seconds) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true)
      }, seconds * 1000)
    })
  }
}

/**
 * Check if a string is a valid phone number of a given country
 *
 * @returns {(function(*, string=): (boolean|boolean))|*}
 */
export const useIsValidMobileNumber =
  () =>
  (value, country = 'PH') => {
    let phone

    // The library throws a NOT_A_NUMBER error if it can't parse
    // the value properly
    try {
      phone = parsePhoneNumber(value, country)
    } catch (err) {
      return false
    }

    if (!phone) return false

    return isValidPhoneNumber(value, country)
  }

/**
 * Append or prepend a string (set upon the first func is initialized)
 * to the given value via lexical scoping
 *
 * @param affix
 * @param type
 * @returns {function(*): string}
 */
export const usePrependOrAppendOnce = (affix, type = 'append') => {
  if (!['append', 'prepend'].includes(type)) {
    throw new Error('Valid values are `prepend` and `append`')
  }
  return (value) => {
    return type === 'append' ? `${value}-${affix}` : `${affix}-${value}`
  }
}

/**
 * Converts a valid mobile number string without the styling
 * ex: +63 906 464 8269 => +639064648269 or 09064648269 => +639064648269
 *
 * @returns {(function(*))|*}
 */
export const useE164PhoneFormat =
  () =>
  (value, country = 'PH') => {
    let phone

    // The library throws a NOT_A_NUMBER error if it can't parse
    // the value properly
    try {
      phone = parsePhoneNumber(value, country)
    } catch (err) {
      return null
    }

    if (!phone) return null

    return phone.format('E.164')
  }
