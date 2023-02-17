import styles from "./CurrentlyPlaying.module.scss"

const CurrentlyPlaying = ({ playingTrack }) => {
  if (!playingTrack) return

  // Check if data is youtube or spotify
  const title =
    playingTrack.player === "youtube"
      ? playingTrack.title.split("-").splice(1).join("-")
      : playingTrack.title
  const artist =
    playingTrack.player === "youtube"
      ? playingTrack.title.split("-")[0]
      : playingTrack.artist

  return (
    <div className={styles.CurrentlyPlaying}>
      <div className={styles.CurrentlyPlaying__title}>{title}</div>
      <div className={styles.CurrentlyPlaying__artist}>{artist}</div>
    </div>
  )
}

export default CurrentlyPlaying
