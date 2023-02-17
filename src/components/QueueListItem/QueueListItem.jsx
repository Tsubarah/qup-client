import useAuth from "../../hooks/useAuth"
import styles from "./QueueListItem.module.scss"

const QueueListItem = ({ item, index, host, socket }) => {
  const { user } = useAuth()
  // Check if data is youtube or Spotify. If youtube, get only song title
  const title =
    item.player === "youtube"
      ? item.title.split("-").splice(1).join("-")
      : item.title
  // check if data is youtube or spotify. If youtube, get only artist name
  const artist =
    item.player === "youtube" ? item.title.split("-")[0] : item.artist

  return (
    <>
      <div className={styles.QueueListItem}>
        <div>
          <h3>{title}</h3>
          <h4>{artist}</h4>
        </div>
        {user.owner && (
          <button
            className="remove-item-button"
            onClick={() =>
              socket.emit("playlist-item:remove", {
                host,
                index,
              })
            }
          >
            ❌
          </button>
        )}
      </div>
    </>
  )
}

export default QueueListItem
