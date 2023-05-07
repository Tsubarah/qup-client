import QueueList from "../QueueList/QueueList"
import Video from "../Video/Video"
import SearchForm from "../SearchForm/SearchForm"
import QrCode from "../QrCode"
import Instructions from "../Instructions"
import MediaSlider from "../Slider/MediaSlider"
import styles from "./Desktop.module.scss"
import DropdownButton from "../TopButtons"
import DesktopLogo from "../../assets/images/Logo_Q-up_1.png"
import PlayerController from "../PlayerController/PlayerController"

const Desktop = ({
  socket,
  playingTrack,
  playing,
  setPlaying,
  queueList,
  host,
  platForm,
  handleFilterPlatform,
  showModal,
}) => {
  return (
    <>
      <div className={styles.Desktop}>
        <div className={styles.Desktop__top}>
          <div className={styles.Desktop__logo}>
            <img src={DesktopLogo} alt="" />
          </div>
          <div className={styles.Desktop__queuelist}>
            <QueueList socket={socket} queueList={queueList} host={host} />
          </div>
          <div className={styles.Desktop__video}>
            <Video
              socket={socket}
              host={host}
              queueList={queueList}
              playingTrack={playingTrack}
              playing={playing}
              setPlaying={setPlaying}
              muted={false}
              arria-current="visible"
            />
          </div>
        </div>
        <div className={styles.Desktop__bottom}>
          {host && (
            <>
              <div className={styles.Desktop__qr}>
                <QrCode host={host} />
                <PlayerController
                  socket={socket}
                  host={host}
                  playing={playing}
                  queueList={queueList}
                  setPlaying={setPlaying}
                  playingTrack={playingTrack}
                />
              </div>
              <div className={styles.Desktop__bottomRightContainer}>
                {/* <div>
                  <Instructions />
                </div> */}
                <div className={styles.Desktop__searchTopContainer}>
                  <div className={styles.Desktop__searchTop}>
                    <div className={styles.Desktop__searchForm}>
                      <SearchForm socket={socket} host={host} />
                      <div className={styles.Desktop__dropdown}>
                        <DropdownButton
                          platForm={platForm}
                          handleFilterPlatform={handleFilterPlatform}
                          showModal={showModal}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.Desktop__resultList}>
                    <MediaSlider
                      socket={socket}
                      host={host}
                      platForm={platForm}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Desktop
