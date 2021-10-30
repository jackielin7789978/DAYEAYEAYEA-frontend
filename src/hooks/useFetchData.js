import { useEffect } from 'react'

export default function useFetchData(ApiFunc, setterFunc, setIsLoading, args) {
  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const res = args ? await ApiFunc(args) : await ApiFunc()
      if (!res.ok) return alert(res.message)
      if (setterFunc && isMounted) {
        setterFunc(res.data)
        setIsLoading && setIsLoading(false)
      }
    })()
    return () => (isMounted = false)
  }, [ApiFunc, args, setterFunc, setIsLoading])
}
