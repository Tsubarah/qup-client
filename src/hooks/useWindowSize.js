import { useState, useEffect } from "react"

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: "100%",
    height: "28vw",
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
