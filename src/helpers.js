export const onEndedPlaying = ({ queueList, host, socket }) => {
  if (!queueList) return
  if (queueList[0]?.player === "youtube") {
    socket.emit("youtube:ended", {
      id: queueList[0].id,
      host: host,
      artist: null,
      title: queueList[0].title,
      uri: null,
      image: null,
      player: queueList[0].player,
    })
  }

  if (queueList[0]?.player === "spotify") {
    socket.emit("spotify:ended", {
      id: queueList[0].id,
      host: host,
      artist: queueList[0].artist,
      title: queueList[0].title,
      uri: queueList[0].uri,
      image: queueList[0].image,
      player: queueList[0].player,
    })
  }
}
