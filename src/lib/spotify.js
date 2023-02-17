import axios from "axios"

let timestamp

const getAccessTokenUrl = () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const accessToken = urlParams.get("access_token")
  timestamp = Date.now()
  return accessToken
}

export const accessToken = getAccessTokenUrl()

const getRefreshTokenUrl = () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const refreshToken = urlParams.get("refresh_token")
  return refreshToken
}

export const refreshToken = getRefreshTokenUrl()

const getExpiresInUrl = () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const expiresIn = urlParams.get("expires_in")
  return expiresIn
}

export const expiresIn = getExpiresInUrl()

const hasTokenExpired = () => {
  if (!accessToken || !timestamp) {
    return false
  }
  const millisecondsElapsed = Date.now() - Number(timestamp)
  return millisecondsElapsed / 1000 > Number(expiresIn)
}

export const expiredToken = hasTokenExpired()

const getRefreshToken = async () => {
  const storedUser = localStorage.getItem("owner")
  const user = JSON.parse(storedUser)
  console.log("owner", user)
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !user.refreshToken ||
      user.refreshToken === "undefined" ||
      Date.now() - Number(expiredToken) / 1000 < 1000
    ) {
      console.error("No refresh token available")
      // logout()
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(
      `http://192.168.1.64:4000/refresh?refresh_token=${user.refreshToken}`
    )

    // Update localStorage values
    localStorage.setItem(
      "owner",
      JSON.stringify({ ...user, accessToken: data.access_token })
    )
    timestamp = Date.now()

    // // Reload the page for localStorage updates to be reflected
    // window.location.reload()
  } catch (e) {
    console.error(e)
  }
}

if (expiredToken) {
  getRefreshToken()
}
