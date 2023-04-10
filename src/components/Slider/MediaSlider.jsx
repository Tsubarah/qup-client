import { useEffect, useState } from "react"
import Slider from "react-slick"
import YoutubeResultCard from "../YoutubeResultCard/YoutubeResultCard"
import SpotifyResultCard from "../SpotifyResultCard/SpotifyResultCard"
import { useWindowSize } from "../../hooks/useWindowSize"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function mediaSlider({ socket, host, platForm }) {
  const [youtubeResult, setYoutubeResult] = useState([])
  const [spotifyResult, setSpotifyResult] = useState([])
  const [slidesToScroll, setSlidesToScroll] = useState(2)
  const windowSize = useWindowSize()

  useEffect(() => {
    socket.on("searchResult", (data) => {
      setYoutubeResult(JSON.parse(data))
    })

    socket.on("spotifySearch", (data) => {
      setSpotifyResult(data)
    })

    if (windowSize.width > 1400) {
      setSlidesToScroll(2.5)
    }
    if (windowSize.width > 1600) {
      setSlidesToScroll(3)
    }
  }, [youtubeResult, spotifyResult, windowSize])

  const settings = {
    dots: true,
    slidesToShow: platForm === "youtube" ? slidesToScroll : 3,
    slidesToScroll: 1,
    pauseOnHover: false,
  }

  return (
    <>
      {platForm === "youtube" && (
        <div className="slider">
          <Slider {...settings}>
            {youtubeResult.length !== 0 &&
              youtubeResult.items.map((item, i) => (
                <YoutubeResultCard
                  key={i}
                  result={item}
                  socket={socket}
                  host={host}
                />
              ))}
          </Slider>
        </div>
      )}
      {platForm === "spotify" && (
        <div className="slider">
          <Slider {...settings}>
            {spotifyResult.length !== 0 &&
              spotifyResult.map((item, i) => (
                <SpotifyResultCard
                  key={i}
                  result={item}
                  socket={socket}
                  host={host}
                />
              ))}
          </Slider>
        </div>
      )}
    </>
  )
}
