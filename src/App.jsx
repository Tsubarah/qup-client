import socketio from "socket.io-client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import LoginPage from "./pages/LoginPage"
import StartPage from "./pages/StartPage"
import LoadingSpinner from "./components/LoadingSpinner"
import "../src/assets/scss/App.scss"
import useAuth from "./hooks/useAuth"
import {
  accessToken,
  refreshToken,
  expiresIn,
  expiredToken,
} from "../src/lib/spotify"

const socket = socketio.connect(import.meta.env.VITE_APP_SERVER_URL)

function App() {
  const pathname = window.location.pathname

  const [host, setHost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [playingTrack, setPlayingTrack] = useState()
  const [queueList, setQueueList] = useState([])
  const [playing, setPlaying] = useState(false)

  const { user, setUser, signInVisitor, setOwner } = useAuth()
  const { signedIn, owner } = user

  const sessionId = localStorage.getItem("session-id")
  const userId = localStorage.getItem("user-id")

  if (owner) {
    if ("wakeLock" in navigator) {
      // Request a screen wake lock
      navigator.wakeLock
        .request("screen")
        .then((wakeLock) => {
          console.log("Screen wake lock acquired:", wakeLock)
        })
        .catch((error) => {
          console.error("Error acquiring wake lock:", error)
        })
    } else {
      console.warn("Wake Lock API is not supported in this browser.")
    }
  }

  useEffect(() => {
    if (accessToken) {
      socket.emit("host:joined")
      socket.emit("sessionToken", accessToken)
      setUser({
        signedIn: true,
        owner: true,
        spotifyAuthenticated: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
      })
    }
  }, [accessToken])

  useEffect(() => {
    console.log("user", user)
    const path = window.location.pathname.replace("/", "")

    if (owner) {
      localStorage.setItem("owner", JSON.stringify(user))
    }

    if (pathname != "/" && !signedIn) {
      if (!sessionId || (sessionId && path !== userId)) {
        // console.log("1")
        signInVisitor()
      }
      if (path === userId) {
        // console.log("2")
        socket.emit("reconnect", { sessionId, userId })
      }
    }
    // console.log("user", user)
  }, [signedIn])

  useEffect(() => {
    socket.on("host:joined", ({ userId, sessionId, method }) => {
      console.log({
        event: "host joined",
        method,
      })

      const RECONNECT_METHODS = {
        HOST: "reconnect/host",
        USER: "reconnect/user",
      }

      if (method === RECONNECT_METHODS.HOST) {
        const storedObject = localStorage.getItem("owner")
        const owner = JSON.parse(storedObject)
        setOwner(owner)
      }
      setHost(userId)
      localStorage.setItem("user-id", userId)
      localStorage.setItem("session-id", sessionId)
      setLoading(false)
    })

    socket.on("user:joined", ({ id, token }) => {
      console.log("user joined session:", id)
      setHost(id)
      user.spotifyAuthenticated = Boolean(token)
    })

    socket.on("playlist", (data) => {
      setQueueList(data)
    })

    socket.on("playingTrack", (data) => {
      setPlayingTrack(data)
      setPlaying(true)
    })

    if (host === undefined) {
      socket.emit("disconnect")

      navigator.wakeLock
        .request("screen")
        .then((wakeLock) => {
          wakeLock.release()
        })
        .catch((error) => {
          console.error("Error acquiring wake lock:", error)
        })
    }

    return () => {
      // console.log("Cleaning up")
      socket.off("host:joined")
      socket.off("disconnect")
      socket.off("playlist")
    }
  }, [host, queueList, user])

  return (
    <div className="App">
      {/* {loading && <LoadingSpinner />} */}

      <Routes>
        {!signedIn ? (
          <Route
            path="/"
            element={
              <LoginPage
                socket={socket}
                host={host}
                playingTrack={playingTrack}
                queueList={queueList}
                setShowModal={setShowModal}
                showModal={showModal}
              />
            }
          />
        ) : (
          <Route
            path="/:id"
            element={
              <StartPage
                socket={socket}
                host={host}
                playingTrack={playingTrack}
                queueList={queueList}
                setShowModal={setShowModal}
                showModal={showModal}
                playing={playing}
                setPlaying={setPlaying}
              />
            }
          />
        )}

        {host && <Route path="/" element={<Navigate to={`/${host}`} />} />}
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App
