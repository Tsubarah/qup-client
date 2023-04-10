import React, { useState, useContext, createContext } from "react"
import { accessToken } from "../lib/spotify"

console.log("accessToken", accessToken)

const AuthContext = createContext({
  signedIn: false,
  spotifyAuthenticated: false,
  host: true,
  accessToken: null,
  refreshToken: null,
  expiresIn: 3600,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    signedIn: false,
    spotifyAuthenticated: false,
    owner: false,
    accessToken: null,
    refreshToken: null,
    expiresIn: 3600,
  })

  const signInAnonymously = () => {
    setUser({
      signedIn: true,
      owner: true,
      spotifyAuthenticated: false,
      acccessToken: null,
      refreshToken: null,
      expiresIn: null,
    })
  }

  const signInVisitor = () => {
    setUser({
      signedIn: true,
      owner: false,
      spotifyAuthenticated: false,
      acccessToken: null,
      refreshToken: null,
      expiresIn: null,
    })
  }

  const setOwner = (isOwner) => {
    setUser(isOwner)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signInAnonymously,
        signInVisitor,
        setOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth
