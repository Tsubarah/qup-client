import QueueModal from "../QueueModal"
import SearchForm from "../SearchForm"
import ResultList from "../ResultList"
import styles from "./Mobile.module.scss"
import DropdownButton from "../TopButtons"

const Mobile = ({
  socket,
  host,
  queueList,
  showModal,
  setShowModal,
  platForm,
  handleFilterPlatform,
}) => {
  return (
    <>
      {showModal && (
        <div>
          <QueueModal
            host={host}
            socket={socket}
            queueList={queueList}
            setShowModal={setShowModal}
          />
        </div>
      )}
      <div className={styles.root}>
        {!showModal && (
          <DropdownButton
            platForm={platForm}
            handleFilterPlatform={handleFilterPlatform}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        <div className={styles.root__search}>
          <SearchForm socket={socket} host={host} />
        </div>
        <div className={styles.root__resultList}>
          <ResultList socket={socket} host={host} platForm={platForm} />
        </div>
      </div>
    </>
  )
}

export default Mobile
