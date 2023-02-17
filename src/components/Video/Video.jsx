import { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player/youtube"
import styles from "./Video.module.scss"
import { onEndedPlaying } from "../../helpers"
import axios from "axios"
import RingLoader from "react-spinners/RingLoader"
import useAuth from "../../hooks/useAuth"

const Video = ({ socket, host, queueList, playingTrack, playing }) => {
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState("gFQ01Fs952o")
  const [lyrics, setLyrics] = useState("")
  // const [progress, setProgress] = useState(0)
  // const [duration, setDuration] = useState(0)
  const videoRef = useRef()
  const { user } = useAuth()

  useEffect(() => {
    if (!playingTrack) {
      return
    }
    if (playingTrack.player === "youtube") {
      setPlayingId(playingTrack.id)
    }

    // If playingTrack is Spotify, get lyrics for the song
    if (playingTrack.player === "spotify") {
      axios
        .get(`${import.meta.env.VITE_APP_SERVER_URL}/spotify/lyrics`, {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
          },
        })
        .then((res) => {
          setLyrics(res.data.lyrics)
          // console.log("res.data", res.data)
        })
    }
  }, [playingTrack, loading])

  return (
    <>
      <div className={styles.root}>
        {loading && (
          <div className={styles.root__loader}>
            <RingLoader size={100} color="#d3751d" />
          </div>
        )}
        {playingTrack?.player !== "spotify" && (
          <div style={{ display: loading ? "none" : "unset" }}>
            <ReactPlayer
              width="100%"
              height="28vw"
              origin="https://www.youtube.com"
              ref={videoRef}
              url={`https://www.youtube.com/watch?v=${playingId}`}
              playing={playing}
              muted={user.owner ? false : true}
              controls={user.owner ? true : false}
              onReady={() => setLoading(false)}
              // onProgress={(progress) => {
              //   setProgress(progress.playedSeconds)
              // }}
              // onDuration={(duration) => {
              //   setDuration(duration)
              // }}
              onEnded={() => {
                setLoading(true)
                onEndedPlaying({ queueList, host, socket })
              }}
            />
          </div>
        )}
        {playingTrack?.player === "spotify" && (
          <div className={styles.root__lyrics}>{lyrics}</div>
        )}
      </div>
    </>
  )
}

export default Video
