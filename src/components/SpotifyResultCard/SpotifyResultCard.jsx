import styles from "./SpotifyResultCard.module.scss"

const SpotifyResultCard = ({ result, socket, host }) => {
  const mediumImage =
    result.album.images[Math.floor(result.album.images.length / 2)]

  const artist = result.artists[0].name
  const title = result.name
  const image = mediumImage.url

  return (
    <div className={styles.SpotifyCard}>
      <div className={styles.SpotifyCard__content}>
        <img src={image} alt="" className={styles.SpotifyCard__image} />
        <div className={styles.SpotifyCard__description}>
          <div>
            <h3>{title}</h3>
            <h4>{artist}</h4>
          </div>
          <button
            className="queue-up-button"
            onClick={() => {
              socket.emit("spotifyId", {
                videoId: result.id,
                host: host,
                artist: artist,
                title: title,
                uri: result.uri,
                duration: result.duration_ms,
                image: image,
                player: "spotify",
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

export default SpotifyResultCard
