import { useState, useRef, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import styles from "./SearchForm.module.scss"
import { BsSearch } from "react-icons/bs"

const SearchForm = ({ socket, host }) => {
  const [searchInput, setSearchInput] = useState("")
  const searchInputRef = useRef()
  const { user } = useAuth()
  const { spotifyAuthenticated } = user

  // On submiting search
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchInput.length) {
      return
    }

    socket.emit("search", {
      searchInput,
      socketId: socket.id,
    })

    if (spotifyAuthenticated) {
      socket.emit("spotifySearch", {
        searchInput,
        host: host,
        socketId: socket.id,
      })
    }

    setSearchInput("")
  }

  useEffect(() => {
    searchInputRef.current.focus()
  }, [])

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <input
        className={styles.root__input}
        type="search"
        placeholder="Search"
        ref={searchInputRef}
        onChange={(e) => setSearchInput(e.target.value)}
        aria-label="Search"
      />
      <button type="submit" className="search-button">
        <BsSearch />
      </button>
    </form>
  )
}

export default SearchForm
