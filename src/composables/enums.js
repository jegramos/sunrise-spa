export const useAuthType = () => {
  return Object.freeze({
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated',
    OPEN: 'open',
  })
}

export const useRole = () => {
  return Object.freeze({
    STANDARD_USER: 'standard_user',
    ADMIN: 'admin',
    SUPER_USER: 'super_user',
    SYSTEM_SUPPORT: 'system_support',
  })
}
