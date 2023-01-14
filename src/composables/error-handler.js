export const useParseApiResponseError = (response) => {
  const message = getErrorMessage(response.error_code)
  const errors = []
  if (Array.isArray(response.errors) && !!response.errors.length) {
    for (const error of response.errors) {
      errors.push(error.messages)
    }
  }

  console.log(errors)

  return { code: response.errorCode, message, errors: errors.flat() }
}

const getErrorMessage = (errorCode) => {
  let message = 'Sorry, we have encountered an unknown error. Please contact our technical team for support.'
  switch (errorCode) {
    case 'UNAUTHORIZED_ERROR':
      message = 'Your login session has expired'
      break
    case 'FORBIDDEN_ERROR':
      message = 'You are not allowed to access this page'
      break
    case 'INVALID_CREDENTIALS_ERROR':
      message = 'Incorrect email or password'
      break
    case 'VALIDATION_ERROR':
      message = "Please fix the issues with the details you've provided"
      break
    case 'SMTP_ERROR':
      message = "Sorry, we've encountered problems sending your email"
      break
    case 'RESOURCE_NOT_FOUND_ERROR':
      message = 'Sorry, the data you are looking for seems to be missing in our database'
      break
    case 'TOO_MANY_REQUESTS_ERROR':
      message = "We've received too many request from you. Please try again later."
      break
    case 'INCORRECT_OLD_PASSWORD_ERROR':
      message = "The current password you've entered is incorrect"
      break
    case 'PAYLOAD_TOO_LARGE_ERROR':
      message = "The file you're uploading is too large"
      break
    case 'EMAIL_NOT_VERIFIED_ERROR':
      message = 'Please validate your email address before proceeding'
      break
    case 'BAD_REQUEST_ERROR':
      message = "Sorry, but we can't process your request"
  }
  return message
}