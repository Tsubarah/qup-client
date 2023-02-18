import { useEffect, useState, useCallback, useRef } from "react"
import { BiPlayCircle } from "react-icons/bi"
import { GiPreviousButton, GiNextButton } from "react-icons/gi"
import { MdPauseCircleOutline } from "react-icons/md"
import SpotifyPlayer from "react-spotify-web-playback"
import useAuth from "../../hooks/useAuth"
import styles from "./PlayerController.module.scss"
import { onEndedPlaying } from "../../helpers"
import CurrentlyPlaying from "../CurrentlyPlaying/CurrentlyPlaying"
import Logo from "../../assets/images/Logo_Q-up_2.png"
import { useWindowSize } from "../../hooks/useWindowSize"

const PlayerController = ({
  socket,
  host,
  playing,
  setPlaying,
  playingTrack,
  queueList,
}) => {
  const { user } = useAuth()
  const { accessToken, owner } = user
  const [playSize, setPlaySize] = useState(50)
  const [nextSize, setNextSize] = useState(40)
  const playerState = useRef(null)

  const windowSize = useWindowSize()

  // useEffect(() => {
  //   if (windowSize.width > 1000 && windowSize.width < 1600) {
  //     setPlaySize(40)
  //     setNextSize(30)
  //   } else {
  //     setPlaySize(50)
  //     setNextSize(50)
  //   }
  // }, [windowSize])

  // Callback function for SpotifyPlayer
  const handleStateChange = (state) => {
    const isEnded = state.position == 0 && state.progressMs == 0
    const isPlaying = state.position > 0 && state.progressMs > 0

    if (playerState === null) {
      console.log("Started from 0")
    }

    if (isPlaying) {
      console.log("Song is playing")
    }

    if (playerState.current) {
      console.log("Stuff is happening")

      const { progressMs, position } = playerState.current

      // Check if song ended
      if (isEnded && progressMs > 0 && position > 0) {
        console.log("Did song end?")
        setPlaying(false)
        onEndedPlaying({ queueList, host, socket })
      }
    }

    playerState.current = state
  }

  // play/pause song
  const handlePlay = () => {
    socket.emit("media:playPause", { host, playing })
  }

  // prev song (not implemented yet)
  const resetPlaying = () => {
    socket.emit("resetPlaying", { host: host })
  }

  // Next song
  const handleNext = () => {
    socket.emit("media:next", { host })
  }

  useEffect(() => {
    socket.on("media:playPause", (play) => {
      setPlaying(!play)
    })
  }, [playing])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.root__controllerContainer}>
          {owner && (
            <div className={styles.root__controllers}>
              <button
                className="prev-button"
                onClick={() => {
                  // socket.emit("prevPlay", { host, playing})
                }}
              >
                <GiPreviousButton size={40} />
              </button>
              <button
                className="play-button"
                onClick={() => {
                  handlePlay()
                }}
              >
                {playing ? (
                  <MdPauseCircleOutline size={50} />
                ) : (
                  <BiPlayCircle size={50} />
                )}
              </button>
              <button className="next-button" onClick={() => handleNext()}>
                <GiNextButton size={40} />
              </button>
            </div>
          )}
          {!owner && (
            <div className={styles.root__logo}>
              <img src={Logo} alt="" />
            </div>
          )}
          <CurrentlyPlaying playingTrack={playingTrack} />
        </div>
      </div>
      <div className={styles.root__spotifyController}>
        {playingTrack?.player === "spotify" && owner && (
          <SpotifyPlayer
            token={accessToken}
            autoPlay={playingTrack?.uri ? true : false}
            play={playingTrack.uri ? playing : false}
            callback={handleStateChange}
            uris={playingTrack.uri ? [playingTrack.uri] : []}
          />
        )}
      </div>
    </>
  )
}

export default PlayerController
