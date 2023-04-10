import QueueList from "./QueueList"
import QrCode from "./QrCode"

const QueueModal = ({ socket, queueList, setShowModal, host }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-modal-container">
          <button
            className="close-modal-button"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
        <div className="modal-header">
          <h2 className="modal-title">Queue List</h2>
        </div>
        {queueList.length > 0 && (
          <div className="modal-body">
            <QueueList socket={socket} host={host} queueList={queueList} />
          </div>
        )}
        <div className="modal-qr">
          <QrCode host={host} />
        </div>
      </div>
    </div>
  )
}

export default QueueModal
