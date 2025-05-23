import QueueModal from "../QueueModal"
import SearchForm from "../SearchForm"
import ResultList from "../ResultList"
import styles from "./Mobile.module.scss"
import DropdownButton from "../TopButtons"
import PlayerController from "../PlayerController/PlayerController"
import Video from "../Video/Video"

const Mobile = ({
  socket,
  host,
  queueList,
  showModal,
  setShowModal,
  platForm,
  handleFilterPlatform,
  playing,
  setPlaying,
  playingTrack,
}) => {
  return (
    <>
      {showModal && (
        <div>
          <QueueModal
            host={host}
            socket={socket}
            queueList={queueList}
            setShowModal={setShowModal}
          />
        </div>
      )}
      <div className={styles.root}>
        {!showModal && (
          <DropdownButton
            platForm={platForm}
            handleFilterPlatform={handleFilterPlatform}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        <div className={styles.root__search}>
          <SearchForm socket={socket} host={host} />
        </div>
        <Video
          socket={socket}
          host={host}
          queueList={queueList}
          playingTrack={playingTrack}
          playing={playing}
          setPlaying={setPlaying}
          muted={true}
        />
      </div>
      <div className={styles.root__resultList}>
        <ResultList socket={socket} host={host} platForm={platForm} />
      </div>
      <div className={styles.Mobile__video}>
        <PlayerController
          socket={socket}
          host={host}
          playing={playing}
          queueList={queueList}
          setPlaying={setPlaying}
          playingTrack={playingTrack}
        />
      </div>
    </>
  )
}

export default Mobile
