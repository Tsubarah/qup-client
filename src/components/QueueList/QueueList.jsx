import QueueListItem from "../QueueListItem/QueueListItem"
import styles from "./QueueList.module.scss"

const QueueList = ({ socket, queueList, host }) => {
  return (
    <>
      <div className={styles.QueueList}>
        {queueList &&
          queueList.map((item, i) => (
            <div key={i}>
              <QueueListItem
                item={item}
                index={i}
                host={host}
                socket={socket}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default QueueList
