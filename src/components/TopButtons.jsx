import useAuth from "../hooks/useAuth"

const TopButtons = ({
  platForm,
  handleFilterPlatform,
  showModal,
  setShowModal,
}) => {
  const { user } = useAuth()
  const { spotifyAuthenticated } = user
  return (
    <div>
      <div className="button-container">
        {spotifyAuthenticated && (
          <select
            className="dropdown button"
            id=""
            value={platForm}
            onChange={handleFilterPlatform}
          >
            <option value="spotify">Spotify</option>
            <option value="youtube">Youtube</option>
          </select>
        )}
        <button
          className="button queue-button"
          onClick={() => setShowModal(!showModal)}
        >
          Queue
        </button>
      </div>
    </div>
  )
}

export default TopButtons
