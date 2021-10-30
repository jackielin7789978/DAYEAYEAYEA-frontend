import { useEffect } from 'react'

export default function useFetchData(ApiFunc, setterFunc, setIsLoading, args) {
  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const res = await ApiFunc(args)
      if (!res.ok) return alert(res.message)
      if (setterFunc && isMounted) {
        setterFunc(res.data)
        setIsLoading(false)
      }
    })()
    return () => (isMounted = false)
  }, [ApiFunc, args, setterFunc, setIsLoading])
}
