import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"

const QrCode = ({ host }) => {
  const [QrCode, setQrCode] = useState("")
  const url = window.location.href

  useState(() => {
    if (!host) {
      return
    }
    setQrCode(`${url}`)
  }, [host])

  return (
    <>
      {host && (
        <div>
          <QRCodeSVG value={QrCode} />
        </div>
      )}
    </>
  )
}

export default QrCode
