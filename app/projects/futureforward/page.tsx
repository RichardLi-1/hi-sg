import { useEffect } from "react"

export default function Redirect() {
  useEffect(() => {
    window.location.href = "http://futureforward.info/"
  }, [])

  return (
    <div>
      <p>Redirecting to <a href="http://futureforward.info/">futureforward.info</a>...</p>
    </div>
  )
}
