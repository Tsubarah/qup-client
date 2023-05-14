import { useEffect, useState } from "react"
import ResultCard from "./YoutubeResultCard/YoutubeResultCard"
import SpotifyResultCard from "./SpotifyResultCard/SpotifyResultCard"

const ResultList = ({ socket, host, platForm }) => {
  const [youtubeResult, setYoutubeResult] = useState([])
  const [spotifyResult, setSpotifyResult] = useState([])

  useEffect(() => {
    socket.on("searchResult", (data) => {
      setYoutubeResult(JSON.parse(data))
    })

    socket.on("spotifySearch", (data) => {
      setSpotifyResult(data)
    })
  }, [youtubeResult, spotifyResult])

  return (
    <>
      {platForm === "youtube" && (
        <div>
          {youtubeResult.length !== 0 &&
            youtubeResult.items.map((item, i) => (
              <ResultCard key={i} result={item} socket={socket} host={host} />
            ))}
        </div>
      )}
      {platForm === "spotify" && (
        <div>
          {spotifyResult.length !== 0 &&
            spotifyResult.map((item, i) => (
              <SpotifyResultCard
                key={i}
                result={item}
                socket={socket}
                host={host}
              />
            ))}
        </div>
      )}
    </>
  )
}

export default ResultList
