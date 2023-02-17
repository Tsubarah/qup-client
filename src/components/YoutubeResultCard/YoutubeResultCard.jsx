import styles from "./YoutubeResultCard.module.scss"
import LoadingSpinner from "../LoadingSpinner"
import { useState, useEffect } from "react"
import { useWindowSize } from "../../hooks/useWindowSize"

const YoutubeResultCard = ({ result, socket, host }) => {
  const [loading, setLoading] = useState(true)
  const [width, setWidth] = useState(380)
  const [height, setHeight] = useState(200)
  const title = result.snippet.title.split("-").splice(1).join("-")
  const artist = result.snippet.title.split("-")[0]
  const id = result.id.videoId
  const windowSize = useWindowSize()

  useEffect(() => {
    if (windowSize.width > 1400 && windowSize.width < 1600) {
      setWidth(350)
      setHeight(180)
    } else {
      setWidth(380)
      setHeight(200)
    }
  }, [windowSize])

  return (
    <div className={styles.root}>
      {loading && <LoadingSpinner />}
      <div style={{ display: loading ? "none" : "unset" }}>
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${id}`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="1"
          title="Embedded youtube"
          onLoad={() => setLoading(false)}
        />
        <div className={styles.root__description}>
          <div>
            <h3>{title}</h3>
            <h4>{artist}</h4>
          </div>
          <button
            className="queue-up-button"
            onClick={() => {
              socket.emit("youtubeId", {
                videoId: result.id.videoId,
                host: host,
              })
            }}
          >
            Queue up
          </button>
        </div>
      </div>
    </div>
  )
}

export default YoutubeResultCard
