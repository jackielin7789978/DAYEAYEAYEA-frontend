import { useEffect } from 'react'

export default function useFetchData(ApiFunc, setterFunc, args) {
  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const res = await ApiFunc(args)
      if (!res.ok) return alert(res.message)
      if (setterFunc && isMounted) {
        setterFunc(res.data)
      } else {
        alert('ok')
      }
    })()
    return () => (isMounted = false)
  }, [ApiFunc, args, setterFunc])
}
