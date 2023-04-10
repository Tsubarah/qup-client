import { useState, useEffect } from "react"

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  })
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 1000)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowSize
}
