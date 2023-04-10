import useAuth from "../hooks/useAuth"
import Logo from "../assets/images/Logo_Q-up_2.png"

const LoginPage = ({ socket }) => {
  const { signInAnonymously } = useAuth()

  return (
    <div className="loginWrapper">
      <div>
        <img className="login-logo" src={Logo} alt="" />
      </div>
      <div className="login-buttons-container">
        <a
          href={`${import.meta.env.VITE_APP_SERVER_URL}/spotify/login`}
          className="button login-button"
          rel="noopener noreferrer"
        >
          Login With Spotify
        </a>

        <a
          type="button"
          className="button login-button"
          onClick={() => {
            signInAnonymously()
            socket.emit("host:joined")
          }}
        >
          No Thanks
        </a>
      </div>
    </div>
  )
}

export default LoginPage
