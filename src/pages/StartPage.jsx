import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Desktop from "../components/Desktop/Desktop"
import Mobile from "../components/Mobile/Mobile"
import PlayerController from "../components/PlayerController/PlayerController"

const StartPage = ({
  socket,
  host,
  playingTrack,
  queueList,
  setShowModal,
  showModal,
  playing,
  setPlaying,
}) => {
  const { id } = useParams()
  const [platForm, setPlatform] = useState("youtube")
  const sessionId = localStorage.getItem("session-id")

  const handleFilterPlatform = (e) => {
    const value = e.target.value
    setPlatform(value)
    console.log("platForm", platForm)
  }

  useEffect(() => {
    if (id !== socket.id) {
      console.log("id", id)
      socket.emit("user:joined", id)
    }
  }, [id])

  return (
    <>
      <div className="desktop">
        <Desktop
          socket={socket}
          host={host}
          playingTrack={playingTrack}
          playing={playing}
          setPlaying={setPlaying}
          queueList={queueList}
          platForm={platForm}
          handleFilterPlatform={handleFilterPlatform}
          showModal={showModal}
        />
      </div>

      <div className="mobile">
        <Mobile
          socket={socket}
          host={host}
          playingTrack={playingTrack}
          playing={playing}
          setPlaying={setPlaying}
          queueList={queueList}
          showModal={showModal}
          setShowModal={setShowModal}
          platForm={platForm}
          handleFilterPlatform={handleFilterPlatform}
        />
      </div>
      {/* <div className="playerController">
        <PlayerController
          socket={socket}
          host={host}
          playing={playing}
          queueList={queueList}
          setPlaying={setPlaying}
          playingTrack={playingTrack}
        />
      </div> */}
    </>
  )
}

export default StartPage
