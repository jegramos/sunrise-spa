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
